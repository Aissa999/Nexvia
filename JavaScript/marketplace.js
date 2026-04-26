// ================================================================
// DOMContentLoaded init
// Point d'entrée: initialise toutes les vues et branche les événements au chargement de la page
// ================================================================
document.addEventListener("DOMContentLoaded", () => {
    // ================================================================
    // Data import / products array
    // Données des produits importées depuis products.js (catalogue complet)
    // ================================================================
    const data = typeof MARKETPLACE_DATA !== 'undefined' ? MARKETPLACE_DATA : window.MARKETPLACE_DATA;
    if (!data) {
        console.error("Marketplace Data not found!");
        return;
    }

    // Références des vues principales (catégories, produits, détails, sidebar, mobile)
    const catView = document.getElementById("categories-view");
    const prodView = document.getElementById("products-view");
    const detailView = document.getElementById("detail-view");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    const mobCats = document.getElementById("mob-cats");

    // Conteneurs de contenu dynamique
    const catGrid = document.getElementById("cat-grid");
    const prodGrid = document.getElementById("prod-grid");
    const detLeft = document.getElementById("det-left");
    const detRight = document.getElementById("det-right");
    const prodTitle = document.getElementById("prod-title");
    const detTitle = document.getElementById("det-title");

    // Boutons de navigation (retour et sidebar)
    const backToCats = document.getElementById("back-to-cats");
    const backToProds = document.getElementById("back-to-prods");
    const sbClose = document.getElementById("sb-close");

    // Variables d’état (catégorie active, produit actif, options, paiement)
    let activeCategoryId = null;
    let activeProduct = null;
    let selectedOptions = {};
    let selectedPayment = 'baridimob';

    // Lance l'initialisation générale
    init();

    // Initialise l’interface (render + événements + routing URL)
    function init() {
        renderCategories();
        renderSidebar();
        renderMobCats();

        backToCats.addEventListener("click", showCategoriesView);
        backToProds.addEventListener("click", () => showProductsView(activeCategoryId));

        sbClose.addEventListener("click", closeMobileSidebar);
        overlay.addEventListener("click", closeMobileSidebar);

        // Events for search and filters
        const fSearch = document.getElementById("filter-search");
        const fSort = document.getElementById("filter-sort");
        if (fSearch) fSearch.addEventListener("input", () => { if(activeCategoryId) renderProducts(activeCategoryId) });
        if (fSort) fSort.addEventListener("change", () => { if(activeCategoryId) renderProducts(activeCategoryId) });

        // Gère la navigation via paramètres URL (?cat= ou ?prod=)
        const params = new URLSearchParams(window.location.search);
        if (params.get('prod')) {
            const pid = params.get('prod');
            const productMatch = data.products.find(p => p.id === pid);
            if (productMatch) {
                showProductsView(productMatch.categoryId);
                showDetailView(pid);
            }
        } else if (params.get('cat')) {
            const cid = params.get('cat');
            if (data.categories.find(c => c.id === cid)) {
                showProductsView(cid);
            }
        }
    }

    // ================================================================
// renderCategories()
// Génère et affiche les cartes de catégories dans la grille principale
// ================================================================
    function renderCategories() {
        catGrid.innerHTML = "";
        data.categories.forEach(cat => {
            const card = document.createElement("div");
            card.className = `cat-card ${cat.cssClass}`;
            card.onclick = () => showProductsView(cat.id);

            const visibleTags = cat.tags.slice(0, 3);
            let tagsHTML = visibleTags.map(tag => `<span class="cat-tag">${tag}</span>`).join("");

            card.innerHTML = `
                <img src="${cat.image}" class="cat-img" alt="${cat.name}" loading="lazy">
                <div class="cat-body">
                    <span class="cat-title">${cat.name}</span>
                    <p class="cat-desc">${cat.description}</p>
                    <div class="cat-tags">${tagsHTML}</div>
                    <div class="cat-hr"></div>
                    <div class="cat-btn-row">
                        <button class="cat-btn">
                            Voir Plus <span class="arr"><i class="fa-solid fa-arrow-right arr"></i></span>
                        </button>
                    </div>
                </div>
            `;
            catGrid.appendChild(card);
        });
    }

    // ================================================================
// renderSidebar()
// Construit le menu latéral de filtrage par catégorie sur desktop
// ================================================================
    function renderSidebar() {
        sidebar.innerHTML = '<button class="sb-close" id="sb-close">✕</button><div class="sb-title">CATÉGORIES</div>';
        document.getElementById("sb-close").addEventListener("click", closeMobileSidebar);

        data.categories.forEach(cat => {
            const prodCount = data.products.filter(p => p.categoryId === cat.id).length;
            const item = document.createElement("div");
            item.className = "sb-item";
            item.dataset.id = cat.id;
            item.onclick = () => showProductsView(cat.id);

            item.innerHTML = `
                <span>${cat.name}</span>
                <span class="sb-count">${prodCount}</span>
            `;
            sidebar.appendChild(item);
        });
    }

    // ================================================================
// renderMobCats()
// Génère les boutons de catégories pour la navigation mobile horizontale
// ================================================================
    function renderMobCats() {
        mobCats.innerHTML = "";
        data.categories.forEach(cat => {
            const pill = document.createElement("div");
            pill.className = "mob-pill";
            pill.dataset.id = cat.id;
            pill.onclick = () => showProductsView(cat.id);
            pill.innerHTML = `<span>${cat.name}</span>`;
            mobCats.appendChild(pill);
        });
    }

    // Met à jour l’état actif dans sidebar et mobile
    function updateSidebarActiveState() {
        sidebar.querySelectorAll(".sb-item").forEach(item => {
            if (item.dataset.id === activeCategoryId) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        });

        mobCats.querySelectorAll(".mob-pill").forEach(pill => {
            if (pill.dataset.id === activeCategoryId) {
                pill.classList.add("active");
            } else {
                pill.classList.remove("active");
            }
        });
    }

    // ================================================================
// selectCategory()
// Sélectionne une catégorie et met à jour la vue produits + l'URL
// ================================================================
    function showProductsView(categoryId) {
        activeCategoryId = categoryId;
        catView.classList.add("hidden");
        detailView.classList.remove("on");
        prodView.classList.add("on");
        sidebar.classList.add("visible");

        updateSidebarActiveState();
        renderProducts(categoryId);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // ================================================================
// renderProducts()
// Filtre et affiche les produits de la catégorie active selon la recherche et le tri
// ================================================================
    function renderProducts(categoryId) {
        prodGrid.innerHTML = "";
        const categoryData = data.categories.find(c => c.id === categoryId) || { name: 'Offres Spéciales' };
        prodTitle.innerHTML = `Produits de la catégorie <span>${categoryData.name}</span>`;

        let categoryProducts = data.products.filter(p => p.categoryId === categoryId);

        // Apply search filter
        const sTerm = document.getElementById("filter-search")?.value.toLowerCase().trim();
        const sSort = document.getElementById("filter-sort")?.value || "popularity";

        if (sTerm) {
            categoryProducts = categoryProducts.filter(p => p.name.toLowerCase().includes(sTerm) || p.description.toLowerCase().includes(sTerm));
        }

        // Apply sorting
        if (sSort === "price-asc") {
            categoryProducts.sort((a, b) => a.price - b.price);
        } else if (sSort === "price-desc") {
            categoryProducts.sort((a, b) => b.price - a.price);
        } else if (sSort === "popularity") {
            categoryProducts.sort((a, b) => {
                const clientsA = parseFloat(a.clients.toString().replace(/,/g, '')) || 0;
                const clientsB = parseFloat(b.clients.toString().replace(/,/g, '')) || 0;
                return clientsB - clientsA; // Descending
            });
        }

        if (categoryProducts.length === 0) {
            prodGrid.innerHTML = `<p style="color:var(--muted)">Aucun produit trouvé pour ces critères.</p>`;
            return;
        }

        // Determine which product is the "most popular" in the original (unsorted) list
        const originalList = data.products.filter(p => p.categoryId === categoryId);
        const popularId = originalList.reduce((best, p) => {
            const bClients = parseFloat((best.clients || '0').toString().replace(/,/g, '')) || 0;
            const pClients = parseFloat((p.clients || '0').toString().replace(/,/g, '')) || 0;
            return pClients > bClients ? p : best;
        }, originalList[0])?.id;

        categoryProducts.forEach((prod) => {
            const card = document.createElement("div");
            card.className = "prod-card";
            card.onclick = () => showDetailView(prod.id);

            const badgeHTML = prod.id === popularId ? '<div class="prod-badge">Populaire</div>' : '';

            card.innerHTML = `
                ${badgeHTML}
                <div class="prod-top">
                    <div class="prod-logo">
                        <img src="${prod.logo}" alt="${prod.name}" loading="lazy">
                    </div>
                    <div class="prod-info">
                        <div class="prod-name">${prod.name}</div>
                        <div class="prod-sub">${prod.subtitle}</div>
                    </div>
                </div>
                <div class="prod-price-row">
                    <span class="prod-price">${prod.price} <span class="unit">${prod.priceUnit || 'DA/mois'}</span></span>
                </div>
                <div class="prod-div"></div>
                <div class="prod-social">
                    <div class="s-pill"><div class="s-dot"></div>+${prod.clients} Clients</div>
                    <div class="s-pill"><i class="fa-solid fa-star s-star"></i> ${prod.rating}</div>
                </div>
                <button class="buy-btn">Acheter maintenant</button>
            `;
            prodGrid.appendChild(card);
        });
    }

    // Retour à la vue catégories
    function showCategoriesView() {
        activeCategoryId = null;
        prodView.classList.remove("on");
        detailView.classList.remove("on");
        sidebar.classList.remove("visible");
        catView.classList.remove("hidden");
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // ================================================================
// openDetail() / renderDetailLeft() / renderDetailRight()
// Affiche la page de détail d'un produit avec images, description et bouton d'achat
// ================================================================
    function showDetailView(productId) {
        activeProduct = data.products.find(p => p.id === productId);
        selectedOptions = {};
        selectedPayment = 'baridimob';

        if (activeProduct.options) {
            activeProduct.options.forEach(opt => {
                selectedOptions[opt.name] = opt.values[0].label;
            });
        }

        prodView.classList.remove("on");
        detailView.classList.add("on");
        detTitle.innerHTML = `Configuration: <span>${activeProduct.name}</span>`;

        renderDetailLeft();
        renderDetailRight();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Affiche les infos du produit (logo, description, features, carousel)
    function renderDetailLeft() {
        const featHTML = activeProduct.features.map(f => `
            <div class="feat-row">
                <div class="chk"><i class="fa-solid fa-check"></i></div>
                <span>${f}</span>
            </div>
        `).join("");

        // Map product IDs to their actual description image base names
        const descMap = {
            'netflix': 'netflix',
            'youtube-premium': 'youtube',
            'disney': 'disney',
            'prime-video': 'prime-video',
            'crunchyroll': 'crunchrool',
            'apple-tv': 'apple-tv',
            'spotify': 'spotify',
            'apple-music': 'apple-music',
            'youtube-music': 'youtube-music',
            'tidal': 'tidal',
            'deezer': 'deezer',
            'chatgpt': 'chatGpt',
            'claude': 'claude',
            'gemini': 'gemeni',
            'grok': 'grok',
            'elevenlabs': 'elevenLabs',
            'flow-ai': 'flow',
            'icloud': 'iCloud',
            'google-drive': 'google-drive',
            'onedrive': 'one-drive',
            'duolingo': 'doulingo',
            'coursera': 'coursera',
            'udemy': 'udemy',
            'linkedin-learning': 'linked-in',
            'skillshare': 'skillshare',
            'canva': 'canva',
            'notion': 'notion',
            'google-workspace': 'google-workspace',
            'google-antigravity': 'antigravity',
            'grammarly': 'grammarly',
            'free-fire': 'free-fire',
            'fifa': 'fifa',
            'fortnite': 'fortnite',
            'minecraft': 'minecraft',
            'pubg': 'pubg',
            'efootball': 'eFootball',
            'nord-vpn': 'nord-vpn',
            'secure-vpn': 'secure-vpn',
            'smart-proxy': 'smart-proxy',
            'expressvpn': 'expressVpn',
            'surfshark': 'surfshark',
            'mobilis': 'mobilis',
            'djezzy': 'djezzy',
            'ooredoo': 'ooredoo',
            'gc-itunes': 'iTunes',
            'gc-google-play': 'google-play',
            'gc-amazon': 'amazon',
            'gc-steam': 'steam',
            'gc-playstation': 'play-station',
            'gc-xbox': 'xBox',
            'tradingview': 'trading-view',
            'coinstats': 'coin-stats',
            'binance-vip': 'binance',
            'kucoin-bot': 'kucoin',
            'my-fitness-pal': 'my-fitness-pal',
            'yazio': 'yazio',
            'nike-training': 'nike-training',
            'strava': 'strava',
            'freeletics': 'freeletics'
        };
        const jpegProducts = ['my-fitness-pal','yazio','nike-training','strava','freeletics'];
        
        let cImgs = [];
        if (activeProduct.descriptionImages) {
            cImgs = activeProduct.descriptionImages;
        } else {
            const ext = jpegProducts.includes(activeProduct.id) ? 'jpeg' : 'jpg';
            const descBase = descMap[activeProduct.id] || activeProduct.id;
            const img1 = `../images/description/${descBase}1.${ext}`;
            const img2Override = {
                'chatgpt': '../images/description/chatpt2.jpg',
                'djezzy': '../images/description/djezzy22.jpg'
            };
            const img2 = img2Override[activeProduct.id] || `../images/description/${descBase}2.${ext}`;
            cImgs = [img1, img2];
        }

        const carouselHTML = `
            <div class="prod-carousel" style="position:relative; margin-bottom:20px; text-align:center;">
                <img id="carousel-img" src="${cImgs[0]}" loading="lazy" style="width:100%; max-height:200px; object-fit:cover; border-radius:12px; border:2px solid rgba(255,255,255,0.05);" onerror="this.onerror=null; this.src='../images/logo.png';">
                <button id="car-prev" style="position:absolute; left:10px; top:50%; transform:translateY(-50%); background:rgba(0,0,0,0.6); color:#fff; border:none; padding:10px 15px; border-radius:50%; cursor:pointer;"><i class="fa-solid fa-chevron-left"></i></button>
                <button id="car-next" style="position:absolute; right:10px; top:50%; transform:translateY(-50%); background:rgba(0,0,0,0.6); color:#fff; border:none; padding:10px 15px; border-radius:50%; cursor:pointer;"><i class="fa-solid fa-chevron-right"></i></button>
            </div>
        `;

        detLeft.innerHTML = `
            <div class="d-logo-row" style="margin-bottom:15px;">
                <div class="d-logo"><img src="${activeProduct.logo}" alt="${activeProduct.name}" loading="lazy"></div>
                <div>
                    <div class="d-name">${activeProduct.name}</div>
                    <div class="d-desc">${activeProduct.subtitle}</div>
                </div>
            </div>
            <p class="d-desc" style="margin-bottom:20px;">${activeProduct.description}</p>
            ${carouselHTML}
            <div class="feat-lbl">Caractéristiques Incluses</div>
            <div>${featHTML}</div>
        `;

        let curImg = 0;
        const cImg = document.getElementById('carousel-img');
        
        document.getElementById('car-prev').onclick = () => {
             curImg = curImg === 0 ? cImgs.length - 1 : curImg - 1;
             cImg.src = cImgs[curImg];
        };
        document.getElementById('car-next').onclick = () => {
             curImg = curImg === cImgs.length - 1 ? 0 : curImg + 1;
             cImg.src = cImgs[curImg];
        };
    }

    // ================================================================
// Cart add to detail
// Gère l'ajout au panier depuis la page de détail avec feedback visuel
// ================================================================
    function renderDetailRight() {
        detRight.innerHTML = "";

        if (activeProduct.options) {
            activeProduct.options.forEach(opt => {
                const section = document.createElement("div");
                section.className = "opt-section";

                const lbl = document.createElement("div");
                lbl.className = "opt-lbl";
                lbl.textContent = opt.name;

                const pills = document.createElement("div");
                pills.className = "opt-pills";

                opt.values.forEach(val => {
                    const btn = document.createElement("button");
                    btn.className = `opt-pill ${selectedOptions[opt.name] === val.label ? 'active' : ''}`;
                    btn.textContent = val.label;
                    btn.onclick = () => {
                        selectedOptions[opt.name] = val.label;
                        renderDetailRight();
                    };
                    pills.appendChild(btn);
                });

                section.appendChild(lbl);
                section.appendChild(pills);
                detRight.appendChild(section);
            });
        }

        let finalPrice = activeProduct.price;
        if (activeProduct.options) {
            activeProduct.options.forEach(opt => {
                const selectedVal = opt.values.find(v => v.label === selectedOptions[opt.name]);
                if (selectedVal) {
                    if (selectedVal.priceAdd !== undefined) finalPrice += selectedVal.priceAdd;
                    if (selectedVal.priceMultiplier !== undefined) finalPrice *= selectedVal.priceMultiplier;
                }
            });
        }
        finalPrice = Math.round(finalPrice);

        const paySection = document.createElement("div");
        const paymentDetailsHTML = `
            <div style="margin-top:20px; text-align:left; font-size:14px;">
                <div style="margin-bottom:15px;">
                    <label style="display:block; margin-bottom:5px; color:var(--muted)">Nom de la commande</label>
                    <input type="text" id="order-name" placeholder="Entrez un nom pour votre commande" style="width:100%; padding:12px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:8px; color:#fff;" required>
                </div>
                <div style="margin-bottom:15px;">
                    <label style="display:block; margin-bottom:5px; color:var(--muted)">Adresse Email</label>
                    <input type="email" id="order-email" placeholder="votre@email.com" style="width:100%; padding:12px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:8px; color:#fff;" required>
                    <div style="color:var(--main-color2); font-size:12px; margin-top:8px; display:flex; align-items:center; gap:6px; opacity:0.9; font-weight:500;">
                        <i class="fa-solid fa-circle-info"></i>
                        <span>Votre commande sera envoyée à cette adresse.</span>
                    </div>
                </div>
            </div>
        `;

        paySection.innerHTML = `
            <div class="pay-lbl">Choisissez un mode de paiement</div>
            <div class="pay-opts">
                <button class="pay-opt ${selectedPayment === 'baridimob' ? 'active' : ''}" onclick="selectPayment('baridimob')">
                    <img src="../images/baridi-mob.png" alt="Baridimob" loading="lazy"> Baridimob
                </button>
                <button class="pay-opt ${selectedPayment === 'paypal' ? 'active' : ''}" onclick="selectPayment('paypal')">
                    <img src="../images/paypal.png" alt="PayPal" loading="lazy"> PayPal
                </button>
            </div>

            ${paymentDetailsHTML}
            
            <div id="cart-warning" style="color: #ff4d4f; font-size: 13px; margin-bottom: 10px; display: none; text-align: left; font-weight: 500;"></div>
            
            <div class="price-box" style="margin-top: 10px;">
                <div class="price-big">${finalPrice} DA</div>
                <div class="price-note">Total à régler pour cette commande</div>
            </div>

            <button class="d-buy" id="btn-add-cart">Ajouter au panier</button>
        `;
        detRight.appendChild(paySection);

        window.selectPayment = (type) => {
            selectedPayment = type;
            renderDetailRight();
        };

        document.getElementById("btn-add-cart").onclick = () => {
            const orderName = document.getElementById("order-name").value.trim();
            const orderEmail = document.getElementById("order-email").value.trim();
            const warningEl = document.getElementById("cart-warning");

            if (!orderName) {
                warningEl.textContent = "Veuillez entrer un nom pour votre commande.";
                warningEl.style.display = "block";
                return;
            }
            if (!orderEmail || !orderEmail.includes('@')) {
                warningEl.textContent = "Veuillez entrer une adresse email valide.";
                warningEl.style.display = "block";
                return;
            }

            warningEl.style.display = "none";

            const productToAdd = {
                id: activeProduct.id + '-' + Date.now(),
                productId: activeProduct.id,
                name: activeProduct.name,
                orderName: orderName,
                orderEmail: orderEmail,
                price: finalPrice,
                image: activeProduct.logo,
                options: selectedOptions,
                payment: selectedPayment
            };
            if (typeof window.addToCart === 'function') {
                window.addToCart(productToAdd);
            }
        };
    }

    // Gère la fermeture de la sidebar mobile
    function closeMobileSidebar() {
        sidebar.classList.remove("mob-open");
        overlay.classList.remove("visible");
    }
});