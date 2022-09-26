import React, { Component } from "react";
import { StyleSheet, Text, View,TextInput,Button,Image,Alert,TouchableHighlight, StatusBar, SafeAreaView, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from "../Helpers/Constants";
import base64 from 'base-64';


import  AsyncStorage  from '@react-native-async-storage/async-storage';
export default class ForgotPasswordViewModel extends Component{

static onForgotPswdAction = async (email,userType) => {

  const promise =  new  Promise(async (resolve, reject) => {
    try {
    var url = Constants.forgotPasswordAPI
    var method = 'POST';
    var userId = await AsyncStorage.getItem('userId');
    var userEmail = await AsyncStorage.getItem('userEmail');
    var params = JSON.stringify({
        "email" : email,
        "user_type": userType
    });
    var md5 = require('md5');
    var token=md5("ForgotPasswordAPI" + email)
    console.log("key : ",token);
    let username = 'Authorization';
    console.log("URL<><> "+url+"   "+userId);
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
  .then((responseJson) => {
    console.log('res', responseJson)
     if (responseJson.RESPONSE_CODE === 200){
        resolve(responseJson);
        Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=userEmail + ' - ' + userId);
    }else{
      alert("Something went wrong, please try again")
      Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=userEmail + ' - ' + userId);
      }
  })
  .catch((error) => {
    console.log('error',reject(error))
  })
   }catch(msg) { reject(msg);}

   });

  return promise;
  
  }


 }