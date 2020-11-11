
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Login from "./src/auth/Login";
import Register from "./src/auth/Register";

import firebase, * as firbase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBJk7uMiqeA2y58nPOlcknqoXsoTRvWwrY",
  authDomain: "legal-aid-1b91e.firebaseapp.com",
  databaseURL: "https://legal-aid-1b91e.firebaseio.com",
  projectId: "legal-aid-1b91e",
  storageBucket: "legal-aid-1b91e.appspot.com",
  messagingSenderId: "378154352179",
  appId: "1:378154352179:web:d4881953b13bc22832ed46",
  measurementId: "G-6527YCQVLM"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// import SelectExample from "./components/crop/gardenManagement/SelectExample";



const RootStack = createStackNavigator(
  {
    Login: Login,
    Register: Register,
    



  },
  {
    initialRouteName: "Login",
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#777777",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
        color:'green'
      },
    }
  }
);
const RootContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return (
      // <View style={styles.container}>
        <RootContainer />
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
// export default App;
