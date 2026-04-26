// ================================================================
// Configuration de l'URL de base de l'API backend
// Changer cette valeur selon l'environnement de déploiement
// ================================================================
const API_BASE = (window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1' ||
  window.location.protocol === 'file:')
  ? 'http://localhost:5000'
  : 'https://nexvia-backend.onrender.com';
// Wake up Render backend on page load to reduce cold start delay
(function pingBackend() {
  fetch(API_BASE)
    .then(() => console.log('Backend awake'))
    .catch(() => console.log('Backend waking up...'));
})();
// ================================================================
// Menu mobile toggle
// Ouvre/ferme la navbar mobile et change l'icône hamburger ↔ X
// ================================================================
const toggleButton = document.querySelector('.toggle-btn i');
const navBar = document.querySelector('.nav-bar');

if (toggleButton && navBar) {
  toggleButton.addEventListener('click', () => {
    toggleButton.classList.toggle('fa-bars');
    toggleButton.classList.toggle('fa-x');
    navBar.classList.toggle('active');
  });
}


// ================================================================
// Slider des offres
// Fait défiler les cartes d'offres avec navigation, swipe tactile et points indicateurs
// ================================================================
(function () {
  const track = document.querySelector('.offers-container');
  const nextBtn = document.querySelector('.swap i:last-child');
  const prevBtn = document.querySelector('.swap i:first-child');
  const dotsWrap = document.getElementById('offersDots');

  if (!track || !prevBtn || !nextBtn) return;

  const cards = track.querySelectorAll('.offer');
  const total = cards.length;
  let current = 0;

  function visibleCount() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 992) return 2;
    return 3;
  }

  function totalSlides() {
    return total - visibleCount() + 1;
  }

  function cardWidth() {
    const style = window.getComputedStyle(track);
    const gap = parseFloat(style.gap) || 0;
    return cards[0].getBoundingClientRect().width + gap;
  }

  function buildDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = '';
    for (let i = 0; i < totalSlides(); i++) {
      const btn = document.createElement('button');
      if (i === current) btn.classList.add('active');
      btn.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(btn);
    }
  }

  function updateDots() {
    if (!dotsWrap) return;
    dotsWrap.querySelectorAll('button').forEach((b, i) =>
      b.classList.toggle('active', i === current)
    );
  }

  function goTo(index) {
    const n = totalSlides();
    if (index >= n) index = 0;
    if (index < 0) index = n - 1;
    current = index;
    track.style.transform = `translateX(-${current * cardWidth()}px)`;
    updateDots();
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  let touchStartX = 0;
  track.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(current + (diff > 0 ? 1 : -1));
  });

  window.addEventListener('resize', () => {
    buildDots();
    goTo(0);
  });

  buildDots();
})();


// ================================================================
// Formulaire de contact
// Valide les champs du formulaire de contact et affiche le message de succès
// ================================================================
const form = document.getElementById('contactForm');

if (form) {
  const formView = document.getElementById('formView');
  const successMsg = document.getElementById('successMessage');

  function validate(id, errorId, fn) {
    const el = document.getElementById(id);
    const err = document.getElementById(errorId);
    if (!fn(el.value.trim())) {
      el.classList.add('invalid');
      err.classList.add('visible');
      return false;
    }
    el.classList.remove('invalid');
    err.classList.remove('visible');
    return true;
  }

  ['nom', 'email', 'message'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', () => {
      document.getElementById(id).classList.remove('invalid');
      document.getElementById(id + 'Error')?.classList.remove('visible');
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const v1 = validate('nom', 'nomError', v => v.length >= 2);
    const v2 = validate('email', 'emailError', v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
    const v3 = validate('message', 'messageError', v => v.length >= 10);

    if (v1 && v2 && v3) {
      formView.style.opacity = '0';
      formView.style.transform = 'translateY(-10px)';
      setTimeout(() => {
        formView.style.display = 'none';
        successMsg.classList.add('visible');
      }, 300);
    }
  });
}


// ================================================================
// FAQ accordion
// Gère l'ouverture/fermeture des questions de la FAQ (un seul ouvert à la fois)
// ================================================================
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-question')?.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});


