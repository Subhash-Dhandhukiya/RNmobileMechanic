import React, { Component } from "react";
import { StyleSheet, Text, View,TextInput,Button,Image,Alert,TouchableHighlight,
    StatusBar, SafeAreaView, TouchableOpacity,FlatList,BackHandler, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-material-dropdown-v2-fixed';
import AddressViewModel from "../../ViewModels/AddressViewModel";
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import HelpRequestViewModel from "../../ViewModels/HelpRequestViewModel";

var userType = '';
var helpRequestData = '';

export default class EditHelpRequest extends Component
 {

  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentWillMount = async () => {
    userType = await AsyncStorage.getItem('userType');
    console.log('***',userType)
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
}

componentWillUnmount() {
   BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}

handleBackButtonClick() {
   this.props.navigation.goBack(null);
   return true;
}
 
    state=
    {
        message:'',
    }

    onClickReplyListener(){
      console.log('Request data : ',helpRequestData.request_id)
      const NetInfo = require("@react-native-community/netinfo"); 
      NetInfo.fetch().then(state => {
      console.log("Network Details :",state)
      if (state.isConnected == true) {
        var msgReg = /^[a-zA-Z ]{2,300}([a-zA-Z ]{2,300})+$/;
        if (this.state.message === ''){
          alert('Please enter message');
          return false;
        }
        else  if (msgReg.test(this.state.message) === false) {
          console.log('Message is not correct');
          alert('Message is not valid');
          return false;
        }else {
          HelpRequestViewModel.onReplyHelpRequestAPI(helpRequestData.request_id, this.state.message).then(
            (response, error) => {
              console.log('Reply help request output',response)
              if (response.RESPONSE_CODE == 200){
                console.log('Success res :',response)
                alert('Successfully replied')
                this.props.navigation.navigate('HelpRequest');
              }else{
                alert('Something went wrong, please try again');
              }
            });
        }
      }else{
        Alert.alert("Please check your Network Connection.");
      } 
    });
    };

    validateMessage = (text) =>{
        console.log(text);
        let reg = /^[a-zA-Z ]{2,40}([a-zA-Z ]{2,40})+$/;
        if (reg.test(text) === false) {
          console.log('Message is not correct');
          this.setState({message: text});
          return false;
        } else {
          this.setState({message: text});
          console.log('Message is Correct');
        }
      };
 
   render() {  
    const { navigate } = this.props.navigation;
    const {passData} = this.props.route.params; 
    helpRequestData = passData;
    console.log('data ::',helpRequestData);
    return (
      <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
      <TouchableOpacity style={styles.navBarBackButton} onPress={() => this.handleBackButtonClick()}>
        <Icon name="chevron-left" color='gray' size={30}/>
        </TouchableOpacity>
      <View style={styles.container}>

      <Text style={styles.titleText}>Reply Help Request</Text>

      <View style={{ flexDirection: "row",   justifyContent:"space-between",marginTop:10, borderColor:'#A9A9A9',borderWidth:1,
borderRadius:30, width:'90%'}}>
      <Text style={styles.textContainer}  >RequestId</Text>
      <View style={styles.navBarLeftButton}>
        <Text style={{color: 'black', fontWeight:'bold'}}>
        {passData.request_id}
        </Text>
      </View>
      </View>

      <View style={{ flexDirection: "row",   justifyContent:"space-between",marginTop:10, borderColor:'#A9A9A9',borderWidth:1,
borderRadius:30, width:'90%'}}>
      <Text style={styles.textContainer}  >Usertype</Text>
      <View style={styles.navBarLeftButton}>
        <Text style={{color: 'black', fontWeight:'bold'}}>
        {passData.user_type === "4" ? "Client" : "Mechanic"}
        </Text>
        </View>
      </View>

    <View style={{ flexDirection: "row",   justifyContent:"space-between",marginTop:10, borderColor:'#A9A9A9',borderWidth:1,
borderRadius:30, width:'90%'}}>
      <Text style={styles.textContainer}  >UserName</Text>
      <View style={styles.navBarLeftButton}>
        <Text style={{color: 'black', fontWeight:'bold', alignSelf:'center',alignContent:'center',}}>
        {passData.request_id}
        </Text>
       </View>
      </View>
    <View style={{ flexDirection: "row",   justifyContent:"space-between",marginTop:10, borderColor:'#A9A9A9',borderWidth:1,
borderRadius:30, width:'90%'}}>
      <Text style={styles.textContainer} >Subject</Text>
      <View style={styles.navBarLeftButton}>
        <Text style={{color: 'black', fontWeight:'bold'}}>
        {passData.subject}
        </Text>
        </View>
      </View> 
      <View style={{ flexDirection: "row",   justifyContent:"space-between",marginTop:10, borderColor:'#A9A9A9',borderWidth:1,
borderRadius:30, width:'90%'}}>
      <Text style={styles.textContainer} >Created Date</Text>
      <View style={styles.navBarLeftButton}>
        <Text style={{color: 'black', fontWeight:'bold'}}>
        {passData.created_on}
        </Text>
        </View>
      </View> 

      <View style={{ flexDirection: "row", justifyContent:"space-between",marginTop:20, borderColor:'#A9A9A9',
      width:'90%'}}>
      <Text style={{fontWeight:'bold',fontSize:20, marginLeft:15}} >Message</Text>
      </View> 
      <View style={{ flexDirection: "row", justifyContent:"space-between",marginTop:20, borderColor:'#A9A9A9',
      width:'90%'}}>
      <Text style={{fontSize:15, marginLeft:20}} numberOfLines={10}>{passData.message}</Text>
      </View> 

      <View style={{ flexDirection: "row", justifyContent:"space-between",marginTop:20, borderColor:'#A9A9A9',
      width:'90%'}}>
      <Text style={{fontWeight:'bold',fontSize:20, marginLeft:15}} >Reply</Text>
      </View> 
      <View style={{ flexDirection: "row", justifyContent:"space-between",marginTop:20, borderColor:'#A9A9A9',
      width:'90%', borderWidth:1,borderRadius:30}}>
      <TextInput style={styles.inputs} numberOfLines={10}
           placeholder = "Reply message"
           placeholderTextColor = '#A9A9A9'
           keyboardType="default"
           underlineColorAndroid='transparent'
           onChangeText={(text) => this.validateMessage(text)}
           value = {this.state.message}
           />
      </View> 

    <TouchableOpacity style={[styles.buttonContainer]} onPress={() => this.onClickReplyListener()} >
        <Text style={styles.logoutTextContainer}>Reply</Text>     
    </TouchableOpacity> 

      </View>
      </SafeAreaView>
        </>
    );
}
}
const styles = StyleSheet.create({
    container: {
      flexDirection:'column',
       // backgroundColor: '#FFFFFF',
      alignItems: 'center',
      marginBottom:0,
      marginTop:0
    },
    nameContainer:{
        marginTop:5,
        marginBottom:10,
        justifyContent: 'center',
        alignItems: 'center',
        color:'#2F4F4F',
        fontWeight:"bold",
        fontSize:15,
      },
     textContainer:{
    //    color:'#2F4F4F',
        fontWeight:"normal",
        justifyContent:"center",
        alignSelf:"center",
        fontSize:15,
        marginLeft:20,
      },
      inputs:{
        color:"black",
        marginLeft:16,
        borderBottomColor: '#FFFFFF',    
      },
      imageContainer:{
        color:'#2F4F4F',
         fontWeight:"normal",
         justifyContent:"center",
         alignSelf:"center",
         height:30,
         weidth :30,
         marginLeft:10,
       },
    
    inputContainer: {
      borderColor:'#A9A9A9',
      borderWidth:0,
      flex:0.7,
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      marginLeft:20,
      width:"55%",
      marginRight:20,
      height:45,
      justifyContent:'space-around',
      flexDirection: 'row',
      textAlign:"center",
      alignSelf:"flex-end",
      alignItems:'center'
  },

  bottomTextContainer:{
    color:'#5C5CFF',
     fontWeight:"normal",
     marginTop:35,
     justifyContent:"center",
     alignSelf:"center",
     fontSize:15,

   },
   logoutTextContainer:{
      color:'white',
     fontWeight:"bold",
     justifyContent:"center",
     alignSelf:"center",
     fontSize:20,

   },
   buttonContainer: {
    height:50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    marginTop:20,
    marginBottom:10,
    width:'70%',
    borderRadius:30,
    backgroundColor:'#03254c',
  },
  navBarLeftButton: {
    paddingLeft: 15,
    width: 100,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight:20,
    height:45,
  },
  navBarButton: {
    borderColor:'#A9A9A9',
    borderWidth:1,
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    paddingLeft: 15,
    width: 100,
    flex: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-arround',
    marginRight:20,
    height:45,
  },
  textInputs:{
    height:45,
    marginLeft:50,
    alignSelf:'center',
    alignItems:'center',
    justifyContent: 'center',
    alignContent:'center',
    borderBottomColor: '#FFFFFF',
    // flex:1,
},
navBarBackButton: {
    // paddingLeft: 15,
    // flex: 1,
    justifyContent: 'flex-start',
    marginLeft:10,
     marginTop:10,
    height:35,
  },
  titleText: {
    alignItems: 'center',
    alignSelf:'center',
    color: 'black',
    fontWeight:'bold',
    fontSize:25,
    marginBottom:20,
   },
   inputs:{
    height:50,
    marginLeft:16,
    fontSize:20,
    borderBottomColor: '#FFFFFF',
    flex:1,
},
  
});