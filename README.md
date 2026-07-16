# Fight Night Blog

Blog de nicho sobre deportes de contacto (UFC, Boxeo, Jiu-Jitsu) optimizado para tráfico orgánico y monetización con Google AdSense.

## Estructura

```
├── index.html                          # Página principal
├── articulo-01-ufc-320-cartelera.html  # Primer artículo publicado
├── styles.css                          # Sistema de diseño (variables CSS, componentes)
├── script.js                           # Render dinámico de artículos, buscador, anuncios
└── articulo-01-ufc-320-cartelera.md    # Contenido fuente en markdown
```

## Stack

HTML5 + CSS3 (variables nativas, sin frameworks) + JavaScript vanilla. Sin build step: se puede servir directo o publicar con GitHub Pages.

## Zonas de AdSense

Marcadas en el código con comentarios `ZONA ADSENSE #N`. Reemplazar los bloques `<ins class="adsbygoogle">` comentados con el `data-ad-client` y `data-ad-slot` reales antes de producción.

## Cómo previsualizar en local

Abrir `index.html` directamente en el navegador, o servir la carpeta con cualquier servidor estático:

```bash
python3 -m http.server 8000
```


