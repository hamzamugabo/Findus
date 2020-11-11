import React, { Component } from "react";
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
    TouchableHighlight,
    Picker,
    Image,
  
} from "react-native";
import firebase, * as firbase from "firebase";

import Colors from '../pages/colors';


import CheckBox from "@react-native-community/checkbox";

export default class AddLegalAid extends Component {
  static navigationOptions = {
    title: "Add Legal Aid"
  };
  

  constructor() {
    super();

    this.state = {
      uid: 1 ,
      email: "",
      displayName:'',
      user_uid:'',
      phoneNumber:'',
      password: "",
      confirm_password: "",
      confirm_agreement: false,
      loading: false,
      disabled: false
    };
  }
 
 
  handleSignUp = () => {

  firebase
         .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(userCredentials => {
            return userCredentials.user.updateProfile({
                displayName: this.state.displayName,
                phoneNumber: this.state.phoneNumber
            });

        })
        .catch((error) => {
          console.log(error);
          this.setState({ errorMessage: error.message }); 
           this.setState({ loading: false, disabled: false });
      });
  
};


handleSignUp2 = () => {
  var removechar = this.state.email;

   var originalString =removechar; 
   var newString1 = originalString.replace('@', '-');
   
   var newString2 = newString1.replace('.', '-');
  var RandomNumber = Math.floor(Math.random() * 100) + 1 ;
          this.setState({uid : RandomNumber  });
                    if(this.state.displayName  != ''){
                      if(this.state.email  != ''){
                        if(this.state.phoneNumber  != ''){
                          if(this.state.password  != ''){
                            if(this.state.confirm_password  == this.state.password){
                                if (this.state.confirm_agreement == true) {
                
          if(!this.state.errorMessage){
            if(newString2 != ''){
              this.setState({loading: true, disabled: true}, () => {
            firebase.database().ref('users/' + newString2 ).set(
              {
               
                      displayName: this.state.displayName,
          
                      email: this.state.email,
          
                      password: this.state.password,
          
                      phoneNumber: this.state.phoneNumber,
          
                      user_uid: this.state.user_uid
              }
              ).then(() => {  
                if(!this.state.errorMessage){
                  this.setState({ loading: false, disabled: false });
                  alert('Registered Successfully')
                  return this.props.navigation.navigate("Login");
                  }
                
                
            }).catch((error) => {
              // this.state.errorMessage ? this.handleSignUp()  : this.handle()
               this.setState({ loading: false, disabled: false });
          });
        });
        }
      }
    }else{alert('agree to terms first')}
    }else{alert('passwords not matching')}
    }else{alert('Enter password')}
    }else{alert('Enter phone number')}
    }else{alert('Enter email')}
    }else{alert('Enter username')}
          };

          handle = () => {
            this.handleSignUp();
            this.handleSignUp2();
          }


          handleCombined = () => {
            if(this.state.errorMessage ){
              return this.handleSignUp();
            }
            else{
              return this.handle();
            }
            // this.state.errorMessage ? this.handleSignUp()  : this.handle()
           
          }

