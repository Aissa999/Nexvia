var MARKETPLACE_DATA = {
  "categories": [
    {
      "id": "c-films",
      "name": "Films & séries",
      "description": "Accédez aux meilleures plateformes de streaming et profitez de milliers de films, séries et animés en illimité.",
      "tags": [
        "Netflix",
        "Disney+",
        "Apple TV+",
        "Prime Video",
        "Crunchyroll"
      ],
      "image": "../images/categories/movies.jpg",
      "cssClass": "c-films"
    },
    {
      "id": "c-music",
      "name": "Musique",
      "description": "Écoutez vos artistes préférés sans interruption, en ligne ou hors connexion, avec une qualité audio irréprochable.",
      "tags": [
        "Spotify",
        "Apple Music",
        "Youtube Music",
        "Tidal",
        "Deezer"
      ],
      "image": "../images/categories/music.jpg",
      "cssClass": "c-music"
    },
    {
      "id": "c-ai",
      "name": "Intelligence Artificielle",
      "description": "Boostez votre productivité avec les assistants IA les plus puissants du moment — rédigez, codez et créez.",
      "tags": [
        "ChatGPT",
        "Claude",
        "Gemini",
        "Grok",
        "ElevenLabs"
      ],
      "image": "../images/categories/ai.jpg",
      "cssClass": "c-ai"
    },
    {
      "id": "c-cloud",
      "name": "Stockage Cloud",
      "description": "Sauvegardez et accédez à vos fichiers depuis n'importe quel appareil — choisissez le volume de stockage qui vous convient.",
      "tags": [
        "Google Drive",
        "iCloud",
        "OneDrive"
      ],
      "image": "../images/categories/cloud.jpg",
      "cssClass": "c-cloud"
    },
    {
      "id": "c-education",
      "name": "Éducation",
      "description": "Apprenez une nouvelle langue, maîtrisez une compétence ou obtenez une certification reconnue, à votre rythme.",
      "tags": [
        "Duolingo",
        "Coursera",
        "Udemy",
        "LinkedIn Learning",
        "Skillshare"
      ],
      "image": "../images/categories/education.jpg",
      "cssClass": "c-education"
    },
    {
      "id": "c-productivity",
      "name": "Productivité",
      "description": "Organisez vos projets, gérez vos tâches et collaborez efficacement avec les outils qui font la différence au quotidien.",
      "tags": [
        "Canva",
        "Notion",
        "Google Workspace",
        "Grammarly"
      ],
      "image": "../images/categories/productivity.jpg",
      "cssClass": "c-productivity"
    },
    {
      "id": "c-games",
      "name": "Jeux Vidéo",
      "description": "Obtenez des avantages exclusifs et du contenu premium sur vos jeux préférés avec nos offres spéciales.",
      "tags": [
        "FIFA",
        "eFootball",
        "Fortnite",
        "PUBG",
        "Free Fire",
        "Minecraft"
      ],
      "image": "../images/categories/games.jpg",
      "cssClass": "c-games"
    },
    {
      "id": "c-vpn",
      "name": "VPN & Proxy",
      "description": "Naviguez en toute sécurité et débloquez le contenu du monde entier avec nos solutions VPN rapides et fiables.",
      "tags": [
        "NordVPN",
        "Secure VPN",
        "Smart Proxy",
        "ExpressVPN",
        "Surfshark"
      ],
      "image": "../images/categories/vpn.jpg",
      "cssClass": "c-vpn"
    },
    {
      "id": "c-fitness",
      "name": "Sport & Santé",
      "description": "Atteignez vos objectifs de remise en forme avec des plans d'entraînement et de nutrition personnalisés.",
      "tags": [
        "MyFitnessPal",
        "Nike Training",
        "Yazio",
        "Strava",
        "Freeletics"
      ],
      "image": "../images/categories/fitness.jpg",
      "cssClass": "c-fitness"
    },
    {
      "id": "c-mobile",
      "name": "Recharge Mobile",
      "description": "Rechargez votre forfait Mobilis, Djezzy ou Ooredoo instantanément — livraison directe sur votre numéro.",
      "tags": [
        "Mobilis",
        "Djezzy",
        "Ooredoo"
      ],
      "image": "../images/categories/recharge.jpg",
      "cssClass": "c-mobile"
    },
    {
      "id": "c-giftcards",
      "name": "Cartes Cadeaux",
      "description": "Offrez ou utilisez des cartes cadeaux numériques pour vos plateformes préférées — livraison instantanée par code.",
      "tags": [
        "iTunes",
        "Google Play",
        "Amazon",
        "Steam",
        "PlayStation",
        "Xbox"
      ],
      "image": "../images/categories/gift-cards.jpg",
      "cssClass": "c-giftcards"
    },
    {
      "id": "c-finance",
      "name": "Finance & Crypto",
      "description": "Accédez aux meilleurs outils d'analyse financière, de suivi de portefeuille et de trading crypto avancé sécurisé.",
      "tags": [
        "TradingView",
        "CoinStats",
        "Binance",
        "Kucoin"
      ],
      "image": "../images/categories/finance.jpg",
      "cssClass": "c-finance"
    }
  ],
  "products": [
    {
      "id": "netflix",
      "categoryId": "c-films",
      "name": "Netflix",
      "subtitle": "Abonnement Premium",
      "price": 650,
      "logo": "../images/products/netflix.png",
      "rating": "4.9",
      "clients": "5200",
      "description": "Accédez aux meilleures séries et films du moment en 4K Ultra HD.",
      "features": [
        "Qualité 4K Ultra HD + HDR",
        "Audio Spatial Dolby Atmos",
        "Téléchargement hors-ligne",
        "Catalogue mondial complet"
      ],
      "options": [
        {
          "name": "Écrans",
          "values": [
            {
              "label": "1 Écran",
              "priceAdd": 0
            },
            {
              "label": "2 Écrans",
              "priceAdd": 250
            },
            {
              "label": "4 Écrans",
              "priceAdd": 500
            }
          ]
        },
        {
          "name": "Durée",
          "values": [
            {
              "label": "1 Mois",
              "priceMultiplier": 1
            },
            {
              "label": "3 Mois",
              "priceMultiplier": 2.8
            },
            {
              "label": "6 Mois",
              "priceMultiplier": 5.5
            }
          ]
        }
      ]
    },
    {
      "id": "youtube-premium",
      "categoryId": "c-films",
      "name": "YouTube Premium",
      "subtitle": "Vidéo sans publicité",
      "price": 550,
      "logo": "../images/products/youtube.png",
      "rating": "4.8",
      "clients": "4200",
      "description": "Profitez de YouTube sans publicité, hors connexion et en arrière-plan.",
      "features": [
        "Zéro publicité sur toutes les vidéos",
        "Lecture en arrière-plan",
        "Téléchargements vidéo offline",
        "YouTube Music inclus"
      ],
      "options": [
        {
          "name": "Écrans",
          "values": [
            {
              "label": "1 Écran",
              "priceMultiplier": 1
            },
            {
              "label": "2 Écrans",
              "priceMultiplier": 1.8
            },
            {
              "label": "3 Écrans",
              "priceMultiplier": 2.5
            }
          ]
        },
        {
          "name": "Durée",
          "values": [
            {
              "label": "1 Mois",
              "priceMultiplier": 1
            },
            {
              "label": "3 Mois",
              "priceMultiplier": 2.8
            },
            {
              "label": "6 Mois",
              "priceMultiplier": 5.5
            }
          ]
        }
      ]
    },
    {
      "id": "disney",
      "categoryId": "c-films",
      "name": "Disney+",
      "subtitle": "Offre Standard",
      "price": 700,
      "logo": "../images/products/disney.png",
      "rating": "4.7",
      "clients": "2100",
      "description": "La maison de Disney, Pixar, Marvel, Star Wars et National Geographic.",
      "features": [
        "Contenu familial illimité",
        "Format IMAX Enhanced",
        "4 visionnages simultanés",
        "Contrôle parental avancé"
      ],
      "options": [
        {
          "name": "Écrans",
          "values": [
            {
              "label": "1 Écran",
              "priceAdd": 0
            },
            {
              "label": "2 Écrans",
              "priceAdd": 200
            },
            {
              "label": "4 Écrans",
              "priceAdd": 400
            }
          ]
        },
        {
          "name": "Durée",
          "values": [
            {
              "label": "1 Mois",
              "priceMultiplier": 1
            },
            {
              "label": "12 Mois",
              "priceMultiplier": 9
            }
          ]
        }
      ]
    },
    {
      "id": "prime-video",
      "categoryId": "c-films",
      "name": "Prime Video",
      "subtitle": "Amazon Prime",
      "price": 600,
      "logo": "../images/products/prime-video.png",
      "rating": "4.6",
      "clients": "1850",
      "description": "Films et séries originaux Amazon primés, disponibles à la demande.",
      "features": [
        "Séries Amazon Originals primées",
        "Contenu 4K HDR disponible",
        "Téléchargement hors-ligne",
        "Accès aux chaînes Amazon add-on"
      ],
      "options": [
        {
          "name": "Écrans",
          "values": [
            {
              "label": "1 Écran",
              "priceAdd": 0
            },
            {
              "label": "2 Écrans",
              "priceAdd": 150
            },
            {
              "label": "3 Écrans",
              "priceAdd": 300
            }
          ]
        },
        {
          "name": "Durée",
          "values": [
            {
              "label": "1 Mois",
              "priceMultiplier": 1
            },
            {
              "label": "6 Mois",
              "priceMultiplier": 5
            }
          ]
        }
      ]
    },
    {
      "id": "crunchyroll",
      "categoryId": "c-films",
      "name": "Crunchyroll",
      "subtitle": "Mega Fan",
      "price": 450,
      "logo": "../images/products/crunchrool.png",
      "rating": "4.8",
      "clients": "1500",
      "description": "La plus grande bibliothèque mondiale d'animés et mangas.",
      "features": [
        "Simulcasts 1h après la diffusion au Japon",
        "Sans publicité",
        "Accès à 1000+ séries animées",
        "Multi-appareils (TV, mobile, PC)"
      ],
      "options": [
        {
          "name": "Plan",
          "values": [
            {
              "label": "Fan",
              "priceAdd": 0
            },
            {
              "label": "Mega Fan",
              "priceAdd": 200
            }
          ]
        },
        {
          "name": "Écrans",
          "values": [
            {
              "label": "1 Écran",
              "priceAdd": 0
            },
            {
              "label": "2 Écrans",
              "priceAdd": 100
            },
            {
              "label": "4 Écrans",
              "priceAdd": 250
            }
          ]
        },
        {
          "name": "Durée",
          "values": [
            {
              "label": "1 Mois",
              "priceMultiplier": 1
            },
            {
              "label": "1 An",
              "priceMultiplier": 10
            }
          ]
        }
      ]
    },
    {
      "id": "apple-tv",
      "categoryId": "c-films",
      "name": "Apple TV+",
      "subtitle": "Séries exclusives",
      "price": 800,
      "logo": "../images/products/apple-tv.png",
      "rating": "4.5",
      "clients": "800",
      "description": "Des séries originales multi-primées aux Emmys et aux Oscars.",
      "features": [
        "Apple Originals exclusifs (Ted Lasso, Severance…)",
        "Qualité 4K Dolby Vision HDR",
        "Audio Spatial Dolby Atmos",
        "Partage familial (6 personnes)"
      ],
      "options": [
        {
          "name": "Écrans",
          "values": [
            {
              "label": "1 Écran",
              "priceAdd": 0
            },
            {
              "label": "2 Écrans",
              "priceAdd": 200
            },
            {
              "label": "4 Écrans",
              "priceAdd": 400
            }
          ]
        },
        {
          "name": "Durée",
          "values": [
            {
              "label": "1 Mois",
              "priceMultiplier": 1
            },
            {
              "label": "3 Mois",
              "priceMultiplier": 2.8
            }
          ]
        }
      ]
    },
    {
      "id": "spotify",
      "categoryId": "c-music",
      "name": "Spotify",
      "subtitle": "Premium Individuel",
      "price": 700,
      "logo": "../images/products/spotify.png",
      "rating": "4.9",
      "clients": "4200",
      "description": "Écoutez 100 millions de titres et podcasts sans publicité.",
      "features": [
        "Aucune publicité",
        "Lecture hors connexion (jusqu'à 10 000 titres)",
        "Qualité audio jusqu'à 320 kbps",
        "Saut de titres illimité"
      ],
      "options": [
        {
          "name": "Plan",
          "values": [
            {
              "label": "Individuel",
              "priceAdd": 0
            },
            {
              "label": "Duo",
              "priceAdd": 300
            },
            {
              "label": "Famille",
              "priceAdd": 600
            }
          ]
        },
        {
          "name": "Durée",
          "values": [
            {
              "label": "1 Mois",
              "priceMultiplier": 1
            },
            {
              "label": "3 Mois",
              "priceMultiplier": 2.8
            },
            {
              "label": "6 Mois",
              "priceMultiplier": 5.5
            }
          ]
        }
      ]
    },
    {
      "id": "apple-music",
      "categoryId": "c-music",
      "name": "Apple Music",
      "subtitle": "Abonnement Personnel",
      "price": 750,
      "logo": "../images/products/apple-music.png",
      "rating": "4.8",
      "clients": "1200",
      "description": "100 millions de titres en qualité sans perte avec audio spatial.",
      "features": [
        "Audio Spatial Dolby Atmos",
        "Qualité Lossless / Hi-Res (24 bits)",
        "Téléchargement pour écoute hors-ligne",
        "Paroles en temps réel"
      ],
      "options": [
        {
          "name": "Plan",
          "values": [
            {
              "label": "Personnel",
              "priceAdd": 0
            },
            {
              "label": "Famille",
              "priceAdd": 500
            }
          ]
        },
        {
          "name": "Durée",
          "values": [
            {
              "label": "1 Mois",
              "priceMultiplier": 1
            },
            {
              "label": "3 Mois",
              "priceMultiplier": 2.8
            }
          ]
        }
      ]
    },
    {
      "id": "youtube-music",
      "categoryId": "c-music",
      "name": "YouTube Music",
      "subtitle": "Inclus avec YouTube Premium",
      "price": 550,
      "logo": "../images/products/youtube-music.png",
      "rating": "4.6",
      "clients": "1900",
      "description": "Musique officielle + covers, remixes et lives exclusifs YouTube.",
      "features": [
        "Clips vidéo et audio dans la même app",
        "Lecture en arrière-plan (écran éteint)",
        "Catalogue illimité YouTube",
        "Playlists générées par IA"
      ],
      "options": [
        {
          "name": "Durée",
          "values": [
            {
              "label": "1 Mois",
              "priceMultiplier": 1
            },
            {
              "label": "3 Mois",
              "priceMultiplier": 2.8
            },
            {
              "label": "6 Mois",
              "priceMultiplier": 5.5
            }
          ]
        }
      ]
    },
    {
      "id": "tidal",
      "categoryId": "c-music",
      "name": "Tidal HiFi",
      "subtitle": "Qualité Audio Maximale",
      "price": 900,
      "logo": "../images/products/tidal.jpg",
      "rating": "4.7",
      "clients": "950",
      "description": "La seule plateforme musicale en qualité MQA et Dolby Atmos à la fois.",
      "features": [
        "Audio Master Quality Authenticated (MQA)",
        "Dolby Atmos & Sony 360 Reality Audio",
        "100+ millions de titres sans compression",
        "Vidéos et concerts exclusifs"
      ],
      "options": [
        {
          "name": "Plan",
          "values": [
            {
              "label": "HiFi",
              "priceAdd": 0
            },
            {
              "label": "HiFi Plus",
              "priceAdd": 600
            }
          ]
        },
        {
          "name": "Durée",
          "values": [
            {
              "label": "1 Mois",
              "priceMultiplier": 1
            },
            {
              "label": "3 Mois",
              "priceMultiplier": 2.8
            }
          ]
        }
      ]
    },
    {
      "id": "deezer",
      "categoryId": "c-music",
      "name": "Deezer Premium",
      "subtitle": "Musique sans limite",
      "price": 650,
      "logo": "../images/products/deezer.png",
      "rating": "4.5",
      "clients": "1400",
      "description": "90 millions de titres, podcasts et livres audio en qualité FLAC.",
      "features": [
        "Qualité audio FLAC sans perte",
        "Lecture hors-ligne illimitée",
        "Flow IA — radio personnalisée infinie",
        "Paroles synchronisées en temps réel"
      ],
      "options": [
        {
          "name": "Plan",
          "values": [
            {
              "label": "Individuel",
              "priceAdd": 0
            },
            {
              "label": "Famille",
              "priceAdd": 500
            }
          ]
        },
        {
          "name": "Durée",
          "values": [
            {
              "label": "1 Mois",
              "priceMultiplier": 1
            },
            {
              "label": "3 Mois",
              "priceMultiplier": 2.8
            },
            {
              "label": "6 Mois",
              "priceMultiplier": 5.5
            }
          ]
        }
      ]
    },
    {
      "id": "chatgpt",
      "categoryId": "c-ai",
      "name": "ChatGPT",
      "subtitle": "Abonnement Plus",
      "price": 2800,
      "logo": "../images/products/chatGpt.png",
      "rating": "5.0",
      "clients": "5100",
      "description": "Accédez à GPT-5.5, génération d'images et analyse de données ultra-avancée.",
      "features": [
        "GPT-5.5 (dernier modèle ultra-performant)",
        "Génération d'images ultra-réalistes",
        "Analyse de fichiers & code (Advanced Data Analysis)",
        "Mode vocal avancé et accès prioritaire"
      ],
      "options": [
        {
          "name": "Durée",
          "values": [
            {
              "label": "1 Mois",
              "priceMultiplier": 1
            },
            {
              "label": "3 Mois",
              "priceMultiplier": 2.8
            }
          ]
        }
      ]
    },
    {
      "id": "claude",
      "categoryId": "c-ai",
      "name": "Claude",
      "subtitle": "Claude Pro",
      "price": 2800,
      "logo": "../images/products/claude.png",
      "rating": "4.9",
      "clients": "1500",
      "description": "L'IA la plus avancée en codage, raisonnement et traitement de longs documents.",
      "features": [
        "Claude 3.7 Sonnet & Opus (derniers modèles)",
        "Fenêtre de contexte 200 000 tokens",
        "Mode de réflexion étendue (Extended Thinking)",
        "Accès prioritaire aux serveurs"
      ],
      "options": [
        {
          "name": "Durée",
          "values": [
            {
              "label": "1 Mois",
              "priceMultiplier": 1
            },
            {
              "label": "3 Mois",
              "priceMultiplier": 2.8
            }
          ]
        }
      ]
    },
    {
      "id": "gemini",
      "categoryId": "c-ai",
      "name": "Gemini",
      "subtitle": "Google One AI Premium",
      "price": 2800,
      "logo": "../images/products/gemeni.jpeg",
      "rating": "4.5",
      "clients": "2300",
      "description": "Gemini 2.5 Pro intégré à tout l'écosystème Google + 2 To de stockage.",
      "features": [
        "Gemini 2.5 Pro (dernier modèle)",
        "Intégré dans Gmail, Docs, Sheets & Meet",
        "2 To Google One Cloud inclus",
        "Deep Research & Canvas"
      ],
      "options": [
        {
          "name": "Durée",
          "values": [
            {
              "label": "1 Mois",
              "priceMultiplier": 1
            },
            {
              "label": "3 Mois",
              "priceMultiplier": 2.8
            }
          ]
        }
      ]
    },
    {
      "id": "grok",
      "categoryId": "c-ai",
      "name": "Grok",
      "subtitle": "Intégré à X Premium+",
      "price": 2200,
      "logo": "../images/products/grok.png",
      "rating": "4.3",
      "clients": "800",
      "description": "L'IA de xAI connectée en temps réel à l'actu via X (Twitter).",
      "features": [
        "Grok 3 avec mode Think (raisonnement)",
        "Accès en temps réel aux tendances X",
        "Génération d'images Aurora",
        "Badge bleu certifié X inclus"
      ],
      "options": [
        {
          "name": "Durée",
          "values": [
            {
              "label": "1 Mois",
              "priceMultiplier": 1
            },
            {
              "label": "3 Mois",
              "priceMultiplier": 2.8
            }
          ]
        }
      ]
    },
    {
      "id": "elevenlabs",
      "categoryId": "c-ai",
      "name": "ElevenLabs",
      "subtitle": "Plan Créateur",
      "price": 1400,
      "logo": "../images/products/elevenLabs.png",
      "rating": "4.9",
      "clients": "3100",
      "description": "Le leader mondial de la synthèse vocale IA pour vos vidéos et contenus.",
      "features": [
        "100 000 caractères/mois inclus",
        "Clonage vocal instantané",
        "Licence commerciale incluse",
        "30+ langues supportées"
      ],
      "options": [
        {
          "name": "Crédits",
          "values": [
            {
              "label": "100 000 Caractères",
              "priceAdd": 0
            },
            {
              "label": "500 000 Caractères",
              "priceAdd": 1400
            },
            {
              "label": "2 000 000 Caractères",
              "priceAdd": 4200
            }
          ]
        },
        {
          "name": "Durée",
          "values": [
            {
              "label": "1 Mois",
              "priceMultiplier": 1
            },
            {
              "label": "3 Mois",
              "priceMultiplier": 2.8
            }
          ]
        }
      ]
    },
    {
      "id": "flow-ai",
      "categoryId": "c-ai",
      "name": "Flow AI",
      "subtitle": "Générateur Visuel UI/UX",
      "price": 2500,
      "logo": "../images/products/flow.png",
      "rating": "4.8",
      "clients": "2100",
      "description": "Générez des interfaces utilisateur prêtes à l'emploi et du code propre (React, Tailwind) à partir de simples requêtes textuelles.",
      "features": [
        "Génération de composants UI instantanée",
        "Export de code propre (React, Vue, HTML/CSS)",
        "Intégration directe avec Figma",
        "Itérations de design assistées par l'IA"
      ],
      "options": [
        {
          "name": "Durée",
          "values": [
            {
              "label": "1 Mois",
              "priceMultiplier": 1
            },
            {
              "label": "3 Mois",
              "priceMultiplier": 2.8
            }
          ]
        }
      ]
    },
    {
      "id": "icloud",
      "categoryId": "c-cloud",
      "name": "Apple iCloud+",
      "subtitle": "Stockage & Confidentialité",
      "price": 200,
      "logo": "../images/products/iCloud.png",
      "rating": "4.9",
      "clients": "4100",
      "description": "Vos photos, fichiers et mots de passe synchronisés et sécurisés.",
      "features": [
        "Relais privé iCloud (VPN intégré)",
        "Masquer mon adresse e-mail",
        "Partage familial (jusqu'à 5 personnes)",
        "Vidéo sécurisée HomeKit"
      ],
      "options": [
        {
          "name": "Stockage",
          "values": [
            {
              "label": "50 Go",
              "priceMultiplier": 1
            },
            {
              "label": "200 Go",
              "priceMultiplier": 3
            },
            {
              "label": "2 To",
              "priceMultiplier": 9
            }
          ]
        },
        {
          "name": "Durée",
          "values": [
            {
              "label": "1 Mois",
              "priceMultiplier": 1
            },
            {
              "label": "12 Mois",
              "priceMultiplier": 10
            }
          ]
        }
      ]
    },
    {
      "id": "google-drive",
      "categoryId": "c-cloud",
      "name": "Google One",
      "subtitle": "Stockage Google Drive",
      "price": 280,
      "logo": "../images/products/google-drive.png",
      "rating": "4.8",
      "clients": "5000",
      "description": "Stockage partagé entre Drive, Gmail et Photos avec avantages Google.",
      "features": [
        "Partagé avec Gmail, Drive & Google Photos",
        "Partage familial (jusqu'à 5 personnes)",
        "Retouche photo IA Magic Eraser",
        "Assistance Google prioritaire"
      ],
      "options": [
        {
          "name": "Stockage",
          "values": [
            {
              "label": "100 Go",
              "priceMultiplier": 1
            },
            {
              "label": "200 Go",
              "priceMultiplier": 1.8
            },
            {
              "label": "2 To",
              "priceMultiplier": 5
            }
          ]
        },
        {
          "name": "Durée",
          "values": [
            {
              "label": "1 Mois",
              "priceMultiplier": 1
            },
            {
              "label": "12 Mois",
              "priceMultiplier": 10
            }
          ]
        }
      ]
    },
    {
      "id": "onedrive",
      "categoryId": "c-cloud",
      "name": "Microsoft OneDrive",
      "subtitle": "Stockage Cloud Personnel",
      "price": 250,
      "logo": "../images/products/one-drive.jpg",
      "rating": "4.7",
      "clients": "3200",
      "description": "Sauvegardez, protégez, synchronisez et accédez à vos photos et fichiers sur tous vos appareils.",
      "features": [
        "Coffre-fort personnel sécurisé",
        "Sauvegarde automatique des photos",
        "Partage de fichiers simplifié",
        "Intégration native avec Windows & Office"
      ],
      "options": [
        {
          "name": "Stockage",
          "values": [
            {
              "label": "100 Go",
              "priceMultiplier": 1
            },
            {
              "label": "1 To (Microsoft 365)",
              "priceMultiplier": 4
            },
            {
              "label": "6 To (Famille)",
              "priceMultiplier": 6
            }
          ]
        },
        {
          "name": "Durée",
          "values": [
            {
              "label": "1 Mois",
              "priceMultiplier": 1
            },
            {
              "label": "12 Mois",
              "priceMultiplier": 10
            }
          ]
        }
      ]
    },
    {
      "id": "duolingo",
      "categoryId": "c-education",
      "name": "Duolingo Super",
      "subtitle": "Apprentissage des langues sans pub",
      "price": 400,
      "logo": "../images/products/doulingo.png",
      "rating": "4.8",
      "clients": "3600",
      "description": "Apprenez une langue rapidement sans publicité ni limites.",
      "features": [
        "Vies illimitées",
        "Aucune publicité",
        "Entraînements personnalisés par IA",
        "Restauration de série (streak repair)"
      ],
      "options": [
        {
          "name": "Durée",
          "values": [
            {
              "label": "1 Mois",
              "priceMultiplier": 1
            },
            {
              "label": "6 Mois",
              "priceMultiplier": 5
            },
            {
              "label": "1 An",
              "priceMultiplier": 8
            }
          ]
        }
      ]
    },
    {
      "id": "coursera",
      "categoryId": "c-education",
      "name": "Coursera Plus",
      "subtitle": "Accès illimité aux certifications",
      "price": 2500,
      "logo": "../images/products/coursera.png",
      "rating": "4.9",
      "clients": "1400",
      "description": "Accédez à 7 000+ cours et certifications de Google, IBM, Stanford et plus.",
      "features": [
        "7 000+ cours inclus sans surcoût",
        "Certificats reconnus par les entreprises",
        "Projets guidés et apprentissage hors-ligne",
        "Accès aux Specializations & Professional Certificates"
      ],
      "options": [
        {
          "name": "Durée",
          "values": [
            {
              "label": "1 Mois",
              "priceMultiplier": 1
            },
            {
              "label": "3 Mois",
              "priceMultiplier": 2.8
            },
            {
              "label": "1 An",
              "priceMultiplier": 9
            }
          ]
        }
      ]
    },
    {
      "id": "udemy",
      "categoryId": "c-education",
      "name": "Udemy Personal Plan",
      "subtitle": "Apprentissage Pro",
      "price": 2000,
      "logo": "../images/products/udemy.png",
      "rating": "4.7",
      "clients": "2050",
      "description": "Accédez à plus de 12 000 cours de top instructeurs (IT, business, design…).",
      "features": [
        "12 000+ cours top-rated inclus",
        "Certificats de réalisation officiels",
        "Projets pratiques & labs IT",
        "Application mobile pour apprendre hors-ligne"
      ],
      "options": [
        {
          "name": "Durée",
          "values": [
            {
              "label": "1 Mois",
              "priceMultiplier": 1
            },
            {
              "label": "3 Mois",
              "priceMultiplier": 2.8
            },
            {
              "label": "1 An",
              "priceMultiplier": 9
            }
          ]
        }
      ]
    },
    {
      "id": "linkedin-learning",
      "categoryId": "c-education",
      "name": "LinkedIn Learning",
      "subtitle": "Formation Professionnelle",
      "price": 2200,
      "logo": "../images/products/linked-in.png",
      "rating": "4.6",
      "clients": "1100",
      "description": "Des milliers de formations certifiées pour booster votre carrière professionnelle.",
      "features": [
        "22 000+ cours en business, tech & créativité",
        "Certificats ajoutables directement sur LinkedIn",
        "Recommandations personnalisées par IA",
        "Accès hors-ligne sur mobile"
      ],
      "options": [
        {
          "name": "Durée",
          "values": [
            {
              "label": "1 Mois",
              "priceMultiplier": 1
            },
            {
              "label": "3 Mois",
              "priceMultiplier": 2.8
            },
            {
              "label": "1 An",
              "priceMultiplier": 9
            }
          ]
        }
      ]
    },
    {
      "id": "skillshare",
      "categoryId": "c-education",
      "name": "Skillshare Premium",
      "subtitle": "Créativité & Design",
      "price": 1500,
      "logo": "../images/products/skillshare.png",
      "rating": "4.5",
      "clients": "880",
      "description": "La plateforme de référence pour apprendre le design, la photo, la vidéo et le business.",
      "features": [
        "40 000+ cours en création et business",
        "Projets pratiques à chaque cours",
        "Communauté active d'apprenants",
        "Téléchargement pour apprentissage hors-ligne"
      ],
      "options": [
        {
          "name": "Durée",
          "values": [
            {
              "label": "1 Mois",
              "priceMultiplier": 1
            },
            {
              "label": "3 Mois",
              "priceMultiplier": 2.7
            },
            {
              "label": "1 An",
              "priceMultiplier": 8
            }
          ]
        }
      ]
    },
    {
      "id": "canva",
      "categoryId": "c-productivity",
      "name": "Canva Pro",
      "subtitle": "Design Graphique Premium",
      "price": 650,
      "logo": "../images/products/canva.png",
      "rating": "4.9",
      "clients": "8400",
      "description": "L'outil de design n°1 avec tous les éléments, templates et IA débloqués.",
      "features": [
        "100+ millions d'images, vidéos et éléments premium",
        "Suppression d'arrière-plan en 1 clic (Magic Studio)",
        "Génération d'images par IA (Dream Lab)",
        "Export SVG, PDF haute qualité et formats pro"
      ],
      "options": [
        {
          "name": "Durée",
          "values": [
            {
              "label": "1 Mois",
              "priceMultiplier": 1
            },
            {
              "label": "6 Mois",
              "priceMultiplier": 5
            },
            {
              "label": "1 An",
              "priceMultiplier": 9
            }
          ]
        }
      ]
    },
    {
      "id": "notion",
      "categoryId": "c-productivity",
      "name": "Notion Plus",
      "subtitle": "Notes & Gestion de projet",
      "price": 900,
      "logo": "../images/products/notion.png",
      "rating": "4.8",
      "clients": "2600",
      "description": "Votre second cerveau tout-en-un : notes, bases de données, projets et wikis.",
      "features": [
        "Blocs & pages illimités",
        "Historique des versions (90 jours)",
        "Upload de fichiers illimité",
        "Collaboration avec invités illimités"
      ],
      "options": [
        {
          "name": "Plan",
          "values": [
            {
              "label": "Plus",
              "priceAdd": 0
            },
            {
              "label": "Plus + IA",
              "priceAdd": 1000
            }
          ]
        },
        {
          "name": "Durée",
          "values": [
            {
              "label": "1 Mois",
              "priceMultiplier": 1
            },
            {
              "label": "1 An",
              "priceMultiplier": 9
            }
          ]
        }
      ]
    },
    {
      "id": "google-workspace",
      "categoryId": "c-productivity",
      "name": "Google Workspace",
      "subtitle": "Business Starter",
      "price": 900,
      "logo": "../images/products/google-workspace.png",
      "rating": "4.6",
      "clients": "1200",
      "description": "Suite Google pro avec email d'entreprise, Meet avancé et Drive dédié.",
      "features": [
        "Email professionnel @votredomaine",
        "Google Meet jusqu'à 100 participants",
        "30 Go de stockage Drive par utilisateur",
        "Sécurité et administration avancées"
      ],
      "options": [
        {
          "name": "Licences",
          "values": [
            {
              "label": "1 Utilisateur",
              "priceMultiplier": 1
            },
            {
              "label": "3 Utilisateurs",
              "priceMultiplier": 2.8
            },
            {
              "label": "5 Utilisateurs",
              "priceMultiplier": 4.5
            }
          ]
        },
        {
          "name": "Durée",
          "values": [
            {
              "label": "1 Mois",
              "priceMultiplier": 1
            },
            {
              "label": "1 An",
              "priceMultiplier": 10
            }
          ]
        }
      ]
    },
    {
      "id": "google-antigravity",
      "categoryId": "c-productivity",
      "name": "AntiGravity",
      "subtitle": "IDE Vibe Coding",
      "price": 1200,
      "logo": "../images/products/antigravity.png",
      "rating": "4.7",
      "clients": "1500",
      "description": "L'IDE propulsé par l'IA de nouvelle génération. Codez à l'instinct (vibe coding) et laissez l'IA construire vos applications entières.",
      "features": [
        "Vibe Coding : création d'apps via le langage naturel",
        "Agents IA autonomes multi-fichiers",
        "Intégration native avec GPT-5.5 & Claude Opus",
        "Déploiement en 1 clic"
      ],
      "options": [
        {
          "name": "Durée",
          "values": [
            {
              "label": "1 Mois",
              "priceMultiplier": 1
            },
            {
              "label": "6 Mois",
              "priceMultiplier": 5
            },
            {
              "label": "1 An",
              "priceMultiplier": 9
            }
          ]
        }
      ]
    },
    {
      "id": "grammarly",
      "categoryId": "c-productivity",
      "name": "Grammarly Premium",
      "subtitle": "Rédaction & Correction IA",
      "price": 1800,
      "logo": "../images/products/grammarly.png",
      "rating": "4.8",
      "clients": "3200",
      "description": "L'assistant IA de rédaction qui corrige, améliore et réécrit vos textes en anglais.",
      "features": [
        "Correction grammaticale avancée en temps réel",
        "Suggestions de style et de ton",
        "Réécriture et résumé assistés par IA",
        "Compatible avec tous les navigateurs & apps"
      ],
      "options": [
        {
          "name": "Durée",
          "values": [
            {
              "label": "1 Mois",
              "priceMultiplier": 1
            },
            {
              "label": "3 Mois",
              "priceMultiplier": 2.7
            },
            {
              "label": "1 An",
              "priceMultiplier": 8
            }
          ]
        }
      ]
    },
    {
      "id": "free-fire",
      "categoryId": "c-games",
      "name": "Diamants Free Fire",
      "subtitle": "Recharge Player ID directe",
      "price": 140,
      "logo": "../images/products/free-fire.jpg",
      "rating": "4.5",
      "clients": "9400",
      "description": "Rechargez votre compte Free Fire via votre Player ID — réception en moins de 3 minutes.",
      "features": [
        "Seulement votre Player ID requis",
        "Livraison en moins de 3 minutes",
        "Utilisables pour l'Elite Pass & skins",
        "Offres bonus disponibles régulièrement"
      ],
      "options": [
        {
          "name": "Diamants",
          "values": [
            {
              "label": "100 Diamants",
              "priceMultiplier": 1
            },
            {
              "label": "310 Diamants",
              "priceMultiplier": 2.8
            },
            {
              "label": "520 Diamants",
              "priceMultiplier": 4.5
            },
            {
              "label": "1060 Diamants",
              "priceMultiplier": 8.5
            },
            {
              "label": "2180 Diamants",
              "priceMultiplier": 16
            }
          ]
        }
      ],
      "priceUnit": "DA/100 Diamonds"
    },
    {
      "id": "fifa",
      "categoryId": "c-games",
      "name": "FC Points (EA FC 25)",
      "subtitle": "Recharge instantanée",
      "price": 700,
      "logo": "../images/products/fifa.jpg",
      "rating": "4.7",
      "clients": "6200",
      "description": "Construisez votre équipe Ultimate Team avec des FC Points officiels.",
      "features": [
        "Transfert immédiat sur votre compte EA",
        "Compatible PC, PlayStation, Xbox",
        "Achat de packs & accès aux Drafts",
        "Valable sur EA FC 25"
      ],
      "options": [
        {
          "name": "Points",
          "values": [
            {
              "label": "1 050 FC Points",
              "priceMultiplier": 1
            },
            {
              "label": "2 800 FC Points",
              "priceMultiplier": 2.5
            },
            {
              "label": "5 900 FC Points",
              "priceMultiplier": 5
            },
            {
              "label": "12 000 FC Points",
              "priceMultiplier": 9.5
            }
          ]
        }
      ],
      "priceUnit": "DA/1 050 Points"
    },
    {
      "id": "fortnite",
      "categoryId": "c-games",
      "name": "V-Bucks Fortnite",
      "subtitle": "Recharge officielle Epic Games",
      "price": 550,
      "logo": "../images/products/fortnite.png",
      "rating": "4.8",
      "clients": "7800",
      "description": "Achetez skins, Battle Pass et cosmétiques Fortnite avec des V-Bucks officiels.",
      "features": [
        "Code numérique livré instantanément",
        "Utilisables sur toutes les plateformes (PC, PS, Xbox, Switch)",
        "Valables pour le Battle Pass & la boutique",
        "Sécurisé 100%"
      ],
      "options": [
        {
          "name": "V-Bucks",
          "values": [
            {
              "label": "1 000 V-Bucks",
              "priceMultiplier": 1
            },
            {
              "label": "2 800 V-Bucks",
              "priceMultiplier": 2.5
            },
            {
              "label": "5 000 V-Bucks",
              "priceMultiplier": 4.2
            },
            {
              "label": "13 500 V-Bucks",
              "priceMultiplier": 10
            }
          ]
        }
      ],
      "priceUnit": "DA/1 000 V-Bucks"
    },
    {
      "id": "minecraft",
      "categoryId": "c-games",
      "name": "Minecraft",
      "subtitle": "Compte Java + Bedrock — Achat Unique à vie",
      "price": 5500,
      "logo": "../images/products/minecraft.png",
      "rating": "4.9",
      "clients": "4500",
      "description": "Achat unique et définitif : jouez à Minecraft Java & Bedrock Edition à vie sur PC.",
      "features": [
        "Java Edition + Bedrock Edition inclus (un seul achat)",
        "Toutes les mises à jour futures gratuites à vie",
        "Accès aux serveurs multijoueurs officiels",
        "Skins & capes personnalisables"
      ],
      "options": [
        {
          "name": "Plateforme",
          "values": [
            {
              "label": "PC (Java + Bedrock)",
              "priceMultiplier": 1
            },
            {
              "label": "Xbox / Game Pass",
              "priceMultiplier": 1.2
            },
            {
              "label": "Mobile (Bedrock PE)",
              "priceMultiplier": 0.4
            }
          ]
        }
      ],
      "priceUnit": "DA/À vie"
    },
    {
      "id": "pubg",
      "categoryId": "c-games",
      "name": "PUBG Mobile UC",
      "subtitle": "Recharge instantanée",
      "price": 110,
      "logo": "../images/products/pubg.png",
      "rating": "4.6",
      "clients": "8900",
      "description": "Rechargez vos Unknown Cash PUBG Mobile pour débloquer le Royal Pass et des skins exclusifs.",
      "features": [
        "Seulement votre Player ID requis",
        "Livraison officielle immédiate",
        "Débloque le Royal Pass & tenues exclusives",
        "Sécurisé à 100%"
      ],
      "options": [
        {
          "name": "UC",
          "values": [
            {
              "label": "60 UC",
              "priceMultiplier": 1
            },
            {
              "label": "325 UC",
              "priceMultiplier": 4.5
            },
            {
              "label": "660 UC",
              "priceMultiplier": 8.5
            },
            {
              "label": "1500 UC",
              "priceMultiplier": 18
            },
            {
              "label": "3850 UC",
              "priceMultiplier": 44
            }
          ]
        }
      ],
      "priceUnit": "DA/60 UC"
    },
    {
      "id": "efootball",
      "categoryId": "c-games",
      "name": "eFootball",
      "subtitle": "Pièces MyClub",
      "price": 550,
      "logo": "../images/products/eFootball.png",
      "rating": "4.5",
      "clients": "3100",
      "description": "Achète des pièces eFootball pour recruter les meilleurs joueurs et légendes.",
      "features": [
        "Ouverture de packs de joueurs",
        "Légendes et icônes disponibles",
        "Compatible Mobile & Console (PS/Xbox)",
        "Renforcez votre équipe rapidement"
      ],
      "options": [
        {
          "name": "Pièces",
          "values": [
            {
              "label": "1 040 Pièces",
              "priceMultiplier": 1
            },
            {
              "label": "3 300 Pièces",
              "priceMultiplier": 2.9
            },
            {
              "label": "6 600 Pièces",
              "priceMultiplier": 5.5
            }
          ]
        }
      ],
      "priceUnit": "DA/1 040 Pièces"
    },
    {
      "id": "smart-proxy",
      "categoryId": "c-vpn",
      "name": "Smart Proxy",
      "subtitle": "IP Résidentielles",
      "price": 2000,
      "logo": "../images/products/smart-proxy.png",
      "rating": "4.6",
      "clients": "850",
      "description": "Proxys résidentiels rotatifs ultra-rapides pour vos besoins professionnels.",
      "features": [
        "Rotation IP automatique",
        "Taux de succès de 99%",
        "Requêtes illimitées",
        "Support API REST complet"
      ],
      "options": [
        {
          "name": "Bande passante",
          "values": [
            {
              "label": "5 Go",
              "priceMultiplier": 1
            },
            {
              "label": "20 Go",
              "priceMultiplier": 3.5
            },
            {
              "label": "50 Go",
              "priceMultiplier": 8
            }
          ]
        }
      ]
    },
    {
      "id": "nord-vpn",
      "categoryId": "c-vpn",
      "name": "NordVPN",
      "subtitle": "Sécurité & Confidentialité",
      "price": 900,
      "logo": "../images/products/nord-vpn.png",
      "rating": "4.8",
      "clients": "3500",
      "description": "Le leader mondial du VPN avec une sécurité de niveau militaire et des serveurs ultra-rapides.",
      "features": [
        "Double VPN & Onion Over VPN",
        "Protection contre les menaces (CyberSec)",
        "6 connexions simultanées",
        "Accès à 5000+ serveurs mondiaux"
      ],
      "options": [
        {
          "name": "Durée",
          "values": [
            {
              "label": "1 Mois",
              "priceMultiplier": 1
            },
            {
              "label": "6 Mois",
              "priceMultiplier": 5.2
            },
            {
              "label": "12 Mois",
              "priceMultiplier": 9.5
            }
          ]
        }
      ]
    },
    {
      "id": "expressvpn",
      "categoryId": "c-vpn",
      "name": "ExpressVPN",
      "subtitle": "Le VPN le plus rapide",
      "price": 1100,
      "logo": "../images/products/expressVpn.png",
      "rating": "4.8",
      "clients": "1900",
      "description": "Le VPN le plus rapide du marché avec des serveurs optimisés pour le streaming.",
      "features": [
        "Serveurs dans 105 pays",
        "Protocole Lightway ultra-rapide (propriétaire)",
        "Débloque Netflix, Disney+, BBC iPlayer",
        "Kill Switch & split tunneling"
      ],
      "options": [
        {
          "name": "Durée",
          "values": [
            {
              "label": "1 Mois",
              "priceMultiplier": 1
            },
            {
              "label": "6 Mois",
              "priceMultiplier": 5
            },
            {
              "label": "12 Mois",
              "priceMultiplier": 8
            }
          ]
        }
      ]
    },
    {
      "id": "surfshark",
      "categoryId": "c-vpn",
      "name": "Surfshark",
      "subtitle": "Appareils illimités",
      "price": 700,
      "logo": "../images/products/surfshark.png",
      "rating": "4.7",
      "clients": "1600",
      "description": "Un seul abonnement pour un nombre illimité d'appareils — idéal pour toute la famille.",
      "features": [
        "Connexions simultanées illimitées",
        "CleanWeb — bloqueur de pub & malware",
        "Mode Camouflage (obfuscation DPI)",
        "Adresse IP dédiée disponible"
      ],
      "options": [
        {
          "name": "Durée",
          "values": [
            {
              "label": "1 Mois",
              "priceMultiplier": 1
            },
            {
              "label": "6 Mois",
              "priceMultiplier": 4.5
            },
            {
              "label": "12 Mois",
              "priceMultiplier": 7
            }
          ]
        }
      ]
    },
    {
      "id": "my-fitness-pal",
      "categoryId": "c-fitness",
      "name": "MyFitnessPal Premium",
      "subtitle": "Nutrition & Suivi Santé Pro",
      "price": 800,
      "logo": "../images/products/myFitness.png",
      "rating": "4.7",
      "clients": "2200",
      "description": "Suivez vos calories, macros et atteignez votre physique idéal sans pub.",
      "features": [
        "Base de données de 14 millions d'aliments",
        "Scanner de code-barres illimité",
        "Suivi des macronutriments par repas",
        "Analyses et tendances nutritionnelles avancées"
      ],
      "options": [
        {
          "name": "Durée",
          "values": [
            {
              "label": "1 Mois",
              "priceMultiplier": 1
            },
            {
              "label": "6 Mois",
              "priceMultiplier": 5
            },
            {
              "label": "1 An",
              "priceMultiplier": 8
            }
          ]
        }
      ]
    },
    {
      "id": "yazio",
      "categoryId": "c-fitness",
      "name": "YAZIO PRO",
      "subtitle": "Tracker Calories & Santé",
      "price": 600,
      "logo": "../images/products/yazio.png",
      "rating": "4.8",
      "clients": "1800",
      "description": "Le compteur de calories le plus design d'Europe avec coach IA.",
      "features": [
        "500+ recettes diététiques et plans de repas",
        "Suivi de l'hydratation quotidienne",
        "Jeûne intermittent guidé",
        "Coach IA personnalisé"
      ],
      "options": [
        {
          "name": "Durée",
          "values": [
            {
              "label": "1 Mois",
              "priceMultiplier": 1
            },
            {
              "label": "3 Mois",
              "priceMultiplier": 2.7
            },
            {
              "label": "1 An",
              "priceMultiplier": 7
            }
          ]
        }
      ]
    },
    {
      "id": "nike-training",
      "categoryId": "c-fitness",
      "name": "Nike Training Club",
      "subtitle": "Abonnement Premium",
      "price": 1200,
      "logo": "../images/products/nike-traning.png",
      "rating": "4.9",
      "clients": "2500",
      "description": "Des programmes guidés par les meilleurs entraîneurs Nike pour tous niveaux.",
      "features": [
        "200+ entraînements guidés (force, cardio, yoga…)",
        "Plans d'entraînement personnalisés",
        "Conseils nutrition par des experts Nike",
        "Intégration Apple Watch & Nike Run Club"
      ],
      "options": [
        {
          "name": "Durée",
          "values": [
            {
              "label": "1 Mois",
              "priceMultiplier": 1
            },
            {
              "label": "3 Mois",
              "priceMultiplier": 2.7
            },
            {
              "label": "1 An",
              "priceMultiplier": 8
            }
          ]
        }
      ]
    },
    {
      "id": "strava",
      "categoryId": "c-fitness",
      "name": "Strava Premium",
      "subtitle": "Analyse & Performance",
      "price": 700,
      "logo": "../images/products/strava.png",
      "rating": "4.7",
      "clients": "1300",
      "description": "L'app de running et cyclisme n°1 avec des analyses de performance avancées.",
      "features": [
        "Analyse de segments & classements KOM/QOM",
        "Tableaux de bord de performance détaillés",
        "Plans d'entraînement adaptatifs",
        "Comparaison avec vos activités passées"
      ],
      "options": [
        {
          "name": "Durée",
          "values": [
            {
              "label": "1 Mois",
              "priceMultiplier": 1
            },
            {
              "label": "3 Mois",
              "priceMultiplier": 2.7
            },
            {
              "label": "1 An",
              "priceMultiplier": 8
            }
          ]
        }
      ]
    },
    {
      "id": "freeletics",
      "categoryId": "c-fitness",
      "name": "Freeletics",
      "subtitle": "Coach IA Fitness",
      "price": 1000,
      "logo": "../images/products/freeletics.png",
      "rating": "4.6",
      "clients": "1050",
      "description": "Entraînements sans matériel générés par IA, adaptés à votre niveau et vos objectifs.",
      "features": [
        "Coach IA qui adapte chaque séance à votre forme",
        "Entraînements 100% sans équipement",
        "Suivi de progression hebdomadaire",
        "Nutrition et mindset inclus"
      ],
      "options": [
        {
          "name": "Durée",
          "values": [
            {
              "label": "1 Mois",
              "priceMultiplier": 1
            },
            {
              "label": "3 Mois",
              "priceMultiplier": 2.7
            },
            {
              "label": "1 An",
              "priceMultiplier": 8
            }
          ]
        }
      ]
    },
    {
      "id": "mobilis",
      "categoryId": "c-mobile",
      "name": "Recharge Mobilis",
      "subtitle": "Recharge instantanée sur numéro",
      "price": 110,
      "logo": "../images/products/mobilis.png",
      "rating": "4.8",
      "clients": "12000",
      "description": "Rechargez votre ligne Mobilis instantanément — saisissez simplement votre numéro.",
      "features": [
        "Livraison immédiate sur votre numéro",
        "Valable pour appels, SMS et data",
        "Compatible forfaits prépayés & postpayés",
        "Confirmation par SMS"
      ],
      "options": [
        {
          "name": "Montant",
          "values": [
            {
              "label": "100 DA",
              "priceAdd": 0
            },
            {
              "label": "200 DA",
              "priceAdd": 100
            },
            {
              "label": "500 DA",
              "priceAdd": 400
            },
            {
              "label": "1000 DA",
              "priceAdd": 900
            },
            {
              "label": "2000 DA",
              "priceAdd": 1900
            }
          ]
        }
      ],
      "priceUnit": "DA"
    },
    {
      "id": "djezzy",
      "categoryId": "c-mobile",
      "name": "Recharge Djezzy",
      "subtitle": "Recharge instantanée sur numéro",
      "price": 110,
      "logo": "../images/products/djezzy.png",
      "rating": "4.7",
      "clients": "10500",
      "description": "Rechargez votre ligne Djezzy instantanément — saisissez simplement votre numéro.",
      "features": [
        "Livraison immédiate sur votre numéro",
        "Valable pour appels, SMS et data",
        "Compatible forfaits prépayés & postpayés",
        "Confirmation par SMS"
      ],
      "options": [
        {
          "name": "Montant",
          "values": [
            {
              "label": "100 DA",
              "priceAdd": 0
            },
            {
              "label": "200 DA",
              "priceAdd": 100
            },
            {
              "label": "500 DA",
              "priceAdd": 400
            },
            {
              "label": "1000 DA",
              "priceAdd": 900
            },
            {
              "label": "2000 DA",
              "priceAdd": 1900
            }
          ]
        }
      ],
      "priceUnit": "DA"
    },
    {
      "id": "ooredoo",
      "categoryId": "c-mobile",
      "name": "Recharge Ooredoo",
      "subtitle": "Recharge instantanée sur numéro",
      "price": 110,
      "logo": "../images/products/ooredoo.png",
      "rating": "4.7",
      "clients": "9800",
      "description": "Rechargez votre ligne Ooredoo instantanément — saisissez simplement votre numéro.",
      "features": [
        "Livraison immédiate sur votre numéro",
        "Valable pour appels, SMS et data",
        "Compatible forfaits prépayés & postpayés",
        "Confirmation par SMS"
      ],
      "options": [
        {
          "name": "Montant",
          "values": [
            {
              "label": "100 DA",
              "priceAdd": 0
            },
            {
              "label": "200 DA",
              "priceAdd": 100
            },
            {
              "label": "500 DA",
              "priceAdd": 400
            },
            {
              "label": "1000 DA",
              "priceAdd": 900
            },
            {
              "label": "2000 DA",
              "priceAdd": 1900
            }
          ]
        }
      ],
      "priceUnit": "DA"
    },
    {
      "id": "gc-itunes",
      "categoryId": "c-giftcards",
      "name": "Carte Cadeau iTunes",
      "subtitle": "App Store & Apple Services",
      "price": 1400,
      "logo": "../images/products/iTunes.png",
      "rating": "4.9",
      "clients": "7200",
      "description": "Achetez des apps, jeux, musique et abonnements sur l'App Store et les services Apple.",
      "features": [
        "Utilisable sur App Store, Apple Music, iCloud",
        "Code numérique livré instantanément",
        "Valable dans 45+ pays",
        "Aucune date d'expiration"
      ],
      "options": [
        {
          "name": "Valeur",
          "values": [
            {
              "label": "10 USD",
              "priceMultiplier": 1
            },
            {
              "label": "25 USD",
              "priceMultiplier": 2.4
            },
            {
              "label": "50 USD",
              "priceMultiplier": 4.7
            },
            {
              "label": "100 USD",
              "priceMultiplier": 9.2
            }
          ]
        }
      ],
      "priceUnit": "DA/10$"
    },
    {
      "id": "gc-google-play",
      "categoryId": "c-giftcards",
      "name": "Carte Cadeau Google Play",
      "subtitle": "Apps, jeux & contenu Android",
      "price": 1400,
      "logo": "../images/products/google-play.png",
      "rating": "4.9",
      "clients": "8100",
      "description": "Achetez apps, jeux, films et abonnements sur le Google Play Store.",
      "features": [
        "Utilisable sur Google Play, YouTube, Google One",
        "Code numérique livré instantanément",
        "Compatible avec tout appareil Android",
        "Aucune date d'expiration"
      ],
      "options": [
        {
          "name": "Valeur",
          "values": [
            {
              "label": "10 USD",
              "priceMultiplier": 1
            },
            {
              "label": "25 USD",
              "priceMultiplier": 2.4
            },
            {
              "label": "50 USD",
              "priceMultiplier": 4.7
            },
            {
              "label": "100 USD",
              "priceMultiplier": 9.2
            }
          ]
        }
      ],
      "priceUnit": "DA/10$"
    },
    {
      "id": "gc-amazon",
      "categoryId": "c-giftcards",
      "name": "Carte Cadeau Amazon",
      "subtitle": "Shopping & services Amazon",
      "price": 1400,
      "logo": "../images/products/amazon.png",
      "rating": "4.8",
      "clients": "5600",
      "description": "Utilisez votre solde Amazon pour acheter des millions de produits ou des abonnements Prime.",
      "features": [
        "Valable sur Amazon.com, .fr, .co.uk et plus",
        "Code numérique livré instantanément",
        "Utilisable pour Prime, Audible, Kindle",
        "Aucune date d'expiration"
      ],
      "options": [
        {
          "name": "Valeur",
          "values": [
            {
              "label": "10 USD",
              "priceMultiplier": 1
            },
            {
              "label": "25 USD",
              "priceMultiplier": 2.4
            },
            {
              "label": "50 USD",
              "priceMultiplier": 4.7
            },
            {
              "label": "100 USD",
              "priceMultiplier": 9.2
            }
          ]
        }
      ],
      "priceUnit": "DA/10$"
    },
    {
      "id": "gc-steam",
      "categoryId": "c-giftcards",
      "name": "Carte Cadeau Steam",
      "subtitle": "Jeux PC & contenus Steam",
      "price": 1400,
      "logo": "../images/products/steam.jpg",
      "rating": "4.9",
      "clients": "6800",
      "description": "Rechargez votre portefeuille Steam pour acheter des jeux, DLC et items.",
      "features": [
        "Ajout direct au portefeuille Steam",
        "Code numérique livré instantanément",
        "Compatible avec tous les jeux Steam",
        "Utilisable pour les abonnements Steam"
      ],
      "options": [
        {
          "name": "Valeur",
          "values": [
            {
              "label": "10 USD",
              "priceMultiplier": 1
            },
            {
              "label": "20 USD",
              "priceMultiplier": 1.9
            },
            {
              "label": "50 USD",
              "priceMultiplier": 4.7
            },
            {
              "label": "100 USD",
              "priceMultiplier": 9.2
            }
          ]
        }
      ],
      "priceUnit": "DA/10$"
    },
    {
      "id": "gc-playstation",
      "categoryId": "c-giftcards",
      "name": "Carte PSN PlayStation",
      "subtitle": "PS Store & PlayStation Plus",
      "price": 1400,
      "logo": "../images/products/play-station.png",
      "rating": "4.8",
      "clients": "5900",
      "description": "Rechargez votre portefeuille PlayStation Store pour acheter jeux, DLC et abonnements PS Plus.",
      "features": [
        "Ajout direct au compte PlayStation Network",
        "Code numérique livré instantanément",
        "Compatible PS4, PS5 et app mobile",
        "Utilisable pour PS Plus & PS Now"
      ],
      "options": [
        {
          "name": "Valeur",
          "values": [
            {
              "label": "10 USD",
              "priceMultiplier": 1
            },
            {
              "label": "20 USD",
              "priceMultiplier": 1.9
            },
            {
              "label": "50 USD",
              "priceMultiplier": 4.7
            },
            {
              "label": "100 USD",
              "priceMultiplier": 9.2
            }
          ]
        }
      ],
      "priceUnit": "DA/10$"
    },
    {
      "id": "gc-xbox",
      "categoryId": "c-giftcards",
      "name": "Carte Cadeau Xbox",
      "subtitle": "Microsoft Store & Game Pass",
      "price": 1400,
      "logo": "../images/products/xBox.png",
      "rating": "4.8",
      "clients": "4700",
      "description": "Rechargez votre solde Microsoft pour acheter des jeux Xbox et des abonnements Game Pass.",
      "features": [
        "Utilisable sur Xbox Store & Microsoft Store",
        "Code numérique livré instantanément",
        "Compatible Xbox Series X/S, Xbox One & PC",
        "Utilisable pour Xbox Game Pass Ultimate"
      ],
      "options": [
        {
          "name": "Valeur",
          "values": [
            {
              "label": "10 USD",
              "priceMultiplier": 1
            },
            {
              "label": "25 USD",
              "priceMultiplier": 2.4
            },
            {
              "label": "50 USD",
              "priceMultiplier": 4.7
            },
            {
              "label": "100 USD",
              "priceMultiplier": 9.2
            }
          ]
        }
      ],
      "priceUnit": "DA/10$"
    },
    {
      "id": "tradingview",
      "categoryId": "c-finance",
      "name": "TradingView",
      "subtitle": "Analyse Technique Pro",
      "price": 1800,
      "logo": "../images/products/trading-view.png",
      "rating": "4.9",
      "clients": "3800",
      "description": "La plateforme d'analyse de marchés financiers et crypto la plus utilisée au monde.",
      "features": [
        "Graphiques avancés multi-timeframes",
        "100+ indicateurs techniques & scripts Pine",
        "Alertes en temps réel sur prix & indicateurs",
        "Données sur actions, forex, crypto et matières premières"
      ],
      "options": [
        {
          "name": "Plan",
          "values": [
            {
              "label": "Essential",
              "priceAdd": 0
            },
            {
              "label": "Plus",
              "priceAdd": 1200
            },
            {
              "label": "Premium",
              "priceAdd": 3000
            }
          ]
        },
        {
          "name": "Durée",
          "values": [
            {
              "label": "1 Mois",
              "priceMultiplier": 1
            },
            {
              "label": "6 Mois",
              "priceMultiplier": 5
            },
            {
              "label": "1 An",
              "priceMultiplier": 9
            }
          ]
        }
      ]
    },
    {
      "id": "coinstats",
      "categoryId": "c-finance",
      "name": "CoinStats Pro",
      "subtitle": "Suivi de Portefeuille Crypto",
      "price": 900,
      "logo": "../images/products/coin-stats.png",
      "rating": "4.7",
      "clients": "2100",
      "description": "Suivez tous vos actifs crypto en temps réel depuis une seule application.",
      "features": [
        "Connexion à 300+ exchanges & wallets",
        "Alertes de prix et de portefeuille",
        "Analyse P&L détaillée par actif",
        "Actualités crypto agrégées en temps réel"
      ],
      "options": [
        {
          "name": "Durée",
          "values": [
            {
              "label": "1 Mois",
              "priceMultiplier": 1
            },
            {
              "label": "3 Mois",
              "priceMultiplier": 2.7
            },
            {
              "label": "1 An",
              "priceMultiplier": 8
            }
          ]
        }
      ]
    },
    {
      "id": "binance-vip",
      "categoryId": "c-finance",
      "name": "Binance — Accès VIP",
      "subtitle": "Réduction de frais & avantages",
      "price": 2500,
      "logo": "../images/products/binance.png",
      "rating": "4.6",
      "clients": "1700",
      "description": "Profitez de frais de trading réduits et d'un accès prioritaire au support Binance.",
      "features": [
        "Frais de trading réduits jusqu'à 20%",
        "Support client prioritaire dédié",
        "Accès aux ventes Launchpad en avant-première",
        "Rapport fiscal automatisé"
      ],
      "options": [
        {
          "name": "Durée",
          "values": [
            {
              "label": "1 Mois",
              "priceMultiplier": 1
            },
            {
              "label": "3 Mois",
              "priceMultiplier": 2.8
            }
          ]
        }
      ]
    },
    {
      "id": "kucoin-bot",
      "categoryId": "c-finance",
      "name": "KuCoin Trading Bot",
      "subtitle": "Trading Automatisé Crypto",
      "price": 2000,
      "logo": "../images/products/kucoin.png",
      "rating": "4.5",
      "clients": "1200",
      "description": "Automatisez vos stratégies de trading crypto 24h/24 avec les bots KuCoin.",
      "features": [
        "Bots DCA, Grid & Futures préconfigurés",
        "Fonctionne 24h/24, 7j/7 sans intervention",
        "Backtesting sur données historiques",
        "Gestion du risque intégrée (stop-loss)"
      ],
      "options": [
        {
          "name": "Durée",
          "values": [
            {
              "label": "1 Mois",
              "priceMultiplier": 1
            },
            {
              "label": "3 Mois",
              "priceMultiplier": 2.7
            },
            {
              "label": "6 Mois",
              "priceMultiplier": 5
            }
          ]
        }
      ]
    },
    {
      "id": "pack-divertissement",
      "categoryId": "c-packs",
      "name": "Media Premium",
      "subtitle": "Netflix + Spotify + YouTube",
      "price": 1399,
      "logo": "../images/offer1.jpeg",
      "rating": "4.9",
      "clients": "3200",
      "description": "Tu économises 501 DA sur ce pack combiné. Accédez aux meilleures séries, musique sans pub et vidéos premium.",
      "features": [
        "Netflix 4K Ultra HD inclus",
        "Spotify sans pub, qualité HD",
        "YouTube Premium sans publicités",
        "Livraison instantanée"
      ],
      "descriptionImages": [
        "../images/description/netflix1.jpg",
        "../images/description/spotify1.jpg",
        "../images/description/youtube1.jpg"
      ]
    },
    {
      "id": "duo-streaming",
      "categoryId": "c-packs",
      "name": "Duo Streaming",
      "subtitle": "Disney+ + Prime Video",
      "price": 949,
      "logo": "../images/offer2.jpeg",
      "rating": "4.7",
      "clients": "1500",
      "description": "Tu économises 351 DA. Films, séries, et avantages Amazon complets.",
      "features": [
        "Accès complet Disney+",
        "Prime Video + avantages Amazon",
        "Multi-écrans simultanés",
        "Livraison instantanée"
      ],
      "descriptionImages": [
        "../images/description/disney1.jpg",
        "../images/description/prime-video1.jpg"
      ]
    },
    {
      "id": "pack-ia",
      "categoryId": "c-packs",
      "name": "Pack IA Premium",
      "subtitle": "ChatGPT Plus + Claude Pro",
      "price": 4499,
      "logo": "../images/offer3.jpeg",
      "rating": "4.8",
      "clients": "2100",
      "description": "Tu économises 1 101 DA. Les 2 meilleurs assistants IA du marché réunis en un seul pack.",
      "features": [
        "ChatGPT-5.5 accès illimité",
        "Claude Pro accès illimité",
        "Génération de texte et d'images avancée",
        "Livraison instantanée"
      ],
      "descriptionImages": [
        "../images/description/chatGpt1.jpg",
        "../images/description/claude1.jpg"
      ]
    },
    {
      "id": "pack-gaming",
      "categoryId": "c-packs",
      "name": "Pack Gaming",
      "subtitle": "FC Points + V-Bucks + UC",
      "price": 999,
      "logo": "../images/offer4.jpeg",
      "rating": "4.6",
      "clients": "980",
      "description": "Tu économises 361 DA. 10 restants ! Fonce pour améliorer ton expérience sur tes jeux préférés.",
      "features": [
        "FC Points pour EA FC 25",
        "V-Bucks pour Fortnite",
        "UC pour PUBG Mobile",
        "Livraison instantanée"
      ],
      "descriptionImages": [
        "../images/description/eFootball1.jpg",
        "../images/description/fortnite1.jpg",
        "../images/description/pubg1.jpg"
      ]
    }
  ]
};