// ================================================================
// Password strength checker
// Vérifie la force du mot de passe et colore les barres indicatrices
// ================================================================
function checkStrength(v) {
  const bars = [
    document.getElementById('b1'),
    document.getElementById('b2'),
    document.getElementById('b3'),
    document.getElementById('b4')
  ];
  if (!bars[0]) return;
  bars.forEach(b => { if (b) b.className = 's-bar'; });
  let s = 0;
  if (v.length >= 8) s++;
  if (/[A-Z]/.test(v)) s++;
  if (/[0-9]/.test(v)) s++;
  if (/[^A-Za-z0-9]/.test(v)) s++;
  for (let i = 0; i < s; i++) {
    if (bars[i]) bars[i].classList.add('s' + s);
  }
}


// Gère le switch entre Sign In et Sign Up avec animation et paramètre URL
document.addEventListener("DOMContentLoaded", () => {

  const signin = document.getElementById("signin-section");
  const signup = document.getElementById("signup-section");

  if (!signin || !signup) return;

  let isAnimating = false;

  function showSignIn() {
    if (signin.style.display === "block" || isAnimating) return;
    isAnimating = true;
    signup.classList.remove("active");
    setTimeout(() => {
      signup.style.display = "none";
      signin.style.display = "block";
      void signin.offsetWidth;
      signin.classList.add("active");
      setTimeout(() => isAnimating = false, 400);
    }, 400);
  }

  function showSignUp() {
    if (signup.style.display === "block" || isAnimating) return;
    isAnimating = true;
    signin.classList.remove("active");
    setTimeout(() => {
      signin.style.display = "none";
      signup.style.display = "block";
      void signup.offsetWidth;
      signup.classList.add("active");
      setTimeout(() => isAnimating = false, 400);
    }, 400);
  }

  document.getElementById("nav-signin")?.addEventListener("click", (e) => {
    e.preventDefault();
    showSignIn();
  });

  document.getElementById("nav-signup")?.addEventListener("click", (e) => {
    e.preventDefault();
    showSignUp();
  });

  document.getElementById("go-signup")?.addEventListener("click", (e) => {
    e.preventDefault();
    showSignUp();
  });

  document.getElementById("go-signin")?.addEventListener("click", (e) => {
    e.preventDefault();
    showSignIn();
  });

  const params = new URLSearchParams(window.location.search);
  const mode = params.get("mode");

  if (mode === "signup") {
    signin.style.display = "none";
    signup.style.display = "block";
    void signup.offsetWidth;
    signup.classList.add("active");
  } else {
    signup.style.display = "none";
    signin.style.display = "block";
    void signin.offsetWidth;
    signin.classList.add("active");
  }
});


// --- LOGIQUE DU PANIER ---
// Gère le panier avec localStorage (ajout, suppression, sauvegarde)

const CART_KEY = 'nexvia_cart';


// Récupère le panier depuis localStorage de manière sécurisée
function getCart() {
  const cartStr = localStorage.getItem(CART_KEY);
  if (!cartStr) return [];
  try {
    const parsed = JSON.parse(cartStr);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error("Erreur parsing panier", e);
    return [];
  }
}


// Sauvegarde le panier et met à jour le badge
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}


// Ajoute un produit au panier + notification
window.addToCart = function (productToAdd) {
  const cart = getCart();

  productToAdd.quantity = 1;
  cart.push(productToAdd);

  saveCart(cart);

  showCartNotification(productToAdd.name);
};


// Supprime un produit du panier
window.removeFromCart = function (cartItemId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== cartItemId);
  saveCart(cart);

  if (typeof window.renderCartPage === 'function') {
    window.renderCartPage();
  }
};


// Vide complètement le panier
window.clearCart = function () {
  localStorage.removeItem(CART_KEY);
  updateCartBadge();

  if (typeof window.renderCartPage === 'function') {
    window.renderCartPage();
  }
};


// Met à jour le badge du panier dans le header
function updateCartBadge() {
  const cart = getCart();
  const badges = document.querySelectorAll('.cart-badge');

  let totalItems = 0;
  cart.forEach(item => totalItems += item.quantity || 1);

  badges.forEach(badge => {
    if (totalItems > 0) {
      badge.style.display = 'flex';
      badge.textContent = totalItems > 99 ? '99+' : totalItems;

      badge.classList.remove('pulse-anim');
      void badge.offsetWidth;
      badge.classList.add('pulse-anim');
    } else {
      badge.style.display = 'none';
    }
  });
}


