import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyA3gVCTwsZe2jRYUa9YFjLSxIcQ4HY8uQc",
    authDomain: "crown-211920.firebaseapp.com",
    databaseURL: "https://crown-211920.firebaseio.com",
    projectId: "crown-211920",
    storageBucket: "crown-211920.appspot.com",
    messagingSenderId: "959985246895"
};
firebase.initializeApp(config);
let db = firebase.database();

export default db
  