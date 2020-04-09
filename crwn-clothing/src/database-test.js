import firebase from "firebase/app";
import "firebase/firestore";

const firestore = firebase.firestore();

//These are the ways to Query the data and there are ways to UPDATE the data.

//There are two ways to fetch the data from database
firestore
  .collection("users")
  .doc("R614lfigM1ZQEPlRfTvB")
  .collection("cartItems")
  .doc("HueYj742pHxYNeINjfyx");

//OR
//firestore.doc('users/R614lfigM1ZQEPlRfTvB/cartItems/HueYj742pHxYNeINjfyx');

//OR
//firestore.collection('users/R614lfigM1ZQEPlRfTvB/cartItems');
