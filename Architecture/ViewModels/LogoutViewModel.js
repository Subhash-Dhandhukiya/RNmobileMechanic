import React, { Component } from "react";
import { StyleSheet, Text, View,TextInput,Button,Image,Alert,TouchableHighlight, StatusBar, SafeAreaView, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from "../Helpers/Constants";
import base64 from 'base-64';
import LoginModel from "../Models/LoginModel";
import  AsyncStorage  from '@react-native-async-storage/async-storage';

export default class LogoutViewModel extends Component{

  constructor(props) {
    super(props);
  
  }

static onSignOut = async () => {

  const promise =  new  Promise(async (resolve, reject) => {
    try {
    var url = Constants.logoutAPI
    var method = 'POST';
    var userId = await AsyncStorage.getItem('userId');
    var profileId = await AsyncStorage.getItem('ProfileId');
    var userType = await AsyncStorage.getItem('userType');
    var params = JSON.stringify({
        "user_id":userId, 
        "user_type":userType,
        "profile_id":profileId
    });
    let key = Constants.generateCmnToken("LogoutAPI" + userId)
    var md5 = require('md5');
    var token=md5('LogoutAPI' + userId)
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
      resolve(responseJson); 
        Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=userId);  
    }else{
      alert(""+responseJson.RESPONSE_MESSAGE)
      Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=userId);
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
  
 }