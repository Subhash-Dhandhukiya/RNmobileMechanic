import React, { Component } from "react";
import { StyleSheet, Text, View,TextInput,Button,Image,Alert,TouchableHighlight,
    StatusBar, SafeAreaView, TouchableOpacity, Platform, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {MaterialCommunityIcons} from 'react-native-vector-icons/FontAwesome';
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/FontAwesome';
import ProfileViewModel from "../../ViewModels/ProfileViewModel";
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import BecomeMechViewModel from "../../ViewModels/BecomeMechViewModel";
import Home from "../Home";
import LogoutViewModel from "../../ViewModels/LogoutViewModel";
import Loader from "../Loader";

var userType = '';
var userEmail = '';
var userFirstName = '';
var userLastName = '';
var userPhone = '';
var userProile = '';


const clearStorage = async () => {
  try {
    await AsyncStorage.clear()
    alert('Successfully Logout')
  } catch (e) {
    alert('Failed to clear the async storage.')
  }
}

export default class Profile extends Component
 {
  constructor(props) {
    super(props);
    this.getUserName();
  }

  async componentWillMount(){
    userFirstName = await AsyncStorage.getItem('userFrstName');
    userLastName = await AsyncStorage.getItem('userLastName');
    userEmail = await AsyncStorage.getItem('userEmail');
    userPhone = await AsyncStorage.getItem('userPhone');
    userType = await AsyncStorage.getItem('userType');
    userProile = await AsyncStorage.getItem('profileImg');
    console.log('***',userFirstName)
    console.log('***',userLastName)
    console.log('***',userEmail)
    console.log('***',userPhone)
    console.log('***',userProile)
    console.log('***',userType)
    this.getUserName();
}

  state = {
    Alert_Visibility:false,
    filepath: {
      data: '',
      uri: ''
    },
    fileData: '',
    fileUri: '',
     userEmail : '',
     userName : '',
     userProile:'',
     loading:false,
    }
  launchCamera = () => {
    this.setState({Alert_Visibility: false});
    console.log('capture cammera = ');
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, (response) => {
     // console.log('Response = ', response);
      console.log('Uri', response );
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri:response.assets[0].uri  };
        console.log('response', JSON.stringify(response));
        this.setState({
          filePath: response,
          fileData: response.assets[0].data,
          fileUri: response.assets[0].uri 
        });
      }
    });

  }

  chooseImage = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response = uti',  response.assets[0].uri );

      if ( response.assets[0].didCancel) {
        console.log('User cancelled image picker');
      } else if ( response.assets[0].error) {
        console.log('ImagePicker Error: ',  response.assets[0].error);
      } else if ( response.assets[0].customButton) {
        console.log('User tapped custom button: ',  response.assets[0].customButton);
        alert( response.assets[0].customButton);
      } else {
        const source = { uri:  response.assets[0].uri };
        console.log('response', JSON.stringify(response));
        this.setState({
          filePath: response,
          fileData:  response.assets[0].data,
          fileUri:  response.assets[0].uri
        });
      }
    });

  }
  Show_Custom_Alert(visible) {
 
    this.setState({Alert_Visibility: visible});
    
  }

  onClickLogoutListener = async () => {
   
    LogoutViewModel.onSignOut().then(
      async (response,error) => {
       //get callback here
       this.setState({loading: true});
       console.log('Output',response)
       if (response.RESPONSE_CODE == 200){
        let value =  await AsyncStorage.getItem('pushNotificationToken');
        console.log('TokenValue : ', value);
        const asyncStorageKeys = await AsyncStorage.getAllKeys();
        if (asyncStorageKeys.length > 0) {
          if (Platform.OS === 'android') {
            await AsyncStorage.clear();
            this.setState({loading: false});
          }
          if (Platform.OS === 'ios') {
            await AsyncStorage.multiRemove(asyncStorageKeys);
            this.setState({loading: false});
          }
        }
        await AsyncStorage.setItem('pushNotificationToken',value);
        this.props.navigation.navigate('SplashScreen');
        this.setState({loading: false});
       }else if(response.RESPONSE_CODE == 4804){
         this.setState({loading: false});
       }else if(response.RESPONSE_CODE == 4805){
         this.setState({loading: false});
       }else if(response.RESPONSE_CODE == 4806){
         this.setState({loading: false});
       }else{
         this.setState({loading: false});
         alert('Something went wrong, please try again');
       }
    });
  };
  onClickBecomeMechanicListener = async () => {
    BecomeMechViewModel.onBecomeMech().then(
      async (response,error) => {
        console.log('res : ',response)
        if (response.RESPONSE_CODE == 200){
          console.log('Response output : ',response);
          const asyncStorageKeys = await AsyncStorage.getAllKeys();
          if (asyncStorageKeys.length > 0) {
            if (Platform.OS === 'android') {
              await AsyncStorage.clear();
            }
            if (Platform.OS === 'ios') {
              await AsyncStorage.multiRemove(asyncStorageKeys);
            }
          }
          alert('Request was success for becoming a mechanic');
          this.props.navigation.navigate('App');
        }else{
         alert('Something went wrong, please try again');
        }
     }
    );
  };
  onClickEditAccount(){
    this.props.navigation.navigate('EditAccount');
  };
  onClickChangePassword(){
    this.props.navigation.navigate('ChangePassword');
  };
  onClickVehiclesdListener = async () => { 
    this.props.navigation.navigate('VehiclesList');
  };
  onClickAddressListener(){
    this.props.navigation.navigate('AddAddress');
  };
  onClickPaymentAddressListener(){
    this.props.navigation.navigate('App');
  };
  onClickSkills(){
    this.props.navigation.navigate('UpdateSkills');
  };
  onClickSelfDescription(){
    this.props.navigation.navigate('SelfDescription');
  };
  onClickHelpRequest(){
    this.props.navigation.navigate('HelpRequest');
  };



  renderFileUri(){ 
    var uri = '';
    console.log('Profile Image display : ',this.state.userProile);
    uri = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLIbLTGKz4waJGU2vkbhQkRavjf2OdeY7Eo4l8yFnggdF3fX1bUF4FEUP13o34ioSCm-M&usqp=CAU';
      // uri = require('../../assets/Profile.jpeg')
    if (this.state.userProile == null || this.state.userProile == ''){
      uri = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLIbLTGKz4waJGU2vkbhQkRavjf2OdeY7Eo4l8yFnggdF3fX1bUF4FEUP13o34ioSCm-M&usqp=CAU';
    }else{
      uri = this.state.userProile;
    }
    console.log('profileData : ', userEmail,userFirstName, userLastName ,uri)
      return<Image
      source={{uri:uri}}
      style={{width: 150, height: 150,borderRadius: 150/ 2,marginTop:20} } 
    />
  }

  title(){ 
    let frstName = userFirstName
    let lastName = userLastName
    console.log('profileData :: ', userEmail,userFirstName, userLastName)
      return<Text style={styles.nameContainer}>
        { frstName + ' ' + lastName }
      </Text>
  }
  
    render() {
        return (
          <>
          <StatusBar barStyle="dark-content" />
          <Loader loading={this.state.loading} />
          <SafeAreaView style={styles.maincontainer}>
          <ScrollView>
          <View style={styles.container}>
          {this.renderFileUri()}
          {this.title()}
          {/* <Text style={styles.nameContainer}>  { userFirstName + ' ' + userLastName }</Text> */}
          <Modal
          visible={this.state.Alert_Visibility}
          transparent={true}
          animationType={"fade"}
          onRequestClose={ () => { this.Show_Custom_Alert(!this.state.Alert_Visibility)} } >
              <View style={{ flex:1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={styles.Alert_Main_View}>
      <Text style={styles.Alert_Title}>Please Select</Text>
      <View style={{ width: '100%', height: 2, backgroundColor: '#fff'}} />
      <TouchableOpacity onPress={this.launchCamera}>
      <Text style={styles.Alert_Message}> Camera</Text>
      </TouchableOpacity>
      <View style={{ width: '100%', height: 2, backgroundColor: '#fff'}} />
        <TouchableOpacity  onPress={this.chooseImage}>
         <Text style={styles.Alert_Message}> Gallery</Text>
        </TouchableOpacity>
       <View style={{ width: '100%', height: 2, backgroundColor: '#fff'}} />
       <TouchableOpacity onPress={ () => { this.Show_Custom_Alert(false)} }>
       <Text style={styles.Alert_Message}> Dismiss</Text>
       </TouchableOpacity>
      </View>

  </View>
          </Modal>

          <View style={{ flexDirection: "row", marginTop:15, }}>
          <Text style={styles.textContainer1}>Account</Text>
          <TouchableOpacity style={styles.inputContainer} onPress={() => this.onClickEditAccount()}>
              <Text style={styles.inputs}>
              {/* {profileArray == "" ? "abc@mobilemech.com" : profileArray.user_email} */}
              { userEmail }
              </Text>
          </TouchableOpacity>
          </View>
     <View style={{ flexDirection: "row",   justifyContent:"space-around",marginTop:10, }}>
     <TouchableOpacity style={styles.navBarLeftButton1} onPress={() => this.onClickChangePassword()}>
          <Text style={styles.textContainer}>Change Password</Text>
          <Text style={styles.buttonText}>
            <Icon name="chevron-right" color='gray' size={20}/>
          </Text>
      </TouchableOpacity>
     </View>
     { this.state.userType === "3" ? 
          <View style={{ flexDirection: "row",   justifyContent:"space-around",marginTop:10, }}>
          <TouchableOpacity style={styles.navBarLeftButton1} onPress={() => this.onClickSkills()}>
          <Text style={styles.textContainer}>Skills</Text>
          <Text style={styles.buttonText}>
            <Icon name="chevron-right" color='gray' size={20}/>
          </Text>
      </TouchableOpacity>
     </View> : <View></View>
     }
     { this.state.userType === "3" ? 
        
          <View style={{ flexDirection: "row",   justifyContent:'space-between',marginTop:10, }}>
          <TouchableOpacity style={styles.navBarLeftButton1} onPress={() => this.onClickSelfDescription()}>
          <Text style={styles.textContainer}>Self Description</Text>
          <Text style={styles.buttonText}>
            <Icon name="chevron-right" color='gray' size={20}/>
          </Text>
          </TouchableOpacity>
        </View>
         : <View></View>
     }
     { this.state.userType === "4" ? 
     <View style={{ flexDirection: "row",   justifyContent:"space-around",marginTop:10, }}>
       <TouchableOpacity style={styles.navBarLeftButton1} onPress={() => this.onClickVehiclesdListener()}>
          <Text style={styles.textContainer}>Vehicles</Text>
          <Text style={styles.buttonText}>
            <Icon name="chevron-right" color='gray' size={20}/>
          </Text>
      </TouchableOpacity>
     </View> : <View></View>
    }
     <View style={{ flexDirection: "row",   justifyContent:"space-between",marginTop:10, }}>
     <TouchableOpacity style={styles.navBarLeftButton1} onPress={() => this.onClickAddressListener()}>
          <Text style={styles.textContainer}  >Address</Text>
            <Text style={styles.buttonText}>
              <Icon name="chevron-right" color='gray' size={20}/>
            </Text>
        </TouchableOpacity>
   </View>
   <View style={{ flexDirection: "row",   justifyContent:"space-between",marginTop:10, }}>
   <TouchableOpacity style={styles.navBarLeftButton1} onPress={() => this.onClickHelpRequest()}>
          <Text style={styles.textContainer} >Help</Text>
            <Text style={styles.buttonText}>
              <Icon name="chevron-right" color='gray' size={20}/>
            </Text>
        </TouchableOpacity>
   </View>
   <View style={{ flexDirection: "row",   justifyContent:"space-between",marginTop:10, }}>
   <TouchableOpacity style={styles.navBarLeftButton1} >
          <Text style={styles.textContainer}>Payment Address</Text>
            <Text style={styles.buttonText}>
              <Icon name="chevron-right" color='gray' size={20}/>
            </Text>
          </TouchableOpacity>
   </View> 

   { this.state.userType === "4" ? 
   <View>
     <TouchableOpacity style={[styles.mechanicContainer]} onPress={() => this.onClickBecomeMechanicListener()} >
      <Text style={styles.logoutTextContainer}>Become a Mechanic</Text>     
     </TouchableOpacity>
   </View> : <View></View> 
   } 

   <TouchableOpacity style={[styles.buttonContainer]} onPress={() => this.onClickLogoutListener()} >
   <Text style={styles.logoutTextContainer}>Logout</Text>     
    </TouchableOpacity> 
  
          </View>
          </ScrollView>
          </SafeAreaView>
            </>
        );
 }

 getUserName = async () => {
  //  this.setState({userName : await AsyncStorage.getItem('userName')});
  //  this.setState({userEmail : await AsyncStorage.getItem('userEmail')});
  //  this.setState({userProile : await AsyncStorage.getItem('profileImg')});
  //  this.setState({userType : await AsyncStorage.getItem('userType')});

   userFirstName = await AsyncStorage.getItem('userFrstName');
   userLastName = await AsyncStorage.getItem('userLastName');
   userEmail = await AsyncStorage.getItem('userEmail');
   userPhone = await AsyncStorage.getItem('userPhone');
   userType = await AsyncStorage.getItem('userType');
   userProile= await AsyncStorage.getItem('profileImg');

   this.setState({userName : userFirstName + userLastName });
   this.setState({userEmail : await AsyncStorage.getItem('userEmail')});
   this.setState({userProile : await AsyncStorage.getItem('profileImg')});
   this.setState({userType : await AsyncStorage.getItem('userType')});

   console.log('***',userFirstName)
   console.log('***',userLastName)
   console.log('***',userEmail)
   console.log('***',userPhone)
   console.log('***',userType)
   console.log('***',userProile)
 return userFirstName;
}
     
  }

 const styles = StyleSheet.create({
    container: {

      flexDirection:'column',
       // backgroundColor: '#FFFFFF',
      alignItems: 'center',
      marginTop: Platform.OS == "ios" ? 50 : 25,
      marginBottom:0,
    },
    maincontainer: {
      height:"100%",
      width:'100%',
      flexDirection:'column',
      backgroundColor: '#002458',
    },
    nameContainer:{
        marginTop:5,
        marginBottom:10,
        justifyContent: 'center',
        alignItems: 'center',
        color: "white",//'#2F4F4F',
        fontWeight:"bold",
        fontSize:15,
      },
     textContainer:{
       color: "white",//'#2F4F4F',
        fontWeight:"normal",
        justifyContent:"center",
        alignSelf:"center",
        flex:1,
        fontSize:15,
        marginLeft:5,
        width:'100%'
      },
      textContainer1:{
        color: "white",//'#2F4F4F',
         fontWeight:"normal",
         justifyContent:"center",
         alignSelf:"center",
         flex:0.3,
         fontSize:15,
         marginLeft:15,
         width:'100%'
       },
      inputs:{
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        justifyContent:"center",    
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
      color:'black',
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
    marginTop:15,
    marginBottom:10,
    width:250,
    borderRadius:30,
    backgroundColor:'#FDD248',
  },
  mechanicContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    marginTop:15,
    marginBottom:10,
    width:250,
    borderRadius:30,
    backgroundColor:'#FDD248',
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
   navBarLeftButton1: {
    paddingLeft: 10,
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'flex-end',
    justifyContent:'space-between',
    marginRight:20,
    height:45,
  }
  
});