// Affiche une notification visuelle lors de l'ajout au panier
function showCartNotification(productName) {
  const notif = document.createElement('div');
  notif.className = 'cart-notification';
  notif.innerHTML = `
        <i class="fa-solid fa-check-circle" style="color:#22c55e;"></i>
        <span><span>${productName}</span> ajouté au panier !</span>
    `;
  document.body.appendChild(notif);

  setTimeout(() => {
    notif.classList.add('hide');
    setTimeout(() => document.body.removeChild(notif), 300);
  }, 3000);
}


// Synchronise le panier au chargement et entre onglets
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();

  window.addEventListener('storage', (e) => {
    if (e.key === CART_KEY) {
      updateCartBadge();
      if (typeof window.renderCartPage === 'function') {
        window.renderCartPage();
      }
    }
  });
});


// --- PAGE PANIER ---
// Affiche les produits, le résumé et l'état vide
window.renderCartPage = function () {
  const itemsContainer = document.getElementById('cart-items');
  const summaryPanel = document.getElementById('cart-summary');
  const emptyState = document.getElementById('empty-state');

  if (!itemsContainer) return;

  const subtotalEl = document.getElementById('summary-subtotal');
  const totalEl = document.getElementById('summary-total');

  const cart = getCart();

  itemsContainer.innerHTML = '';

  if (cart.length === 0) {
    summaryPanel.style.display = 'none';
    emptyState.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';
  summaryPanel.style.display = 'block';

  let total = 0;

  cart.forEach((item) => {
    total += item.price;

    let optionsText = '';
    if (item.options) {
      optionsText = Object.entries(item.options).map(([k, v]) => `${v}`).join(' — ');
    }

    const imgSrc = item.image.startsWith('../') ? item.image : `../${item.image}`;
    const paymentImgSrc = item.payment === 'baridimob' ? '../images/baridi-mob.png' : '../images/paypal.png';
    const paymentName = item.payment === 'baridimob' ? 'Baridimob' : 'PayPal';

    const html = `
        <div class="cart-item">
            <div class="item-img">
                <img src="${imgSrc}" alt="${item.name}">
            </div>
            <div class="item-details">
                <div class="item-name">${item.name}</div>
                <div class="item-options">${optionsText}</div>
                <div class="item-payment">
                    <img src="${paymentImgSrc}" alt="${paymentName}"> ${paymentName}
                </div>
            </div>
            <div class="item-price">${item.price} DA</div>
            <button class="remove-btn" onclick="removeFromCart('${item.id}')" title="Retirer">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </div>
    `;
    itemsContainer.insertAdjacentHTML('beforeend', html);
  });

  subtotalEl.innerText = `${total} DA`;
  totalEl.innerText = `${total} DA`;
};


// Gère le processus de paiement — modal de confirmation professionnel
window.processCheckout = function () {
  const imgPath = window.location.pathname.includes('/pages/') || window.location.pathname.includes('\\pages\\') ? '../images/' : 'images/';
  const overlay = document.createElement('div');
  overlay.className = 'checkout-modal-overlay';
  overlay.innerHTML = `
    <div class="checkout-modal-card" style="width: 400px; padding: 30px; max-width: 90%;">
      <h2 style="color: #fff; margin-bottom: 20px; font-size: 24px;">Paiement</h2>
      <div style="display: flex; gap: 10px; margin-bottom: 20px;">
        <button id="pay-card-btn" style="flex: 1; padding: 10px; border-radius: 8px; border: 1px solid var(--main-color1); background: rgba(34, 167, 240, 0.1); color: #fff; cursor: pointer; transition: 0.3s; display: flex; align-items: center; justify-content: center; gap: 8px;">
          <img src="${imgPath}baridi-mob.png" alt="" style="width: 20px; height: 20px;"> Carte Dahabia
        </button>
        <button id="pay-paypal-btn" style="flex: 1; padding: 10px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); background: transparent; color: #fff; cursor: pointer; transition: 0.3s; display: flex; align-items: center; justify-content: center; gap: 8px;">
          <img src="${imgPath}paypal.png" alt="" style="width: 20px; height: 20px;"> PayPal
        </button>
      </div>

      <div id="card-form" style="display: block; text-align: left;">
        <div style="margin-bottom: 15px;">
          <label style="display: block; color: var(--p-color); margin-bottom: 5px; font-size: 14px;">Numéro de carte</label>
          <input type="text" id="card-number" placeholder="0000 0000 0000 0000" style="width: 100%; padding: 12px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: #fff;" required>
        </div>
        <div style="display: flex; gap: 15px; margin-bottom: 15px;">
            <div style="flex: 1;">
              <label style="display: block; color: var(--p-color); margin-bottom: 5px; font-size: 14px;">Expiration</label>
              <input type="text" id="card-exp" placeholder="MM/YY" style="width: 100%; padding: 12px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: #fff;" required>
            </div>
            <div style="flex: 1;">
              <label style="display: block; color: var(--p-color); margin-bottom: 5px; font-size: 14px;">CVC</label>
              <input type="text" id="card-cvc" placeholder="123" style="width: 100%; padding: 12px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: #fff;" required>
            </div>
        </div>
      </div>

      <div id="paypal-form" style="display: none; text-align: left;">
        <div style="margin-bottom: 15px;">
          <label style="display: block; color: var(--p-color); margin-bottom: 5px; font-size: 14px;">Email PayPal</label>
          <input type="email" id="paypal-email" placeholder="votre@email.com" style="width: 100%; padding: 12px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: #fff;" required>
        </div>
        <div style="margin-bottom: 15px;">
          <label style="display: block; color: var(--p-color); margin-bottom: 5px; font-size: 14px;">Numéro de téléphone</label>
          <input type="text" id="paypal-phone" placeholder="+213 555 55 55 55" style="width: 100%; padding: 12px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: #fff;" required>
        </div>
      </div>

      <div id="payment-warning" style="color: #ff4d4f; font-size: 14px; margin-bottom: 15px; display: none; text-align: center; font-weight: 500;"></div>

      <button id="confirm-pay-btn" style="width: 100%; padding: 14px; background: var(--gradient); color: #fff; border: none; border-radius: 8px; font-size: 16px; font-weight: bold; cursor: pointer; transition: 0.3s; margin-top: 10px;">
        Confirmer le paiement
      </button>
      <button id="cancel-pay-btn" style="width: 100%; padding: 10px; background: transparent; color: var(--p-color); border: none; font-size: 14px; cursor: pointer; margin-top: 10px;">
        Annuler
      </button>
    </div>
  `;
  document.body.appendChild(overlay);

  const cardBtn = document.getElementById('pay-card-btn');
  const paypalBtn = document.getElementById('pay-paypal-btn');
  const cardForm = document.getElementById('card-form');
  const paypalForm = document.getElementById('paypal-form');
  let selectedMethod = 'card';

  cardBtn.onclick = () => {
    selectedMethod = 'card';
    cardBtn.style.border = '1px solid var(--main-color1)';
    cardBtn.style.background = 'rgba(34, 167, 240, 0.1)';
    paypalBtn.style.border = '1px solid rgba(255,255,255,0.1)';
    paypalBtn.style.background = 'transparent';
    cardForm.style.display = 'block';
    paypalForm.style.display = 'none';
  };

  paypalBtn.onclick = () => {
    selectedMethod = 'paypal';
    paypalBtn.style.border = '1px solid var(--main-color1)';
    paypalBtn.style.background = 'rgba(34, 167, 240, 0.1)';
    cardBtn.style.border = '1px solid rgba(255,255,255,0.1)';
    cardBtn.style.background = 'transparent';
    paypalForm.style.display = 'block';
    cardForm.style.display = 'none';
  };

  const expInput = document.getElementById('card-exp');
  if (expInput) {
    expInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 4) value = value.substring(0, 4);
      if (value.length > 2) {
        value = value.substring(0, 2) + '/' + value.substring(2);
      }
      e.target.value = value;
    });
  }

  document.getElementById('cancel-pay-btn').onclick = () => {
    document.body.removeChild(overlay);
  };

  document.getElementById('confirm-pay-btn').onclick = () => {
    const warning = document.getElementById('payment-warning');

    if (selectedMethod === 'card') {
      const num = document.getElementById('card-number').value.trim();
      const exp = document.getElementById('card-exp').value.trim();
      const cvc = document.getElementById('card-cvc').value.trim();
      if (!num || !exp || !cvc) {
        warning.textContent = "Veuillez remplir toutes les informations de la carte.";
        warning.style.display = 'block';
        return;
      }

      const expParts = exp.split('/');
      if (expParts.length !== 2) {
        warning.textContent = "Format d'expiration invalide (MM/YY).";
        warning.style.display = 'block';
        return;
      }
      const month = parseInt(expParts[0], 10);
      const year = parseInt(expParts[1], 10);
      if (isNaN(month) || month < 1 || month > 12) {
        warning.textContent = "Mois d'expiration invalide (01-12).";
        warning.style.display = 'block';
        return;
      }
      if (isNaN(year) || year < 26) {
        warning.textContent = "Année d'expiration invalide (26+).";
        warning.style.display = 'block';
        return;
      }
    } else {
      const email = document.getElementById('paypal-email').value.trim();
      const phone = document.getElementById('paypal-phone').value.trim();
      if (!email || !email.includes('@') || !phone) {
        warning.textContent = "Veuillez entrer un email valide et un numéro de téléphone.";
        warning.style.display = 'block';
        return;
      }
    }
    warning.style.display = 'none';

    // Proceed to success
    const btn = document.getElementById('confirm-pay-btn');
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Traitement...';

    setTimeout(() => {
      const serial = 'ORD-2026-' + Math.random().toString(36).substring(2, 8).toUpperCase();
      overlay.innerHTML = `
        <div class="checkout-modal-card">
          <div class="checkout-modal-icon"><i class="fa-solid fa-check"></i></div>
          <div class="checkout-modal-title">Commande confirmée !</div>
          <div class="checkout-modal-order"><i class="fa-solid fa-hashtag"></i> ${serial}</div>
          <p class="checkout-modal-msg">Une confirmation a été envoyée à votre email. Votre abonnement sera activé dans un délai maximum de <strong>24 heures</strong>.</p>
          <button class="checkout-modal-btn" id="modal-close-btn">
            <i class="fa-solid fa-house"></i> Retour à l'accueil
          </button>
        </div>
      `;
      document.getElementById('modal-close-btn').addEventListener('click', () => {
        window.clearCart();
        window.location.href = '../index.html';
      });
    }, 2000);
  };
};


