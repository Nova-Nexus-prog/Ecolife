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
  console.log(db)
const productsRef = db.collection('products');

document.getElementById('addProductForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const productName = document.getElementById('productName').value;
    const productPrice = parseFloat(document.getElementById('productPrice').value);
    const productCategory = document.getElementById('productCategory').value;
    const productDescription = document.getElementById('productDescription').value;
    const productImage = document.getElementById('productImage').files[0];
    
    const progressContainer = document.getElementById('progressContainer');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const statusMessage = document.getElementById('statusMessage');
  
    if (productImage) {
      // Show progress bar
      progressContainer.style.display = 'block';
  
      // Create a storage reference for the image
      const storageRef = storage.ref(`products/${productImage.name}`);
      
      // Upload the image to Firebase Storage
      const uploadTask = storageRef.put(productImage);
      
      uploadTask.on('state_changed', 
        function(snapshot) {
          // Track upload progress
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          progressBar.style.width = `${progress}%`;
          progressText.textContent = `${Math.floor(progress)}%`;
  
        }, 
        function(error) {
          // Handle any errors during upload
          statusMessage.textContent = `Error: ${error.message}`;
          progressContainer.style.display = 'none';
        }, 
        function() {
          // Upload completed successfully, get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            // Add product data to Firestore, including the image URL
            productsRef.add({
              name: productName,
              price: productPrice,
              category: productCategory,
              description: productDescription,
              imageUrl: downloadURL  // Save the image URL in Firestore
            })
            .then(() => {
              statusMessage.textContent = 'Product added successfully!';
              progressContainer.style.display = 'none';  // Hide the progress bar
              progressBar.style.width = '0%';  // Reset progress bar
              document.getElementById('addProductForm').reset();
            })
            .catch((error) => {
              statusMessage.textContent = `Error: ${error.message}`;
              progressContainer.style.display = 'none';
            });
          });
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