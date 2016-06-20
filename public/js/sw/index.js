
var cacheUrls = [
    '/',
    'js/main.js',
    'css/main.css',
    'imgs/icon.png',
    'https://fonts.gstatic.com/s/roboto/v15/2UX7WLTfW3W8TclTUvlFyQ.woff',
    'https://fonts.gstatic.com/s/roboto/v15/d-6IYplOFocCacKzxwXSOD8E0i7KZn-EPnyo3HZu7kw.woff'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('wittr-static-v1').then(function(cache) {
    	console.log('sw installed');
      return cache.addAll(cacheUrls);
    })
  );
});

self.addEventListener('fetch', function(event) {
  // TODO: respond with an entry from the cache if there is one.
  // If there isn't, fetch from the network.

  event.respondWith(
  	caches.match(event.request).then(function(response) {
  	//where request handled by cache
  		if (response) {
  			return response;
  		}

  	//request handled by network
  		return fetch(event.request).then(function(response) {
  			return response;
  		})
  		.catch(function(error) {
  			console.log('error: fetch failed; ' + error);
  			throw error;
  		});
  	})
  );

}); 