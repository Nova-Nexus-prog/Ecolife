document.addEventListener('DOMContentLoaded', () => {
    // Separate arrays for each category of products
	const bestSellingProducts = [
        { id: 1, name: 'Reusable Water Bottle', price: 15, image: 'https://www.spicymotion.be/assets/img/gallery/indirect-sampling/01.jpg' },
        { id: 2, name: 'Bamboo Toothbrush Set', price: 10, image: 'https://www.spicymotion.be/assets/img/gallery/indirect-sampling/01.jpg' },
        { id: 3, name: 'Eco-Friendly Shopping Bag', price: 8, image: 'https://www.spicymotion.be/assets/img/gallery/indirect-sampling/01.jpg' },
        { id: 4, name: 'Biodegradable Straws', price: 5, image: 'https://www.spicymotion.be/assets/img/gallery/indirect-sampling/01.jpg' },
        { id: 5, name: 'Natural Soap Bars', price: 12, image: 'https://www.spicymotion.be/assets/img/gallery/indirect-sampling/01.jpg' },
        { id: 6, name: 'Recycled Paper Notebooks', price: 6, image: 'https://www.spicymotion.be/assets/img/gallery/indirect-sampling/01.jpg' },
        { id: 7, name: 'Reusable Coffee Cup', price: 14, image: 'https://www.spicymotion.be/assets/img/gallery/indirect-sampling/01.jpg' },
        { id: 8, name: 'Beeswax Wraps', price: 18, image: 'https://www.spicymotion.be/assets/img/gallery/indirect-sampling/01.jpg' },
        { id: 9, name: 'Eco-Friendly Dish Sponge', price: 4, image: 'https://www.spicymotion.be/assets/img/gallery/indirect-sampling/01.jpg' },
        { id: 10, name: 'Organic Cotton Tote Bag', price: 7, image: 'https://www.spicymotion.be/assets/img/gallery/indirect-sampling/01.jpg' },
    ];

    const agricultureProducts = [
        { id: 11, name: 'Organic Fertilizer', price: 20, image: 'https://www.spicymotion.be/assets/img/gallery/indirect-sampling/01.jpg' },
        { id: 12, name: 'Compost Kit', price: 25, image: 'https://www.spicymotion.be/assets/img/gallery/indirect-sampling/01.jpg' },
        { id: 13, name: 'Plant-Based Pest Control', price: 15, image: 'https://www.spicymotion.be/assets/img/gallery/indirect-sampling/01.jpg' },
        { id: 14, name: 'Eco-Friendly Planter Pots', price: 12, image: 'https://www.spicymotion.be/assets/img/gallery/indirect-sampling/01.jpg' },
        { id: 15, name: 'Garden Watering System', price: 50, image: 'https://www.spicymotion.be/assets/img/gallery/indirect-sampling/01.jpg' },
        { id: 16, name: 'Organic Plant Seeds', price: 5, image: 'https://www.spicymotion.be/assets/img/gallery/indirect-sampling/01.jpg' },
        { id: 17, name: 'Solar Garden Lights', price: 30, image: 'https://www.spicymotion.be/assets/img/gallery/indirect-sampling/01.jpg' },
        { id: 18, name: 'Biodegradable Mulch', price: 18, image: 'https://www.spicymotion.be/assets/img/gallery/indirect-sampling/01.jpg' },
        { id: 19, name: 'Compostable Garden Bags', price: 10, image: 'https://www.spicymotion.be/assets/img/gallery/indirect-sampling/01.jpg' },
        { id: 20, name: 'Organic Plant Fertilizer', price: 22, image: 'https://www.spicymotion.be/assets/img/gallery/indirect-sampling/01.jpg' },
    ];

    const electronicProducts = [
        { id: 21, name: 'Solar-Powered Charger', price: 50, image: 'https://www.spicymotion.be/assets/img/gallery/indirect-sampling/01.jpg' },
        { id: 22, name: 'Energy-Efficient LED Bulbs', price: 12, image: 'https://www.spicymotion.be/assets/img/gallery/indirect-sampling/01.jpg' },
        { id: 23, name: 'Eco-Friendly Bluetooth Speaker', price: 40, image: 'https://www.spicymotion.be/assets/img/gallery/indirect-sampling/01.jpg' },
        { id: 24, name: 'Solar Lanterns', price: 30, image: 'https://www.spicymotion.be/assets/img/gallery/indirect-sampling/01.jpg' },
        { id: 25, name: 'Rechargeable Batteries', price: 15, image: 'https://www.spicymotion.be/assets/img/gallery/indirect-sampling/01.jpg' },
        { id: 26, name: 'Eco-Friendly Phone Case', price: 20, image: 'https://www.spicymotion.be/assets/img/gallery/indirect-sampling/01.jpg' },
        { id: 27, name: 'Recycled Plastic Keyboard', price: 35, image: 'https://www.spicymotion.be/assets/img/gallery/indirect-sampling/01.jpg' },
        { id: 28, name: 'Energy-Efficient Power Strip', price: 25, image: 'https://www.spicymotion.be/assets/img/gallery/indirect-sampling/01.jpg' },
        { id: 29, name: 'Solar-Powered Flashlight', price: 10, image: 'https://www.spicymotion.be/assets/img/gallery/indirect-sampling/01.jpg' },
        { id: 30, name: 'Eco-Friendly Wireless Mouse', price: 25, image: 'https://www.spicymotion.be/assets/img/gallery/indirect-sampling/01.jpg' },
    ];

    const foodProducts = [
        { id: 31, name: 'Organic Quinoa', price: 10, image: 'https://www.spicymotion.be/assets/img/gallery/indirect-sampling/01.jpg' },
        { id: 32, name: 'Eco-Friendly Snack Bars', price: 7, image: 'https://www.spicymotion.be/assets/img/gallery/indirect-sampling/01.jpg' },
        { id: 33, name: 'Reusable Food Wraps', price: 12, image: 'https://www.spicymotion.be/assets/img/gallery/indirect-sampling/01.jpg' },
        { id: 34, name: 'Compostable Coffee Pods', price: 15, image: 'https://www.spicymotion.be/assets/img/gallery/indirect-sampling/01.jpg' },
        { id: 35, name: 'Organic Dried Fruit', price: 8, image: 'https://www.spicymotion.be/assets/img/gallery/indirect-sampling/01.jpg' },
        { id: 36, name: 'Eco-Friendly Food Storage Bags', price: 10, image: 'https://www.spicymotion.be/assets/img/gallery/indirect-sampling/01.jpg' },
        { id: 37, name: 'Sustainable Protein Bars', price: 9, image: 'https://www.spicymotion.be/assets/img/gallery/indirect-sampling/01.jpg' },
        { id: 38, name: 'Organic Tea Bags', price: 6, image: 'https://www.spicymotion.be/assets/img/gallery/indirect-sampling/01.jpg' },
        { id: 39, name: 'Reusable Produce Bags', price: 5, image: 'https://www.spicymotion.be/assets/img/gallery/indirect-sampling/01.jpg' },
        { id: 40, name: 'Biodegradable Plates', price: 10, image: 'https://www.spicymotion.be/assets/img/gallery/indirect-sampling/01.jpg' },
    ];

    const cart = [];

    // Function to render products dynamically from an array of objects
    function renderProducts(productsArray, elementId) {
        const productContainer = document.getElementById(elementId);
        productContainer.innerHTML = '';

        productsArray.forEach(product => {
            const productHTML = `
                <div class="product">
                    <img src="${product.image}" alt="${product.name}">
                    <h4>${product.name}</h4>
                    <p>$${product.price.toFixed(2)}</p>
					<button class="buy" data-product-id="${product.id}">Buy Now</button>
                    <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
                </div>
            `;
            productContainer.insertAdjacentHTML('beforeend', productHTML);
        });
    }

    // Load products for each section
    renderProducts(bestSellingProducts, 'best-selling-products');
    renderProducts(agricultureProducts, 'agriculture-products');
    renderProducts(electronicProducts, 'electronic-products');
    renderProducts(foodProducts, 'food-products');

    // Add to cart functionality
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('add-to-cart')) {
            const productId = event.target.getAttribute('data-product-id');
            addToCart(productId);
        }
    });

    function addToCart(productId) {
        cart.push(productId);
        alert('Product added to cart!');
        // Additional functionality can be added here for cart display and checkout
    }
});
