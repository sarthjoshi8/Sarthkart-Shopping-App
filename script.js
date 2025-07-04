// Product Data
const products = {
    electronics: [
        { id: 'e1', name: 'Smartphone X', price: 499, image: './smartphone.jpg', description: 'Latest model with advanced features' },
        { id: 'e2', name: 'Laptop Pro', price: 799, image: './laptop.jpg', description: 'High-performance laptop for professionals' },
        { id: 'e3', name: 'Wireless Earbuds', price: 129, image: './earbuds.jpg', description: 'Noise-cancelling true wireless earbuds' },
        { id: 'e4', name: 'Smart Watch', price: 199, image: './smart watch.jpg', description: 'Fitness and health tracking smartwatch' },
        { id: 'e5', name: 'Bluetooth Speaker', price: 79, image: './speaker.jpg', description: 'Portable wireless speaker' }
    ],
    'home-kitchen': [
        { id: 'hk1', name: 'Coffee Maker', price: 79, image: './cofee maker.jpg', description: 'Programmable coffee machine' },
        { id: 'hk2', name: 'Blender', price: 59, image: './blender1.jpg', description: 'High-speed professional blender' },
        { id: 'hk3', name: 'Air Fryer', price: , image: './air fryer.jpg', description: 'Healthy cooking air fryer' },
        { id: 'hk4', name: 'Toaster Oven', price: 89, image: './toster oven.jpg', description: 'Multifunctional kitchen toaster' },
        { id: 'hk5', name: 'Electric Kettle', price: 45, image: './kettle.jpg', description: 'Quick boil electric kettle' }
    ],
    clothing: [
        { id: 'c1', name: 'T-Shirt', price: 25, image: './t shirt.jpg', description: 'Comfortable cotton t-shirt' },
        { id: 'c2', name: 'Jeans', price: 59, image: './jeans.jpg', description: 'Classic fit denim jeans' },
        { id: 'c3', name: 'Hoodie', price: 45, image: './hoodie.jpg', description: 'Warm and stylish hoodie' },
        { id: 'c4', name: 'Sneakers', price: 79, image: './sneaker.jpg', description: 'Comfortable athletic sneakers' },
        { id: 'c5', name: 'Jacket', price: 99, image: './jacket.jpg', description: 'Waterproof winter jacket' }
    ],
    books: [
        { id: 'b1', name: 'Science Fiction Novel', price: 15, image: './fiction novel.jpg', description: 'Bestselling sci-fi book' },
        { id: 'b2', name: 'Programming Guide', price: 35, image: './programming book.jpg', description: 'Comprehensive coding handbook' },
        { id: 'b3', name: 'History Book', price: 25, image: './history book.jpg', description: 'In-depth historical analysis' },
        { id: 'b4', name: 'Cookbook', price: 30, image: './cookbook book.jpg', description: 'Gourmet recipes from around the world' },
        { id: 'b5', name: 'Self-Help Book', price: 20, image: './self book.jpg', description: 'Personal development guide' }
    ],
    sports: [
        { id: 's1', name: 'Yoga Mat', price: 35, image: './yoga mat.jpg', description: 'Premium non-slip yoga mat' },
        { id: 's2', name: 'Fitness Tracker', price: 89, image: './fitness traker.jpg', description: 'Advanced fitness tracking device' },
        { id: 's3', name: 'Running Shoes', price: 129, image: './running shoes.jpg', description: 'Professional running shoes' },
        { id: 's4', name: 'Dumbbells Set', price: 69, image: './dumbell set.jpg', description: 'Adjustable weight dumbbells' },
        { id: 's5', name: 'Sports Water Bottle', price: 25, image: './sports watterbottle.jpg', description: 'Insulated sports water bottle' }
    ],
    beauty: [
        { id: 'bty1', name: 'Skincare Set', price: 59, image: './skincare set.jpg', description: 'Complete daily skincare routine' },
        { id: 'bty2', name: 'Makeup Brushes', price: 35, image: './makeup brush.jpg', description: 'Professional makeup brush set' },
        { id: 'bty3', name: 'Hair Dryer', price: 79, image: 'hair dryer.jpg', description: 'Advanced ionic hair dryer' },
        { id: 'bty4', name: 'Perfume', price: 89, image: 'perfume.jpg', description: 'Signature fragrance' },
        { id: 'bty5', name: 'Facial Cleanser', price: 25, image: './Face Cleanser.jpg', description: 'Gentle daily facial cleanser' }
    ]
};

let cart = [];

// Page Navigation
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    document.getElementById(`${pageId}-page`).classList.add('active');

    // Special handling for home page to show featured products
    if (pageId === 'home') {
        displayFeaturedProducts();
    }
}

// Featured Products
function displayFeaturedProducts() {
    const featuredElectronics = document.getElementById('featured-electronics');
    const featuredHomeKitchen = document.getElementById('featured-home-kitchen');

    featuredElectronics.innerHTML = '';
    featuredHomeKitchen.innerHTML = '';

    // Display first 3 products from electronics and home-kitchen
    products.electronics.slice(0, 3).forEach(product => {
        featuredElectronics.appendChild(createProductCard(product));
    });

    products['home-kitchen'].slice(0, 3).forEach(product => {
        featuredHomeKitchen.appendChild(createProductCard(product));
    });
}

// Product Card Creation
function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div class="product-card-content">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <p>${product.description}</p>
            <button onclick="addToCart('${product.id}')" class="btn">Add to Cart</button>
        </div>
    `;
    return productCard;
}

// Display Products by Category
function displayProducts(category) {
    const productSection = document.getElementById('product-section');
    productSection.innerHTML = '';
    
    products[category].forEach(product => {
        productSection.appendChild(createProductCard(product));
    });
}

// Cart Functionality
function addToCart(productId) {
    const product = getAllProducts().find(p => p.id === productId);
    if (product) {
        const existingProduct = cart.find(item => item.id === productId);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({...product, quantity: 1});
        }
        
        updateCartDisplay();
    }
}

function updateCartDisplay() {
    const cartList = document.getElementById('cart-list');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');
    
    cartList.innerHTML = '';
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `
            ${item.name} - $${item.price} x ${item.quantity} 
            = $${item.price * item.quantity}
            <button onclick="removeFromCart('${item.id}')">Remove</button>
        `;
        cartList.appendChild(cartItem);
    });

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    cartCount.textContent = totalQuantity;
}

function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        } else {
            cart.splice(index, 1);
        }
    }
    
    updateCartDisplay();
}

function getAllProducts() {
    return Object.values(products).flat();
}

function checkout() {
    alert('Thank you for your purchase! Your order is being processed.');
    cart = [];
    updateCartDisplay();
}

document.addEventListener('DOMContentLoaded', () => {
    const indexPage = document.getElementById('index-page');
    const mainSite = document.getElementById('main-site');

    // Directly show main site and home page
    indexPage.style.display = 'none';
    mainSite.style.display = 'block';
    showPage('home');

    // Ensure featured products are displayed
    displayFeaturedProducts();
});