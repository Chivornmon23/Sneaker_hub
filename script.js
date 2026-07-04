

// ============================
// DARK MODE
// ============================
const themeToggle = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;

if (localStorage.getItem('theme') === 'dark') {
htmlEl.classList.add('dark');
}

themeToggle.addEventListener('click', () => {
htmlEl.classList.toggle('dark');
const isDark = htmlEl.classList.contains('dark');
localStorage.setItem('theme', isDark ? 'dark' : 'light');
});


// ============================
// API — FETCH PRODUCTS
// ============================
const API_BASE = 'https://dummyjson.com'; //define the base URL for the API 
const productGrid = document.getElementById('product-grid');    // Select the existing HTML elements to manipulate later
const viewMoreBtn = document.getElementById('view-more-btn');   // Select the existing HTML elements to manipulate later

// Initializes state variables to track the data and the UI's display mode
let allProducts = [];  
let isExpanded = false;

//A tamplate function that converts a JSON object into an HTML string for a single product
function createProductCard(product) {
    const hasSale = product.discountPercentage > 10; //Determines if the item is on sale based on its discount
    const discountedPrice = (product.price * (1 - product.discountPercentage / 100)).toFixed(2); //Calculates the new price using toFixed(2) 
                                                                                                //  to ensure it looks like currency 

    const priceHTML = hasSale
        ? `<span class="price-old">$${product.price}</span> $${discountedPrice}`
        : `$${product.price}`;

    const badgeHTML = hasSale
        ? `<span class="badge badge-sale">Sale</span>`
        : `<span class="badge badge-new">New</span>`;

    // uses templates literals (backticks) to inject dynamic data into the HTML structure
    return ` 
        <a href="#" class="product-card" data-id="${product.id}">
        <div class="product-image-wrap">
            <img src="${product.thumbnail}" alt="${product.title}" loading="lazy">
            ${badgeHTML}
        </div>
        <div class="product-info">
            <div>
            <div class="product-name">${product.title}</div>
            <div class="product-sub">${product.category}</div>
            </div>
            <div class="product-price">${priceHTML}</div>
        </div>
        </a>
    `;
}
// This structure is a Chained Transformation used to convert a list of data into a single block of HTML.
// It follows a three-step process: 
// .map() Transforms the array of products (raw data) into an array of strings (HTML cards)
// .join('') Merges that array of strings into one single, long string. 
// .innerHTML = injects that finish string into the web page 
function renderProducts(products) {
productGrid.innerHTML = products
    .map(product => createProductCard(product))
    .join('');
}

function showLoading() {
productGrid.innerHTML = `
    <p style="color: var(--text-secondary); font-size:14px; grid-column:1/-1;">
    Loading products...
    </p>
`;
}

function showError() {
productGrid.innerHTML = `
    <p style="color:red; font-size:14px; grid-column:1/-1;">
    Failed to load products. Please try again.
    </p>
`;
}

// View More button logic
viewMoreBtn.addEventListener('click', () => {
if (!isExpanded) {
    // Show all products
    renderProducts(allProducts);
    viewMoreBtn.textContent = 'Show Less';
    isExpanded = true;
} else {
    // Collapse back to 4
    renderProducts(allProducts.slice(0, 4));
    viewMoreBtn.textContent = 'View More';
    isExpanded = false;

    // Scroll back up to the products section smoothly
    document.getElementById('product-grid').scrollIntoView({ behavior: 'smooth' });
}
});

// Fetch both mens and womens shoes
function fetchProducts() {
showLoading();

Promise.all([
    fetch(`${API_BASE}/products/category/mens-shoes`).then(res => res.json()),
    fetch(`${API_BASE}/products/category/womens-shoes`).then(res => res.json())
])
.then(([mensData, womensData]) => {
    // Store ALL products
    allProducts = [...mensData.products, ...womensData.products];

    // Show only first 4 on load
    renderProducts(allProducts.slice(0, 4));

    // Show the button only after products loaded
    viewMoreBtn.style.display = 'inline-block';

    console.log('Total products:', allProducts.length);
})
.catch(error => {
    console.error('API Error:', error);
    showError();
});
}

fetchProducts();