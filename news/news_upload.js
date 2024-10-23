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
const storage = firebase.storage();

const newsForm = document.getElementById('newsForm');
const uploadProgress = document.getElementById('uploadProgress');
const progressContainer = document.querySelector('.progress-container');
function getCurrentDateTime() {
  const now = new Date();

  // Options for date formatting
  const options = {
      year: 'numeric',
      month: 'short', // Short month name (e.g., "Oct")
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false // Use 24-hour format
  };

  // Formatting the date and time
  const formattedDateTime = now.toLocaleString('en-US', options)
      .replace(',', ''); // Remove the comma

  return formattedDateTime;
}

// Get the current date and time
 
 

newsForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const imageFile = document.getElementById('image').files[0];
 

  if (imageFile) {
    // Show the progress container
    progressContainer.style.display = 'block';

    // Create a storage reference
    const storageRef = storage.ref(`news_images/${imageFile.name}`);

    // Upload the file with progress
    const uploadTask = storageRef.put(imageFile);

    // Monitor the upload progress
    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        uploadProgress.style.width = progress + '%';
      },
      (error) => {
        console.error("Error uploading news:", error);
        alert("Error uploading news. Please try again.");
      },
      async () => {
        // Get the download URL
        const imageUrl = await uploadTask.snapshot.ref.getDownloadURL();
        const date=getCurrentDateTime();
        // Add the news article to Firestore
        await db.collection('news').doc(date).set({
          title: title,
          description: description,
          date: "2020-12-34",
          image: imageUrl
        });

        alert("News article uploaded successfully!");
        newsForm.reset(); // Reset the form fields
        uploadProgress.style.width = '0'; // Reset progress bar
        progressContainer.style.display = 'none'; // Hide the progress bar
      }
    );
  }
});

 window.onload=()=>{
  if(!sessionStorage.getItem("username"))
  {
    window.location.replace("../sign_in.html")
  }
 }
