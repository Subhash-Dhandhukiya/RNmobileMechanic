import React, { Component } from "react";
import { StyleSheet, Text, View,TextInput,Button,Image,Alert,TouchableHighlight, StatusBar, SafeAreaView, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from "../Helpers/Constants";
import base64 from 'base-64';
import LoginModel from "../Models/LoginModel";
import  AsyncStorage  from '@react-native-async-storage/async-storage';

export default class BecomeMechViewModel extends Component{

  constructor(props) {
    super(props);
  
  }

static onBecomeMech = async () => {

  const promise =  new  Promise(async (resolve, reject) => {
    try {
    var url = Constants.becomeMechanicAPI
    var method = 'POST';
    var profileId = await AsyncStorage.getItem('ProfileId');
    var userId = await AsyncStorage.getItem('userId');
    var params = JSON.stringify({
        "profile_id":profileId
    });
    let key = Constants.generateCmnToken("BecomeMechanicAPI" + profileId)
    var md5 = require('md5');
    var token=md5('BecomeMechanicAPI' + profileId)
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
        Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=profileId);  
    }else{
      alert(""+responseJson.RESPONSE_MESSAGE)
      Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=profileId);
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