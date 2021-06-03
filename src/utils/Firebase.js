import firebase from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyCvfSYl2TLC0xRq3qnnnTRgnyS7OB9mXFo",
    authDomain: "react-native-ded95.firebaseapp.com",
    databaseURL: "https://react-native-ded95-default-rtdb.firebaseio.com",
    projectId: "react-native-ded95",
    storageBucket: "react-native-ded95.appspot.com",
    messagingSenderId: "93543185590",
    appId: "1:93543185590:web:6f6e1f6962c438d612fa17"
};

export default firebase.initializeApp(firebaseConfig);