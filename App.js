/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { Component, useEffect, useState, useContext } from "react";
 import { StyleSheet, Text, View,TextInput,Button,Image,Alert,TouchableHighlight,
     StatusBar, SafeAreaView, TouchableOpacity,ImageBackground, NativeModules,Platform} from 'react-native';
 import { useNavigation } from '@react-navigation/native';
 import CheckBox from 'react-native-check-box';
 import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
 import Constants from "./Architecture/Helpers/Constants";
 import RegisterViewModel from "./Architecture/ViewModels/RegisterViewModel";
 import moment from 'moment';
 import md5 from "md5"; //npm install md5
 // import {useNetInfo} from "@react-native-community/netinfo"; //npm install --save @react-native-community/netinfo
 import * as useNetInfo from "@react-native-community/netinfo";
 import LoginViewModel from "./Architecture/ViewModels/LoginViewModel";
 import LoginModel from './Architecture/Models/LoginModel';
 import  AsyncStorage  from '@react-native-async-storage/async-storage';
 import ProfileViewModel from './Architecture/ViewModels/ProfileViewModel';
 import { Dropdown } from 'react-native-material-dropdown-v2-fixed';
 import { ScrollView } from "react-native-gesture-handler";
 import { LoginButton, AccessToken, LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
 import {
   GoogleSignin,
   statusCodes,
 } from '@react-native-google-signin/google-signin';
 import Loader from "./Architecture/Views/Loader";
 import NotifyServices from './NotifyServices';
 import NotificationServices from "./NotificationServices";
 
 
 import notifee from '@notifee/react-native';
 import messaging from '@react-native-firebase/messaging';
 
 
 
 // import { Platform } from "expo-modules-core";
 // import * as Facebook from 'expo-facebook';
 // import { KeepAwake } from 'expo';
 // import crashlytics from "@react-native-firebase/crashlytics"; hi test 
 
 let userType = '';
 let pushToken = '';
 const data = [{value:'Client', id: 4},
       {value:'Mechanic',id: 3}];
 var pswdRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
 var  FB_APP_ID = "452014346416751";
 // var token = '02d8eadae26d72f3d9cd3b4384849c80'
 const {RNTwitterSignIn} = NativeModules
  const apiKey = {
     twitter_apikey : 'zx3rbdxiZALH4HGO5Cnji8iYG',
     twitter_secreteKey : '9hlXlvSdoUVXPzHa0wiM3LCUS0Uu8IgkdyuyxNKDWvLhhSD6Gu'
  } 
 
 export default class App extends Component
  {
 
    constructor(props) {
      super(props);
      state = {
        email:'',
        password:'',
        userId:'',
        connection_Status:'',
        registerToken:'',
        fcmRegistered : false,
      }
    //   this.notif = new NotifyServices( 
    //    this.onRegister.bind(this),
    //    this.onNotif.bind(this),
    //  );
     
    }
    state = {
      termsAccepted: true,
      email: '',
      password: '', 
      userId:'',
      loading:false,
      agent:false,
      buyers:false,
      sellers:false,
      connection_Status:'',
      selectedType:'',
      hidePassword:true,
      registerToken : "",
    }
 
    async onRegister(token) {
      this.setState({registerToken: token.token, fcmRegistered: true});
      // alert(token.token);
      await AsyncStorage.setItem('pushNotificationToken',JSON.stringify(token.token));
   }
 
   onNotif(notif) {
     Alert.alert(notif.title, notif.message);
   }
 
   handlePerm(perms) {
     Alert.alert('Permissions', JSON.stringify(perms));
   }
 
    componentWillMount = async () => {
     // this.checkLoggedInStatus();
     // this.getData();
     this.initSocialLogin();
    //  this.getFCMToken();
    //  this.requestPermission();
    //  const unsubscribe = messaging().onMessage(async remoteMessage => {
    //    console.log('remoteMessage', JSON.stringify(remoteMessage));
    //    DisplayNotification(remoteMessage);
    //    // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    //  });
    //  return unsubscribe;
    }
 
     getFCMToken = () => {
     messaging()
       .getToken()
       .then(token => {
         console.log('token=>>>', token);
       });
   };
 
    requestPermission = async () => {
     const authStatus = await messaging().requestPermission();
   };
 
   async DisplayNotification(remoteMessage) {
     // Create a channel
     const channelId = await notifee.createChannel({
       id: 'default',
       name: 'Default Channel',
     });
 
     // Display a notification
     await notifee.displayNotification({
       title: remoteMessage.notification.title,
       body: remoteMessage.notification.body,
       android: {
         channelId,
         smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
       },
     });
   }
 
   async localDisplayNotification() {
     // Create a channel
     const channelId = await notifee.createChannel({
       id: 'default',
       name: 'Default Channel',
     });
 
     // Display a notification
     notifee.displayNotification({
       title:
         '<p style="color: #4caf50;"><b>Styled HTMLTitle</span></p></b></p> &#128576;',
       subtitle: '&#129395;',
       body: 'The <p style="text-decoration: line-through">body can</p> also be <p style="color: #ffffff; background-color: #9c27b0"><i>styled too</i></p> &#127881;!',
       android: {
         channelId,
         color: '#4caf50',
         actions: [
           {
             title: '<b>Dance</b> &#128111;',
             pressAction: {id: 'dance'},
           },
           {
             title: '<p style="color: #f44336;"><b>Cry</b> &#128557;</p>',
             pressAction: {id: 'cry'},
           },
         ],
       },
     });
   }
 
    sendNotification = async () => {
     let notificationData = {
       title: 'RFQ Generated Successfully',
       body: 'Quotation raised successfully',
       token:
         'fZaxTqqqSHaPsBMJG4ne2v:APA91bGIh3c4HmOTLadgwug5NjG7GIeiXM3bcH_fQco2jlp0oZAi69DR29XPeJA-oaENUU866v5bkx3xa0yAOM3QfVX6qHMUAImBzAwTZmyPfsIKKaSMd9wQ3eC4kPuo9kk0tgwM0Coj',
     };
     await NotificationServices.sendSingleDeviceNotification(notificationData);
   };
 
    sendMultiNotification = async () => {
     let notificationData = {
       title: 'RFQ Generated Successfully',
       body: 'Quotation raised successfully',
       token: [
         'ergZd17WQQqGY_bqpdsNsC:APA91bFp37eoaQbBuqwFp0INuolLujRqx_uPaZtYAKsexNYBTqlzej2YZFrBkh-Kbd4bbsBd4OYZp_Hbzul2TR_j9W7OPM7dBPw8m5Z3MExC9IiUIhCQ06eXKc0Fqsv8Dpzp9j2wR0Tc',
         'fMsRIXrkQhyaiCIDpYIdJI:APA91bHVDJQAXOTzxn3xbTXdE9EoIvJejghJoUUz_yhR7d0X5DgcaFOLrsvAsngiUzuTG8VNc2toqcY5jCjtrwPCm5286lXuLxeoCQZYkHSC3J80c_fgypSuvbZI0VSPMmjORGkrDfYl'
       ],
     };
     await NotificationServices.sendMultiDeviceNotification(notificationData);
   };
 
     componentWillUnmount() {
 
     }
    handleCheckBox = async () => {
     this.setState({ termsAccepted: !this.state.termsAccepted })
    }
 
    onClickForgotPswdListener(){
     this.props.navigation.navigate('ForgotPassword');
     this.setState({email : '', password : '',termsAccepted: false});
   }
   onClickRegisterListener(){
     // console.log(crash);
     this.props.navigation.navigate('Register');
     this.setState({email : '', password : '',termsAccepted: false});
   }
   onClickProfile = async () => {
     console.log('******* Profiledata updated');
   }
 
   setPasswordVisibility = () => {
     this.setState({ hidePassword: !this.state.hidePassword });
   }
  
    validate = (text) => {
      console.log(text);
     //  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      let reg = /^\w+([\.\+\£\&\^\*\%\@\!-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3,4})+$/;
      if (reg.test(text) === false) {
        console.log('Email is Not Correct');
        this.setState({email: text});
        return false;
      } else {
        this.setState({email: text});
        console.log('Email is Correct');
      }
    };
  validatePassword = (text) => {
      var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
      console.log(text);
      if (regularExpression.test(text) === false) {
        this.setState({password: text});
        return false;
      } else {
        this.setState({password: text});
      }
    };
  onClickListener = (id) => {
     const elementsIndex = data.findIndex(
       (element) => element.value == id,
     );
      const selectedAreaId = data[elementsIndex].id;
      this.setState({selectedType: selectedAreaId});
     console.log('UsertypeId : ', selectedAreaId);
     userType = selectedAreaId;
   };
    loginButtonClicked = async () => {
      // this.sendNotification();
     this.setState({loading: true});
     // const asyncStorageKeys = await AsyncStorage.getAllKeys();
     // if (asyncStorageKeys.length > 0) {
     //   if (Platform.OS === 'android') {
     //     await AsyncStorage.clear();
     //   }
     //   if (Platform.OS === 'ios') {
     //     await AsyncStorage.multiRemove(asyncStorageKeys);
     //   }
     // }
     await AsyncStorage.setItem('currentPswd',this.state.password);
     const NetInfo = require("@react-native-community/netinfo"); 
     NetInfo.fetch().then(state => {
       console.log("Network Details :",state)
       if (state.isConnected == true) {
         // let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
         let reg = /^\w+([\.\+\£\&\^\*\%\@\!-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3,4})+$/;
         var pswdReg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
         if (this.state.selectedType === ''){
           alert('Please choose usertype');
           this.setState({loading: false});
           return false;
         }
         else if (this.state.email === '') {
           alert('Please enter email address');
           this.setState({loading: false});
           return false;
         } 
         else  if (reg.test(this.state.email) === false) {
           console.log('Email is not correct');
           alert('Email is not valid');
           this.setState({loading: false});
           return false;
         } 
         else  if (this.state.password === '') {
           alert('Please enter password');
           this.setState({loading: false});
           return false;
         }
         else  if (pswdReg.test(this.state.password) === false) {
           console.log('Password is not correct');
           alert('Password must contain minimum 8 characters and maximimum 16 characters includes atleast 1 capital, 1 special case, 1 nuemaric');
           this.setState({loading: false});
           return false;
         } 
         else {
           // let token =  "";
           // if(pushNotifyToken == "" || pushNotifyToken == null){
           //   token = "epQI8tc1TcKRre4Z_JU-UE:APA91bGffqBtskDpGOm8ZMg-MFBLaCU40TO0PMOoN2hdKvtNwSbH2Jqwew50mt8wmfUJXNZg04BY0WH2scEKb_sULHGqEtM3Bg4_wxoN8-nlh2yHBz0jWbUfzqGvYCkyUjLOEvpqPFFS";  
           // }else {
           //   token = pushNotifyToken;
           // }
           LoginViewModel.onSignIn (this.state.email,this.state.password,this.state.selectedType).then(
            async (response,error) => {
             console.log('Output',response)
             if (response.RESPONSE_CODE == 200){
               if(response.RESPONSE_DATA.user_type == 3 && response.RESPONSE_DATA.required.length > 0){
                 console.log('required fields : ', response.RESPONSE_DATA.required[0]);
                 let Rfields = response.RESPONSE_DATA.required[0];
                 alert('Please update the required skills for getting quotes');
                 this.setState({loading: false});
                 // alert({Rfields});
               }else{
                 this.setState({loading: false});
               }
               this.profileData();
               if(this.state.termsAccepted ==  true){
                 await AsyncStorage.setItem('StayLogIn', "true")
               }
               this.setState({loading: false});
               // this.props.navigation.navigate('Home');
             }else if(response.RESPONSE_CODE == 1301){
               this.setState({loading: false});
             }else if(response.RESPONSE_CODE == 1302){
               this.setState({loading: false});
             }else if(response.RESPONSE_CODE == 1303){
               this.setState({loading: false});
             }else if(response.RESPONSE_CODE == 1304){
               this.setState({loading: false});
             }else if(response.RESPONSE_CODE == 1305){
               this.setState({loading: false});
             }else if(response.RESPONSE_CODE == 1306){
               this.setState({loading: false});
             }else if(response.RESPONSE_CODE == 1307){
               this.setState({loading: false});
             }else if(response.RESPONSE_CODE == 1308){
               this.setState({loading: false});
             }else{
               console.log('******** testing ')
               this.setState({loading: false});
               alert('Something went wrong, please try again');
             }
          });
          this.setState({loading: false});
         }
       } else {
         Alert.alert("Please check your Network Connection.");
         this.setState({loading: false});
       }
     });
    };
 
    _getStorageProfileValue = async (frstName, lastName, profile,emailId,phone) => {
     await AsyncStorage.setItem('userFrstName',frstName);
     await AsyncStorage.setItem('userLastName',lastName);
     await AsyncStorage.setItem('profileImg',profile);
     await AsyncStorage.setItem('userEmail',emailId);
     await AsyncStorage.setItem('userPhone',phone);
     await AsyncStorage.setItem('loggedIn',JSON.stringify(this.state.termsAccepted));
     let userFirstname = await AsyncStorage.getItem('userFrstName');
     let userLaststname = await AsyncStorage.getItem('userLastName');
     let userProfile = await AsyncStorage.getItem('profileImg');
     let userEmail = await AsyncStorage.getItem('userEmail');
     let userPhone = await AsyncStorage.getItem('userPhone');
     let logData = JSON.parse(await AsyncStorage.getItem('loggedIn'));
     
    console.log('Profilevalue : ',userFirstname, userLaststname ,userProfile, userEmail, userPhone,logData)
    return userFirstname
  }
 
  profileData = async () => {
   // await AsyncStorage.getItem('userType').then((value) => userType = value)
  if (this.state.selectedType == 4){
   ProfileViewModel.onViewClientProfile().then(
        (response,error) =>  {
       console.log('Client profile output',response.RESPONSE_DATA);
       if (response.RESPONSE_CODE == 200){
         console.log('Profiledata updated for client');
         if (response.RESPONSE_DATA === null){
           this._getStorageProfileValue("","","","","");
         }else{
           this._getStorageProfileValue(response.RESPONSE_DATA.first_name,response.RESPONSE_DATA.last_name,response.RESPONSE_DATA.profile_image,
             response.RESPONSE_DATA.user_email,response.RESPONSE_DATA.phone);
         }
         this.props.navigation.navigate('Home');
         this.setState({email : '' ,password : '', selectedType : '',termsAccepted:false});
         this.setState({loading: false});
       }else{
         alert('Something went wrong, please try again');
         this.setState({loading: false});
       }
    });
  }else{
    ProfileViewModel.onViewMechanicProfile().then(
       (response,error) => {
       console.log('Mechanic profile output',response.RESPONSE_DATA);
       if (response.RESPONSE_CODE == 200){
        console.log('Profiledata updated for mechanic');
        if (response.RESPONSE_DATA === null){
         this._getStorageProfileValue("","","","","");
       }else{
       this._getStorageProfileValue(response.RESPONSE_DATA.first_name,response.RESPONSE_DATA.last_name,response.RESPONSE_DATA.profile_image,
         response.RESPONSE_DATA.user_email,response.RESPONSE_DATA.phone);
       }
       this.props.navigation.navigate('Home');
        this.setState({email : '' ,password : '', selectedType : '',termsAccepted:false});
        this.setState({loading: false});
       }else{
         alert('Something went wrong, please try again');
         this.setState({loading: false});
       }
    });
  }
  return userType;
  };
 
       checkLoggedInStatus = async () => {
         let loggedInStatus = JSON.parse(await AsyncStorage.getItem("loggedIn"));
         if (loggedInStatus == true){
           // this.profileData();
           this.props.navigation.navigate('Home');
         }else{
 
         }
       }
 
       getData = () => {
         AsyncStorage.getItem('loggedIn').then(storage => {
             console.log('------',storage)
         }).catch(e => console.warn(e))
     }
 
     //  initSocialLogin = async () => {
     //   try {
     //     await Facebook.initializeAsync(FB_APP_ID);
     //     console('success :: ')
     //   } catch (e) {
     //     console.log(e);
     //   }
     // };
     //   // useEffect(() => {
     //   //   initSocialLogin();
     //   // }, []);
     
     //  fbLogin = async () => {
     //   try {
     //     console.log('Fb btn clicked')
     //     const { token, type } = await Facebook.logInWithReadPermissionsAsync(
     //       FB_APP_ID,
     //       {
     //         permissions: ['public_profile'],
     //       }
     //     );
     //     // GET USER DATA FROM FB API
     //     const response = await fetch(
     //       `https://graph.facebook.com/me?access_token=${token}`
     //     );
     //     const user = await response.json(); 
     //     // GET PROFILE IMAGE DATA FROM FB API
     //     // NOTE THAT I SET THE IMAGE WIDTH TO 500 WHICH IS OPTIONAL
     //     const pictureResponse = await fetch(
     //       `https://graph.facebook.com/v8.0/${user.id}/picture?width=500&redirect=false&access_token=${token}`
     //     );
     //     const pictureOBject = await pictureResponse.json();
     //     const userObject = {
     //       ...user,
     //       photoUrl: pictureOBject.data.url,
     //     };
     //     console.log('Token : ', token , ' - Type : ', type , ' - user : ', user)
     //     return { type, token, user: userObject };
     //   } catch (e) {
     //     return { error: e };
     //   }
     // } 
     //  handleFBLoginPress = async () => {
     // const { type, token, user, error } = await this.fbLogin();
     // console.log('Token : ', token , ' - Type : ', type , ' - user : ', user)
     // if (type && token) {
     //   if (type === 'success') {
     //     // DISPATCH TOKEN AND USER DATA
     //     // TO HANDLE NAVIGATION TO HOME AND DISPLAY USER INFO
     //     dispatch({ type: 'FB_LOGIN', token, user });
     //   }
     // } else if (error) {
     //   console.log('The login attempt was cancelled :: ',error);
     // }
     // };
 
 
     onGoogleLogin = () =>  {
       GoogleSignin.configure({
           androidClientId: '450300048545-slice5q03bdqonq1gbcfmdo12rl124u8.apps.googleusercontent.com',
           iosClientId: '450300048545-bmep0must1spilq6keaj0u7sg2grpb4r.apps.googleusercontent.com',
       });
       GoogleSignin.hasPlayServices().then((hasPlayService) => {
           if (hasPlayService) {
                GoogleSignin.signIn().then((userInfo) => {
                          console.log(JSON.stringify(userInfo))
                }).catch((e) => {
                console.log("ERROR IS: " + JSON.stringify(e));
                })
           }
       }).catch((e) => {
           console.log("ERROR IS: " + JSON.stringify(e));
       })
       };
 
 
 
 
 
 
 
     onFbLogin = () => {
       LoginManager.logInWithPermissions(["public_profile"]).then(
         function(result) {
         if (result.isCancelled) {
         console.log("Login cancelled");
         } else {
         console.log(
         "Login success with permissions: " +
         result.grantedPermissions.toString()
         );
         AccessToken.getCurrentAccessToken().then(
             (data) => {
               const accessToken = data.accessToken.toString();
               console.log("Access Token : ",data.accessToken.toString())
               const PROFILE_REQUEST_PARAMS = {
                 fields: {
                   string: 'id,name,first_name,last_name',
                 },
               };
               const profileRequest = new GraphRequest(
                 '/me',
                 {accessToken, parameters: PROFILE_REQUEST_PARAMS},
                 (error, user) => {
                   if (error) {
                     console.log('login info has error: ' + error);
                   } else {
                     // this.setState({userInfo: user});
                     console.log('result:', user);
                   }
                 },
               );
               new GraphRequestManager().addRequest(profileRequest).start();
             }
           );
         }
         },
         function(error) {
         console.log("Login fail with error: " + error);
         }
         );
     }
 
 
     onLoginFinished = (error, result) => {
       if (error) {
       console.log("login has error: " + result.error);
       } else if (result.isCancelled) {
       console.log("login is cancelled.");
       } else {
       AccessToken.getCurrentAccessToken().then(
       (data) => {
       console.log(data.accessToken.toString())
       }
       )
       }
       };
       
       onLogoutFinished = () => {console.log("logout.")};
 
      onTwitterLogin = () => {
         RNTwitterSignIn.init(apiKey.twitter_apikey,apiKey.twitter_secreteKey);
         RNTwitterSignIn.logIn().then(loginData => {
           console.log('LoginData : ', loginData);
         }).catch(error => {
           console.log('Error : ', error);
         })
      }
 
    render() {
     //this.fbLogin();
      return (
        <View style={styles.container}>
       
        <StatusBar barStyle="dark-content" />
        <Loader loading={this.state.loading} />
        {/* <SafeAreaView> */}
      
        <ScrollView>
        <View style={styles.container}>
        {/* <ImageBackground source={require('./Architecture/assets/logo1.png')} style={{width: '100%', height: '100%', blurRadius:1}}> */}
        <Image
           style={{alignSelf:'center', marginTop:10, width:185, height : 160, borderRadius: 15}}
           source={require('./Architecture/assets/logo1.png')}
           // source={{uri:imageUri}}
         />
       
              {/* <Text style={styles.SignInText}>Enter your personal details here</Text> */}
          
         <View >
             <Dropdown style={styles.dropDownContainer}
               placeholder='I am logging in as ...'
               underlineColor='transparent'
               iconColor='#E1E1E1'
               placeholderTextColor="#1B1E5C"
               useNativeDriver={false}
               animationDuration={0}
               data={data}
               onChangeText={(id) => this.onClickListener(id)}
               value={this.state.selectedType}
             /> 
          </View>
         
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
                placeholder="Enter Email"
                placeholderTextColor = '#818EB7'
                keyboardType="email-address"
                
                underlineColorAndroid='#FFFFFF'
                onChangeText={(text) => this.validate(text)}
                value={this.state.email}
                />
          </View>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
                placeholder="Enter Password"
                placeholderTextColor = '#818EB7'
                secureTextEntry={this.state.hidePassword} 
                underlineColorAndroid='#FFFFFF'
                onChangeText={(text) => this.validatePassword(text)}
                value={this.state.password}
                />
           {/* <TouchableOpacity activeOpacity={0.8} style={styles.touachableButton} onPress={this.setPasswordVisibility}>
             <Image source={(this.state.hidePassword) ? require('./Architecture/assets/eye.jpeg') : require('./Architecture/assets/close_eye_icon.jpeg')} style={styles.buttonImage} />
           </TouchableOpacity> */}
          </View>
          {/* {
            pswdRegex.test(this.state.password) == true ? 
             <View style={styles.inputContainer}>
             <Text style={styles.forgotText}> Password must contain minimum 8 characters includes atleast 1 capital, 1 special case, 1 nuemaric</Text>
             </View> : <View></View>
          } */}
          
          <View style={styles.logContainer}>
         <View style={styles.loggedInContainer} flexDirection='row' justifyContent='space-between' >
         <CheckBox style={{width:'2%',alignSelf:'flex-start'}}
         style={{width:'10%',alignSelf:'center'}}
         checkedCheckBoxColor="#6495ED"
         uncheckedCheckBoxColor="#A9A9A9"
         onClick={()=> this.handleCheckBox()}
         isChecked={this.state.termsAccepted}
         />
           <Text style={{marginTop:0,color:'#818EB7'}}>Stay logged in</Text>
         </View>
         <TouchableOpacity style={styles.resetContainer} onPress={() => this.onClickForgotPswdListener()}>
             <Text style={styles.forgotText}>Forgot Password?</Text>
         </TouchableOpacity>
         </View>
          
          <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.loginButtonClicked()}>
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row', alignItems: 'center',marginTop:15}}>
   <View style={{flex: 1, height: 2, backgroundColor: '#818EB7'}} />
   <View>
     <Text style={{width: 50, textAlign: 'center',color:'#818EB7',fontSize:19}}>Or</Text>
   </View>
   <View style={{flex: 1, height: 2, backgroundColor: '#818EB7'}} />
 </View>
 
 <View style={{ flexDirection: "row",alignSelf:'center',marginTop:15}}>
 
             <View style={{width:'30%',flexDirection:'row',marginBottom:20, 
             alignSelf:'center',alignItems:'center',justifyContent:'center'}}>
             <TouchableOpacity style={styles.registerContainer} onPress={() => this.onGoogleLogin()}>
             <Image
               style={{alignSelf:'center', marginTop:10, width:50, height : 50, borderRadius: 50/2}}
               source={require('./Architecture/assets/google.png')}
               // source={{uri:imageUri}}
             />
             </TouchableOpacity>
             </View>
 
              <View style={{width:'30%',flexDirection:'row',marginBottom:20, 
              alignSelf:'center',alignItems:'center',justifyContent:'center'}}>
              <TouchableOpacity style={styles.registerContainer} onPress={() => this.onTwitterLogin()}>
              <Image
                 style={{alignSelf:'center', marginTop:10, width:50, height : 50, borderRadius: 50/2}}
                 source={require('./Architecture/assets/twitter.png')}
                 // source={{uri:imageUri}}
               />
               </TouchableOpacity>
              </View>
 
              <View style={{width:'30%',flexDirection:'row',marginBottom:20, 
              alignSelf:'center',alignItems:'center',justifyContent:'center' }}>
             <TouchableOpacity style={styles.registerContainer} onPress={() => this.onFbLogin()}>
              <Image
               style={{alignSelf:'center', marginTop:10, width:50, height : 50, borderRadius: 50/2}}
               source={require('./Architecture/assets/fb.png')}
               // source={{uri:imageUri}}
              />
              </TouchableOpacity>
              </View>
              </View>
          {/* <View style={styles.signUpContainer} flexDirection="row" justifyContent='center' >
         <Text style={styles.accountText} >Don't have an account?</Text> */}
         <View style={styles.signUpContainer} flexDirection="row" justifyContent='center' >
         <Text style={styles.accountText}>Don't have an account?</Text>
         <TouchableOpacity style={styles.registerContainer} onPress={() => this.onClickRegisterListener()}>
           <Text style={styles.signUpText}>Sign Up</Text>
         </TouchableOpacity>
         </View>
       
         {/* </View> */}
         {/* </ImageBackground> */}
        </View>
        </ScrollView>
       
        {/* </SafeAreaView> */}
        </View>
      );
    };
  }
 const styles = StyleSheet.create({
    container: {
      flex: 1,
      height:"100%",
      flexDirection:'column',
      // backgroundColor: '#FFFFFF',
      backgroundColor: '#002458',
      alignItems: 'center',
 
      marginBottom:0,
      
    },
    inputContainer: {
 
       marginBottom:15,
        flexDirection: 'row',
        alignItems:'center'
    },
    inputs:{
        height:50,
  
        fontSize:18,
        color:"white",
        borderBottomColor: '#FFFFFF',
        flex:1,
    },
    buttonContainer: {
      height:60,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      marginTop:20,
      width:250,
      borderRadius:30,
    },
    loginButton: {
      backgroundColor:'#FDD248',//#a8a8a8
    },
    loginText: {
      color: '#4C4B0E',
      fontWeight:'bold',
      fontSize:25,
    },
    signInTitle:{
      marginTop:35,
      marginBottom:10,
      justifyContent: 'center',
      alignItems: 'center',
      color:'#2F4F4F',
      fontWeight:"bold",
      fontSize:35,
    },
    SignInText:{
      marginBottom:20,
      marginRight:20,
      marginLeft:20,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign:'center',
      color:'#818EB7',
      fontSize:20,
    },
    registerContainer:{
    
     height:40,
       fontWeight:'bold',
     flexDirection: 'row',
     color:'#2F4F4F',
     alignSelf:'center',
 
 
   },
    resetContainer:{
      height:30,
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop:0,
      marginBottom:18,
      color:'#2F4F4F',
      alignItems: 'center',
      borderRadius:30,
    },
      loggedInContainer:{
        marginRight:60,
        height:30,
        marginBottom:20,
        justifyContent:'flex-start',
        flexDirection: 'row',
        alignItems:'center',
      },
      logContainer:{
        height:30,
        marginBottom:20,
        marginTop:20,
        flexDirection: 'row',
        alignItems:'center',
      },
      signUpText:{
    
          marginLeft:5,
       // marginTop:20,
       fontWeight:'bold',
       justifyContent: 'center',
       alignItems: 'center',
       textAlign:'center',
       color:'#818EB7',
       fontSize:15,
       },
      forgotText:{
      justifyContent: 'center',
      alignItems: 'center',
      textAlign:'center',
      marginTop:0,
      color:'#818EB7',
      fontSize:15,
      },
      accountText:{
        // height:30,
        flexDirection: 'row',
        justifyContent: 'center',
        color:'#818EB7',
        alignItems: 'center',
        textAlign:'center',
        fontSize:15,
        borderRadius:30,
      },
      signUpContainer:{
        marginTop:5,
        flex:1,
        justifyContent:'flex-end',
      },
      radioCircle: {
        height: 30,
        width: 30,
        borderRadius: 100,
        borderWidth: 2,
        alignSelf:'center',
        marginRight:8,
        marginTop:7,
        borderColor: '#108210',
        alignItems: 'center',
        justifyContent: 'center',
      },
      selectedRb: {
        width: 15,
        height: 15,
        borderRadius: 50,
        backgroundColor: '#010801',
        },
        dropDownContainer:{
                 borderColor:'white',
                 borderWidth:1,
                 backgroundColor :'white',
                 borderRadius:30,
                 borderTopEndRadius:30,
                 borderTopRightRadius:30,
                 borderTopLeftRadius:30,
                 height:45,
                 marginBottom:15,
                 marginTop:25,
                 flexDirection: 'row',
                 justifyContent : 'center',
                 width:'100%',
       },
       touachableButton: {
         position: 'absolute',
         right: 3,
         height: 40,
         width: 35,
         padding: 2
       },
       buttonImage: {
         resizeMode: 'contain',
         height: '100%',
         width: '100%',
       }  
      
  });