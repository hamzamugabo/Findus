import React, { Component } from "react";

import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableHighlight,
    ActivityIndicator,
    Image,
    Alert,
    TouchableOpacity,
  
} from "react-native";

import firebase, * as firbase from "firebase";

// import TextInput from 'react-native-textinput-with-icons';
// Creating Login Activity.
class Login extends Component {
  // Setting up Login Activity title.
  static navigationOptions = {
    title: " Login"
  };
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', loading:false, disabled:false, errorMessage: null }
  
  }
  

  
    handleLogin = () => {
      this.setState({loading: true, disabled: true});
      const { email, password } = this.state;
      
      // this.setState({ loading: true });
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((success) => {
          this.setState({loading: true, disabled: true});
          // If server response message same as Data Matched
          if (success) {
            this.setState({loading: true, disabled: true});
            var newString2 = email.replace(/[^0-9a-z]/gi, '-');

        firebase.database()
          .ref('users/' + newString2 + '/admin')
          .once('value', (snapshot) => {
            if (snapshot.exists()) {
              
              const user_type = snapshot.val();
              // alert(user_type);
              if (user_type == 'admin') {
                this.props.navigation.navigate('AdminHome');
                
                // alert('Posting Entity');
              } else {
                this.props.navigation.navigate('Home');
                
              }
            } else {
              // alert("no exis");
              this.props.navigation.navigate('Home');
              this.setState({loading: false, disabled: false});
            }
          });
            //Then open Profile activity and send user email to profile activity.
            // this.props.navigation.navigate('Home');
            // Alert.alert('data matched');
          } else {
            Alert.alert(error);
          }

          this.setState({loading: false, disabled: false,email:'',password:''});
        })
        .catch((error) => {
          console.log(error);
          this.setState({ errorMessage: error.message }); 
          this.setState({loading: false, disabled: false});
      });
    // });
    }
  

    render() {
        return (
          <View style={styles.container}>
            <Text>
            {this.state.loading ? "Loading..." : null}{"\n"}</Text>
              
            <View style={styles.headerContainer}>
              {/* <Image
                style={{width: 133, height: 133}}
                source={require('../images/Loginlogo.png')}
              /> */}
              
               
            <Text style={{color: 'red'}}>
                {this.state.errorMessage ? this.state.errorMessage : null}
              </Text>
            </View>
          
    
            <View style={{marginTop: 0, alignItems: 'center'}}>
              
              <View style={styles.inputContainer}>
             
                {/* <Image
                  style={styles.inputIcon}
                  source={{
                    uri: 'https://png.icons8.com',
                  }}
                /> */}
                <TextInput
                  style={styles.inputs}
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  // clearButtonMode="always"
                  // ref={this.myTextInput}
                  // onSubmitEditing={() => {
                  //   this.myTextInput.current.clear();
                  // }}
                  underlineColorAndroid="transparent"
                  onChangeText={(email) => this.setState({email})}
                />
              </View>
    
              <View style={styles.inputContainer}>
                {/* <Image
                  style={styles.inputIcon}
                  source={{
                    uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db',
                  }}
                /> */}
                <TextInput
                  style={styles.inputs}
                  placeholder="Password"
                  secureTextEntry={true}
                  underlineColorAndroid="transparent"
                  clearButtonMode="always"
                  onChangeText={(password) => this.setState({password})}
                />
              </View>
    
              <TouchableHighlight
                style={[styles.buttonContainer, styles.loginButton]}
                onPress={this.handleLogin}>
                <Text style={styles.loginText}>Login</Text>
              </TouchableHighlight>
    
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => this.props.navigation.navigate('ForgotPassword')}>
                <Text style={{color: '#0c2642'}}>Forgot your password?</Text>
              </TouchableOpacity>
    
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => this.props.navigation.navigate('Register')}>
                <Text style={{color: '#0c2642'}}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCDCDC',
      },
      inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 250,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
      },
      inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
      },
      inputIcon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: 'center',
      },
      buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
      },
      loginButton: {
        backgroundColor: '#0c2642',
      },
      loginText: {
        color: '#58f406',
      },
      headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        // backgroundColor: "white",
        marginBottom: 3,
        flexDirection: 'row',
        marginTop: 30,
      },
      // label: {
      //   flexDirection:'row',
      //   alignContent:'center'
      // },
      buttonsContainer: {
        flexDirection: 'row',
        // width: "100%",
        justifyContent: 'flex-start',
        paddingHorizontal: 0,
        alignItems: 'center',
        // marginLeft:25,
      },
    });
    
export default Login;
