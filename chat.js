// Select DOM elements

const messageInput = document.getElementById('input');
const messageList = document.querySelector('.message-list');
const sendButton = document.getElementById('send-button');
const currentUser = { username: "name", avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE9BRKrFpRy2RXTqrLpWLxgS1QMjB6MnFXFBdlYVvfnDanUbqw1gQi8pR6zgQLYjRGXfs&usqp=CAU" }; // Replace with your details
var initial=true;
var isinput=false;



// Function to create a message element
function createMessage(messageContent, isOutgoing) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  if (isOutgoing) {
    messageElement.classList.add('outgoing');
  } else {
    messageElement.classList.add('incoming');
  }

  const userPicture = document.createElement('img');
  userPicture.classList.add('user-picture');
  userPicture.src = isOutgoing ? currentUser.avatar : "svg/white_logo.svg"; // Replace with friend avatar

 
 
  messageElement.appendChild(userPicture);
  messageElement.innerHTML+=formatInfo(messageContent);
 
  return messageElement;
}

 function formatInfo(text) {
  // Split the text into paragraphs
  const paragraphs = text.split('\n\n');

  // Apply formatting based on paragraph content
  const formattedParagraphs = paragraphs.map(paragraph => {
    // Remove all instances of "**" (two asterisks)
    paragraph = paragraph.replaceAll('**', '');

    if (paragraph.startsWith('##')) {
      // Bold the first line (OS stands for Operating System)
      paragraph.replaceAll("##","")
      return `<h2><b>${paragraph}</b></h2>`;
    } else if (paragraph.split('\n')[0].includes('*')) {
      // Remove * from list items and indent
      const listItems = paragraph.split('\n').slice(1).map(line => line.replace('*', '').trim());
      return `  <ul>\n    ${listItems.map(item => `      <li>${item}</li>`).join('\n')}  </ul>`;
    } else {
      // Add basic paragraph formatting
      return `<p>${paragraph}</p>`;
    }
  });

  // Join the formatted paragraphs and add a blank line
   
  return formattedParagraphs.join('\n\n');
}

 

 

// Function to send a message (**placeholder, actual sending logic needed**)
function sendMessage(messageContent) {
  // Simulate sending a message (replace with real logic)
 
  const messageElement = createMessage(messageContent, true);
  messageList.appendChild(messageElement);
  messageInput.value = ''; // Clear the input field
  // Scroll to the bottom of the message list
  messageList.scrollTop = messageList.scrollHeight;
}

 

// Add event listener to send button


 

// Select the paragraph element
const paragraph = document.getElementById("input");

// Set the placeholder text
const placeholderText = "Enter your text here...";

// Add event listeners for focus and blur events
document.getElementById("input").addEventListener("focus",()=> {
   
    // When the paragraph is focused, remove the placeholder text
    if (paragraph.innerText === placeholderText) {
        paragraph.innerText = "";
        isinput=!isinput;
    }
});

paragraph.addEventListener("blur", function() {
    // When the paragraph loses focus and is empty, add the placeholder text back
    if (!this.innerHTML.trim()) {
        this.innerHTML = placeholderText;
        isinput=!isinput;
    }
});

// Set the initial placeholder text
paragraph.innerText = placeholderText;

// document.addEventListener('contextmenu', event => event.preventDefault());

