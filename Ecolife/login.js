
const firebaseConfig = {
    apiKey: "AIzaSyBSL9CcMpfU-7NPtCz1LjWVuR3Th5NlduI",
authDomain: "fir-3d35c.firebaseapp.com",
databaseURL: "https://fir-3d35c-default-rtdb.firebaseio.com",
projectId: "fir-3d35c",
storageBucket: "fir-3d35c.appspot.com",
messagingSenderId: "485524239132",
appId: "1:485524239132:web:b6c08abaafe83520c940d9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Access Firebase authentication through the global firebase object
// Access Firebase authentication through the global firebase object
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

document.getElementById('g_sign').addEventListener('click', () => {
    console.log("Google Sign-In button clicked");
    auth.signInWithPopup(googleProvider)
        .then((result) => {
            const user = result.user;
            console.log("User signed in: ", user);
            sessionStorage.setItem('userName', user.displayName);
            sessionStorage.setItem('userEmail', user.email);
            alert('Google Sign-In successful!');
            window.location.href = 'dashboard.html';
        })
        .catch((error) => {
            console.error('Error during Google Sign-In: ', error.message);
        });
});
// Toggle between sign-up and login forms
const signupFormContainer = document.getElementById('signup-form-container');
const loginFormContainer = document.getElementById('login-form-container');

document.getElementById('show-login-form').addEventListener('click', () => {
    signupFormContainer.style.display = 'none';
    loginFormContainer.style.display = 'block';
});

document.getElementById('show-signup-form').addEventListener('click', () => {
    signupFormContainer.style.display = 'block';
    loginFormContainer.style.display = 'none';
});

// Sign-Up Form Submission
document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    const errorMessage = document.getElementById('signup-error-message');

    // Check if passwords match
    if (password !== confirmPassword) {
        errorMessage.textContent = "Passwords do not match.";
        return;
    }

    // Firebase authentication: create user with email and password
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert('Account created successfully!');
            window.location.href = 'dashboard.html'; // Redirect to dashboard
        })
        .catch((error) => {
            const errorMessageText = error.message;
            errorMessage.textContent = `Error: ${errorMessageText}`;
        });
});

// Login Form Submission
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const errorMessage = document.getElementById('login-error-message');

    // Firebase authentication: sign in with email and password
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // Storing user data in sessionStorage
            sessionStorage.setItem('userName', user.displayName || "Anonymous User");
            sessionStorage.setItem('userEmail', user.email);

            alert('Login successful!');

            // Redirect to dashboard or another page
            window.location.href = 'dashboard.html';
        })
        .catch((error) => {
            const errorMessageText = error.message;
            errorMessage.textContent = `Error: ${errorMessageText}`;
        });
});
// reset 
document.getElementById('forgot-password').addEventListener('click', () => {
    const email = prompt("Please enter your email address for password reset:");

    if (email) {
        auth.sendPasswordResetEmail(email)
            .then(() => {
                alert('Password reset email sent! Check your inbox.');
            })
            .catch((error) => {
                console.error('Error sending password reset email:', error.message);
                alert('Error: ' + error.message);
            });
    } else {
        alert('Email is required.');
    }
});



