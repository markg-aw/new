// 1. Loading & Theme
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').style.opacity = '0';
    setTimeout(() => document.getElementById('loader').style.visibility = 'hidden', 500);
  }, 800);
});

document.getElementById('themeToggle').addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
  const icon = document.getElementById('themeIcon');
  if (newTheme === 'dark') {
    icon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>'; 
  } else {
    icon.innerHTML = '<circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>';
  }
});

// 2. Product Data (Lahat may libreng imahe galing Unsplash)
const products = [
  { 
    id: 1, name: 'Galaxy S24 Ultra', price: 74990, category: 'mobile', 
    img: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80', 
    desc: 'Titanium frame, 6.8" QHD+ AMOLED 120Hz, Snapdragon 8 Gen 3, 200MP Quad Camera, 5000mAh battery.', 
    rating: 4.9, reviews: 2500, badge: '🔥 Best Seller', gridClass: 'bento-large dark glass-dark', btnClass: 'btn-ghost-dark' 
  },
  { 
    id: 2, name: 'Watch 6', price: 16990, category: 'wearable', 
    img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&q=80', 
    desc: '1.5" Super AMOLED, Exynos W930, ECG & BIA sensors, 5ATM water resistance.', 
    rating: 4.8, reviews: 1200, badge: '🔥 Top Rated', gridClass: 'bento-tall glass', btnClass: 'btn-ghost' 
  },
  { 
    id: 3, name: 'Buds Pro', price: 9990, category: 'audio', 
    img: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80', /* TOTOONG EARBUDS IMAGE */
    desc: 'Intelligent ANC, 360 Audio, up to 30 hours battery with case, IPX7.', 
    rating: 4.5, reviews: 850, badge: '', gridClass: 'bento-small bg-accent', btnClass: 'btn-ghost-dark' 
  },
  { 
    id: 4, name: 'Tab S9', price: 45000, category: 'computing', 
    img: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80', /* TOTOONG TABLET IMAGE */
    desc: '11" Dynamic AMOLED 2X, Snapdragon 8 Gen 2, S Pen included, IP68.', 
    rating: 4.7, reviews: 600, badge: '', gridClass: 'bento-small glass', btnClass: 'btn-ghost' 
  },
  { 
    id: 5, name: 'Galaxy Book 4', price: 89990, category: 'computing', 
    img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80', /* TOTOONG LAPTOP IMAGE */
    desc: '15.6" AMOLED, Intel Core Ultra 7, 16GB RAM, 1TB SSD, ultra-slim design.', 
    rating: 4.9, reviews: 500, badge: '🔥 Best Seller', gridClass: 'bento-wide dark glass-dark', btnClass: 'btn-ghost-dark' 
  },
  { 
    id: 6, name: 'OLED TV 65"', price: 120000, category: 'computing', 
    img: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&q=80', 
    desc: '4K OLED, 120Hz, Dolby Atmos, Infinity Screen design.', 
    rating: 5.0, reviews: 320, badge: '', gridClass: 'bento-wide glass', btnClass: 'btn-ghost-dark' 
  }
];

const sampleReviews = [
  { user: "Mark D.", text: "Sobrang ganda ng quality! Worth every peso.", stars: 5 },
  { user: "Sarah L.", text: "Fast shipping, securely packed. Highly recommended.", stars: 5 },
  { user: "Juan P.", text: "Okay naman, pero medyo may kamahalan.", stars: 4 }
];

let wishlist = [];

// SVG ICONS
const heartEmpty = `<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
const heartFilled = `<svg viewBox="0 0 24 24" width="18" height="18" stroke="#ef4444" stroke-width="2" fill="#ef4444"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;

