// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAc6GL6tCcqYlwnWmkheYqYciVj_BfqZ_A",
  authDomain: "ecolife-b8700.firebaseapp.com",
  projectId: "ecolife-b8700",
  storageBucket: "ecolife-b8700.appspot.com",
  messagingSenderId: "685408169279",
  appId: "1:685408169279:web:f5e83ea19f4f58b393b78a"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const newsContainer = document.getElementById('newsContainer');
const pastNewsContainer = document.getElementById('past-news');
let newsArray = [];
const now = new Date();
console.log(now); 
// Fetch news articles from Firestore
db.collection('news').get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
      const news = doc.data();
      newsArray.push({
          title: news.title,
          description: news.description,
          date: news.date,
          image: news.image,
          link: news.link
      });
  });

  // Initial load
  if (newsArray.length > 0) {
      displayMainNews(newsArray[0]);
      renderPastNews();
  }
}).catch((error) => {
  console.error("Error fetching news:", error);
});

// Function to display a specific news item in the main section
function displayMainNews(newsItem) {
  document.getElementById('news-image').src = newsItem.image;
  document.getElementById('news-title').textContent = newsItem.title;
  document.getElementById('news-description').textContent = newsItem.description;
  document.getElementById('news-date').textContent = newsItem.date;
}

// Function to render past news
function renderPastNews() {
  pastNewsContainer.innerHTML = ''; // Clear existing past news
  newsArray.slice(1).forEach((newsItem, index) => {
      const pastNewsDiv = document.createElement('div');
      pastNewsDiv.classList.add('past-news-item');
      pastNewsDiv.innerHTML = `
          <div><strong>${newsItem.title}</strong></div>
          <div>${newsItem.date}</div>
      `;
      pastNewsDiv.addEventListener('click', () => {
          displayMainNews(newsArray[index + 1]);
      });
      pastNewsContainer.appendChild(pastNewsDiv);
  });
}
