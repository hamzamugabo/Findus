// Loading.js
import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet, Image} from 'react-native';

import firebase, * as firbase from "firebase";
// import auth from '@react-native-firebase/auth';
// import database from '@react-native-firebase/database';
export default class Loading extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: () => (
        <View style={{flexDirection: 'row'}}>
         <Text>Legal Aid</Text>
        </View>
      ),
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
      disabled: false,
      errorMessage: null,
      terms: false,
      currentUser: null,
    };
  }
  componentDidMount() {
    firebase.
    auth().onAuthStateChanged((user) => {
      if (user) {
        const {currentUser} = firebase.auth();

        //  const { profileImageUrl } = this.state;

        this.setState({currentUser});
        //
        this.state.username = currentUser && currentUser.displayName;
        this.state.email = currentUser && currentUser.email;

        // var user = currentUser && currentUser.email;
        var removechar = currentUser && currentUser.email;

        // var originalString = removechar;
        // var newString1 = originalString.replace('@', '- ');

        var newString2 = removechar.replace(/[^0-9a-z]/gi, '-');

        firebase.database()
          .ref('users/' + newString2 + '/admin')
          .once('value', (snapshot) => {
            if (snapshot.exists()) {
              const user_type = snapshot.val();
              if (user_type == 'admin') {
                this.props.navigation.navigate('AdminHome');
                
                // alert('Posting Entity');
              } else {
                this.props.navigation.navigate('Home');
                
              }
            } else {
              this.props.navigation.navigate('Home');
              this.setState({loading: false, disabled: false});
            }
          });
      } else {
        this.props.navigation.navigate('Login');
      }
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{width: 70, height: 70}}
          source={require('../images/Loginlogo.png')}
        />
        <Text>Loading...</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
