import { pipeline } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.0.0';

let generator;

// Initialize the model
self.onmessage = async (e) => {
    if (!generator) {
        generator = await pipeline('text-generation', 'onnx-community/Qwen2.5-0.5B-Instruct', {
            dtype: 'q4', // 4-bit quantization for low RAM
            device: 'webgpu', // Will auto-fallback to WASM if no GPU
        });
        self.postMessage({ status: 'ready' });
    }

    if (e.data.text) {
        const output = await generator(e.data.text, { max_new_tokens: 100, temperature: 0.7 });
        self.postMessage({ answer: output[0].generated_text });
    }
};