function renderProducts() {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = products.map(p => `
    <div class="card ${p.gridClass}" data-category="${p.category}" onclick="openProductDetail(${p.id})">
      ${p.badge ? `<div class="best-seller-badge">${p.badge}</div>` : ''}
      
      <!-- WISHLIST ICON BUTTON -->
      <button class="wishlist-icon-btn ${wishlist.includes(p.id) ? 'active' : ''}" onclick="event.stopPropagation(); toggleWishlist(${p.id})">
        ${wishlist.includes(p.id) ? heartFilled : heartEmpty}
      </button>

      <img src="${p.img}" class="product-img" alt="${p.name}">
      ${p.gridClass.includes('dark') || p.category === 'computing' && p.id === 6 ? '<div class="img-overlay"></div>' : ''}
      
      <div class="card-content ${p.gridClass.includes('small') ? 'small-content' : ''}">
        <div>
          <div class="card-tag" style="${p.gridClass.includes('bg-accent') ? 'color:#fff;opacity:0.9;' : ''}">${p.category}</div>
          <h3 class="product-title" style="${p.id === 6 ? 'color:#fff;' : ''}">${p.name}</h3>
          <div class="rating-container" style="${p.gridClass.includes('dark') || p.id === 6 ? 'color:#95d5b2;' : ''}">
            <span class="stars">${'★'.repeat(Math.floor(p.rating))}${p.rating % 1 > 0 ? '★' : '☆'}</span>
            <span class="rating-count">${p.rating} (${p.reviews})</span>
          </div>
        </div>
        <div class="bottom-row">
          <div class="price" style="${p.id === 6 ? 'color:#fff;' : ''}">₱${p.price.toLocaleString()}</div>
          <button class="${p.btnClass}" onclick="event.stopPropagation(); addToCart(event, '${p.name}', ${p.price})">+ Add</button>
        </div>
      </div>
    </div>
  `).join('');
}

// 3. Product Detail & Rating Logic
let currentProduct = null;
let currentRating = 0;

function openProductDetail(id) {
  currentProduct = products.find(p => p.id === id);
  if (!currentProduct) return;

  document.getElementById('pd-category').innerText = currentProduct.category;
  document.getElementById('pd-name').innerText = currentProduct.name;
  document.getElementById('pd-desc').innerText = currentProduct.desc;
  document.getElementById('pd-price').innerText = `₱${currentProduct.price.toLocaleString()}`;
  document.getElementById('pd-rating-count').innerText = `(${currentProduct.reviews} Reviews)`;
  document.getElementById('pd-stars').innerText = '★'.repeat(Math.floor(currentProduct.rating));
  
  document.getElementById('pd-img').src = currentProduct.img;

  // Update Wishlist Button sa Modal
  const wishBtn = document.getElementById('pd-wishlist-btn');
  wishBtn.className = `btn-ghost ${wishlist.includes(currentProduct.id) ? 'active' : ''}`;
  wishBtn.innerHTML = wishlist.includes(currentProduct.id) ? heartFilled : heartEmpty;

  const reviewsList = document.getElementById('pd-reviews-list');
  reviewsList.innerHTML = sampleReviews.map(r => `
    <div class="pd-review-item">
      <div class="pd-review-header"><span>${r.user}</span><span>${'★'.repeat(r.stars)}</span></div>
      <div class="pd-review-text">${r.text}</div>
    </div>
  `).join('');

  currentRating = 0;
  document.querySelectorAll('#ratingInput span').forEach(s => s.classList.remove('active'));
  document.getElementById('reviewName').value = '';
  document.getElementById('reviewText').value = '';

  openModal('productDetailModal');
}

function setRating(rating) {
  currentRating = rating;
  const stars = document.querySelectorAll('#ratingInput span');
  stars.forEach((star, index) => {
    if (index < rating) star.classList.add('active');
    else star.classList.remove('active');
  });
}

function submitReview() {
  const name = document.getElementById('reviewName').value.trim();
  const text = document.getElementById('reviewText').value.trim();
  
  if (!name || !text || currentRating === 0) {
    showSnackbar('Please fill all fields and select a star rating.');
    return;
  }
  
  const reviewsList = document.getElementById('pd-reviews-list');
  const newReview = document.createElement('div');
  newReview.className = 'pd-review-item';
  newReview.innerHTML = `
    <div class="pd-review-header"><span>${name}</span><span>${'★'.repeat(currentRating)}</span></div>
    <div class="pd-review-text">${text}</div>
  `;
  reviewsList.prepend(newReview);
  
  document.getElementById('reviewName').value = '';
  document.getElementById('reviewText').value = '';
  setRating(0);
  showSnackbar('Salamat! Review submitted.');
}

