self.addEventListener('install', () => {
  globalThis.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim())
})

self.addEventListener('message', (event) => {
  // Verify message origin matches this SW's own origin
  if (event.origin !== self.location.origin) return

  if (event.data?.type === 'SCHEDULE_NOTIFICATION') {
    const { title, body, delayMs, tag } = event.data

    setTimeout(() => {
      globalThis.registration.showNotification(title, {
        body,
        icon: '/vite.svg',
        badge: '/vite.svg',
        tag,
        requireInteraction: false,
        vibrate: [200, 100, 200],
      })
    }, delayMs)
  }
})