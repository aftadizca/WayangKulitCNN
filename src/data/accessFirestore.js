const firebase = require('firebase');
// Required for side-effects
require('firebase/firestore');

const data = require('./dataWayang.json');

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
	apiKey: 'AIzaSyCFRfm1ZTG4fsBY1mBN6FGUGa9COaAC_3k', //CHANGE THIS
	authDomain: 'wayangkulitcnn.firebaseapp.com', //CHANGE THIS
	projectId: 'wayangkulitcnn', //CHANGE THIS
});

var db = firebase
	.firestore()
	.collection('Wayang')
	.doc('0');

db.get().then(function(x) {
	console.log(x.data());
});
