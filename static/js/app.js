async function sendChat() {
    let userInput = document.getElementById("userInput").value.trim();
    if (!userInput) return; // Don't send empty messages


    var initialMessage = document.getElementById("initialMessage");
        if(initialMessage) {
            initialMessage.style.display = "none"; // Hide the initial message
        }

    var starters = document.querySelector(".conversation-starters");
        if(starters) {
            starters.style.display = "none"; // Hide the conversation starters
        }
    // Add user's message to the chat area
    appendMessage(userInput, 'user-message');

    // Clear input after sending
    document.getElementById("userInput").value = '';

    try {
        // Start the POST request to send the message
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userInput })
        });

        let reader = response.body.getReader();
        let decoder = new TextDecoder();

        // Create a container for the bot's message
        let botMessageContainer = createMessageContainer('bot-message');

        while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            let chunk = decoder.decode(value, { stream: true });
            // Replace newline characters with HTML <br> tags
            chunk = chunk.replace(/\n/g, '<br>');
            botMessageContainer.innerHTML += chunk;
        }
        // Scroll the bot's message container into view
        botMessageContainer.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.error('Error:', error);
    }
}

function appendMessage(text, className) {
    let messageContainer = createMessageContainer(className);
    messageContainer.innerHTML = text.replace(/\n/g, '<br>'); // Replace newlines with <br>
    document.getElementById('chatArea').appendChild(messageContainer);
    messageContainer.scrollIntoView({ behavior: 'smooth' });
}

function createMessageContainer(className) {
    let div = document.createElement('div');
    div.classList.add('message', className);
    document.getElementById('chatArea').appendChild(div);
    return div;
}




function starterClicked(message) {
    // Assuming you have an input field with id="userInput"
    const userInputField = document.getElementById('userInput');
    userInputField.value = message; // Set the message to the input field

    // Call the sendChat function, which should handle sending the message
    sendChat();
}







function navigateToPage() {
    // Logic to determine which page to navigate to based on the selected option
    var selectedSection = document.getElementById('ipcSectionInput').value;
    if (selectedSection) {
        // Replace 'destination.html' with the actual page you want to navigate to
        window.location.href = selectedSection;
    } else {
        // Handle the case where no section is selected
        alert('Please select a section first.');
    }
}
