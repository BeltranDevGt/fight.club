/* =========================================================
   FIGHT NIGHT BLOG — script.js
   1) "Base de datos" simulada de artículos
   2) Render dinámico del grid
   3) Inserción automática del bloque AdSense nativo tras el 2º artículo
   4) Buscador en tiempo real por título
========================================================= */

(function () {
  'use strict';

  /* -----------------------------------------------------
     1) DATOS — simulan la respuesta de una API / CMS
  ----------------------------------------------------- */
  const ARTICLES = [
    {
      id: 1,
      title: 'Cartelera UFC 320 Completa: Horarios, Peleas y Cómo Verla En Vivo',
      category: 'UFC',
      excerpt: 'Horarios por país, cartelera estelar y preliminar completa, cómo verla en vivo y las predicciones de los expertos para la pelea por el título.',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&h=500&fit=crop&q=80',
      date: '18 JUL 2026',
      readTime: '9 min',
      link: 'articulo-01-ufc-320-cartelera.html'
    },
    {
      id: 2,
      title: 'Los 7 Mejores Guantes de Boxeo de 2026: Guía de Compra',
      category: 'Boxeo',
      excerpt: 'Comparamos acolchado, durabilidad y relación calidad-precio para ayudarte a elegir el guante ideal, ya entrenes en casa o compitas en el ring.',
      image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800&h=500&fit=crop&q=80',
      date: '17 JUL 2026',
      readTime: '6 min',
      link: '#'
    },
    {
      id: 3,
      title: 'Domina la Guardia Cerrada: Fundamentos Imprescindibles',
      category: 'Jiu-Jitsu',
      excerpt: 'La posición más importante para cualquier cinturón blanco. Te explicamos los tres controles básicos antes de intentar cualquier sumisión.',
      image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=800&h=500&fit=crop&q=80',
      date: '16 JUL 2026',
      readTime: '5 min',
      link: '#'
    },
    {
      id: 4,
      title: 'Anatomía del Clinch: El Arma Secreta del Muay Thai',
      category: 'Estilos',
      excerpt: 'Del control de cabeza a las rodillas voladoras: así construyen los tailandeses una de las herramientas más devastadoras del striking.',
      image: 'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=800&h=500&fit=crop&q=80',
      date: '15 JUL 2026',
      readTime: '7 min',
      link: '#'
    }
  ];

  /* Mapeo de categoría → clase de color ya definida en styles.css */
  const CATEGORY_CLASS = {
    'UFC': 'card-category--red',
    'Boxeo': 'card-category--gold',
    'Jiu-Jitsu': 'card-category--green',
    'Estilos': 'card-category--gold'
  };

  /* -----------------------------------------------------
     Referencias al DOM
  ----------------------------------------------------- */
  const grid = document.getElementById('articleGrid');
  const noResults = document.getElementById('noResults');
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');

  /* -----------------------------------------------------
     Plantilla de una tarjeta de artículo
  ----------------------------------------------------- */
  function articleCardHTML(article) {
    const catClass = CATEGORY_CLASS[article.category] || 'card-category--red';
    return `
      <article class="card">
        <a href="${article.link}" class="card-media">
          <img src="${article.image}" alt="${article.title}" loading="lazy">
          <span class="card-category ${catClass}">${article.category}</span>
        </a>
        <div class="card-body">
          <h3><a href="${article.link}">${article.title}</a></h3>
          <p class="card-excerpt">${article.excerpt}</p>
          <div class="card-meta"><span>${article.date}</span><span>·</span><span>${article.readTime}</span></div>
        </div>
      </article>
    `;
  }

  /* -----------------------------------------------------
     ZONA ADSENSE #2 — mismo bloque nativo definido en el
     diseño original, ahora generado por JS e insertado
     automáticamente tras el 2º artículo renderizado.
  ----------------------------------------------------- */
  function nativeAdHTML() {
    return `
      <div class="ad-zone ad-native" aria-label="Contenido patrocinado">
        <span class="ad-label">Publicidad</span>
        <div class="ad-slot ad-slot--native">
          <!-- <ins class="adsbygoogle" style="display:block" data-ad-format="fluid" data-ad-layout-key="-fb+5w+4e-db+86" data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" data-ad-slot="XXXXXXXXXX"></ins> -->
          <span class="ad-placeholder-text">Anuncio nativo · in-feed responsive</span>
        </div>
      </div>
    `;
  }

  /* -----------------------------------------------------
     2) y 3) Render del grid + inserción automática del anuncio
     tras el 2º artículo (índice 1). Si hay menos de 2
     resultados (p. ej. tras filtrar) el anuncio no se muestra,
     para no romper el layout con un bloque huérfano.
  ----------------------------------------------------- */
  function renderArticles(list) {
    if (!grid) return; // esta página no tiene grid dinámico (p. ej. la vista de artículo)

    if (!list.length) {
      grid.innerHTML = '';
      noResults.hidden = false;
      return;
    }

    noResults.hidden = true;

    const html = list
      .map((article, index) => {
        const card = articleCardHTML(article);
        const adAfterThis = index === 1; // tras el 2º artículo (posición 0 y 1)
        return adAfterThis ? card + nativeAdHTML() : card;
      })
      .join('');

    grid.innerHTML = html;
  }

  /* -----------------------------------------------------
     4) Buscador en tiempo real (filtra por título)
     - Ignora mayúsculas/minúsculas y acentos
     - Se ejecuta en cada pulsación de tecla (evento "input")
  ----------------------------------------------------- */
  function normalize(str) {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, ''); // quita tildes/acentos
  }

  function filterArticles(query) {
    const q = normalize(query.trim());
    if (!q) return ARTICLES;
    return ARTICLES.filter((article) => normalize(article.title).includes(q));
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderArticles(filterArticles(e.target.value));
    });
  }

  // Evita que el buscador recargue la página si se pulsa Enter
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      renderArticles(filterArticles(searchInput.value));
    });
  }

  /* -----------------------------------------------------
     Interacciones del header (menú móvil + toggle buscador)
  ----------------------------------------------------- */
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const open = mainNav.classList.toggle('is-open');
      menuToggle.classList.toggle('is-open', open);
      menuToggle.setAttribute('aria-expanded', open);
    });
  }

  const searchToggle = document.getElementById('searchToggle');
  if (searchToggle && searchForm) {
    searchToggle.addEventListener('click', () => {
      const open = searchForm.classList.toggle('is-open');
      searchToggle.setAttribute('aria-expanded', open);
      if (open) searchInput.focus();
    });
  }

  /* -----------------------------------------------------
     Render inicial
  ----------------------------------------------------- */
  renderArticles(ARTICLES);
})();
