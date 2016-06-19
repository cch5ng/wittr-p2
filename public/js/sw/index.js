self.addEventListener('fetch', function(event) {
  // TODO: only respond to requests with a
  // url ending in ".jpg"
  console.log('event type: ' + typeof event);
  console.log('event target: ' + event.target);
  console.log('event request: ' + event.request);

//my soln (works but is more complex than nec)
//  if (event.request.url.match(/\S+\.jpg/g)) {

//jake solution
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