function addFromDetail() {
  if (currentProduct) {
    addToCart({ stopPropagation: () => {} }, currentProduct.name, currentProduct.price);
    closeAllModals();
  }
}

function toggleWishlistDetail() {
  if (currentProduct) {
    toggleWishlist(currentProduct.id);
  }
}

function toggleWishlist(id) {
  if (wishlist.includes(id)) {
    wishlist = wishlist.filter(w => w !== id);
    showSnackbar('Removed from wishlist');
  } else {
    wishlist.push(id);
    showSnackbar('Added to wishlist');
  }
  renderProducts(); 
  // If modal is open, update its button too
  if (document.getElementById('productDetailModal').classList.contains('show')) {
    const wishBtn = document.getElementById('pd-wishlist-btn');
    wishBtn.className = `btn-ghost ${wishlist.includes(id) ? 'active' : ''}`;
    wishBtn.innerHTML = wishlist.includes(id) ? heartFilled : heartEmpty;
  }
}

// 4. Modals & Sidebar
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('show');
  document.getElementById('globalOverlay').classList.toggle('show');
}
function openModal(modalId) {
  document.getElementById('globalOverlay').classList.add('show');
  document.getElementById(modalId).classList.add('show');
}
function closeAllModals() {
  document.getElementById('globalOverlay').classList.remove('show');
  document.querySelectorAll('.modal').forEach(m => m.classList.remove('show'));
  document.getElementById('sidebar').classList.remove('show');
}

// 5. Cart & Coupon
let cartItems = [];
let discount = 0;
const cartCountEl = document.getElementById('cartCount');
const cartEmptyMsg = document.getElementById('cartEmptyMsg');
const cartModalItems = document.getElementById('cartModalItems');
const cartTotalContainer = document.getElementById('cartTotalContainer');
const cartSubtotalEl = document.getElementById('cartSubtotal');
const cartDiscountEl = document.getElementById('cartDiscount');
const cartTotalPrice = document.getElementById('cartTotalPrice');

function addToCart(event, name, price) {
  if(event && event.stopPropagation) event.stopPropagation(); 
  cartItems.push({ name, price });
  updateCartUI();
  
  const toastEl = document.getElementById('toast');
  toastEl.innerText = `Added: ${name}`;
  toastEl.classList.add('show');
  setTimeout(() => toastEl.classList.remove('show'), 2000);
}

function updateCartUI() {
  cartCountEl.innerText = cartItems.length;

  if (cartItems.length === 0) {
    cartEmptyMsg.style.display = 'block';
    cartModalItems.innerHTML = '<p id="cartEmptyMsg" style="text-align: center; color: var(--text-muted); padding: 2rem 0;">Your cart is currently empty.</p>';
    cartTotalContainer.style.display = 'none';
    document.getElementById('couponSection').style.display = 'none';
    discount = 0; 
    return;
  }

  cartEmptyMsg.style.display = 'none';
  document.getElementById('couponSection').style.display = 'block';
  cartModalItems.innerHTML = cartItems.map((item) => `
    <div class="modal-item">
      <span>${item.name}</span>
      <b>₱${item.price.toLocaleString()}</b>
    </div>
  `).join('');

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const discountAmt = subtotal * discount;
  const total = subtotal - discountAmt;

  cartSubtotalEl.innerText = `₱${subtotal.toLocaleString()}`;
  cartTotalPrice.innerText = `₱${total.toLocaleString()}`;
  
  if (discount > 0) {
    document.getElementById('discountRow').style.display = 'flex';
    cartDiscountEl.innerText = `-₱${discountAmt.toLocaleString()}`;
  } else {
    document.getElementById('discountRow').style.display = 'none';
  }

  cartTotalContainer.style.display = 'flex';
}

