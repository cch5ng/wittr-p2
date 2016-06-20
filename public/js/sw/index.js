var staticCacheName = 'wittr-static-v2';

self.addEventListener('install', function(event) {
  event.waitUntil(
    // TODO: change the site's theme, eg swap the vars in public/scss/_theme.scss
    // Ensure at least $primary-color changes
    // TODO: change cache name to 'wittr-static-v2'
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        '/',
        'js/main.js',
        'css/main.css',
        'imgs/icon.png',
        'https://fonts.gstatic.com/s/roboto/v15/2UX7WLTfW3W8TclTUvlFyQ.woff',
        'https://fonts.gstatic.com/s/roboto/v15/d-6IYplOFocCacKzxwXSOD8E0i7KZn-EPnyo3HZu7kw.woff'
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    // TODO: remove the old cache
    caches.keys().then(function(cacheNames) {
    	//use Promise.all() to make sure that all promises return
    	return Promise.all(
    		console.log('length cacheNames: ' + cacheNames.length);
    		//instructor soln used filter and then map but same concept
    		//he does a check to verify cache for other apps running on same origin
    		//such as github pages
    		cacheNames.map(function(cache) {
     			if (cache !== staticCacheName) {
	     			return caches.delete(cache)
     			}
     		})
		)
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});