// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAc6GL6tCcqYlwnWmkheYqYciVj_BfqZ_A",
  authDomain: "ecolife-b8700.firebaseapp.com",
  projectId: "ecolife-b8700",
  storageBucket: "ecolife-b8700.appspot.com",
  messagingSenderId: "685408169279",
  appId: "1:685408169279:web:f5e83ea19f4f58b393b78a"
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

// Function to add a question to Firestore
document.getElementById('ask-btn').addEventListener('click', async () => {
    const question = document.getElementById('question-input').value;
    if (question.trim()) {
        try {
            await firestore.collection('questions').add({
                question: question,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
            alert('Question submitted successfully!');
            document.getElementById('question-input').value = ''; // Clear the input
        } catch (error) {
            console.error('Error adding question: ', error);
            alert('Error submitting question');
        }
    } else {
        alert('Please enter a question');
    }
});
