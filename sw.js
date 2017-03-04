---
---
const ver = {{ site.version }};
var staticCacheName = "johnnolan-blog-" + ver;

self.addEventListener('install', e => {
	e.waitUntil(
	caches.open('johnnolan-blog-' + ver).then(cache => {
		return cache.addAll([
			{% for page in site.html_pages %}
			'{{ page.url }}',
			{% endfor %}
			{% for post in site.posts %}
			'{{ post.url }}',
			{% endfor %}

			{% for post in site.posts %}
			'{{ post.url | prepend: site.canonical_baseurl }}',
			{% endfor %}

			'/amp/index.html'
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