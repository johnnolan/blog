// Version 0.1

self.addEventListener('install', e => {
	e.waitUntil(
	caches.open('johnnolan-blog').then(cache => {
		return cache.addAll([
			'/ideas/2017/02/27/what-is-to-come.html',
			'/'
		])
			.then(() => self.skipWaiting());
})
)
});

self.addEventListener('activate',  event => {
	event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
	event.respondWith(
	caches.match(event.request).then(response => {
		return response || fetch(event.request);
})
);
});