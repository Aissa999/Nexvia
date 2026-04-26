================================================================================
                              N E X V I A
            Plateforme E-Commerce d'Abonnements Numériques
================================================================================

  Technologies : HTML5 | CSS3 | JavaScript
--------------------------------------------------------------------------------

PRESENTATION
============

Nexvia est une mini plateforme e-commerce entierement developpee en HTML, CSS
et JavaScript, dediee a la vente d'abonnements numeriques (Netflix, Spotify,
outils IA, etc.).

Le site propose une interface sombre, moderne et intuitive, avec une navigation
fluide. Les utilisateurs peuvent creer un compte, se connecter, parcourir un
catalogue dynamique, filtrer par categories et gerer leur panier.

Contrairement a une solution 100% locale, Nexvia utilise un backend simple pour
garantir la persistance des comptes entre les sessions.

--------------------------------------------------------------------------------

FONCTIONNALITES
===============

  [+]  Authentification       Inscription et connexion avec sessions par token
  [+]  Catalogue dynamique    Produits charges via JavaScript et JSON
  [+]  Filtrage               Navigation par categories sans rechargement
  [+]  Panier                 Ajout, suppression et recap avant achat
  [+]  Profil utilisateur     Modification des infos et choix d'avatar
  [+]  Design responsive      Interface adaptee a tous les ecrans
  [+]  Theme sombre           UI moderne et coherente sur toutes les pages

--------------------------------------------------------------------------------

PAGES DU SITE
=============

  index.html       ->  Accueil        Page principale et hub de navigation
  about.html       ->  A propos       Presentation du projet et du marche algerien
  categories.html  ->  Catalogue      Produits dynamiques avec filtres par categorie
  offers.html      ->  Offres         Abonnements populaires en cartes interactives
  login.html       ->  Connexion      Inscription / Connexion avec validation backend
  profile.html     ->  Profil         Modifier nom, email, avatar — deconnexion
  panier.html      ->  Panier         Recapitulatif des articles et total commande
  contact.html     ->  Contact        Formulaire valide cote client + FAQ
  conditions.html  ->  Conditions     Regles d'utilisation et informations paiements
  privacy.html     ->  Confidentialite  Gestion et protection des donnees utilisateurs

--------------------------------------------------------------------------------

BACKEND
=======

Nexvia utilise une API legere et personnalisee pour la gestion des utilisateurs.
Les comptes sont enregistres cote serveur — pas uniquement en localStorage —
ce qui garantit leur reconnaissance a chaque reconnexion.

  Fonctionnalites de l'API :
    - Inscription et connexion des utilisateurs
    - Authentification par token
    - Recuperation et mise a jour du profil (nom, email, avatar)
    - Persistance des donnees entre les sessions

--------------------------------------------------------------------------------


OBJECTIFS PEDAGOGIQUES
======================

  Ce projet a ete concu pour demonstrer les competences suivantes :

    ->  Manipulation du DOM et rendu dynamique
    ->  Interactivite cote client et gestion des evenements
    ->  Communication Frontend <-> Backend via Fetch / API REST
    ->  Flux d'authentification par token
    ->  Code structure, lisible et maintenable
    ->  Design responsive et accessible

--------------------------------------------------------------------------------

EQUIPE
======

  GUELLIL Aissa       -  Developpeur
  MEZRAG Amayas       -  Developpeur
  AHMED ZAID Aya      -  Developpeuse
  BOUCELLAM Sabrina   -  Developpeuse
  AMROUNI Nabil       -  Developpeur

================================================================================
                    © 2026 Nexvia — Tous droits réservés.
================================================================================