// Charge automatiquement le panier sur la page panier.html
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('cart-items')) {
    window.renderCartPage();
  }
});

// ================================================================
// initAuthForms()
// Gère la soumission des formulaires de connexion et d'inscription via l'API backend
// ================================================================
function initAuthForms() {
  const signinForm = document.querySelector('#signin-section form');
  const signupForm = document.querySelector('#signup-section form');

  // Gestion du login
  if (signinForm) {
    signinForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('signin-email').value.trim();
      const password = document.getElementById('signin-password').value;

      try {
        const response = await fetch(API_BASE + '/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const data = await response.json();

        if (!response.ok) {
          showAuthError(signinForm, data.message || "Erreur de connexion.");
        } else {
          localStorage.setItem('nexvia_token', data.token);
          // Save user snapshot to localStorage for instant header rendering
          saveUserSession(data.user?.name || email.split('@')[0], email, data.user?.profileImage || 'avatar1');
          showAuthSuccess(signinForm, 'Connexion réussie !');
          setTimeout(() => window.location.href = '../index.html', 1500);
        }
      } catch (err) {
        showAuthError(signinForm, "Erreur serveur.");
      }
    });
  }

  // Gestion de l'inscription
  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('signup-name').value.trim();
      const email = document.getElementById('signup-email').value.trim();
      const password = document.getElementById('signup-password').value;
      const confirm = document.getElementById('signup-confirm').value;
      const agree = document.getElementById('agree').checked;

      // Validation simple des champs
      if (!name || !email || !password) {
        return showAuthError(signupForm, "Veuillez remplir tous les champs.");
      }
      if (password !== confirm) {
        return showAuthError(signupForm, "Les mots de passe ne correspondent pas.");
      }
      if (!agree) {
        return showAuthError(signupForm, "Veuillez accepter les conditions.");
      }

      try {
        const response = await fetch(API_BASE + '/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password })
        });
        const data = await response.json();

        if (!response.ok) {
          showAuthError(signupForm, data.message || "Erreur lors de l'inscription.");
        } else {
          localStorage.setItem('nexvia_token', data.token);
          // Save user snapshot to localStorage for instant header rendering
          saveUserSession(name, email, 'avatar1');
          showAuthSuccess(signupForm, 'Compte créé avec succès !');
          setTimeout(() => window.location.href = '../index.html', 2000);
        }
      } catch (err) {
        showAuthError(signupForm, "Erreur serveur.");
      }
    });
  }
}

