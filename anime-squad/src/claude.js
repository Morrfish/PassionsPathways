// Talks to Claude. Each bot = a character's personality + a job.
import Anthropic from '@anthropic-ai/sdk';
import { TOOL_DEFS, runTool, toolLabel } from './tools.js';

export const MODELS = [
  { id: 'claude-opus-5-5', name: 'Claude Opus 5.5 (smartest)', fallbacks: true },
  { id: 'claude-sonnet-5-5', name: 'Claude Sonnet 5.5 (faster, cheaper)', fallbacks: true },
  { id: 'claude-haiku-5-5', name: 'Claude Haiku 5.5 (fastest, cheapest)', fallbacks: false },
];

// Marks the hidden date line added to each message you send, so the chat doesn't show it.
export const CONTEXT_MARK = '⟦context⟧';

const MAX_STEPS = 12;

function makeClient(apiKey) {
  // The key stays on this device and is sent only to Anthropic.
  return new Anthropic({ apiKey, dangerouslyAllowBrowser: true, maxRetries: 2 });
}

export function buildSystemPrompt({ character, job, customJob, nickname, userName }) {
  const jobText = job
    ? `${job.name}: ${job.brief}`
    : `Custom job, written by the user: "${customJob}"`;
  return [
    `You are ${character.name} from the anime ${character.anime}, working as the user's personal assistant bot in an app called Anime Squad.${nickname && nickname !== character.name ? ` The user named this bot "${nickname}".` : ''}`,
    '',
    '## Your character',
    `Personality: ${character.vibe}`,
    `How you talk: ${character.voice}`,
    `Lines you might say (for flavor; don't repeat them word for word every time): ${character.phrases.map((p) => `"${p}"`).join(' / ')}`,
    '',
    '## Your job',
    jobText,
    '',
    '## How to work',
    '- Stay in character the whole time: your words, attitude, catchphrases and quirks. Make it fun.',
    '- Be truly useful. Correct, practical help matters more than the bit. Facts, numbers, code and instructions must be accurate even when said in character.',
    '- Keep replies chat-sized: short paragraphs or lists. Go longer only when the task needs it (a plan, code, a full draft).',
    '- You have a to-do list and a notebook shared with the user\'s other bots. Use the tools to add/check off tasks and save notes whenever it helps, and say briefly what you saved.',
    '- If web search is available, use it for current information (prices, news, hours, weather, recent facts). Don\'t make up current facts.',
    '- You cannot set phone alarms, send texts or emails, or act outside this app. If asked, say so in character and offer what you can do (like adding a task with a due date).',
    '- If the user seems to be in danger or crisis, drop the act, be direct and caring, and point them to real help (in the US, call or text 988).',
    userName ? `- The user's name is ${userName}.` : '',
  ].filter((line) => line !== '').join('\n');
}

function contextLine() {
  const now = new Date();
  return `${CONTEXT_MARK} Current date and time for the user: ${now.toLocaleString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' })}`;
}

export function userMessage(text) {
  return { role: 'user', content: [{ type: 'text', text: contextLine() }, { type: 'text', text }] };
}

function validToolInput(name, input) {
  const def = TOOL_DEFS.find((t) => t.name === name);
  if (!def || !input || typeof input !== 'object' || Array.isArray(input)) return false;
  for (const key of def.input_schema.required ?? []) {
    if (typeof input[key] !== 'string') return false;
  }
  return true;
}

