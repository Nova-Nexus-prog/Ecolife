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
const productsRef = db.collection('products');
 

function createProductCard(product) {
  return `
    <div class="product-card">
      <img src="${product.imageUrl}+&sig=${product.id}" alt="${product.name}">
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.category}</p>
        <p class="price">$${product.price.toFixed(2)}</p>
        <a href="purchase.html?id=${product.id}" class="buy-button">Buy Now</a>
      </div>
    </div>
  `;

  
}
db.collection('products').get().then((snapshot) => {
  const products = snapshot.docs.map(doc => doc.data());
  
  if (products.length > 0) {
      productList.innerHTML = products.map(createProductCard).join('');
      productShimmer.style.display = 'none'; // Hide shimmer
      productList.style.display = 'grid';    // Show products grid
  }
}).catch((error) => {
  console.error("Error loading products: ", error);
  productShimmer.style.display = 'none'; // Hide shimmer even on error
});

function displayFeaturedProducts() {
  const featuredProducts = document.getElementById('featuredProducts');
  if (featuredProducts) {
    productsRef.limit(4).get().then((querySnapshot) => {
      const featured = [];
      querySnapshot.forEach((doc) => {
        const product = doc.data();
        product.id = doc.id;
        featured.push(product);
      });
      featuredProducts.innerHTML = featured.map(createProductCard).join('');
    });
  }
}

function displayAllProducts() {
  const productList = document.getElementById('productList');
  if (productList) {
    productsRef.get().then((querySnapshot) => {
      const allProducts = [];
      querySnapshot.forEach((doc) => {
        const product = doc.data();
        product.id = doc.id;
        allProducts.push(product);
      });
      productList.innerHTML = allProducts.map(createProductCard).join('');
    });
  }
}

function displayProductDetails() {
  const productDetails = document.getElementById('productDetails');
  if (productDetails) {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    productsRef.doc(productId).get().then((doc) => {
      if (doc.exists) {
        const product = doc.data();
        console.log(productId);
        productDetails.innerHTML = `
          <div class="product-image">
            <img src="${product.imageUrl}?${product.name.toLowerCase().replace(' ', '-')}&sig=${productId}" alt="${product.name}">
          </div>
          <div class="product-info">
            <h1>${product.name}</h1>
            <p class="price">$${product.price.toFixed(2)}</p>
            <p class="description">${product.description}</p>
            <div class="quantity-selector">
              <label for="quantity">Quantity</label>
              <select id="quantity">
                ${[1, 2, 3, 4, 5].map(num => `<option value="${num}">${num}</option>`).join('')}
              </select>
            </div>
            <button class="add-to-cart" onclick="buyProduct('${productId}')">
              <i data-lucide="shopping-cart"></i>Buy now
            </button>
          </div>
        `;
        lucide.createIcons();
      } else {
        productDetails.innerHTML = '<p>Product not found</p>';
      }
    });
  }
}

function addToCart(productId) {
  const quantity = document.getElementById('quantity').value;
  productsRef.doc(productId).get().then((doc) => {
    if (doc.exists) {
      const product = doc.data();
      alert(`Added ${quantity} ${product.name}(s) to cart!`);
    }
  });
}

const ordersRef = firebase.firestore().collection(`orders/${localStorage.getItem("username")}/ordered`);

function buyProduct(productId) {
  const quantity = document.getElementById('quantity').value;

  productsRef.doc(productId).get().then((doc) => {
    if (doc.exists) {
      const product = doc.data();
      
      // Create a new order in the 'orders' collection
      const orderDetails = {
        productId: productId,
        productName: product.name,
        price: product.price,
        quantity: parseInt(quantity),
        total: (product.price * quantity).toFixed(2),
        timestamp: firebase.firestore.FieldValue.serverTimestamp(), // Timestamp for order creation
        status: 'Pending' // Initial order status
      };

      // Add the order to Firestore
      ordersRef.add(orderDetails).then(() => {
        alert(`Order placed for ${quantity} ${product.name}(s). Total: $${orderDetails.total}`);
        
        // Optionally clear cart or take additional actions after purchase
        localStorage.removeItem('cart');
      }).catch((error) => {
        console.error('Error placing order:', error);
        alert('Error placing the order. Please try again.');
      });

    } else {
      alert('Product not found.');
    }
  }).catch((error) => {
    alert('Error retrieving product');
  });
}


document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  displayFeaturedProducts();
  displayAllProducts();
  displayProductDetails();
});