// ================================================================
// showAuthError / showAuthSuccess
// Affiche un message d'erreur ou de succès stylisé sous le formulaire
// ================================================================
function showAuthError(form, message) {
  let msgEl = form.querySelector('.auth-msg');

  if (!msgEl) {
    msgEl = document.createElement('div');
    msgEl.className = 'auth-msg';
    form.insertBefore(msgEl, form.querySelector('button'));
  }

  msgEl.style.cssText = 'color:#ef4444; background:rgba(239, 68, 68, 0.1); padding:12px; border-radius:8px; margin-block:15px; text-align:center; font-size:14px; border: 1px solid rgba(239, 68, 68, 0.2);';
  msgEl.textContent = message;
}

function showAuthSuccess(form, message) {
  let msgEl = form.querySelector('.auth-msg');

  if (!msgEl) {
    msgEl = document.createElement('div');
    msgEl.className = 'auth-msg';
    form.insertBefore(msgEl, form.querySelector('button'));
  }

  msgEl.style.cssText = 'color:#22c55e; background:rgba(34, 197, 94, 0.1); padding:12px; border-radius:8px; margin-block:15px; text-align:center; font-size:14px; border: 1px solid rgba(34, 197, 94, 0.2);';
  msgEl.textContent = message;
}

document.addEventListener('DOMContentLoaded', () => {
  initAuthForms();
});


