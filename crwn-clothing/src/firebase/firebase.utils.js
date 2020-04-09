import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAQu2-z6bVz4eJmQ8hOC6qt7w5JOUEKbc8",
  authDomain: "crown-clothing-db-2137c.firebaseapp.com",
  databaseURL: "https://crown-clothing-db-2137c.firebaseio.com",
  projectId: "crown-clothing-db-2137c",
  storageBucket: "crown-clothing-db-2137c.appspot.com",
  messagingSenderId: "821418168229",
  appId: "1:821418168229:web:d1bc1bd5a0aa4c4ac5224c",
  measurementId: "G-0XB7991XEM",
};

//This function will allow the User Object we got back from Authentication Library, and store inside the Database.
//Because we are making an API request, it is going to be an async() call
//We are passing 'userAuth' which gets back from Auth Library, and 'additionalData' we might need
export const createUserProfileDocument = async (userAuth, additionalData) => {
  //We need to make sure there is a data coming back when we SIGN IN
  //If it is NOT FALSE than userAuth object doesnt exist.
  if (!userAuth) return;

  //If it exists inside the Google Auth, we will go inside the Database
  //In PDF, QueryReference vs QuerySnapshot
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  //console.log(snapShot);

  //We are going to check if snapShot exists there and in case if doesn't exist we are going to create it.
  //documentRef is used to create data
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

//We imported auth and with this we have access to 'auth'
export const auth = firebase.auth();
export const firestore = firebase.firestore();

//This gives us the access to New Google Auth Provider from Authentication Library
const provider = new firebase.auth.GoogleAuthProvider();

//We want to always trigger, google popup, whenever we use Google Auth Provider for ////Authentication and Sign in
provider.setCustomParameters({ prompt: "select_account" });

//Since we are only using Google and 'signInWithPopup()' uses different signInPopups ///and we are using the Google and 'provider' lets it happen.
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
