document.getElementById("U_name").innerText=sessionStorage.getItem("username");
console.log(sessionStorage.getItem("username"))

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

console.log(db)

function getAllDocuments(collectionName) {
    return db.collection(collectionName).get()
      .then((querySnapshot) => {
        return querySnapshot.docs.map(doc => doc.data());
      });
  }

getAllDocuments(`orders/${sessionStorage.getItem("username")}/ordered`)
.then((products) => {
     
    const tableBody = document.querySelector('#ordersTable tbody');

    products.forEach(product => {
        const row = document.createElement('tr');

        // Convert timestamp to readable format
        const date = new Date(product.timestamp.seconds * 1000);

        row.innerHTML = `
            <td>${product.productName}</td>
            <td>${product.productId}</td>
            <td>${product.quantity}</td>
            <td>${product.status}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>$${product.total}</td>
            <td>${date.toLocaleString()}</td>
        `;

        tableBody.appendChild(row);
    });
})
.catch((error) => {
console.error('Error getting documents: ', error);
});

