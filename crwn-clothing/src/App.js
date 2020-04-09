import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

// const HatsPage = () => (
//   <div>
//     <h1>HATS PAGE</h1>
//   </div>
// );

//exact: if we use exact within the Route, it will derender that component when we are trying to render other components.
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }

  //setting a variable to null "This is for close subscription"
  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      //this.setState({ currentUser: user });
      //Instead of setting the state, we are going to call
      //createUserProfileDocument(user) to check of the user exists or not
      //createUserProfileDocument(user);

      //We are getting back 'userAuth' from Database
      //If userAuth exists
      if (userAuth) {
        //We are going to check if userAuth is being updated in the database
        const userRef = await createUserProfileDocument(userAuth);

        //As soon as this function runs, it will get us the snapShot of the Database
        //On 'snapShot' is the Object we get back and we are going to get the data from userRef which we are going to save in the state.
        //We are creating new Object with the 'id' we want
        userRef.onSnapshot((snapShot) => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          });
        });
        console.log(this.state);
      }

      this.setState({ currentUser: userAuth });
    });
  }

  //This can close down the subscription.
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}
export default App;
