self.addEventListener('fetch', function(event) {
  // TODO: only respond to requests with a
  // url ending in ".jpg"
  console.log('event type: ' + typeof event);
  console.log('event target: ' + event.target);
  if (event.request.url.match(/\S+\.jpg/g)) {
	  event.respondWith(
	    fetch('/imgs/dr-evil.gif')
	  );
  } else {
  	event.respondWith(
	    new Response('<h4>sorry but I cannot show an image</h4>', {
	    	headers: {
	    		'Content-Type': 'text/html'
	    	}
	    })
	);
  }
});