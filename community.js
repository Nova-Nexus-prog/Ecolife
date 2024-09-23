// Initialize Firestore
const firebaseConfig = {
  apiKey: "AIzaSyAc6GL6tCcqYlwnWmkheYqYciVj_BfqZ_A",
  authDomain: "ecolife-b8700.firebaseapp.com",
  projectId: "ecolife-b8700",
  storageBucket: "ecolife-b8700.appspot.com",
  messagingSenderId: "685408169279",
  appId: "1:685408169279:web:f5e83ea19f4f58b393b78a"
};

firebase.initializeApp(firebaseConfig);
 

const db = firebase.firestore();
let forumQuestions = [];
// Fetch questions and answers from Firestore
function loadQuestionsAndAnswers() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const searchResults = document.getElementById('search-results');
    searchResults.innerHTML = ''; // Clear previous results

    // Fetch questions from Firestore collection
    db.collection("questions").get().then((querySnapshot) => {
        
        querySnapshot.forEach((doc) => {
            forumQuestions.push({ id: doc.id, ...doc.data() });
        });
        console.log(forumQuestions)
        // Filter questions based on the search input
        let filteredQuestions = forumQuestions.filter(question =>
            question.question.toLowerCase().includes(searchInput)
        );

        // If no questions are found, show a "No results found" message
        if (filteredQuestions.length === 0) {
            searchResults.innerHTML = `
              <div class="ask-question-section">
                <p class="fs-4 mb-3">Can't find an answer?</p>
                <p class="mb-4">Feel free to ask a question to our community!</p>
                <a href="ask-question.html" class="btn btn-success btn-lg shadow-sm">
                  <i class="bi bi-pencil-square"></i> Ask a Question
                </a>
              </div>
            `;
            return;
        }

        // Create a list to display the filtered questions
        const listGroup = document.createElement('ul');
        listGroup.classList.add('list-group');

        filteredQuestions.forEach(question => {
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'cursor-pointer');

            // Fetch corresponding answers from Firestore
            db.collection("forumAnswers").doc(question.id).get().then((doc) => {
                const hasAnswers = doc.exists && doc.data().answers.length > 0;
                const answerIcon = hasAnswers
                    ? '<i class="bi bi-check-circle-fill text-success"></i>'  // Green check for answered
                    : '<i class="bi bi-x-circle-fill text-danger"></i>';       // Red cross for unanswered

                listItem.innerHTML = `
                    <div>
                        <h5>${question.question}</h5>
                    </div>
                    ${answerIcon}
                `;

                listItem.addEventListener('click', () => {
                    showQuestionAnswers(question.id);
                });

                listGroup.appendChild(listItem);
            });
        });

        // Append the list to the results div
        searchResults.appendChild(listGroup);
    });
}

// Function to show question and its answers in a modal
function showQuestionAnswers(questionId) {
    const question = forumQuestions.find(q => q.id === questionId);
    
    db.collection("forumAnswers").doc(questionId).get().then((doc) => {
        const answerObj = doc.exists ? doc.data() : null;
        
        // Set question title in the modal
        document.getElementById('modal-question-title').innerText = question.question;

        // Display all answers in the modal or a message if no answers exist
        const answerList = document.getElementById('modal-answer');
        answerList.innerHTML = ''; // Clear previous answers
        
        if (answerObj && answerObj.answers.length > 0) {
            answerObj.answers.forEach((answer, index) => {
                const answerBox = document.createElement('div');
                answerBox.classList.add('answer-box', 'mb-3');

                const answerContent = document.createElement('p');
                answerContent.textContent = `${index + 1}. ${answer}`;
                answerBox.appendChild(answerContent);

                const reportButton = document.createElement('button');
                reportButton.classList.add('btn', 'btn-outline-danger', 'mt-2');
                reportButton.textContent = 'Report';
                reportButton.addEventListener('click', () => {
                    alert('Report button clicked');
                });
                answerBox.appendChild(reportButton);

                answerList.appendChild(answerBox);
            });
        } else {
            answerList.textContent = 'No answers available.';
        }

        const answerModal = new bootstrap.Modal(document.getElementById('answerModal'));
        answerModal.show();
    });
}

// Event listeners for search
document.getElementById('search-button').addEventListener('click', loadQuestionsAndAnswers);
document.getElementById('search-input').addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
        loadQuestionsAndAnswers();
    }
});
