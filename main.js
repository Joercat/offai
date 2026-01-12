const worker = new Worker('worker.js', { type: 'module' });
const status = document.getElementById('status');
const input = document.getElementById('userInput');
const btn = document.getElementById('sendBtn');
const chat = document.getElementById('chat');

worker.onmessage = (e) => {
    if (e.data.status === 'ready') {
        status.innerText = "AI is Offline & Ready";
        input.disabled = false;
        btn.disabled = false;
    } else if (e.data.answer) {
        chat.innerHTML += `<p><b>AI:</b> ${e.data.answer}</p>`;
    }
};

btn.onclick = () => {
    const text = input.value;
    chat.innerHTML += `<p><b>You:</b> ${text}</p>`;
    worker.postMessage({ text });
    input.value = '';
};

