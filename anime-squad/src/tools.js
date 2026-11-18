// Tools the bots can use: a shared to-do list and notebook kept on this device.
import { getState, save, uid } from './store.js';

const str = { type: 'string' };

export const TOOL_DEFS = [
  {
    name: 'add_task',
    description: 'Add a task to the user\'s to-do list. Use for chores, reminders, goals, shopping items, bills and anything they need to do.',
    eager_input_streaming: true,
    input_schema: {
      type: 'object',
      properties: {
        text: { ...str, description: 'What needs to be done' },
        due: { ...str, description: 'Optional due date/time in plain words or YYYY-MM-DD, e.g. "2026-11-20" or "Friday 5pm"' },
      },
      required: ['text'],
    },
  },
  {
    name: 'list_tasks',
    description: 'List the user\'s to-do tasks with their ids. Check this before completing or deleting a task.',
    eager_input_streaming: true,
    input_schema: {
      type: 'object',
      properties: { include_done: { type: 'boolean', description: 'Also list finished tasks' } },
    },
  },
  {
    name: 'complete_task',
    description: 'Mark a task as done, by id.',
    eager_input_streaming: true,
    input_schema: { type: 'object', properties: { id: str }, required: ['id'] },
  },
  {
    name: 'delete_task',
    description: 'Delete a task, by id. Only when the user asks to remove it.',
    eager_input_streaming: true,
    input_schema: { type: 'object', properties: { id: str }, required: ['id'] },
  },
  {
    name: 'save_note',
    description: 'Save a note to the user\'s notebook: plans, workouts, recipes, budgets, study notes, journal entries, research findings and lists worth keeping. Use markdown in the body.',
    eager_input_streaming: true,
    input_schema: {
      type: 'object',
      properties: { title: str, body: str },
      required: ['title', 'body'],
    },
  },
  {
    name: 'list_notes',
    description: 'List the user\'s saved notes (titles, ids and the start of each).',
    eager_input_streaming: true,
    input_schema: { type: 'object', properties: {} },
  },
  {
    name: 'read_note',
    description: 'Read the full text of a saved note, by id.',
    eager_input_streaming: true,
    input_schema: { type: 'object', properties: { id: str }, required: ['id'] },
  },
];

// Short labels shown in the chat when a bot uses a tool.
export function toolLabel(name, input) {
  switch (name) {
    case 'add_task': return `📝 Added task: ${input?.text ?? ''}`;
    case 'list_tasks': return '📋 Checked your to-do list';
    case 'complete_task': return '✅ Checked off a task';
    case 'delete_task': return '🗑️ Removed a task';
    case 'save_note': return `📓 Saved note: ${input?.title ?? ''}`;
    case 'list_notes': return '📚 Looked at your notes';
    case 'read_note': return '📖 Read a note';
    case 'web_search': return `🌐 Searched: ${input?.query ?? ''}`;
    default: return `🔧 ${name}`;
  }
}

function needString(input, key) {
  if (!input || typeof input[key] !== 'string' || !input[key].trim()) {
    throw new Error(`Missing "${key}".`);
  }
  return input[key].trim();
}

// Runs a tool. Returns a string for the tool_result. Throws on bad input.
export function runTool(name, input, botId) {
  const s = getState();
  switch (name) {
    case 'add_task': {
      const task = { id: uid('t'), text: needString(input, 'text'), due: typeof input.due === 'string' ? input.due.trim() : '', done: false, botId, created: Date.now() };
      s.tasks.push(task);
      save();
      return JSON.stringify({ added: task.id });
    }
    case 'list_tasks': {
      const list = s.tasks.filter((t) => input?.include_done || !t.done).map(({ id, text, due, done }) => ({ id, text, due, done }));
      return list.length ? JSON.stringify(list) : 'The to-do list is empty.';
    }
    case 'complete_task':
    case 'delete_task': {
      const id = needString(input, 'id');
      const i = s.tasks.findIndex((t) => t.id === id);
      if (i < 0) throw new Error('No task with that id. Use list_tasks to see ids.');
      if (name === 'complete_task') s.tasks[i].done = true;
      else s.tasks.splice(i, 1);
      save();
      return 'Done.';
    }
    case 'save_note': {
      const note = { id: uid('n'), title: needString(input, 'title'), body: needString(input, 'body'), botId, created: Date.now() };
      s.notes.unshift(note);
      save();
      return JSON.stringify({ saved: note.id });
    }
    case 'list_notes': {
      const list = s.notes.map(({ id, title, body }) => ({ id, title, preview: body.slice(0, 120) }));
      return list.length ? JSON.stringify(list) : 'No notes yet.';
    }
    case 'read_note': {
      const id = needString(input, 'id');
      const note = s.notes.find((n) => n.id === id);
      if (!note) throw new Error('No note with that id. Use list_notes to see ids.');
      return `# ${note.title}\n\n${note.body}`;
    }
    default:
      throw new Error(`Unknown tool ${name}`);
  }
}
