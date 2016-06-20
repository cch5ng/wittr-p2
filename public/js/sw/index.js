
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

	console.log('intercept fetch')l

  var response;
  if (!navigator.onLine) {
  	console.log('offline');
  }

  //caches.open('wittr-static-v1').then(function(cache) {
  	var cachedResponse = caches.match(event.request).catch(function() {
	  	console.log('url: ' + event.request.url);
	  	return fetch(event.request).then(function(response) {
	  		return caches.open('wittr-static-v1').then(function(cache) {
	  			cache.put(event.request, response.clone());
	  			return response
	  		})
	  	});
	  })
	  // .then(function(r) {
	  // 	console.log('response: ' + r);
	  // 	//response = r;
	  // 	//return r.clone(); //response.clone();
	  // })
	  .catch(function() {
//	  	console.log('error: ' + err);
	  	return fetch(event.request);
	  })
  //})

  event.respondWith(cachedResponse);

}); 