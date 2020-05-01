const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

const data = require('./dataWayang.json');

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyCFRfm1ZTG4fsBY1mBN6FGUGa9COaAC_3k", //CHANGE THIS
    authDomain: "wayangkulitcnn.firebaseapp.com", //CHANGE THIS
    projectId: "wayangkulitcnn" //CHANGE THIS
});

var db = firebase.firestore();

console.log(data);

data.forEach(function (obj, i) {
    console.log(i);
    db.collection("Wayang").doc(i.toString()).set(obj).then(function (docRef) {
        console.log("Document written");
    }).catch(function (error) {
        console.error("Error adding document: ", error);
    });
});