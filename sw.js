/* ═══════════════════════════════════════════════
   TürkçeYol — service worker (v6 AXE 6.3)
   Rend l'app installable et jouable hors-ligne.

   RÈGLE SACRÉE : on n'intercepte JAMAIS les requêtes
   cross-origin (Google Fonts, et surtout l'audio Google
   Translate TTS). Le moteur audio (App.playTTS) doit
   continuer à fonctionner exactement comme avant — le SW
   laisse ces requêtes filer directement au réseau.
   ═══════════════════════════════════════════════ */

const CACHE = 'turkceyol-v1';

// Pré-cache minimal : la coquille de l'app (navigation offline)
const CORE = ['./', './index.html', './manifest.json', './icon.svg'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(CORE)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Uniquement les GET
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // ⛔ Cross-origin (fonts, AUDIO TTS Google) : on ne touche à RIEN.
  //    Laisser passer au réseau tel quel — respect strict du moteur audio.
  if (url.origin !== self.location.origin) return;

  // Navigation (chargement de page) : réseau d'abord, cache en secours (offline)
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put('./index.html', copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match('./index.html').then((r) => r || caches.match('./')))
    );
    return;
  }

  // Assets same-origin (js/css/svg/json) : cache d'abord, puis réseau (et on met en cache)
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req)
        .then((res) => {
          if (res && res.status === 200 && res.type === 'basic') {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
          }
          return res;
        })
        .catch(() => cached);
    })
  );
});
