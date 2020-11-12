
import React, { Component } from "react";
import { StyleSheet, View,Platform, InteractionManager } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Login from "./src/auth/Login";
import Register from "./src/auth/Register";
import SignOut from "./src/auth/SignOut";

import firebase, * as firbase from "firebase";
import Home from "./src/screens/Home";
import Loading from "./src/pages/Loading";
import AddLegalAid from "./src/screens/AddLegalAid";
import ForgotPassword from "./src/auth/ForgotPassword";

const _setTimeout = global.setTimeout;
const _clearTimeout = global.clearTimeout;
const MAX_TIMER_DURATION_MS = 60 * 1000;
if (Platform.OS === 'android') {
// Work around issue `Setting a timer for long time`
// see: https://github.com/firebase/firebase-js-sdk/issues/97
    const timerFix = {};
    const runTask = (id, fn, ttl, args) => {
        const waitingTime = ttl - Date.now();
        if (waitingTime <= 1) {
            InteractionManager.runAfterInteractions(() => {
                if (!timerFix[id]) {
                    return;
                }
                delete timerFix[id];
                fn(...args);
            });
            return;
        }

        const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
        timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
    };

    global.setTimeout = (fn, time, ...args) => {
        if (MAX_TIMER_DURATION_MS < time) {
            const ttl = Date.now() + time;
            const id = '_lt_' + Object.keys(timerFix).length;
            runTask(id, fn, ttl, args);
            return id;
        }
        return _setTimeout(fn, time, ...args);
    };

    global.clearTimeout = id => {
        if (typeof id === 'string' && id.startWith('_lt_')) {
            _clearTimeout(timerFix[id]);
            delete timerFix[id];
            return;
        }
        _clearTimeout(id);
    };
}
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
    Home:Home,
    Loading:Loading,
    SignOut:SignOut,
    AddLegalAid:AddLegalAid,
    ForgotPassword:ForgotPassword
    



  },
  {
    initialRouteName: "Loading",
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
