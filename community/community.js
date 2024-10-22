import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js';
import { getFirestore, collection, addDoc, getDocs, query, orderBy, updateDoc, doc } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js';

// Initialize Lucide icons
lucide.createIcons();

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAc6GL6tCcqYlwnWmkheYqYciVj_BfqZ_A",
    authDomain: "ecolife-b8700.firebaseapp.com",
    projectId: "ecolife-b8700",
    storageBucket: "ecolife-b8700.appspot.com",
    messagingSenderId: "685408169279",
    appId: "1:685408169279:web:f5e83ea19f4f58b393b78a"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM elements
const questionList = document.getElementById('questionList');
const askQuestionBtn = document.getElementById('askQuestionBtn');
const modal = document.getElementById('modal');
const closeBtn = document.getElementsByClassName('close')[0];
const questionForm = document.getElementById('questionForm');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const filterSelect = document.getElementById('filterSelect');

// Event listeners
askQuestionBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
questionForm.addEventListener('submit', submitQuestion);
searchBtn.addEventListener('click', searchQuestions);
filterSelect.addEventListener('change', filterQuestions);

// Functions
function openModal() {
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}

async function submitQuestion(e) {
    e.preventDefault();
    const title = document.getElementById('questionTitle').value;
    const content = document.getElementById('questionContent').value;
    const tags = document.getElementById('questionTags').value.split(',').map(tag => tag.trim());

    const newQuestion = {
        title,
        content,
        author: "Anonymous",
        date: new Date().toISOString(),
        answers: [],
        tags
    };

    try {
        await addDoc(collection(db, "questions"), newQuestion);
        await renderQuestions();
        closeModal();
        questionForm.reset();
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}

async function renderQuestions() {
    questionList.innerHTML = '';
    const q = query(collection(db, "questions"), orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const question = { id: doc.id, ...doc.data() };
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        questionElement.innerHTML = `
            <h3>${question.title}</h3>
            <p>${question.content}</p>
            <p><small>Asked by ${question.author} on ${new Date(question.date).toLocaleDateString()}</small></p>
            <div class="tags">
                ${question.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <div class="answers">
                <h4>Answers (${question.answers.length})</h4>
                ${question.answers.map(answer => `
                    <div class="answer">
                        <p>${answer.content}</p>
                        <p><small>Answered by ${answer.author} on ${new Date(answer.date).toLocaleDateString()}</small></p>
                        <button class="upvote-btn" onclick="upvoteAnswer('${question.id}', '${answer.id}')">Upvote (${answer.upvotes})</button>
                        <button class="report-btn" onclick="reportAnswer('${question.id}', '${answer.id}')">Report</button>
                    </div>
                `).join('')}
            </div>
        `;
        questionList.appendChild(questionElement);
    });
}

async function searchQuestions() {
    const searchTerm = searchInput.value.toLowerCase();
    const q = query(collection(db, "questions"), orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);
    const filteredQuestions = [];
    querySnapshot.forEach((doc) => {
        const question = { id: doc.id, ...doc.data() };
        if (
            question.title.toLowerCase().includes(searchTerm) ||
            question.content.toLowerCase().includes(searchTerm) ||
            question.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        ) {
            filteredQuestions.push(question);
        }
    });
    renderFilteredQuestions(filteredQuestions);
}

async function filterQuestions() {
    const filterValue = filterSelect.value;
    const q = query(collection(db, "questions"), orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);
    const filteredQuestions = [];
    querySnapshot.forEach((doc) => {
        const question = { id: doc.id, ...doc.data() };
        if (filterValue === 'all' ||
            (filterValue === 'answered' && question.answers.length > 0) ||
            (filterValue === 'unanswered' && question.answers.length === 0)) {
            filteredQuestions.push(question);
        }
    });
    renderFilteredQuestions(filteredQuestions);
}

function renderFilteredQuestions(filteredQuestions) {
    questionList.innerHTML = '';
    filteredQuestions.forEach(question => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        questionElement.innerHTML = `
            <h3>${question.title}</h3>
            <p>${question.content}</p>
            <p><small>Asked by ${question.author} on ${new Date(question.date).toLocaleDateString()}</small></p>
            <div class="tags">
                ${question.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <div class="answers">
                <h4>Answers (${question.answers.length})</h4>
                ${question.answers.map(answer => `
                    <div class="answer">
                        <p>${answer.content}</p>
                        <p><small>Answered by ${answer.author} on ${new Date(answer.date).toLocaleDateString()}</small></p>
                        <button class="upvote-btn" onclick="upvoteAnswer('${question.id}', '${answer.id}')">Upvote (${answer.upvotes})</button>
                        <button class="report-btn" onclick="reportAnswer('${question.id}', '${answer.id}')">Report</button>
                    </div>
                `).join('')}
            </div>
        `;
        questionList.appendChild(questionElement);
    });
}

async function upvoteAnswer(questionId, answerId) {
    const questionRef = doc(db, "questions", questionId);
    const questionDoc = await getDocs(questionRef);
    const question = questionDoc.data();
    const answer = question.answers.find(a => a.id === answerId);
    answer.upvotes++;
    await updateDoc(questionRef, { answers: question.answers });
    await renderQuestions();
}

function reportAnswer(questionId, answerId) {
    alert(`Answer reported. Our moderators will review it shortly.`);
}

// Initial render
renderQuestions();

// Make functions global for onclick events
window.upvoteAnswer = upvoteAnswer;
window.reportAnswer = reportAnswer;