function applyCoupon() {
  const code = document.getElementById('couponInput').value.toUpperCase();
  const msg = document.getElementById('couponMsg');
  if (code === 'VAULT10') {
    discount = 0.10; 
    msg.innerText = 'Coupon Applied: 10% Off!';
    msg.style.color = 'var(--accent)';
    msg.style.display = 'block';
    updateCartUI();
  } else {
    discount = 0;
    msg.innerText = 'Invalid Coupon Code.';
    msg.style.color = '#ef4444';
    msg.style.display = 'block';
    updateCartUI();
  }
}

// 6. Checkout
function openCheckout() {
  if (cartItems.length === 0) {
    showSnackbar('Your cart is empty!');
    return;
  }
  closeAllModals();
  openModal('checkoutModal');
}

function processOrder(event) {
  event.preventDefault(); 
  const btn = document.getElementById('confirmOrderBtn');
  
  btn.innerText = 'Processing...';
  btn.style.opacity = '0.7';
  btn.disabled = true;

  setTimeout(() => {
    closeAllModals();
    btn.innerText = 'Confirm Order';
    btn.style.opacity = '1';
    btn.disabled = false;
    document.getElementById('checkoutForm').reset();

    cartItems = [];
    discount = 0;
    document.getElementById('couponInput').value = '';
    document.getElementById('couponMsg').style.display = 'none';
    updateCartUI();
    
    showSnackbar('🎉 Order Confirmed! Salamat sa pagbili sa Vault.');
  }, 1500);
}

// 7. Search & Tags
function searchProducts() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  document.querySelectorAll('.card').forEach(card => {
    const title = card.querySelector('.product-title').innerText.toLowerCase();
    card.style.display = title.includes(input) ? '' : 'none';
  });
}

function filterTag(category, btn) {
  document.querySelectorAll('.tag').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.card').forEach(card => {
    const cardCategory = card.getAttribute('data-category');
    card.style.display = (category === 'all' || cardCategory === category) ? '' : 'none';
  });
  document.getElementById('searchInput').value = '';
}

// 8. UI Extras
function showSnackbar(message) {
  const snackbar = document.getElementById('snackbar');
  document.getElementById('snackbarMsg').innerText = message;
  snackbar.classList.add('show');
  clearTimeout(window.snackbarTimeout);
  window.snackbarTimeout = setTimeout(() => snackbar.classList.remove('show'), 3500);
}
function closeSnackbar() { document.getElementById('snackbar').classList.remove('show'); }

function toggleChat() { document.getElementById('chatWindow').classList.toggle('show'); }
function handleChatEnter(e) { if (e.key === 'Enter') sendChatMessage(); }

function sendChatMessage() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;

  const chatBody = document.getElementById('chatBody');
  chatBody.innerHTML += `<div class="chat-msg user">${text}</div>`;
  input.value = '';
  chatBody.scrollTop = chatBody.scrollHeight;

  setTimeout(() => {
    const lower = text.toLowerCase();
    let reply = "I'm not sure about that. You can check our products above!";
    
    if (lower.includes('hi') || lower.includes('hello')) reply = "Hello! Welcome to Vault. Looking for a new gadget?";
    else if (lower.includes('shipping')) reply = "We offer free shipping nationwide for orders over ₱50,000.";
    else if (lower.includes('s24') || lower.includes('phone')) reply = "The Galaxy S24 Ultra is ₱74,990. It's our best seller!";
    else if (lower.includes('cod') || lower.includes('payment')) reply = "Yes, we accept GCash, Maya, and Cash on Delivery.";
    else if (lower.includes('coupon') || lower.includes('promo')) reply = "Try using the code VAULT10 at the cart for a 10% discount!";
    
    chatBody.innerHTML += `<div class="chat-msg bot">${reply}</div>`;
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 1000);
}

renderProducts();
