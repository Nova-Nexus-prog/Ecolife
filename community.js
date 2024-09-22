// Array of forum questions (related to agriculture and environmental protection)
const forumQuestions = [
  {
      id: 1,
      title: "Best Practices for Soil Health",
       
      topics: 3,
      posts: 5,
      lastPost: "2 days ago"
  },
  {
      id: 2,
      title: "Organic Farming Techniques",
      
      topics: 4,
      posts: 6,
      lastPost: "1 week ago"
  },
  {
      id: 3,
      title: "Water Conservation in Agriculture",
      
      topics: 2,
      posts: 3,
      lastPost: "3 days ago"
  }
];

// Array of answers where each question can have multiple answers related to agriculture and environmental protection
const forumAnswers = [
  {
      id: 1,
      answers: [
          "Regular soil testing helps monitor nutrient levels and pH.",
          "Using cover crops can prevent soil erosion and improve fertility.",
          "Composting organic matter enriches soil health."
      ]
  },
  {
      id: 2,
      answers: [
          "Use crop rotation to avoid depleting the soil.",
          "Biological pest control is essential to maintaining a healthy ecosystem.",
          "Avoid synthetic fertilizers and opt for natural manure."
      ]
  },
  {
      id: 4,
      answers: [
          "Install drip irrigation systems to reduce water wastage.",
          "Mulching helps retain soil moisture and reduces evaporation.",
          "Harvest rainwater and use it for irrigation during dry periods."
      ]
  }
];

// Function to load questions into the DOM with search and sorting
// Function to load questions into the DOM with search and sorting
document.addEventListener('DOMContentLoaded', function () {

  // Function to load questions into the DOM with search and sorting
  function loadForumQuestions() {
      const searchInput = document.getElementById('search-input').value.toLowerCase();
      const searchResults = document.getElementById('search-results'); // Target the results div
  
      // Clear previous search results
      searchResults.innerHTML = '';
  
      // Filter questions based on the search input
      let filteredQuestions = forumQuestions.filter(question =>
          question.title.toLowerCase().includes(searchInput)
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
  
          const hasAnswers = forumAnswers.find(answer => answer.id === question.id && answer.answers.length > 0);
          const answerIcon = hasAnswers
              ? '<i class="bi bi-check-circle-fill text-success"></i>'  // Green check for answered
              : '<i class="bi bi-x-circle-fill text-danger"></i>';       // Red cross for unanswered
  
          listItem.innerHTML = `
              <div>
                  <h5>${question.title}</h5>
                   
              </div>
              ${answerIcon}
          `;
  
          listItem.addEventListener('click', () => {
              showQuestionAnswers(question.id);
          });
  
          listGroup.appendChild(listItem);
      });
  
      // Append the list to the results div
      searchResults.appendChild(listGroup);
  }

  // Function to show question and its answers in a modal
  function showQuestionAnswers(questionId) {
      const question = forumQuestions.find(q => q.id === questionId);
      const answerObj = forumAnswers.find(a => a.id === questionId);
      
      // Set question title in the modal
      document.getElementById('modal-question-title').innerText = question.title;
      
      // Display all answers in the modal or a message if no answers exist
      const answerList = document.getElementById('modal-answer');
      answerList.innerHTML = ''; // Clear previous answers
      
      if (answerObj && answerObj.answers.length > 0) {
        answerObj.answers.forEach((answer, index) => {
          // Create a div for each answer
          const answerBox = document.createElement('div');
          answerBox.classList.add('answer-box', 'mb-3'); // Add margin-bottom for spacing
    
          // Add answer content
          const answerContent = document.createElement('p');
          answerContent.textContent = `${index + 1}. ${answer}`;
          answerBox.appendChild(answerContent);
    
          // Add the Report button
          const reportButton = document.createElement('button');
          reportButton.classList.add('btn', 'btn-outline-danger', 'mt-2');
          reportButton.textContent = 'Report';
          reportButton.addEventListener('click', () => {
            alert('Report button clicked'); // Placeholder for report functionality
          });
          answerBox.appendChild(reportButton);
    
          // Append the answer box to the modal body
          answerList.appendChild(answerBox);
        });
      } else {
        answerList.textContent = 'No answers available.';
      }
    
      // Show the modal
      const answerModal = new bootstrap.Modal(document.getElementById('answerModal'));
      answerModal.show();
  }

  // Add event listener for the search button
  document.getElementById('search-button').addEventListener('click', loadForumQuestions);

  // Add event listener for live search (on Enter key)
  document.getElementById('search-input').addEventListener('keyup', function (e) {
      if (e.key === 'Enter') {
          loadForumQuestions();
      }
  });

});

document.getElementById('ask').addEventListener('click', () => {
     
  if(sessionStorage.getItem("username"))
  {
     window.location.href="ask_question.html"
  }
  else{
      alert("You have to log in first in order to ask questions!")
     
  }
});

