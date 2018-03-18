import idb from 'idb';

var dbPromise = idb.open('test-db', 3, function(upgradeDb) {

  switch(upgradeDb.oldVersion) {
    case 0:
      // createObjectStore creates a new table
      var keyValStore = upgradeDb.createObjectStore('keyval');
      keyValStore.put("world", "hello");
    case 1:
      upgradeDb.createObjectStore('people', {keyPath: 'name'});
    case 2:
      var peopleStore = upgradeDb.transaction.objectStore('people');
      peopleStore.createIndex('animal', 'favoriteAnimal');
  }
});

// read "hello" in "keyval"
dbPromise.then(function(db) {
  var tx = db.transaction('keyval');
  var keyValStore = tx.objectStore('keyval');
  return keyValStore.get('hello');
}).then(function(val) {
  console.log('The value of "hello" is:', val);
});

// set "foo" to be "bar" in "keyval"
dbPromise.then(function(db) {
  var tx = db.transaction('keyval', 'readwrite');
  var keyValStore = tx.objectStore('keyval');
  keyValStore.put('bar', 'foo');
  return tx.complete;
}).then(function() {
  console.log('Added foo:bar to keyval');
});

dbPromise.then(function(db) {
  // TODO: in the keyval store, set
  // "favoriteAnimal" to your favourite animal
  // eg "cat" or "dog"

  var tx = db.transaction('keyval', 'readwrite');
  var keyValStore = tx.objectStore('keyval');
  keyValStore.put('puppy', 'faveAnimal');
  return tx.complete;
}).then(function() {
  console.log('added faveAnimal:puppy to keyval');
});

dbPromise.then(function(db) {
  var tx = db.transaction('people', 'readwrite'); // first param is the db
  var peopleStore = tx.objectStore('people');
  peopleStore.put({
    name: 'zander',
    age: 15,
    favoriteAnimal: 'dog'
  });

  peopleStore.put({
    name: 'bei bei',
    age: 5,
    favoriteAnimal: 'panda'
  });

  peopleStore.put({
    name: 'phil',
    age: 25,
    favoriteAnimal: 'walrus'
  });

  peopleStore.put({
    name: 'lala',
    age: 25,
    favoriteAnimal: 'lemming'
  });

  return tx.complete;
}).then(function() {
  console.log('added person:zander to people');
});

dbPromise.then(function(db) {
  var tx = db.transaction('people');
  var peopleStore = tx.objectStore('people');
  var animalIndex = peopleStore.index('animal');
  return animalIndex.getAll();

//  return peopleStore.getAll();
}).then(function(people) {
  console.log('people: ' + people);
  if (people.length) {
    people.forEach(p => {
      console.log('p.favoriteAnimal: ' + p.favoriteAnimal);
    });
  }
});

