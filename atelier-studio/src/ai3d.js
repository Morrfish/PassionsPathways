// Optional online AI 3D: sends the front drawing to an image-to-3D model running on
// Hugging Face Spaces and brings back a 3D model file (GLB). Everything else in the app works
// offline; this is the one feature that needs the internet.
import { Client, handle_file } from '@gradio/client';

export const AI_MODELS = [
  {
    id: 'tencent/Hunyuan3D-2', name: 'Hunyuan3D-2 (shape and colors)',
    async run(client, image, status) {
      status('Building the 3D shape and painting it (this can take 1–3 minutes)…');
      try {
        const r = await client.predict('/generation_all', { caption: '', image: handle_file(image), steps: 30, guidance_scale: 5.5, seed: 1234, octree_resolution: 256, check_box_rembg: true, num_chunks: 8000, randomize_seed: false });
        return pickModel(r.data, 1);
      } catch (e) {
        status('Trying the faster shape-only version…');
        const r = await client.predict('/shape_generation', { caption: '', image: handle_file(image), steps: 30, guidance_scale: 5.5, seed: 1234, octree_resolution: 256, check_box_rembg: true, num_chunks: 8000, randomize_seed: false });
        return pickModel(r.data, 0);
      }
    },
  },
];

// Find the 3D model file in a Gradio result (prefer the item at `prefer`).
function pickModel(data, prefer) {
  const files = [];
  const visit = (v) => {
    if (!v) return;
    if (Array.isArray(v)) { v.forEach(visit); return; }
    if (typeof v === 'object') {
      const u = v.url || v.value?.url || v.path;
      if (typeof u === 'string' && /\.(glb|gltf)(\?|$)/i.test(u)) files.push(v.url || v.value?.url);
      else if (v.value) visit(v.value);
    }
  };
  if (Array.isArray(data) && data[prefer]) visit(data[prefer]);
  if (!files.length) visit(data);
  if (!files.length) throw new Error('The AI service did not send back a 3D model.');
  return files[0];
}

// image: a Blob (PNG of the drawing on white). token: optional Hugging Face token.
export async function makeAIModel({ image, modelId = AI_MODELS[0].id, token = '', status = () => {} }) {
  if (!navigator.onLine) throw new Error('You are offline. AI 3D needs the internet.');
  const model = AI_MODELS.find((m) => m.id === modelId) || AI_MODELS[0];
  status('Connecting to ' + model.name + '…');
  let client;
  try { client = await Client.connect(model.id, token ? { token } : {}); }
  catch (e) { throw new Error('Could not reach the AI service on Hugging Face. Check the internet connection, or the service may be asleep or busy.'); }
  const url = await model.run(client, image, status);
  status('Downloading the 3D model…');
  const res = await fetch(url, token ? { headers: { Authorization: 'Bearer ' + token } } : {});
  if (!res.ok) throw new Error('Could not download the 3D model (' + res.status + ').');
  return await res.blob();
}
