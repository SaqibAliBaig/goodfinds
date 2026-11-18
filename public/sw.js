// Service Worker uninstaller for localhost/development
// Cleans up any stale service workers registered by prior apps on localhost:4321

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    self.registration.unregister().then(() => {
      return self.clients.matchAll();
    })
  );
});
