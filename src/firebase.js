import * as firebase from 'firebase'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBOH94afySvVvVy1WfaQxss38IT0bebLn8",
    authDomain: "sample-project-f5193.firebaseapp.com",
    databaseURL: "https://sample-project-f5193.firebaseio.com",
    projectId: "sample-project-f5193",
    storageBucket: "sample-project-f5193.appspot.com",
    messagingSenderId: "730810517020",
    appId: "1:730810517020:web:c1a18bf6930766f59ec1d9",
    measurementId: "G-HRGZ1XF6HG"
};
// Initialize Firebase
var firedb = firebase.initializeApp(firebaseConfig);

export default firedb.database().ref();