// ================================================================
// Testimonials cards
// Active le retournement des cartes témoignages au clic sur mobile
// ================================================================
document.addEventListener('DOMContentLoaded', () => {
  const tCards = document.querySelectorAll('.testimonials-container .card');
  tCards.forEach(card => {
    card.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        card.classList.toggle('active');
      }
    });
  });
});

/* =================================================================
   SESSION MANAGEMENT — localStorage-based (works without network)
   ================================================================= */

// ================================================================
// saveUserSession / getUser
// Enregistre et lit les données utilisateur dans le localStorage
// ================================================================
function saveUserSession(name, email, avatarKey) {
  const user = {
    name: name || 'Utilisateur',
    email: email || '',
    avatar: avatarKey || 'avatar1'  // key e.g. "avatar3" or a DiceBear URL or base64
  };
  localStorage.setItem('nexvia_user', JSON.stringify(user));
  updateHeader();
}


function getUser() {
  try { return JSON.parse(localStorage.getItem('nexvia_user') || 'null'); } catch (e) { return null; }
}

// ================================================================
// resolveAvatarSrc
// Construit le chemin correct vers l'image d'avatar (clé prédéfinie, URL ou base64)
// ================================================================
function resolveAvatarSrc(avatarValue, isInPages) {
  if (!avatarValue) {
    const pre = isInPages ? '../images/' : 'images/';
    return pre + 'avatar1.jpeg';
  }
  if (avatarValue.startsWith('data:') || avatarValue.startsWith('http')) return avatarValue;
  const pre = isInPages ? '../images/' : 'images/';
  return pre + avatarValue + '.jpeg';
}

/* ── Preset avatars (using existing image files) ── */
const PRESET_AVATARS = ['avatar1', 'avatar2', 'avatar3', 'avatar4', 'avatar5', 'avatar6'];
let _selectedAvatar = null;

