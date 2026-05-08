(function () {
  'use strict';

  const STORAGE_KEY = 'nexvia_lang';
  const DEFAULT_LANG = 'fr';
  const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'IFRAME', 'CANVAS']);
  const ATTRS = ['placeholder', 'title', 'alt', 'aria-label'];
  const originalTextNodes = new WeakMap();

  const state = {
    data: null,
    lang: localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG,
    ready: null
  };

  function scriptBase() {
    const script = document.currentScript || document.querySelector('script[src$="langage.js"]');
    return script ? script.src.replace(/langage\.js(?:\?.*)?$/, '') : 'JavaScript/';
  }

  function imageBase() {
    return window.location.pathname.includes('/pages/') || window.location.pathname.includes('\\pages\\')
      ? '../images/'
      : 'images/';
  }

  function flagMarkup(config) {
    if (config.flagImage) {
      return `<img class="language-flag-img" src="${imageBase()}${config.flagImage}" alt="${config.label}">`;
    }
    return `<span class="language-flag">${config.flag}</span>`;
  }

  function normalize(text) {
    return String(text || '').replace(/\s+/g, ' ').trim();
  }

  function withOriginalSpacing(source, translated) {
    const leading = String(source).match(/^\s*/)[0];
    const trailing = String(source).match(/\s*$/)[0];
    return leading + translated + trailing;
  }

  function getLanguageData(lang) {
    return state.data?.phrases?.[lang] || {};
  }

  function getReplacementData(lang) {
    return state.data?.replacements?.[lang] || {};
  }

  function translateText(text, lang = state.lang) {
    if (!state.data || lang === DEFAULT_LANG) return text;

    const original = normalize(text);
    if (!original) return text;

    const phrases = getLanguageData(lang);
    if (Object.prototype.hasOwnProperty.call(phrases, original)) {
      return withOriginalSpacing(text, phrases[original]);
    }

    let translated = original;
    const replacements = getReplacementData(lang);
    Object.keys(replacements)
      .sort((a, b) => b.length - a.length)
      .forEach((key) => {
        translated = translated.split(key).join(replacements[key]);
      });

    return translated === original ? text : withOriginalSpacing(text, translated);
  }

  function translateAttribute(el, attr, lang) {
    if (!el.hasAttribute(attr)) return;
    const originalKey = `i18nOriginal${attr.replace(/-([a-z])/g, (_, c) => c.toUpperCase())}`;

    if (!el.dataset[originalKey]) {
      el.dataset[originalKey] = el.getAttribute(attr);
    }

    const original = el.dataset[originalKey];
    const nextValue = lang === DEFAULT_LANG ? original : translateText(original, lang);
    if (el.getAttribute(attr) !== nextValue) {
      el.setAttribute(attr, nextValue);
    }
  }

  function translateTextNode(node, lang) {
    const value = node.nodeValue;

    if (!originalTextNodes.has(node)) {
      if (!normalize(value) || !/[A-Za-zÀ-ÿ]/.test(value)) return;
      originalTextNodes.set(node, value);
    }

    if (!node.parentElement || SKIP_TAGS.has(node.parentElement.tagName)) return;

    const original = originalTextNodes.get(node);
    node.nodeValue = lang === DEFAULT_LANG ? original : translateText(original, lang);
  }

  function translateElement(root = document.body, lang = state.lang) {
    if (!state.data || !root) return;

    if (root.nodeType === Node.TEXT_NODE) {
      translateTextNode(root, lang);
      return;
    }

    if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_NODE) return;
    if (root.nodeType === Node.ELEMENT_NODE && SKIP_TAGS.has(root.tagName)) return;

    if (root.nodeType === Node.ELEMENT_NODE) {
      ATTRS.forEach((attr) => translateAttribute(root, attr, lang));
    }

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, {
      acceptNode(node) {
        if (node.nodeType === Node.ELEMENT_NODE && SKIP_TAGS.has(node.tagName)) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    let node;
    while ((node = walker.nextNode())) {
      if (node.nodeType === Node.TEXT_NODE) {
        translateTextNode(node, lang);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        ATTRS.forEach((attr) => translateAttribute(node, attr, lang));
      }
    }

    translateDocumentMeta(lang);
  }

  function translateDocumentMeta(lang = state.lang) {
    if (!state.data) return;

    if (!document.documentElement.dataset.i18nOriginalLang) {
      document.documentElement.dataset.i18nOriginalLang = document.documentElement.lang || DEFAULT_LANG;
    }
    document.documentElement.lang = lang;

    if (!document.head.dataset.i18nOriginalTitle) {
      document.head.dataset.i18nOriginalTitle = document.title;
    }
    const title = document.head.dataset.i18nOriginalTitle;
    document.title = lang === DEFAULT_LANG ? title : translateText(title, lang);

    document.querySelectorAll('meta[content]').forEach((meta) => {
      if (!meta.dataset.i18nOriginalContent) {
        meta.dataset.i18nOriginalContent = meta.getAttribute('content');
      }
      const original = meta.dataset.i18nOriginalContent;
      meta.setAttribute('content', lang === DEFAULT_LANG ? original : translateText(original, lang));
    });
  }

  function createLanguageOption(lang, config) {
    const option = document.createElement('button');
    option.type = 'button';
    option.className = 'language-option';
    option.dataset.lang = lang;
    option.innerHTML = `
      ${flagMarkup(config)}
      <span class="language-name">${config.label}</span>
      <i class="fa-solid fa-check language-check" aria-hidden="true"></i>
    `;
    option.addEventListener('click', () => setLanguage(lang));
    return option;
  }

  function injectSwitcher() {
    if (!state.data || document.getElementById('language-switcher')) return;

    const navActions = document.querySelector('.nav-bar .links.nav-right-actions');
    if (!navActions) return;

    const switcher = document.createElement('div');
    switcher.className = 'language-switcher';
    switcher.id = 'language-switcher';

    const current = document.createElement('button');
    current.type = 'button';
    current.className = 'language-current';
    current.setAttribute('aria-haspopup', 'true');
    current.setAttribute('aria-expanded', 'false');

    const menu = document.createElement('div');
    menu.className = 'language-menu';

    Object.entries(state.data.languages).forEach(([lang, config]) => {
      menu.appendChild(createLanguageOption(lang, config));
    });

    current.addEventListener('click', (event) => {
      event.stopPropagation();
      const isOpen = switcher.classList.toggle('open');
      current.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', () => {
      switcher.classList.remove('open');
      current.setAttribute('aria-expanded', 'false');
    });

    switcher.appendChild(current);
    switcher.appendChild(menu);

    const cartLink = navActions.querySelector('.cart-icon-link');
    navActions.insertBefore(switcher, cartLink || null);
    updateSwitcher();
  }

  function updateSwitcher() {
    if (!state.data) return;
    const config = state.data.languages[state.lang] || state.data.languages[DEFAULT_LANG];
    const current = document.querySelector('#language-switcher .language-current');
    if (!current) return;

    current.innerHTML = `
      ${flagMarkup(config)}
      <span class="language-code">${config.shortLabel}</span>
    `;
    current.setAttribute('aria-label', `Language: ${config.label}`);

    document.querySelectorAll('#language-switcher .language-option').forEach((option) => {
      option.classList.toggle('active', option.dataset.lang === state.lang);
    });
  }

  function setLanguage(lang) {
    if (!state.data?.languages?.[lang]) return;
    state.lang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    updateSwitcher();
    translateElement(document.body, lang);
    window.dispatchEvent(new CustomEvent('nexvia:languagechange', { detail: { lang } }));

    const token = localStorage.getItem('nexvia_token');
    if (token && typeof API_BASE !== 'undefined') {
      fetch(API_BASE + '/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
        body: JSON.stringify({ language: lang })
      }).catch(() => { });
    }
  }

  function observeMutations() {
    const observer = new MutationObserver((mutations) => {
      if (!state.data || state.lang === DEFAULT_LANG) return;
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => translateElement(node, state.lang));
        if (mutation.type === 'attributes') translateElement(mutation.target, state.lang);
      });
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ATTRS
    });
  }

  state.ready = fetch(scriptBase() + 'translation.json')
    .then((res) => {
      if (!res.ok) throw new Error('Unable to load translation.json');
      return res.json();
    })
    .then((data) => {
      state.data = data;
      if (!state.data.languages[state.lang]) state.lang = DEFAULT_LANG;
      return data;
    })
    .catch((err) => {
      console.error('Nexvia i18n unavailable:', err);
      state.lang = DEFAULT_LANG;
    });

  document.addEventListener('DOMContentLoaded', async () => {
    await state.ready;
    injectSwitcher();
    translateElement(document.body, state.lang);
    observeMutations();
  });

  window.NexviaI18n = {
    ready: state.ready,
    getLanguage: () => state.lang,
    setLanguage,
    translateText,
    translatePage: () => translateElement(document.body, state.lang)
  };
})();
