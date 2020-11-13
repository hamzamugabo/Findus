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
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: () => (
        <View style={{flexDirection: 'row'}}>
           <Text style={styles.home2}>Legal Aid</Text>
        </View>
      ),
      headerRight: () => (
        <View style={styles.Header}>
          <View style={[styles.headerContainer, {marginHorizontal: 30}]}>
           
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate('AdminHome')}>
                
                <Text style={styles.home}>Home</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                 onPress={() => navigation.navigate('SignOut')}>
                   
                 <Text style={styles.home}>Logout</Text>
              </TouchableOpacity>
            </View>
            
          </View>
        </View>
      ),
    };
  };

  

  constructor() {
    super();

    this.state = {
      Description: "" ,
      email: "",
      Name:'',
      Logo:'',
      District:'',
      Address: "",
      Tellphone: "",
      confirm_agreement: false,
      loading: false,
      disabled: false
    };
  }
 
 
  componentDidMount() {
    firebase.
    auth().onAuthStateChanged((user) => {
      if (!user) {
       
        this.props.navigation.navigate('Login');
      } 
    });
  }


addlegalaid = () => {
  // var removechar = this.state.email;

  //  var originalString =removechar; 
  //  var newString1 = originalString.replace('@', '-');
   
  //  var newString2 = newString1.replace('.', '-');
  var RandomNumber = Math.floor(Math.random() * 100) + 1 ;
          this.setState({uid : RandomNumber  });
                    if(this.state.Name  != ''){
                      if(this.state.District  != ''){
                        if(this.state.Address  != ''){
                          if(this.state.Tellphone  != ''){
                            if(this.state.Email  !=''){
                                if (this.state.Description != '') {
                
          // if(!this.state.errorMessage){
          //   if(newString2 != ''){
              this.setState({loading: true, disabled: true});
            firebase.database().ref('LegalAid/').push(
              {
               
                      Name: this.state.Name,
          
                      Email: this.state.Email,
          
                      Logo: this.state.Logo,
          
                      Tellphone: this.state.Tellphone,
          
                      Address: this.state.Address,
                      District: this.state.District,
                      Description: this.state.Description,
              }
              ).then((success) => {  
                if(success){
                  alert('Legal Aid added successfully')
                  this.setState({ loading: false, disabled: false,
                    Description: "" ,
                    Email: "",
                    Name:'',
                    Logo:'',
                    District:'',
                    Address: "",
                    Tellphone: "",
                  });
                  }
                
                
            }).catch((error) => {
              // this.state.errorMessage ? this.handleSignUp()  : this.handle()
               this.setState({ loading: false, disabled: false });
          });
        // });
      //   }
      // }
    }else{alert('Enter Description')}
    }else{alert('Enter Email')}
    }else{alert('Enter Tellphone')}
    }else{alert('Enter Address')}
    }else{alert('Enter District')}
    }else{alert('Enter Legal Aid Name')}
          };

          render() {
            return (
              <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                  <View style={styles.reg}>
                    <Text style={{fontSize: 20, color: Colors.blue}}>Add Legal Aid</Text>
                    {this.state.errorMessage && (
                      <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>
                    )}
                  </View>
        
                  <View style={{width: 260}}>
                    <ScrollView>
                      <View style={styles.inputContainer}>
                        <TextInput
                          underlineColorAndroid="transparent"
                          placeholder="Name"
                          style={styles.inputs}
                          autoCapitalize="none"
                          onChangeText={(Name) => this.setState({Name})}
                          value={this.state.Name}
                        />
                      </View>
                     
        
                     
                      <View style={styles.inputContainer}>
                        <TextInput
                          underlineColorAndroid="transparent"
                          placeholder="email"
                          autoCapitalize="none"
                          keyboardType="email-address"
                          style={styles.inputs}
                          onChangeText={(text) => this.setState({Email: text})}
                        />
                      </View>
                      <View style={styles.inputContainer}>
                        <TextInput
                          underlineColorAndroid="transparent"
                          placeholder="Phone Number"
                          autoCapitalize="none"
                          keyboardType="number-pad"
                          style={styles.inputs}
                          onChangeText={(text) => this.setState({Tellphone: text})}
                        />
                      </View>
        
                      <View style={styles.inputContainer}>
                        <TextInput
                          underlineColorAndroid="transparent"
                          placeholder="District"
                          style={styles.inputs}
                          onChangeText={(District) => this.setState({District})}
                          value={this.state.District}
                        />
                      </View>
                      <View style={styles.inputContainer}>
                        <TextInput
                          underlineColorAndroid="transparent"
                          placeholder="Address"
                          style={styles.inputs}
                          onChangeText={(Address) =>
                            this.setState({Address})
                          }
                          value={this.state.Address}
                        />
                      </View>
                      <View style={styles.inputContainer}>
                        <TextInput
                          underlineColorAndroid="transparent"
                          placeholder="Description"
                          style={styles.inputs}
                          onChangeText={(Description) =>
                            this.setState({Description})
                          }
                          value={this.state.Description}
                        />
                      </View>
        
                      {/* <View style={[styles.buttonsContainer, {marginBottom: 5}]}>
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
                      </View> */}
        
                      <TouchableHighlight
                        style={[styles.buttonContainer, styles.loginButton]}
                        onPress={this.addlegalaid}>
                        <Text style={styles.loginText}>Register</Text>
                      </TouchableHighlight>
                    </ScrollView>
                  </View>
                  {/* <Text></Text> */}
        
                  <Text>{this.state.loading ? "Loading..." : null}</Text>
                  <Text></Text>
                  {/* <View style={styles.signupTextCont}> */}
                  {/* <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={styles.signupText}>
                      Already have an account? Login
                    </Text>
                  </TouchableOpacity> */}
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
          home: {
            color: Colors.orange,
            fontSize: 13,
            // fontWeight:"bold"
          },
          home2: {
            color: Colors.blue,
            fontSize: 13,
            // fontWeight:"bold"
          },
          headerContainer: {
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-around',
            paddingHorizontal: 0,
            alignItems: 'center',
            marginLeft: 10,
          },
          Header: {
            // justifyContent:"space-around",
            flexDirection: 'row',
            marginLeft: 250,
          },
        
        
        });
        