// ================================================================
// updateHeader()
// Met à jour la navbar selon l'état de connexion: affiche avatar+dropdown ou boutons Sign In/Up
// ================================================================
function updateHeader() {
  const user = getUser();
  const navLinksContainer = document.querySelector('.nav-bar .links.nav-right-actions') ||
    document.querySelector('.nav-bar .links:nth-of-type(2)');
  if (!navLinksContainer) return;

  const signInBtn = navLinksContainer.querySelector('.sign-in');
  const signUpBtn = navLinksContainer.querySelector('.sign-up');
  let wrapper = document.getElementById('nav-profile-wrapper');

  const isInPages = window.location.pathname.includes('/pages/') || window.location.pathname.includes('\\pages\\');
  const profileHref = (isInPages ? '' : 'pages/') + 'profile.html';

  if (user) {
    if (signInBtn) signInBtn.style.display = 'none';
    if (signUpBtn) signUpBtn.style.display = 'none';

    const avatarSrc = resolveAvatarSrc(user.avatar, isInPages);

    if (!wrapper) {
      wrapper = document.createElement('div');
      wrapper.className = 'nav-profile-wrapper';
      wrapper.id = 'nav-profile-wrapper';
      navLinksContainer.insertBefore(wrapper, navLinksContainer.querySelector('.cart-icon-link'));
    }

    wrapper.innerHTML = `
      <img
        src="${avatarSrc}"
        class="nav-profile-avatar"
        id="nav-profile-avatar"
        alt="Profile"
        onerror="this.src='${isInPages ? '../' : ''}images/avatar1.jpeg'"
      >
      <div class="profile-dropdown" id="nav-profile-dropdown">
        <a href="${profileHref}" id="nav-edit-profile-link">
          <i class="fa-solid fa-pen-to-square"></i>
          <span>Modifier le profil</span>
        </a>
        <hr class="dd-divider">
        <button class="dd-logout" id="nav-logout-btn">
          <i class="fa-solid fa-right-from-bracket"></i>
          <span>Se déconnecter</span>
        </button>
      </div>
    `;
    wrapper.style.display = 'inline-flex';

    document.getElementById('nav-profile-avatar').addEventListener('click', (e) => {
      e.stopPropagation();
      document.getElementById('nav-profile-dropdown').classList.toggle('open');
    });
    document.getElementById('nav-edit-profile-link').addEventListener('click', (e) => {
      e.stopPropagation();
      window.location.href = profileHref;
    });
    document.getElementById('nav-logout-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      localStorage.removeItem('nexvia_token');
      localStorage.removeItem('nexvia_user');
      window.location.href = isInPages ? '../index.html' : 'index.html';
    });
    document.addEventListener('click', () => {
      const dd = document.getElementById('nav-profile-dropdown');
      if (dd) dd.classList.remove('open');
    }, { once: false });

  } else {
    if (signInBtn) signInBtn.style.display = '';
    if (signUpBtn) signUpBtn.style.display = '';
    if (wrapper) wrapper.style.display = 'none';
  }
}

/* ── Edit Profile Modal (injected once) ── */
function _ensureModal() {
  if (document.getElementById('edit-profile-modal')) return;
  const modal = document.createElement('div');
  modal.id = 'edit-profile-modal';
  modal.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:99999;justify-content:center;align-items:center;padding:20px;';
  document.body.appendChild(modal);
}

