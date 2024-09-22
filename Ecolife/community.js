// Array of forum questions (related to agriculture and environmental protection)
const forumQuestions = [
    {
      id: 1,
      title: "Best Practices for Soil Health",
      description: "Discussion on methods to maintain and improve soil health.",
      topics: 3,
      posts: 5,
      lastPost: "2 days ago"
    },
    {
      id: 2,
      title: "Organic Farming Techniques",
      description: "Tips and resources for successful organic farming.",
      topics: 4,
      posts: 6,
      lastPost: "1 week ago"
    },
    {
      id: 3,
      title: "Water Conservation in Agriculture",
      description: "Strategies for conserving water in farming practices.",
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
      id: 3,
      answers: [
        "Install drip irrigation systems to reduce water wastage.",
        "Mulching helps retain soil moisture and reduces evaporation.",
        "Harvest rainwater and use it for irrigation during dry periods."
      ]
    }
  ];
  
// Function to load questions into the DOM with search and sorting
// Function to load questions into the DOM with search and sorting
function loadForumQuestions() {
    const forumList = document.getElementById('forum-list');
    const askedQuestions = document.getElementById('asked-questions');
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const sortOption = document.getElementById('sort-select').value;
    
    forumList.innerHTML = '';  // Clear the list
    askedQuestions.innerHTML = ''; // Clear asked questions list
    
    // Filter and sort questions
    let filteredQuestions = forumQuestions.filter(question => 
      question.title.toLowerCase().includes(searchInput) ||
      question.description.toLowerCase().includes(searchInput)
    );
    
    let sortedQuestions;
    if (sortOption === 'answered') {
      sortedQuestions = filteredQuestions.filter(question => 
        forumAnswers.some(answer => answer.id === question.id && answer.answers.length > 0)
      );
    } else if (sortOption === 'unanswered') {
      sortedQuestions = filteredQuestions.filter(question => 
        !forumAnswers.some(answer => answer.id === question.id && answer.answers.length > 0)
      );
    } else {
      sortedQuestions = filteredQuestions;
    }
    
    sortedQuestions.forEach((question) => {
      const listItem = document.createElement('li');
      listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'cursor-pointer');
    
      const hasAnswers = forumAnswers.find(answer => answer.id === question.id && answer.answers.length > 0);
      const answerIcon = hasAnswers
        ? '<i class="bi bi-check-circle-fill text-success"></i>'  // Green check for answered
        : '<i class="bi bi-x-circle-fill text-danger"></i>';       // Red cross for unanswered
    
      listItem.innerHTML = `
        <div>
          <h5>${question.title}</h5>
          <p>${question.description}</p>
        </div>
        ${answerIcon}
      `;
    
      listItem.addEventListener('click', () => {
        showQuestionAnswers(question.id);
      });
    
      forumList.appendChild(listItem);
    });
    
    // Populate asked questions list
    forumQuestions.forEach((question) => {
      const listItem = document.createElement('li');
      listItem.classList.add('list-group-item');
      listItem.innerHTML = `
        <div>
          <h5>${question.title}</h5>
        </div>
      `;
      askedQuestions.appendChild(listItem);
    });
  }
  
  // Add event listener for sorting changes
  document.getElementById('sort-select').addEventListener('change', loadForumQuestions);
  
  // Add event listener for search functionality
  document.getElementById('search-button').addEventListener('click', loadForumQuestions);
  
  // Add event listener for search input to update results on enter key
  document.getElementById('search-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      loadForumQuestions();
    }
  });
  
  // Load the questions when the page is loaded
  window.onload = loadForumQuestions;
  
  
  
  // Add event listener for sorting changes
  document.getElementById('sort-select').addEventListener('change', loadForumQuestions);
  
   
  
  
  // Function to show question and its answers in a modal
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
  
  
 
  