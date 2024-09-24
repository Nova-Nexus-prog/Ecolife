function login_call() {
    document.getElementById("log_in").style.visibility = "visible";
    document.getElementById("image").setAttribute("class", "image slide_right");
    document.getElementById("sign_in").style.visibility = "hidden";
}
function sign_in_call() {
    document.getElementById("log_in").style.visibility = "hidden";
    document.getElementById("image").setAttribute("class", "image slide_left");
    document.getElementById("sign_in").style.visibility = "visible";
}

const firebaseConfig = {
  apiKey: "AIzaSyAc6GL6tCcqYlwnWmkheYqYciVj_BfqZ_A",
  authDomain: "ecolife-b8700.firebaseapp.com",
  projectId: "ecolife-b8700",
  storageBucket: "ecolife-b8700.appspot.com",
  messagingSenderId: "685408169279",
  appId: "1:685408169279:web:f5e83ea19f4f58b393b78a"
};
firebase.initializeApp(firebaseConfig);

const signInBtn = document.getElementById('sign_in_btn');
const loginBtn = document.getElementById('login_btn');
const emailInput = document.querySelector('input[type="email"]');
const passwordInput = document.querySelector('input[type="password"]');
const togglePassword = document.getElementById('togglePassword');
const googleButton = document.getElementById('google-sign-in'); // If you have an ID for the Google button
const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

// Create account
signInBtn.addEventListener('click', () => {
    const firstName = document.querySelector('#name input:nth-of-type(1)').value;
    const lastName = document.querySelector('#name input:nth-of-type(2)').value;
    const email = emailInput.value;
    const password = passwordInput.value;

    if (firstName && lastName && email && password) {
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Account created, you can save additional info in the database
                const user = userCredential.user;
                sessionStorage.setItem('username', `${firstName} ${lastName}`);
                alert('Account created successfully!');
                window.location.href = 'index.html'; // Redirect to dashboard
            })
            .catch((error) => {
                console.error('Error creating account: ', error.message);
                alert("Something went wrong! please try Again");
            });
    } else {
        alert('Please fill in all fields.');
    }
});

// Log in
loginBtn.addEventListener('click', () => {
    const email = document.getElementById("login_email").value;
    const password =  document.getElementById("login_password").value;
   
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            sessionStorage.setItem('username', user.displayName || email);
            alert('Logged in successfully!');
            window.location.replace = 'index.html'; // Redirect to dashboard
        })
        .catch((error) => {
            console.error('Error logging in: ', error.message);
            alert('Error: ' + error.message);
        });
});

// Google Sign-In
if (googleButton) {
    googleButton.addEventListener('click', () => {
        auth.signInWithPopup(googleProvider)
            .then((result) => {
                const user = result.user;
                sessionStorage.setItem('username', user.displayName);
                alert('Google Sign-In successful!');
                window.location.replace = 'index.html'; // Redirect to dashboard
            })
            .catch((error) => {
                console.error('Error during Google Sign-In: ', error.message);
            });
    });
}

// Toggle password visibility
togglePassword.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePassword.src = type === 'password' ? 'hide.png' : 'show.png'; // Change image source based on visibility
});

// Forgot Password
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
// //sign out
// document.getElementById('userSection').addEventListener('click', (event) => {
//     if (event.target.id === 'signOutBtn') {
//         auth.signOut().then(() => {
//             sessionStorage.removeItem('userName'); // Clear user name from session storage
//             alert('Signed out successfully!');
//             window.location.reload(); // Reload the page to update the navbar
//         }).catch((error) => {
//             console.error('Error signing out: ', error.message);
//             alert('Error: ' + error.message);
//         });
//     }
// });