// Runs one turn: sends the conversation, streams the reply, runs any tools, and repeats
// until the bot is done. `messages` (the saved chat) is updated in place.
// callbacks: onText(fullTextSoFar), onStep() after each saved step, onTool(label)
export async function runTurn({ settings, systemPrompt, messages, botId, signal, onText, onStep, onTool }) {
  const client = makeClient(settings.apiKey);
  const model = MODELS.find((m) => m.id === settings.model) ?? MODELS[0];
  const tools = [...TOOL_DEFS];
  if (settings.webSearch) tools.push({ type: 'web_search_20260209', name: 'web_search', max_uses: 5 });

  let retries = 0;
  for (let step = 0; step < MAX_STEPS; step++) {
    const params = {
      model: model.id,
      max_tokens: 32000,
      system: systemPrompt,
      cache_control: { type: 'ephemeral' },
      output_config: { effort: 'medium' },
      tools,
      messages,
    };
    if (model.fallbacks) {
      // If the main model declines, the API retries on a fallback model in the same call.
      params.betas = ['server-side-fallback-2026-07-01'];
      params.fallbacks = 'default';
    }

    const stream = client.beta.messages.stream(params, { signal });
    let live = '';
    stream.on('text', (delta) => {
      live += delta;
      onText?.(live);
    });
    stream.on('contentBlock', (block) => {
      if (block.type === 'server_tool_use') onTool?.(toolLabel(block.name, block.input));
    });

    let message;
    try {
      message = await stream.finalMessage();
      retries = 0;
    } catch (err) {
      // API errors (bad key, rate limit...) go to the caller. A dropped connection or
      // unreadable tool input gets retried a couple of times.
      if (err instanceof Anthropic.APIError || signal?.aborted || retries++ >= 2) throw err;
      step--;
      continue;
    }

    if (message.content.length) messages.push({ role: 'assistant', content: message.content });
    onStep?.();

    if (message.stop_reason === 'refusal') return { refused: true };
    if (message.stop_reason === 'pause_turn') continue;

    const toolUses = message.content.filter((b) => b.type === 'tool_use');
    if (!toolUses.length) return { done: true, truncated: message.stop_reason === 'max_tokens' };
    if (message.stop_reason === 'max_tokens') return { done: true, truncated: true };

    const results = toolUses.map((tu) => {
      if (!validToolInput(tu.name, tu.input)) {
        return { type: 'tool_result', tool_use_id: tu.id, is_error: true, content: 'Invalid input for this tool. Check the required fields and try again.' };
      }
      onTool?.(toolLabel(tu.name, tu.input));
      try {
        return { type: 'tool_result', tool_use_id: tu.id, content: runTool(tu.name, tu.input, botId) };
      } catch (err) {
        return { type: 'tool_result', tool_use_id: tu.id, is_error: true, content: String(err.message || err) };
      }
    });
    messages.push({ role: 'user', content: results });
    onStep?.();
  }
  return { done: true, tooLong: true };
}

// Turns any anime character's name into a full character profile.
const PROFILE_SCHEMA = {
  type: 'object',
  properties: {
    found: { type: 'boolean', description: 'false if you do not know this character' },
    name: { type: 'string' },
    anime: { type: 'string' },
    emoji: { type: 'string', description: 'One emoji that fits them' },
    color1: { type: 'string', description: 'Hex color like #ff8800 from their look' },
    color2: { type: 'string', description: 'Second hex color' },
    vibe: { type: 'string', description: 'Personality in 1-2 sentences' },
    voice: { type: 'string', description: 'How they talk: tone, habits, catchphrases, dialect, verbal tics' },
    phrases: { type: 'array', items: { type: 'string' }, description: '3-4 short lines they would say' },
  },
  required: ['found', 'name', 'anime', 'emoji', 'color1', 'color2', 'vibe', 'voice', 'phrases'],
  additionalProperties: false,
};

const HEX = /^#[0-9a-f]{6}$/i;

export async function generateCharacter(settings, query) {
  const client = makeClient(settings.apiKey);
  const response = await client.messages.create({
    model: settings.model || MODELS[0].id,
    max_tokens: 4000,
    output_config: { effort: 'low', format: { type: 'json_schema', schema: PROFILE_SCHEMA } },
    messages: [{
      role: 'user',
      content: `Make a profile of this anime character so a chatbot can talk like them: "${query}". Use their real personality and speech style from the show. Keep phrases short and in the spirit of the character. If you don't recognize the character, set found to false.`,
    }],
  });
  if (response.stop_reason === 'refusal') throw new Error('Claude could not make that character.');
  const text = response.content.find((b) => b.type === 'text')?.text;
  if (!text) throw new Error('No answer came back. Try again.');
  const p = JSON.parse(text);
  if (!p.found) throw new Error(`Couldn't find a character called "${query}". Try adding the anime name too.`);
  return {
    name: p.name,
    anime: p.anime,
    emoji: p.emoji || '⭐',
    colors: [HEX.test(p.color1) ? p.color1 : '#7c4dff', HEX.test(p.color2) ? p.color2 : '#ff4081'],
    vibe: p.vibe,
    voice: p.voice,
    phrases: Array.isArray(p.phrases) ? p.phrases.slice(0, 5) : [],
  };
}

// A friendly message for errors shown in the chat.
export function explainError(err) {
  if (err instanceof Anthropic.AuthenticationError) return 'Your Claude API key was not accepted. Check it in Settings.';
  if (err instanceof Anthropic.PermissionDeniedError) return 'This API key is not allowed to use that model. Try another model in Settings.';
  if (err instanceof Anthropic.RateLimitError) return 'Too many requests right now. Wait a minute and try again.';
  if (err instanceof Anthropic.BadRequestError) return `Claude couldn't handle that request: ${err.message}`;
  if (err instanceof Anthropic.APIError) return `Claude had a problem (${err.status ?? 'network'}). Try again in a moment.`;
  if (err?.name === 'AbortError' || err instanceof Anthropic.APIUserAbortError) return 'Stopped.';
  return `Something went wrong: ${err?.message || err}`;
}
