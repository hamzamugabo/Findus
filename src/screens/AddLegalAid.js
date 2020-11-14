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
    PixelRatio
  
} from "react-native";
import firebase  from "firebase";

import Colors from '../pages/colors';
import * as Progress from 'react-native-progress';
import ImagePicker from 'react-native-image-picker';


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
      disabled: false,
      currentUser: null,
      ImageSource: null,
      stimage: null,
      stuploading: false,
      sttransferred: 0,
      photos: '',


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

  // this.uploadImage();

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
                      passport_photo: this.state.stimage,
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
          selectPhotoTapped() {
            // selectImage = () => {
            const options = {
              quality: 1.0,
              maxWidth: 500,
              maxHeight: 500,
              storageOptions: {
                skipBackup: true,
              },
            };
        
            ImagePicker.showImagePicker(options, (response) => {
              // console.log('Response = ', response);
        
              if (response.didCancel) {
                console.log('User cancelled photo picker');
              } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
              } else {
                let source = {uri: response.uri};
        
                console.log(source);
                this.setState({
                  stimage: source,
                  // data: response.data
                });
              }
            });
          }
          uploadImage = async () => {
            // this.saveData();
            const {uri} = this.state.stimage;
        
            // console.log('uri= '+uri)
        
            console.log('stimage= ' + this.state.stimage);
            const filename = uri;
        
            // alert(filename)
            console.log(filename);
            const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
            this.setState({sttransferred: 0});
            this.setState({stuploading: true});
            // sttransferred(0);
            const task = firebase.storage()
              .ref('/passport_photo' + filename)
              .putFile(uri);
            // set progress state
            task.on('state_changed', (snapshot) => {
              this.setState({
                sttransferred:
                  Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000,
              });
            });
            try {
              await task;
            } catch (e) {
              console.error(e);
              alert(e);
            }
        
            this.setState({stuploading: false});
            Alert.alert('Photo uploaded!', 'Your photo has been uploaded');
            const ref = firebase.storage().ref(filename);
        
            ref
              .getDownloadURL()
              .then((url) => {
                this.setState({photos: url});
              })
              .catch((e) => console.log('getting downloadURL of image error => ', e));
            // // alert(this.state.url)
        
            // alert(this.state.url)
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
                      {/* <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)} 
                      style={{alignItems:'center'}}
                      >
              <View style={styles.ImageContainer}>
                {this.state.stimage === null ? (
                  <Text style={{color:'#FFFFFF'}}>Select Logo</Text>
                ) : (
                  <Image
                    style={styles.ImageContainer}
                    source={this.state.stimage}
                  />
                )}
              </View>
            </TouchableOpacity> */}
            <Text></Text>
            {this.state.stuploading ? (
              <View style={styles.progressBarContainer}>
                <Progress.Bar progress={this.state.sttransferred} width={300} />
              </View>
            ) : (
              
              <TouchableHighlight
                        style={[styles.buttonContainer, styles.loginButton]}
                        onPress={this.addlegalaid}>
                        <Text style={styles.loginText}>Register</Text>
                      </TouchableHighlight>
            )}

        
                     
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
            // backgroundColor: '#0c2642',
            backgroundColor: '#000080',
          },
          loginText: {
            color: 'white',
            // color: '#58f406',
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
          ImageContainer: {
            borderRadius: 90,
            width: 60,
            height: 60,
            borderColor: '#000080',
            borderWidth: 1 / PixelRatio.get(),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000080',
            padding:10
          },
        
        
        });
        