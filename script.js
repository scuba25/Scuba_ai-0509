// Use the actual IP address
const API_URL = 'http://104.237.132.23:8000/chat';
const chatBox = document.getElementById('chat-box');
const input = document.getElementById('user-input');
const statusBar = document.getElementById('status');

// Show connection status
function updateStatus(message, isError = false) {
    statusBar.textContent = message;
    statusBar.className = isError ? 'status-bar error' : 'status-bar';
    console.log(message);
}

// Check API connection on load
window.addEventListener('load', async () => {
    try {
        const res = await fetch();
        if (res.ok) {
            updateStatus('Connected to backend');
        } else {
            updateStatus('Backend connection issue: ' + res.status, true);
        }
    } catch (e) {
        updateStatus('Cannot connect to backend: ' + e.message, true);
        console.error(e);
    }
});

function addMessage(msg, sender) {
    const div = document.createElement('div');
    div.className = ;
    
    // Handle multiline messages correctly
    const content = document.createElement('div');
    content.className = 'message-content';
    content.textContent = msg;  // Use textContent to prevent HTML injection
    
    div.appendChild(content);
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
    const msg = input.value.trim();
    if (!msg) return;

    addMessage(msg, 'user');
    input.value = '';
    updateStatus('Sending message...');
    
    try {
        console.log('Sending to backend:', { message: msg });
        
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ message: msg })
        });
        
        console.log('Response status:', res.status);
        
        if (!res.ok) {
            throw new Error();
        }
        
        const data = await res.json();
        console.log('Received data:', data);
        
        if (data.choices && data.choices[0] && data.choices[0].message) {
            addMessage(data.choices[0].message.content, 'assistant');
            updateStatus('Message received');
        } else if (data.error) {
            addMessage("Error: " + data.error, 'assistant');
            updateStatus('Error from backend', true);
        } else {
            addMessage("Unexpected response format", 'assistant');
const API_URL = 'http://104.237.132.23:8000/chat';
const chatBox = document.getElementById('chat-box');
const input = document.getElementById('user-input');
const statusBar = document.getElementById('status');

function updateStatus(message, isError = false) {
    statusBar.textContent = message;
    statusBar.className = isError ? 'status-bar error' : 'status-bar';
    console.log(message);
}

function addMessage(msg, sender) {
    const div = document.createElement('div');
    div.className = `chat-message ${sender}`;
    
    const content = document.createElement('div');
    content.className = 'message-content';
    content.textContent = msg;
    
    div.appendChild(content);
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
    const msg = input.value.trim();
    if (!msg) return;

    addMessage(msg, 'user');
    input.value = '';
    updateStatus('Sending message...');
    
    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ message: msg })
        });
        
        if (!res.ok) throw new Error('Bad status: ' + res.status);
        
        const data = await res.json();
        console.log('Received data:', data);
        
        if (data.response) {
            addMessage(data.response, 'assistant');
            updateStatus('Message received');
        } else if (data.error) {
            addMessage("Error: " + data.error, 'assistant');
            updateStatus('Error from backend', true);
        } else {
            addMessage("Unexpected response format", 'assistant');
            updateStatus('Unexpected response format', true);
        }
    } catch (e) {
        console.error('Error:', e);
        addMessage("Connection error: " + e.message, 'assistant');
        updateStatus('Connection failed: ' + e.message, true);
    }
}

document.getElementById('send-button').onclick = sendMessage;
input.addEventListener('keypress', e => { 
    if (e.key === 'Enter') sendMessage(); 
});

addMessage("Welcome to ScubaAI! Type a message to start chatting.", 'assistant');
        }
    } catch (e) {
        console.error('Error:', e);
        addMessage("Connection error: " + e.message, 'assistant');
        updateStatus('Connection failed: ' + e.message, true);
    }
}

document.getElementById('send-button').onclick = sendMessage;
input.addEventListener('keypress', e => { 
    if (e.key === 'Enter') sendMessage(); 
});

// Add a test message to show the UI is working
addMessage("Welcome to ScubaAI! Type a message to start chatting.", 'assistant');
