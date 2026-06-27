

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
const API_BASE = 'https://dummyjson.com';
const productGrid = document.getElementById('product-grid');
const viewMoreBtn = document.getElementById('view-more-btn');

// Store all products here so we can reuse without re-fetching
let allProducts = [];
let isExpanded = false;

function createProductCard(product) {
const hasSale = product.discountPercentage > 10;
const discountedPrice = (product.price * (1 - product.discountPercentage / 100)).toFixed(2);

const priceHTML = hasSale
    ? `<span class="price-old">$${product.price}</span> $${discountedPrice}`
    : `$${product.price}`;

const badgeHTML = hasSale
    ? `<span class="badge badge-sale">Sale</span>`
    : `<span class="badge badge-new">New</span>`;

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