          render() {
            return (
              <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                  <View style={styles.reg}>
                    <Text style={{fontSize: 20, color: Colors.blue}}>Register</Text>
                    {this.state.errorMessage && (
                      <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>
                    )}
                  </View>
        
                  <View style={{width: 260}}>
                    <ScrollView>
                      <View style={styles.inputContainer}>
                        <TextInput
                          underlineColorAndroid="transparent"
                          placeholder="username"
                          style={styles.inputs}
                          autoCapitalize="none"
                          onChangeText={(displayName) => this.setState({displayName})}
                          value={this.state.displayName}
                        />
                      </View>
                     
        
                     
                      <View style={styles.inputContainer}>
                        <TextInput
                          underlineColorAndroid="transparent"
                          placeholder="email"
                          autoCapitalize="none"
                          keyboardType="email-address"
                          style={styles.inputs}
                          onChangeText={(text) => this.setState({email: text})}
                        />
                      </View>
                      <View style={styles.inputContainer}>
                        <TextInput
                          underlineColorAndroid="transparent"
                          placeholder="Phone Number"
                          autoCapitalize="none"
                          keyboardType="number-pad"
                          style={styles.inputs}
                          onChangeText={(text) => this.setState({phoneNumber: text})}
                        />
                      </View>
        
                      <View style={styles.inputContainer}>
                        <TextInput
                          underlineColorAndroid="transparent"
                          placeholder="password"
                          style={styles.inputs}
                          onChangeText={(password) => this.setState({password})}
                          value={this.state.password}
                          secureTextEntry={true}
                        />
                      </View>
                      <View style={styles.inputContainer}>
                        <TextInput
                          underlineColorAndroid="transparent"
                          placeholder="Confirm password"
                          style={styles.inputs}
                          onChangeText={(confirm_password) =>
                            this.setState({confirm_password})
                          }
                          value={this.state.confirm_password}
                          secureTextEntry={true}
                        />
                      </View>
        
                      <View style={[styles.buttonsContainer, {marginBottom: 5}]}>
                        <CheckBox
                          value={this.state.confirm_agreement}
                          onValueChange={(confirm_agreement) =>
                            this.setState({confirm_agreement})
                          }
                          style={styles.checkbox}
                        />
        
                        <Text style={styles.label}>
                          Agree to terms & Conditions
                        </Text>
                      </View>
        
                      <TouchableHighlight
                        style={[styles.buttonContainer, styles.loginButton]}
                        onPress={this.handleSignUp}>
                        <Text style={styles.loginText}>Register</Text>
                      </TouchableHighlight>
                    </ScrollView>
                  </View>
        
                  {this.state.loading ? <ActivityIndicator size="large" /> : null}
        
                  {/* <View style={styles.signupTextCont}> */}
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Login')}>
                    {/* <Text style={styles.signupButton}> */}
                    <Text style={styles.signupText}>
                      Already have an account? Login
                    </Text>
                  </TouchableOpacity>
                  {/* </View> */}
                </View>
              </TouchableWithoutFeedback>
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
        
          textInput: {
            height: 40,
            borderWidth: 1,
            borderColor: 'grey',
            marginVertical: 5,
            alignSelf: 'stretch',
            padding: 8,
            fontSize: 16,
          },
          TextInputStyleClass: {
            // textAlign: 'center',
            marginBottom: 7,
            height: 40,
            borderWidth: 1,
            // Set border Hex Color Code Here.
            borderColor: '#2196F3',
        
            // Set border Radius.
            borderRadius: 5,
          },
        
          Btn: {
            backgroundColor: 'rgba(0,0,0,0.6)',
            alignSelf: 'stretch',
            padding: 10,
            marginTop: 10,
            marginBottom: 5,
          },
        
          btnText: {
            textAlign: 'center',
            color: 'white',
            fontSize: 16,
          },
          signupTextCont: {
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'flex-end',
            paddingVertical: 16,
            flexDirection: 'row',
          },
          signupText: {
            color: Colors.blue,
            fontSize: 16,
          },
          signupButton: {
            color: '#12799f',
            fontSize: 16,
            fontWeight: 'bold',
          },
          // reg: {
          //   alignItems: 'center',
          //   fontWeight: 'bold',
          //   fontSize: 18,
          //   marginBottom: 30,
          //   marginTop:60
          // },
          label: {
            flexDirection: 'row',
            alignContent: 'center',
            color: Colors.blue,
          },
          buttonsContainer: {
            flexDirection: 'row',
            // width: "100%",
            justifyContent: 'flex-start',
            paddingHorizontal: 0,
            alignItems: 'center',
            // marginLeft:25,
          },
          reg: {
            alignItems: 'center',
            fontWeight: 'bold',
            fontSize: 18,
            marginBottom: 10,
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
          loginButton: {
            backgroundColor: '#0c2642',
          },
          loginText: {
            color: '#58f406',
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
        });
        