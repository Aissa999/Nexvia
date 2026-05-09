
const GET_BASE_PATH = () => {
    const isInPages = window.location.pathname.includes('/pages/') || window.location.pathname.includes('\\pages\\');
    return isInPages ? '../JavaScript/' : 'JavaScript/';
};
const MARKETPLACE_SCRIPT_BASE = GET_BASE_PATH();

async function startMarketplace() {

    let data;
    const FALLBACK_PRODUCTS = {
        "categories": [
            { "id": "c-films", "name": "Films & séries", "description": "Accédez aux meilleures plateformes de streaming et profitez de milliers de films, séries et animés en illimité.", "tags": ["Netflix", "Disney+", "Apple TV+", "Prime Video", "Crunchyroll"], "image": "../images/categories/movies.jpg", "cssClass": "c-films" },
            { "id": "c-music", "name": "Musique", "description": "Écoutez vos artistes préférés sans interruption, en ligne ou hors connexion, avec une qualité audio irréprochable.", "tags": ["Spotify", "Apple Music", "Youtube Music", "Tidal", "Deezer"], "image": "../images/categories/music.jpg", "cssClass": "c-music" },
            { "id": "c-ai", "name": "Intelligence Artificielle", "description": "Boostez votre productivité avec les assistants IA les plus puissants du moment — rédigez, codez et créez.", "tags": ["ChatGPT", "Claude", "Gemini", "Grok", "ElevenLabs"], "image": "../images/categories/ai.jpg", "cssClass": "c-ai" },
            { "id": "c-cloud", "name": "Stockage Cloud", "description": "Sauvegardez et accédez à vos fichiers depuis n'importe quel appareil — choisissez le volume de stockage qui vous convient.", "tags": ["Google Drive", "iCloud", "OneDrive"], "image": "../images/categories/cloud.jpg", "cssClass": "c-cloud" },
            { "id": "c-education", "name": "Éducation", "description": "Apprenez une nouvelle langue, maîtrisez une compétence ou obtenez une certification reconnue, à votre rythme.", "tags": ["Duolingo", "Coursera", "Udemy", "LinkedIn Learning", "Skillshare"], "image": "../images/categories/education.jpg", "cssClass": "c-education" },
            { "id": "c-productivity", "name": "Productivité", "description": "Organisez vos projets, gérez vos tâches et collaborez efficacement avec les outils qui font la différence au quotidien.", "tags": ["Canva", "Notion", "Google Workspace", "Grammarly"], "image": "../images/categories/productivity.jpg", "cssClass": "c-productivity" },
            { "id": "c-games", "name": "Jeux Vidéo", "description": "Obtenez des avantages exclusifs et du contenu premium sur vos jeux préférés avec nos offres spéciales.", "tags": ["FIFA", "eFootball", "Fortnite", "PUBG", "Free Fire", "Minecraft"], "image": "../images/categories/games.jpg", "cssClass": "c-games" },
            { "id": "c-vpn", "name": "VPN & Proxy", "description": "Naviguez en toute sécurité et débloquez le contenu du monde entier avec nos solutions VPN rapides et fiables.", "tags": ["NordVPN", "Secure VPN", "Smart Proxy", "ExpressVPN", "Surfshark"], "image": "../images/categories/vpn.jpg", "cssClass": "c-vpn" },
            { "id": "c-fitness", "name": "Sport & Santé", "description": "Atteignez vos objectifs de remise en forme avec des plans d'entraînement et de nutrition personnalisés.", "tags": ["MyFitnessPal", "Nike Training", "Yazio", "Strava", "Freeletics"], "image": "../images/categories/fitness.jpg", "cssClass": "c-fitness" },
            { "id": "c-mobile", "name": "Recharge Mobile", "description": "Rechargez votre forfait Mobilis, Djezzy ou Ooredoo instantanément — livraison directe sur votre numéro.", "tags": ["Mobilis", "Djezzy", "Ooredoo"], "image": "../images/categories/recharge.jpg", "cssClass": "c-mobile" },
            { "id": "c-giftcards", "name": "Cartes Cadeaux", "description": "Offrez ou utilisez des cartes cadeaux numériques pour vos plateformes préférées — livraison instantanée par code.", "tags": ["iTunes", "Google Play", "Amazon", "Steam", "PlayStation", "Xbox"], "image": "../images/categories/gift-cards.jpg", "cssClass": "c-giftcards" },
            { "id": "c-finance", "name": "Finance & Crypto", "description": "Accédez aux meilleurs outils d'analyse financière, de suivi de portefeuille et de trading crypto avancé sécurisé.", "tags": ["TradingView", "CoinStats", "Binance", "Kucoin"], "image": "../images/categories/finance.jpg", "cssClass": "c-finance" }
        ],
        "products": [
            { "id": "netflix", "categoryId": "c-films", "name": "Netflix", "subtitle": "Abonnement Premium", "price": 650, "logo": "../images/products/netflix.png", "rating": "4.9", "clients": "5200", "description": "Accédez aux meilleures séries et films du moment en 4K Ultra HD.", "features": ["Qualité 4K Ultra HD + HDR", "Audio Spatial Dolby Atmos", "Téléchargement hors-ligne", "Catalogue mondial complet"] },
            { "id": "youtube-premium", "categoryId": "c-films", "name": "YouTube Premium", "subtitle": "Vidéo sans publicité", "price": 550, "logo": "../images/products/youtube.png", "rating": "4.8", "clients": "4200", "description": "Profitez de YouTube sans publicité, hors connexion et en arrière-plan.", "features": ["Zéro publicité sur toutes les vidéos", "Lecture en arrière-plan", "Téléchargements vidéo offline", "YouTube Music inclus"] },
            { "id": "disney", "categoryId": "c-films", "name": "Disney+", "subtitle": "Offre Standard", "price": 700, "logo": "../images/products/disney.png", "rating": "4.7", "clients": "2100", "description": "La maison de Disney, Pixar, Marvel, Star Wars et National Geographic.", "features": ["Contenu familial illimité", "Format IMAX Enhanced", "4 visionnages simultanés", "Contrôle parental avancé"] },
            { "id": "prime-video", "categoryId": "c-films", "name": "Prime Video", "subtitle": "Amazon Prime", "price": 600, "logo": "../images/products/prime-video.png", "rating": "4.6", "clients": "1850", "description": "Films et séries originaux Amazon primés, disponibles à la demande.", "features": ["Séries Amazon Originals primées", "Contenu 4K HDR disponible", "Téléchargement hors-ligne", "Accès aux chaînes Amazon add-on"] },
            { "id": "crunchyroll", "categoryId": "c-films", "name": "Crunchyroll", "subtitle": "Mega Fan", "price": 450, "logo": "../images/products/crunchrool.png", "rating": "4.8", "clients": "1500", "description": "La plus grande bibliothèque mondiale d'animés et mangas.", "features": ["Simulcasts 1h après la diffusion au Japon", "Sans publicité", "Accès à 1000+ séries animées", "Multi-appareils (TV, mobile, PC)"] },
            { "id": "spotify", "categoryId": "c-music", "name": "Spotify", "subtitle": "Premium Individuel", "price": 700, "logo": "../images/products/spotify.png", "rating": "4.9", "clients": "4200", "description": "Écoutez 100 millions de titres et podcasts sans publicité.", "features": ["Aucune publicité", "Lecture hors connexion (jusqu'à 10 000 titres)", "Qualité audio jusqu'à 320 kbps", "Saut de titres illimité"] },
            { "id": "chatgpt", "categoryId": "c-ai", "name": "ChatGPT", "subtitle": "Abonnement Plus", "price": 2800, "logo": "../images/products/chatGpt.png", "rating": "5.0", "clients": "5100", "description": "Accédez à GPT-5.5, génération d'images et analyse de données ultra-avancée.", "features": ["GPT-5.5 (dernier modèle ultra-performant)", "Génération d'images ultra-réalistes", "Analyse de fichiers & code (Advanced Data Analysis)", "Mode vocal avancé et accès prioritaire"] },
            { "id": "canva", "categoryId": "c-productivity", "name": "Canva Pro", "subtitle": "Design Graphique Premium", "price": 650, "logo": "../images/products/canva.png", "rating": "4.9", "clients": "8400", "description": "L'outil de design n°1 avec tous les éléments, templates et IA débloqués.", "features": ["100+ millions d'images, vidéos et éléments premium", "Suppression d'arrière-plan en 1 clic (Magic Studio)", "Génération d'images par IA (Dream Lab)", "Export SVG, PDF haute qualité et formats pro"] }
        ]
    };

    try {
        if (window.NEXVIA_PRODUCTS_DATA) {
            data = window.NEXVIA_PRODUCTS_DATA;
        } else {
            const response = await fetch(MARKETPLACE_SCRIPT_BASE + 'products.json');
            if (!response.ok) throw new Error("Fetch failed");
            data = await response.json();
        }
    } catch (error) {
        data = FALLBACK_PRODUCTS;
    }

    const catView = document.getElementById("categories-view");
    const prodView = document.getElementById("products-view");
    const detailView = document.getElementById("detail-view");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    const mobCats = document.getElementById("mob-cats");

    const catGrid = document.getElementById("cat-grid");
    const prodGrid = document.getElementById("prod-grid");
    const detLeft = document.getElementById("det-left");
    const detRight = document.getElementById("det-right");
    const prodTitle = document.getElementById("prod-title");
    const detTitle = document.getElementById("det-title");

    const backToCats = document.getElementById("back-to-cats");
    const backToProds = document.getElementById("back-to-prods");
    const sbClose = document.getElementById("sb-close");

    if (!catView || !prodView || !detailView || !sidebar || !overlay || !mobCats ||
        !catGrid || !prodGrid || !detLeft || !detRight || !prodTitle || !detTitle ||
        !backToCats || !backToProds || !sbClose) {
        return;
    }

    let activeCategoryId = null;
    let activeProduct = null;
    let selectedOptions = {};
    let selectedPayment = 'baridimob';

    function t(text) {
        if (!text) return text;
        if (window.NexviaI18n && typeof window.NexviaI18n.translateText === 'function') {
            return window.NexviaI18n.translateText(text);
        }
        return text;
    }

    init();

    function init() {
        renderCategories();
        renderSidebar();
        renderMobCats();

        backToCats.addEventListener("click", showCategoriesView);
        backToProds.addEventListener("click", () => showProductsView(activeCategoryId));

        const closeBtn = document.getElementById("sb-close");
        if (closeBtn) closeBtn.addEventListener("click", closeMobileSidebar);
        overlay.addEventListener("click", closeMobileSidebar);

        const fSearch = document.getElementById("filter-search");
        const fSort = document.getElementById("filter-sort");
        if (fSearch) fSearch.addEventListener("input", () => { if (activeCategoryId) renderProducts(activeCategoryId) });
        if (fSort) fSort.addEventListener("change", () => { if (activeCategoryId) renderProducts(activeCategoryId) });

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

        window.addEventListener('nexvia:languagechange', () => {
            renderCategories();
            renderSidebar();
            renderMobCats();
            if (activeCategoryId && !detailView.classList.contains("on")) {
                renderProducts(activeCategoryId);
            } else if (activeCategoryId && detailView.classList.contains("on") && activeProduct) {
                const oldTitle = document.getElementById("det-title")?.innerHTML;
                if (oldTitle) {
                    detTitle.innerHTML = `${t("Configuration:")} <span>${t(activeProduct.name)}</span>`;
                }
                renderDetailLeft();
                renderDetailRight();
            }
        });
    }


    function renderCategories() {
        catGrid.innerHTML = "";
        data.categories.forEach(cat => {
            const card = document.createElement("div");
            card.className = `cat-card ${cat.cssClass}`;
            card.onclick = () => showProductsView(cat.id);

            const visibleTags = cat.tags.slice(0, 3);
            let tagsHTML = visibleTags.map(tag => `<span class="cat-tag">${t(tag)}</span>`).join("");

            card.innerHTML = `
                <img src="${cat.image}" class="cat-img" alt="${t(cat.name)}" loading="lazy">
                <div class="cat-body">
                    <span class="cat-title">${t(cat.name)}</span>
                    <p class="cat-desc">${t(cat.description)}</p>
                    <div class="cat-tags">${tagsHTML}</div>
                    <div class="cat-hr"></div>
                    <div class="cat-btn-row">
                        <button class="cat-btn">
                            ${t("Voir Plus")} <span class="arr"><i class="fa-solid fa-arrow-right arr"></i></span>
                        </button>
                    </div>
                </div>
            `;
            catGrid.appendChild(card);
        });
    }


    function renderSidebar() {
        sidebar.innerHTML = `<button class="sb-close" id="sb-close">✕</button><div class="sb-title">${t("CATÉGORIES")}</div>`;
        document.getElementById("sb-close").addEventListener("click", closeMobileSidebar);

        data.categories.forEach(cat => {
            const prodCount = data.products.filter(p => p.categoryId === cat.id).length;
            const item = document.createElement("div");
            item.className = "sb-item";
            item.dataset.id = cat.id;
            item.onclick = () => showProductsView(cat.id);

            item.innerHTML = `
                <span>${t(cat.name)}</span>
                <span class="sb-count">${prodCount}</span>
            `;
            sidebar.appendChild(item);
        });
    }

    function renderMobCats() {
        mobCats.innerHTML = "";
        data.categories.forEach(cat => {
            const pill = document.createElement("div");
            pill.className = "mob-pill";
            pill.dataset.id = cat.id;
            pill.onclick = () => showProductsView(cat.id);
            pill.innerHTML = `<span>${t(cat.name)}</span>`;
            mobCats.appendChild(pill);
        });
    }

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


    function renderProducts(categoryId) {
        prodGrid.innerHTML = "";
        const categoryData = data.categories.find(c => c.id === categoryId) || { name: 'Offres Spéciales' };
        prodTitle.innerHTML = `${t("Produits de la catégorie")} <span>${t(categoryData.name)}</span>`;

        let categoryProducts = data.products.filter(p => p.categoryId === categoryId);

        const sTerm = document.getElementById("filter-search")?.value.toLowerCase().trim();
        const sSort = document.getElementById("filter-sort")?.value || "popularity";

        if (sTerm) {
            categoryProducts = categoryProducts.filter(p => p.name.toLowerCase().includes(sTerm) || p.description.toLowerCase().includes(sTerm));
        }

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
            prodGrid.innerHTML = `<p style="color:var(--muted)">${t("Aucun produit trouvé pour ces critères.")}</p>`;
            return;
        }

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

            const badgeHTML = prod.id === popularId ? `<div class="prod-badge">${t("Populaire")}</div>` : '';

            card.innerHTML = `
                ${badgeHTML}
                <div class="prod-top">
                    <div class="prod-logo">
                        <img src="${prod.logo}" alt="${t(prod.name)}" loading="lazy">
                    </div>
                    <div class="prod-info">
                        <div class="prod-name">${t(prod.name)}</div>
                        <div class="prod-sub">${t(prod.subtitle)}</div>
                    </div>
                </div>
                <div class="prod-price-row">
                    <span class="prod-price">${prod.price} <span class="unit">${t(prod.priceUnit || 'DA/mois')}</span></span>
                </div>
                <div class="prod-div"></div>
                <div class="prod-social">
                    <div class="s-pill"><div class="s-dot"></div>+${prod.clients} ${t("Clients")}</div>
                    <div class="s-pill"><i class="fa-solid fa-star s-star"></i> ${prod.rating}</div>
                </div>
                <button class="buy-btn">${t("Acheter maintenant")}</button>
            `;
            prodGrid.appendChild(card);
        });
    }

    function showCategoriesView() {
        activeCategoryId = null;
        prodView.classList.remove("on");
        detailView.classList.remove("on");
        sidebar.classList.remove("visible");
        catView.classList.remove("hidden");
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function showDetailView(productId) {
        const originalProduct = data.products.find(p => p.id === productId);
        activeProduct = JSON.parse(JSON.stringify(originalProduct));

        const params = new URLSearchParams(window.location.search);
        if (params.get('promo') === 'true') {
            if (activeProduct.id === 'canva') {
                activeProduct.price = 449;
                activeProduct.oldPrice = 650;
            } else if (activeProduct.id === 'nord-vpn') {
                activeProduct.price = 649;
                activeProduct.oldPrice = 900;
            }
        }

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

    function renderDetailLeft() {
        const featHTML = activeProduct.features.map(f => `
            <div class="feat-row">
                <div class="chk"><i class="fa-solid fa-check"></i></div>
                <span>${t(f)}</span>
            </div>
        `).join("");

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
        const jpegProducts = ['my-fitness-pal', 'yazio', 'nike-training', 'strava', 'freeletics'];

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
                <div class="d-logo"><img src="${activeProduct.logo}" alt="${t(activeProduct.name)}" loading="lazy"></div>
                <div>
                    <div class="d-name">${t(activeProduct.name)}</div>
                    <div class="d-desc">${t(activeProduct.subtitle)}</div>
                </div>
            </div>
            <p class="d-desc" style="margin-bottom:20px;">${t(activeProduct.description)}</p>
            ${carouselHTML}
            <div class="feat-lbl">${t("Caractéristiques Incluses")}</div>
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

    function renderDetailRight() {
        detRight.innerHTML = "";

        if (activeProduct.options) {
            activeProduct.options.forEach(opt => {
                const section = document.createElement("div");
                section.className = "opt-section";

                const lbl = document.createElement("div");
                lbl.className = "opt-lbl";
                lbl.textContent = t(opt.name);

                const pills = document.createElement("div");
                pills.className = "opt-pills";

                opt.values.forEach(val => {
                    const btn = document.createElement("button");
                    btn.className = `opt-pill ${selectedOptions[opt.name] === val.label ? 'active' : ''}`;
                    btn.textContent = t(val.label);
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
        let finalOldPrice = activeProduct.oldPrice ? activeProduct.oldPrice : null;
        if (activeProduct.options) {
            activeProduct.options.forEach(opt => {
                const selectedVal = opt.values.find(v => v.label === selectedOptions[opt.name]);
                if (selectedVal) {
                    if (selectedVal.priceAdd !== undefined) {
                        finalPrice += selectedVal.priceAdd;
                        if (finalOldPrice) finalOldPrice += selectedVal.priceAdd;
                    }
                    if (selectedVal.priceMultiplier !== undefined) {
                        finalPrice *= selectedVal.priceMultiplier;
                        if (finalOldPrice) finalOldPrice *= selectedVal.priceMultiplier;
                    }
                }
            });
        }
        finalPrice = Math.round(finalPrice);
        if (finalOldPrice) finalOldPrice = Math.round(finalOldPrice);

        const isMobileCategory = activeProduct.categoryId === 'c-mobile';
        const isGameCategory = activeProduct.categoryId === 'c-games' && activeProduct.id !== 'minecraft';

        let targetInputHTML = "";
        if (isMobileCategory) {
            targetInputHTML = `
                <label style="display:block; margin-bottom:5px; color:var(--muted)">${t("Numéro de téléphone")}</label>
                <input type="tel" id="order-target" placeholder="${t("Ex: 06XXXXXXXX")}" pattern="[0-9]{10}" style="width:100%; padding:12px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:8px; color:#fff; transition: border-color 0.3s;" required>
                <div style="color:var(--main-color2); font-size:12px; margin-top:8px; display:flex; align-items:center; gap:6px; opacity:0.9; font-weight:500;">
                    <i class="fa-solid fa-circle-info"></i>
                    <span>${t("Votre rechargement sera envoyé à ce numéro.")}</span>
                </div>
            `;
        } else if (isGameCategory) {
            targetInputHTML = `
                <label style="display:block; margin-bottom:5px; color:var(--muted)">${t("Votre ID dans le jeu")}</label>
                <input type="text" id="order-target" placeholder="${t("Entrez votre Player ID")}" style="width:100%; padding:12px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:8px; color:#fff; transition: border-color 0.3s;" required>
                <div style="color:var(--main-color2); font-size:12px; margin-top:8px; display:flex; align-items:center; gap:6px; opacity:0.9; font-weight:500;">
                    <i class="fa-solid fa-circle-info"></i>
                    <span>${t("Votre rechargement sera envoyé à cet ID.")}</span>
                </div>
            `;
        } else {
            targetInputHTML = `
                <label style="display:block; margin-bottom:5px; color:var(--muted)">${t("Adresse Email")}</label>
                <input type="email" id="order-target" placeholder="${t("votre@email.com")}" style="width:100%; padding:12px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:8px; color:#fff; transition: border-color 0.3s;" required>
                <div style="color:var(--main-color2); font-size:12px; margin-top:8px; display:flex; align-items:center; gap:6px; opacity:0.9; font-weight:500;">
                    <i class="fa-solid fa-circle-info"></i>
                    <span>${t("Votre commande sera envoyée à cette adresse.")}</span>
                </div>
            `;
        }

        const paySection = document.createElement("div");
        const paymentDetailsHTML = `
            <div style="margin-top:20px; text-align:left; font-size:14px;">
                <div style="margin-bottom:15px;">
                    <label style="display:block; margin-bottom:5px; color:var(--muted)">${t("Nom de la commande")}</label>
                    <input type="text" id="order-name" placeholder="${t("Entrez un nom pour votre commande")}" style="width:100%; padding:12px; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:8px; color:#fff; transition: border-color 0.3s;" required>
                </div>
                <div style="margin-bottom:15px;">
                    ${targetInputHTML}
                </div>
            </div>
        `;

        let priceDisplayHTML = `<div class="price-big">${finalPrice} DA</div>`;
        if (finalOldPrice) {
            const discountPct = Math.round(((finalOldPrice - finalPrice) / finalOldPrice) * 100);
            priceDisplayHTML = `
                <div style="display:flex; align-items:center; gap:12px; margin-bottom: 5px;">
                    <div class="price-big" style="color:#fff; font-size:2rem; font-weight:800; line-height:1;">${finalPrice} DA</div>
                    <div style="text-decoration:line-through; color:var(--muted); font-size:1.1rem;">${finalOldPrice} DA</div>
                    <div style="background:rgba(255, 77, 79, 0.15); color:#ff4d4f; padding:4px 8px; border-radius:6px; font-size:0.85rem; font-weight:700;">-${discountPct}%</div>
                </div>
            `;
        }

        paySection.innerHTML = `
            <div class="pay-lbl">${t("Choisissez un mode de paiement")}</div>
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
                ${priceDisplayHTML}
                <div class="price-note">${t("Total à régler pour cette commande")}</div>
            </div>

            <button class="d-buy" id="btn-add-cart">${t("Ajouter au panier")}</button>
        `;
        detRight.appendChild(paySection);

        window.selectPayment = (type) => {
            selectedPayment = type;
            renderDetailRight();
        };

        document.getElementById("btn-add-cart").onclick = () => {
            const orderName = document.getElementById("order-name").value.trim();
            const orderTarget = document.getElementById("order-target").value.trim();
            const warningEl = document.getElementById("cart-warning");

            if (!orderName) {
                warningEl.textContent = t("Veuillez entrer un nom pour votre commande.");
                warningEl.style.display = "block";
                return;
            }

            if (isMobileCategory) {
                const phoneRegex = /^[0-9]{10}$/;
                if (!orderTarget || !phoneRegex.test(orderTarget)) {
                    warningEl.textContent = t("Veuillez entrer un numéro de téléphone valide (10 chiffres).");
                    warningEl.style.display = "block";
                    return;
                }
            } else if (isGameCategory) {
                if (!orderTarget) {
                    warningEl.textContent = t("Veuillez entrer votre ID de jeu.");
                    warningEl.style.display = "block";
                    return;
                }
            } else {
                if (!orderTarget || !orderTarget.includes('@')) {
                    warningEl.textContent = t("Veuillez entrer une adresse email valide.");
                    warningEl.style.display = "block";
                    return;
                }
            }

            warningEl.style.display = "none";

            const productToAdd = {
                id: activeProduct.id + '-' + Date.now(),
                productId: activeProduct.id,
                name: activeProduct.name,
                orderName: orderName,
                orderEmail: orderTarget,
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

    function closeMobileSidebar() {
        sidebar.classList.remove("mob-open");
        overlay.classList.remove("visible");
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startMarketplace);
} else {
    startMarketplace();
}
