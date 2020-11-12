import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import firebase, * as firbase from "firebase";
// import auth from '@react-native-firebase/auth';
// import database from '@react-native-firebase/database';
// import firestore from '@react-native-firebase/firestore';


export default class SignOut extends React.Component {
  componentDidMount() {
   firebase.auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        return this.props.navigation.navigate('Login');
      });
  }
  render(){
    return null;
  }
}
