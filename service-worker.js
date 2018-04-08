const myCache= 'photo-app'

const files = [
  './',
  './index.html',
  './manifest.json',
  './styles/styles.css',
  './app.js'
]

self.addEventListener('install', e => {
  e.waitUntil(caches.open(myCache)
    .then(cache => cache.addAll(files)
        .then(() => self.skipWaiting())
    )
  )
})

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keyList => {
      return Promise.all(keyList.map(key => {
        if (key !== myCache) return caches.delete(key)
      }))
  }))
  return self.clients.claim()
})

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request)
    .then(response => response || fetch(e.request)       
      .then(resp => caches.open(myCache)
        .then(cache => {
          cache.put(e.request, resp.clone())
          return resp
        })
      ).catch(event => {
        console.log('Error fetching data!');
      })
    )
  )
})