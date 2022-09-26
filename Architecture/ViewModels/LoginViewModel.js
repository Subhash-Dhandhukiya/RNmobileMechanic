import React, { Component } from "react";
import { StyleSheet, Text, View,TextInput,Button,Image,Alert,TouchableHighlight, StatusBar, SafeAreaView, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from "../Helpers/Constants";
import base64 from 'base-64';
import LoginModel from "../Models/LoginModel";
import  AsyncStorage  from '@react-native-async-storage/async-storage';

export default class LoginViewModel extends Component{

  constructor(props) {
    super(props);
  
  }

static onSignIn = async (email,password,selectedUserType) => {

  const promise =  new  Promise(async (resolve, reject) => {
    try {
    var url = Constants.loginAPI
    var method = 'POST';
    var registerToken = await AsyncStorage.getItem('pushNotificationToken');
    var params = JSON.stringify({
        "email" : email,
        "password" : password,
        "user_type" : selectedUserType,
        "notification_token": registerToken
    });
    let key = Constants.generateCmnToken("LoginAPI" + email)
    var md5 = require('md5');
    var token=md5('LoginAPI' + email)
    console.log("key : ",token);
    let username = 'Authorization';
    console.log("URL<><> "+url);
    let headers = new Headers();
    headers.append("Authorization", "Basic " + base64.encode("Authorization:"+token));
      headers.set('Content-Type', 'application/json');   
      console.log('headers', headers);
      console.log('params', params);
      const response = await fetch(url, {
                method: 'POST',
                headers:headers,
                body: params
            }).then(response => response.json())
  .then(async (responseJson) => {
    console.log('res', responseJson)
     if (responseJson.RESPONSE_CODE === 200){
      await AsyncStorage.setItem('userId', responseJson.RESPONSE_DATA.user_id)
      await AsyncStorage.setItem('userStatus', responseJson.RESPONSE_DATA.user_status)
      await AsyncStorage.setItem('userType', responseJson.RESPONSE_DATA.user_type)
      await AsyncStorage.setItem('ProfileId', responseJson.RESPONSE_DATA.profile_id)
      await AsyncStorage.setItem('userEmail', responseJson.RESPONSE_DATA.user_email)
      console.log('userType______ : ',await AsyncStorage.getItem('userType'));
      console.log('userId______ : ',await AsyncStorage.getItem('userId'));
      console.log('userStatus______ : ',await AsyncStorage.getItem('userStatus'));
      console.log('ProfileId______ : ',await AsyncStorage.getItem('ProfileId'));
      console.log('userEmail______ : ',await AsyncStorage.getItem('userEmail'));
      resolve(responseJson); 
     
        Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=registerToken);  
    }else{
      alert(""+responseJson.RESPONSE_MESSAGE)
      Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=email);
      }
    
     
  })
  .catch((error) => {
    console.log('error',error)
    alert("error "+error)
  })
   }catch(msg) { 
    alert("msg "+msg)
     reject(msg);}

   });

  return promise;
  
  }
  static _getStorageValue = async () => {
    var value = await AsyncStorage.getItem('user_id')
    console.log('value : ',value)
    return value
  }
 
 }