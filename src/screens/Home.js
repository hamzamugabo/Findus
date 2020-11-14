import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    FlatList,
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
import Card from '../pages/Card';
import call from 'react-native-phone-call';
import { ListItem, SearchBar } from "react-native-elements";
import email from 'react-native-email'
import firebase, * as firbase from "firebase";
export default class Home extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
             headerTitle: () => (
            <View style={{flexDirection: 'row'}}>
             <Text>Legal Aid</Text>
            </View>
          ),
          
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
      
  constructor() {
    super();

    this.state = {
      Description: "" ,
      email: "",
      Name:'',
      todos:'',
      District:'',
      Address: "",
      Tellphone: "",
      backgroundColor:'',
      color:'',
      data:[],
      is_admin:false,
      currentUser: null,
      confirm_agreement: false,
      loading: false,
      disabled: false
    };
  }

      componentDidMount() {
        this.setState({ loading: true });
        this.setState({loading: true, disabled: true});
        // var newString2 = email.replace(/[^0-9a-z]/gi, '-');

        firebase.
        auth().onAuthStateChanged((user) => {
          if (!user) {
           
            this.props.navigation.navigate('Login');
          } 
        });


        var ref = firebase
          .database()
          .ref("/LegalAid/"); //Here assuming 'Users' as main table of contents
    
        ref.once("value").then((snapshot) => {
          
        this.setState({ loading: false });
          // console.log(snapshot.val());
    
          // get children as an array
          var items = [];
          snapshot.forEach((child) => {
            items.push({
              Name: child.val().Name,
              Address: child.val().Address,
              District: child.val().District,
              Email: child.val().Email,
              Tellphone: child.val().Tellphone,
              Description: child.val().Description,
            });
          });
    
          this.setState({ data: items });
          // console.log(this.state.data);
          this.arrayholder = items;
        });
      }

      renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: "86%",
              backgroundColor: "#CED0CE",
            }}
          />
        );
      };
    addLegalAid = () => {
      this.setState({ loading: true });
        const { currentUser } = firebase.auth();
    
        this.setState({ currentUser });
    
        var user_id = currentUser && currentUser.uid;
        var name = currentUser && currentUser.displayName;
        var email = currentUser && currentUser.email;
        this.setState({loading: true, disabled: true});
        var newString2 = email.replace(/[^0-9a-z]/gi, '-');

    firebase.database()
      .ref('users/' + newString2 + '/admin')
      .once('value', (snapshot) => {
        if (snapshot.exists()) {
          
          const user_type = snapshot.val();
          // alert(user_type);
          if (user_type == 'admin') {
            
      this.setState({ loading: false });
      return this.props.navigation.navigate("AddLegalAid");
          } else {
            
            this.setState({loading: false});
            return this.props.navigation.navigate("Home");
          }
        } else {
          // alert("no exis");
          this.setState({loading: false});
          return this.props.navigation.navigate("Home");
          // this.setState({loading: false, disabled: false});
        }
      });
    };
  //   componentWillUnmount() {
  //     // fix Warning: Can't perform a React state update on an unmounted component
  //     this.setState = (state,callback)=>{
  //         return;
  //     };
  // }
      searchFilterFunction = (District) => {
        // text = this.state.data.District;
        this.setState({
          value: this.state.data.District,
        });
    
        const newData = this.arrayholder.filter((item) => {
          const itemData = `${item.Address.toUpperCase()} ${item.District.toUpperCase()}${item.Name.toUpperCase()}`;
          const textData = District.toUpperCase();
    
          return itemData.indexOf(textData) > -1;
        });
        this.setState({
          data: newData,
        });
      };

      all = (District) => {
        // text = this.state.data.District;
        this.setState({
          value: this.state.data.District,
        });
    
        const newData = this.arrayholder.filter((item) => {
          // const itemData = `${item.Address.toUpperCase()} ${item.District.toUpperCase()}${item.Name.toUpperCase()}`;
          // const textData = item.toUpperCase();
    
          return item;
        });
        this.setState({
          data: newData,
        });
      };
    
    
    
      renderHeader = () => {
        
        return (
          <SearchBar
            placeholder="Search..."
            lightTheme
            round
            onChangeText={(text) => this.searchFilterFunction(text)}
            autoCorrect={false}
            value={this.state.value}
          />
        );
      };
      header= () => {
        const { navigate } = this.props.navigation;
        return(
        <View style={styles.headerStyle}>
          <ScrollView horizontal={true}>
          <View  style={{borderBottomColor:Colors.orange,padding:10}}>
                 <TouchableHighlight
                style={[styles.buttonContainer, styles.loginButton,{width:50}]}
                // onPress={this.searchFilterFunction}
                
                onPress={this.all}


                >
                <Text style={styles.loginText}>All</Text>
              </TouchableHighlight>
                </View>
          {this.state.data.map((order, index) => (
              
              <View key={index} style={{borderBottomColor:Colors.orange,padding:10}}>
                 <TouchableHighlight
                style={[styles.buttonContainer, styles.loginButton]}
                // onPress={this.searchFilterFunction}
                key={index}
                  onPress={this.searchFilterFunction.bind(this, order.District)}

                >
                <Text style={styles.loginText}>{order.District}</Text>
              </TouchableHighlight>
                </View>
                ))}
                </ScrollView>
        </View>);
      }
      getListViewItem = (item) => {  
        // Alert.alert(item.Email);  
        const to = [item.Email] // string or array of email addresses
        email(to, {
            // Optional additional arguments
            // cc: ['bazzy@moo.com', 'doooo@daaa.com'], // string or array of email addresses
            // bcc: 'mee@mee.com', // string or array of email addresses
            subject: 'Add subject',
            body: 'Some body right here'
        }).catch(console.error)
    } 
    getListViewItem2 = (item) => {  
      Alert.alert(item.Tellphone);  
  }  
  call = (item) => {
    const args = {
      number: item.Tellphone,
      prompt: false,
    };
    call(args).catch(console.error);
  };

      _renderItem = ({ item }) => {
        return (
          <Card>
          
          <View style={[styles.buttonsContainer, {marginBottom: 20}]}>
              <Text style={styles.details}>Name:</Text>
              <Text style={styles.value}>{item.Name}</Text>
              {/* <Text style={styles.value}></Text> */}
            </View>
            <View style={[styles.buttonsContainer, {marginBottom: 20}]}>
              <Text style={styles.details}>Address:</Text>
              <Text style={styles.value}>{item.Address}</Text>
              {/* <Text style={styles.value}></Text> */}
            </View>
    
            <View style={[styles.buttonsContainer, {marginBottom: 20}]}>
              <Text style={styles.details}>District:</Text>
              <Text style={styles.value}>{item.District}</Text>
              {/* <Text style={styles.value}></Text> */}
            </View>
    
            <View style={[styles.buttonsContainer, {marginBottom: 20}]}>
              <Text style={styles.details}>Email:</Text>
              <Text style={styles.value}>{item.Email}</Text>
              <TouchableOpacity
              onPress={this.getListViewItem.bind(this, item)}
              >
               <Image
                style={{width: 30, height: 30}}
                source={require('../images/email.png')}
              />
</TouchableOpacity>
            </View>
    
            <View style={[styles.buttonsContainer, {marginBottom: 20}]}>
              <Text style={styles.details}>Tellphone:</Text>
              <Text style={styles.value}>{item.Tellphone}</Text>
              <TouchableOpacity
              onPress={this.call.bind(this, item)}
              >
               <Image
                style={{width: 30, height: 30}}
                source={require('../images/phone.png')}
              />
              </TouchableOpacity>
            </View>
    
            <View style={[styles.buttonsContainer, {marginBottom: 20}]}>
              <Text style={styles.details}>Description:</Text>
              <Text style={styles.value}>{item.Description}</Text>
              {/* <Text style={styles.value}></Text> */}
            </View>
    
            
          {/* </View> */}
          </Card>
        );
      };

      clickHandler = () => {
        //function to handle click on floating Action Button
        alert('Floating Button Clicked');
      }

    
      render() {
        if (this.state.loading) {
          return (
            <View
              style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
            >
              <Text>Loading...</Text>
            </View>
          );
        }
        return (
          <View style={{ flex: 1 ,marginBottom:5}}>
            <Text>
            {this.state.loading? "Loading...":null}</Text>
            <View  style={{ marginBottom:20}}>

            <FlatList
              data={this.state.data}
              renderItem={this._renderItem}
              keyExtractor={(item, index) => {
                return index.toString();
              }}
              ItemSeparatorComponent={this.renderSeparator}
              ListHeaderComponent={this.header}
            />
            
            <View>
            <ScrollView>
            {/* <View  style={{borderBottomColor:Colors.orange,borderBottomWidth :1, marginTop:20}}>
            <TouchableHighlight
                onPress={this.onClick}
                
            >
             <View style={{alignItems:'center',margin:10}}>
                 
            <Text>Kampala</Text>
            </View>
            </TouchableHighlight>
                </View>
                <View  style={{borderBottomColor:Colors.orange,borderBottomWidth :1,}}>
                    
                <View style={{alignItems:'center',margin:10}}>
            <Text>Mbarara</Text>
            </View>
                </View>
                <View  style={{borderBottomColor:Colors.orange,borderBottomWidth :1,}}>
                <View style={{alignItems:'center',margin:10}}>
            <Text>Arua</Text>
            </View>
                </View>
                <View  style={{borderBottomColor:Colors.orange,borderBottomWidth :1,}}>
                <View style={{alignItems:'center',margin:10}}>
            <Text>Gulu</Text>
            </View>
                </View>
                <View  style={{borderBottomColor:Colors.orange,borderBottomWidth :1,}}>
                <View style={{alignItems:'center',margin:10}}>
            <Text>Kasese</Text>
            </View>
                </View> */}
            {/* {this.state.data.map((order, index) => (
              
              <View key={index} style={{borderBottomColor:Colors.orange,borderBottomWidth :1,}}>
                
                <View style={{paddingHorizontal: 50}}>
                  <Text>Name: {order.Name ? order.Name : null}</Text>
                  <Text>
                    Address: {order.Address ? order.Address : null}
                  </Text>
                  <Text>
                    District:{' '}
                    {order.District ? order.District : null}
                  </Text>
                  <Text>
                    Tellphone:{' '}
                    {order.Tellphone != '' ? order.Tellphone : 'null'}
                  </Text>
                  <Text>
                    {' '}
                    Email:{' '}
                    {order.Email != '' ? order.Email : 'null'}
                  </Text>
                  <Text>
                    Description:{' '}
                    {order.Description ? order.Description : null}
                  </Text>

                  <Text></Text>
                </View> */}
                {/* <View style={[styles.buttonsContainer, {marginBottom: 20}]}>
                  <TouchableOpacity
                  key={index}
                  onPress={this.call.bind(this, order.mobile_number)}
                  >
                     <Image
                  // style={{height: 40}}
                  source={require('../images/phone.png')}
                />
                  </TouchableOpacity>

                  <TouchableOpacity
                   key={index}
                   style={styles.buttonContainer}
                   onPress={this.start_trip.bind(this, order.id)}
                  >
<Text>Accept Trip</Text>
                  </TouchableOpacity>
                </View> */}
                
            {/* </View> */}
              {/* </View>
            ))} */}
          </ScrollView>

            </View>
            </View>
            {/* {this.state.is_admin?(
            <TouchableOpacity
          activeOpacity={0.7}
          onPress={this.addLegalAid}
          style={styles.touchableOpacityStyle}>
          <Image
            // FAB using TouchableOpacity with an image
            // For online image
            // source={{
            //   uri:
            //     'https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png',
            // }}
            // For local image
            source={require('../images/plus_icon.png')}
            style={styles.floatingButtonStyle}
          />
        </TouchableOpacity>):null} */}
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
    item: {
        flex: 1,
        marginBottom: 15,
        marginLeft: 20,
        fontWeight: "bold",
        fontSize: 15,
      },
      details: {
        fontSize: 14,
        fontWeight: "bold",
      },
      textCont: {},
      value: {
        fontSize: 14,
      },
      buttonsContainer: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-between',
        paddingHorizontal: 0,
        // alignItems: 'center',
        // marginLeft: 10,
      },
      buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        // width: 150,
        borderRadius: 10,
      },
      loginButton: {
        backgroundColor: '#000080',
        padding:7
      },
      loginText: {
        color: '#58f406',
      },
      touchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
      },
      floatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
        //backgroundColor:'black'
      },
    
  });
  
