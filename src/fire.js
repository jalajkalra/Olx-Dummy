import firebase from 'firebase';
var firebaseConfig = {
    apiKey: "AIzaSyDAog_X12GgwJYBLYqHZY0ocvUAGVhcBOE",
    authDomain: "olxproject-b64cf.firebaseapp.com",
    databaseURL: "https://olxproject-b64cf.firebaseio.com",
    projectId: "olxproject-b64cf",
    storageBucket: "olxproject-b64cf.appspot.com",
    messagingSenderId: "545974870155",
    appId: "1:545974870155:web:76026a445966f0d14d348e",
    measurementId: "G-JG9BTSX7F6"
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default fire;