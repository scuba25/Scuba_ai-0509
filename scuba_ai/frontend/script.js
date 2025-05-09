
const chatBox = document.getElementById('chat-box');

const userInput = document.getElementById('user-input');

const sendButton = document.getElementById('send-button');



function addMessage(message, sender) {

    const messageDiv = document.createElement('div');

    messageDiv.classList.add('message', `${sender}-message`);

    messageDiv.innerHTML = `<div class="message-content">${message}</div>`;

    chatBox.appendChild(messageDiv);

    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom

}



async function sendMessage() {

    console.log("sendMessage function called!");



    const userMessage = userInput.value.trim();

    if (!userMessage) return;



    addMessage(userMessage, 'user');

    userInput.value = ''; // Clear input field



    try {

        const response = await fetch('http://104.237.132.23:8080/chat', {

            method: 'POST',

            headers: {

                'Content-Type': 'application/json',

            },

            body: JSON.stringify({ message: userMessage }),

        });



        if (!response.ok) {

            const errorText = await response.text();

            addMessage(`Error communicating with backend: ${response.status} - ${errorText}`, 'bot-error');

            return;

        }



        const data = await response.json();



        if (data && data.choices && data.choices.length > 0 && data.choices[0].message && data.choices[0].message.content) {

            addMessage(data.choices[0].message.content, 'bot');

        } else if (data && data.error && data.error.message) {

            addMessage(`AI Error: ${data.error.message}`, 'bot-error');

        } else {

            addMessage("AI response could not be parsed.", 'bot-error');

            console.log("Raw AI Response:", data);

        }



    } catch (error) {

        addMessage(`Error communicating with backend: ${error}`, 'bot-error');

    }

}



// Trigger send on 'Enter' key

userInput.addEventListener('keypress', (event) => {

    if (event.key === 'Enter') {

        sendMessage();

    }

});



// Optional: bind to button click as well

sendButton.addEventListener('click', () => {

    sendMessage();

});

