// Version 0.1
const ver = 2;

self.addEventListener('install', e => {
	e.waitUntil(
	caches.open('johnnolan-blog-' + ver).then(cache => {
		return cache.addAll([
			'/ideas/2017/02/27/what-is-to-come.html',
			'/'
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
					return cache.delete(cacheName);
				})
			)ß
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