// ================================================================
// openEditProfile / closeEditProfile
// Ouvre/ferme la modal d'édition de profil avec le sélecteur d'avatar
// ================================================================
function openEditProfile() {
  const dd = document.getElementById('nav-profile-dropdown');
  if (dd) dd.classList.remove('open');

  _ensureModal();
  const user = getUser() || { name: '', email: '', avatar: 'avatar1' };
  _selectedAvatar = user.avatar;

  const isInPages = window.location.pathname.includes('/pages/');
  const imgBase = isInPages ? '../images/' : 'images/';

  const avatarGrid = PRESET_AVATARS.map(key => {
    const selected = (_selectedAvatar === key);
    return `<label style="cursor:pointer;position:relative;">
      <input type="radio" name="preset-avatar" value="${key}" ${selected ? 'checked' : ''}
        style="position:absolute;opacity:0;" onchange="_selectedAvatar=this.value;document.querySelectorAll('.preset-av-img').forEach(i=>i.style.border='3px solid transparent');this.parentElement.querySelector('img').style.border='3px solid #8a3ffc';">
      <img src="${imgBase}${key}.jpeg" class="preset-av-img"
        style="width:60px;height:60px;border-radius:50%;object-fit:cover;border:3px solid ${selected ? '#8a3ffc' : 'transparent'};transition:.2s;"
        onerror="this.src='${imgBase}avatar1.jpeg'">
    </label>`;
  }).join('');

  document.getElementById('edit-profile-modal').innerHTML = `
    <div style="background:#1e293b;border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:36px;max-width:460px;width:100%;box-shadow:0 30px 70px rgba(0,0,0,0.6);">
      <h2 style="margin:0 0 22px;font-size:20px;color:#fff;">Modifier le profil</h2>

      <p style="font-size:13px;color:#94a3b8;margin-bottom:10px;">Choisir un avatar prédéfini</p>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:20px;">
        ${avatarGrid}
      </div>

      <label style="font-size:13px;color:#94a3b8;display:block;margin-bottom:5px;">Télécharger une photo personnalisée</label>
      <input type="file" accept="image/*" id="avatar-upload-input" style="width:100%;margin-bottom:18px;color:#e2e8f0;">

      <label style="font-size:13px;color:#94a3b8;display:block;margin-bottom:5px;">Nom</label>
      <input id="edit-name" value="${user.name}" style="width:100%;padding:12px;border:1px solid rgba(255,255,255,0.1);border-radius:8px;background:rgba(255,255,255,0.05);color:#fff;font-size:15px;margin-bottom:14px;box-sizing:border-box;">

      <label style="font-size:13px;color:#94a3b8;display:block;margin-bottom:5px;">Email</label>
      <input id="edit-email" type="email" value="${user.email}" style="width:100%;padding:12px;border:1px solid rgba(255,255,255,0.1);border-radius:8px;background:rgba(255,255,255,0.05);color:#fff;font-size:15px;margin-bottom:22px;box-sizing:border-box;">

      <div style="display:flex;gap:10px;justify-content:flex-end;">
        <button onclick="closeEditProfile()" style="padding:11px 22px;border-radius:8px;border:1px solid rgba(255,255,255,0.15);background:transparent;color:#e2e8f0;cursor:pointer;font-family:inherit;font-size:14px;">Annuler</button>
        <button onclick="saveProfile()" style="padding:11px 22px;border-radius:8px;border:none;background:linear-gradient(135deg,#8a3ffc,#22a7f0);color:#fff;cursor:pointer;font-weight:700;font-family:inherit;font-size:14px;">Enregistrer</button>
      </div>
    </div>
  `;
  document.getElementById('edit-profile-modal').style.display = 'flex';

  // File upload listener
  document.getElementById('avatar-upload-input').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { _selectedAvatar = ev.target.result; };
    reader.readAsDataURL(file);
  });
}

function closeEditProfile() {
  const m = document.getElementById('edit-profile-modal');
  if (m) m.style.display = 'none';
}

// ================================================================
// saveProfile()
// Sauvegarde les modifications du profil dans localStorage et les synchronise avec le backend
// ================================================================
function saveProfile() {
  const user = getUser() || {};
  user.name = document.getElementById('edit-name').value.trim() || user.name;
  user.email = document.getElementById('edit-email').value.trim() || user.email;
  user.avatar = _selectedAvatar || user.avatar || 'avatar1';
  localStorage.setItem('nexvia_user', JSON.stringify(user));

  // Update backend (best-effort)
  const token = localStorage.getItem('nexvia_token');
  if (token) {
    fetch(API_BASE + '/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
      body: JSON.stringify({ name: user.name, email: user.email, profileImage: user.avatar })
    }).catch(() => { });
  }

  updateHeader();
  closeEditProfile();
}

// ================================================================
// DOMContentLoaded session init
// Au chargement: affiche le header immédiatement depuis localStorage, puis vérifie le token avec le backend
// ================================================================
document.addEventListener('DOMContentLoaded', async () => {
  // First render immediately with localStorage data (instant, no flicker)
  updateHeader();

  // Then verify token with backend and refresh user data
  const token = localStorage.getItem('nexvia_token');
  if (token) {
    try {
      const res = await fetch(API_BASE + '/api/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const backendUser = await res.json();
        // Merge backend data into localStorage (keep uploaded avatar if any)
        const local = getUser() || {};
        const merged = {
          name: backendUser.name || local.name,
          email: backendUser.email || local.email,
          avatar: local.avatar?.startsWith('data:') ? local.avatar : (backendUser.profileImage || local.avatar || 'avatar1')
        };
        localStorage.setItem('nexvia_user', JSON.stringify(merged));
        updateHeader();
      } else {
        // Token expired — clear session
        localStorage.removeItem('nexvia_token');
        localStorage.removeItem('nexvia_user');
        updateHeader();
      }
    } catch (e) {
      console.error(e);
    }
  }
});

// Make functions globally accessible for inline onclick handlers
window.openEditProfile = openEditProfile;
window.closeEditProfile = closeEditProfile;
window.saveProfile = saveProfile;
window.getUser = getUser;
window.saveUserSession = saveUserSession;
window.updateHeader = updateHeader;