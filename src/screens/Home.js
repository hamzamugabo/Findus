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
    
  PixelRatio,

  
} from "react-native";
import Colors from '../pages/colors';
export default class Home extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
          
          headerRight: () => (
            <View style={styles.Header}>
              <View style={[styles.headerContainer, {marginHorizontal: 30}]}>
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
    
    render() {
        return (
         <View>
             <Text>
                 Welcome Home
             </Text>
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
      // backgroundColor: '#ADD8E6',
    },
    cardview: {
      marginTop: 90,
    },
    buttonsContainer: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-around',
      paddingHorizontal: 0,
      alignItems: 'center',
      marginLeft: 10,
    },
    buttonsContainers: {
      flexDirection: 'row',
      width: '90%',
      justifyContent: 'space-around',
      paddingHorizontal: 0,
      alignItems: 'center',
      marginLeft: 10,
    },
    buttonsContainerss: {
      flexDirection: 'row',
      width: '90%',
      justifyContent: 'flex-start',
      paddingHorizontal: 0,
      alignItems: 'center',
      marginLeft: 10,
    },
    logout: {
      // flexDirection: "row",
  
      alignItems: 'center',
    },
    card: {
      shadowColor: 'black',
      shadowOffset: {width: 0, height: 2},
      shadowRadius: 6,
      shadowOpacity: 0.26,
      elevation: 8,
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 10,
      width: 120,
      height: 120,
      alignItems: 'center',
    },
    TextInputStyleClass: {
      // textAlign: 'center',
      marginBottom: 7,
      height: 40,
      width: 200,
      borderWidth: 1,
      // Set border Hex Color Code Here.
      borderColor: '#2196F3',
  
      // Set border Radius.
      borderRadius: 5,
    },
    ImageContainer: {
      borderRadius: 90,
      width: 90,
      height: 90,
      borderColor: '#9B9B9B',
      borderWidth: 1 / PixelRatio.get(),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#CDDC39',
    },
    Header: {
      // justifyContent:"space-around",
      flexDirection: 'row',
      marginLeft: 250,
    },
  
    logoutContainer: {
      flexDirection: 'row',
      // flex:1,
      // paddingLeft:180,
      marginTop: 15,
      marginBottom: 15,
      marginLeft: 20,
      color: 'red',
    },
    HomeContainer: {
      // flex:1,
      // paddingRight:50,
      marginTop: 15,
      marginBottom: 15,
      // marginRight:150
    },
    HomeContainer2: {
      // flex:1,
      // paddingRight:50,
      marginRight: 20,
      marginTop: 15,
      marginBottom: 15,
      // marginRight:150
    },
    logoutt: {
      color: Colors.orange,
      fontSize: 13,
      // fontWeight:"bold"
    },
    home: {
      color: Colors.orange,
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
  });
  
