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

import { ListItem, SearchBar } from "react-native-elements";

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
      confirm_agreement: false,
      loading: false,
      disabled: false
    };
  }

    //   componentDidMount() {
    //     firebase.database().ref('/LegalAid').on('value', querySnapShot => {
    //       let data = querySnapShot.val() ? querySnapShot.val() : {};
    //       let todoItems = {...data};
    //       this.setState({
    //         todos: todoItems,
    //       });
    //       console.log(querySnapShot.val().Address);
    //     });
    //   }
      componentDidMount() {
        // const { currentUser } = firebase.auth();
    
        // this.setState({ currentUser });
    
        // var user_id = currentUser && currentUser.uid;
        // var name = currentUser && currentUser.displayName;
        var ref = firebase
          .database()
          .ref("/LegalAid/"); //Here assuming 'Users' as main table of contents
    
        ref.once("value").then((snapshot) => {
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
          console.log(this.state.data);
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
    
      searchFilterFunction = (text) => {
        this.setState({
          value: text,
        });
    
        const newData = this.arrayholder.filter((item) => {
          const itemData = `${item.feed.toUpperCase()} ${item.date_flushed.toUpperCase()}${item.employee.toUpperCase()}`;
          const textData = text.toUpperCase();
    
          return itemData.indexOf(textData) > -1;
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
      _renderItem = ({ item }) => {
        return (
          <View style={styles.item}>
             <View>
              {/* <Text style={styles.details}>Name:</Text> */}
              <Text style={styles.value}>Name: {item.Name}</Text>
            </View>
            <View>
              {/* <Text style={styles.details}>Address:</Text> */}
              <Text style={styles.value}>Address: {item.Address}</Text>
            </View>
    
            <View>
              {/* <Text style={styles.details}>District:</Text> */}
              <Text style={styles.value}>District: {item.District}</Text>
            </View>
    
            <View>
              {/* <Text style={styles.details}>Email:</Text> */}
              <Text style={styles.value}>Email: {item.Email}</Text>
            </View>
    
            <View>
              {/* <Text style={styles.details}>Tellphone:</Text> */}
              <Text style={styles.value}>Tellphone: {item.Tellphone}</Text>
            </View>
    
            <View>
              {/* <Text style={styles.details}>Description:</Text> */}
              <Text style={styles.value}>Description: {item.Description}</Text>
            </View>
    
            
          </View>
        );
      };

      onClick() {
        console.log("clicked ");
        return(
            <View>
               <Text>hi</Text> 
            </View>
        )
    }

    
      render() {
        if (this.state.loading) {
          return (
            <View
              style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
            >
              <ActivityIndicator />
            </View>
          );
        }
        return (
          <View style={{ flex: 1 ,marginBottom:40}}>
            {/* <FlatList
              data={this.state.data}
              renderItem={this._renderItem}
              keyExtractor={(item, index) => {
                return index.toString();
              }}
              ItemSeparatorComponent={this.renderSeparator}
              ListHeaderComponent={this.renderHeader}
            /> */}
            
            <View>
            <ScrollView>
            <View  style={{borderBottomColor:Colors.orange,borderBottomWidth :1, marginTop:20}}>
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
                </View>
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
        fontSize: 18,
        fontWeight: "bold",
      },
      textCont: {},
      value: {
        fontSize: 18,
      },
    
  });
  
