---
---
const ver = {{ site.version }};
var staticCacheName = "johnnolan-blog-" + ver;

self.addEventListener('install', e => {
	e.waitUntil(
	caches.open('johnnolan-blog-' + ver).then(cache => {
		return cache.addAll([
            '/apple-touch-icon.png',
            '/favicon-32x32.png',
            '/favicon-16x16.png',
            '/safari-pinned-tab.svg',
            '/assets/me.jpg',
            '/assets/twitter.svg'
		])
			.then(() => self.skipWaiting());
})
)
});

self.addEventListener("activate", function(e){
	e.waitUntil(
		caches.keys().then(function(cacheNames){
			return Promise.all(
				cacheNames.filter(function(cacheName){
					return cacheName.startsWith("johnnolan-blog-")
						&& cacheName != staticCacheName;
				}).map(function(cacheName){
					return caches.delete(cacheName);
				})
			)
		})
	)
});

self.addEventListener("fetch", function(e){
	e.respondWith(
		caches.match(e.request).then(function(response) {
			return response || fetch(e.request);
		})
	)
});