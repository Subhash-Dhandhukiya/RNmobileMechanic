import React, { Component } from "react";
import { StyleSheet, Text, View,TextInput,Button,Image,Alert,TouchableHighlight,
  
    StatusBar, SafeAreaView, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from "../Helpers/Constants";
import base64 from 'base-64';
import  AsyncStorage  from '@react-native-async-storage/async-storage';

export default class MechanicListViewModel extends Component{

  
 static MechanicListAPI = async () => {
    const promise =  new  Promise(async (resolve, reject) => {
      try {
        var url = Constants.displayMechanicOfServiceSelectedAPI
    var method = 'POST';
    var userId = await AsyncStorage.getItem('userId');
    var profileId=await AsyncStorage.getItem('ProfileId')
    var serviceId=await AsyncStorage.getItem('selectedServices')
   
    var params = JSON.stringify({
        "user_id":userId,
        "client_id":profileId,
        "service_id":serviceId,

      });
    let key = Constants.generateCmnToken("DisplayMechanicOfServiceSelectedAPI" + userId)
    var md5 = require('md5');
    var token=md5('DisplayMechanicOfServiceSelectedAPI'+userId)
    console.log("key : ",md5('DisplayMechanicOfServiceSelectedAPI'+ userId));
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
          Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=token);  
      }else{
        
        alert(responseJson.RESPONSE_MESSAGE)
        Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=token);
        }
    })
    .catch((error) => {
      console.log('error',error)
      //alert("error "+error)
    })
     }catch(msg) { 
      alert("msg "+msg)
      // reject(msg);
    }
     });
    return promise;
    }



    static _getStorageValue = async () => {
      var value = await AsyncStorage.getItem('user_id')
      console.log('value : ',value)
      return value
    }


    static onViewMechanicDetailsAPI = async () => {
      const promise =  new  Promise(async (resolve, reject) => {
        try {
          var url = Constants.viewMechanicDetailsAPI
      var method = 'POST';
      var userId = await AsyncStorage.getItem('userId');
      var profileId=await AsyncStorage.getItem('ProfileId')
      var serviceId=await AsyncStorage.getItem('selectedServices')
     
      var params = JSON.stringify({
        "user_id":userId, 
        "profile_id":profileId
        });

      let key = Constants.generateCmnToken("ViewMechanicDetailsAPI" + userId)
      var md5 = require('md5');
      var token=md5('ViewMechanicDetailsAPI'+userId)
      console.log("key : ",md5('ViewMechanicDetailsAPI'+ userId));
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
            Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=token);  
        }else{
          
          alert(responseJson.RESPONSE_MESSAGE)
          Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=token);
          }
      })
      .catch((error) => {
        console.log('error',error)
      })
       }catch(msg) { 
        alert("msg "+msg)
      }
       });
      return promise;
      }


      static onMechanicSkillsUpdateAPI = async (radius,skillIds,skills,services,otherService,hrsRate) => {
        const promise =  new  Promise(async (resolve, reject) => {
          try {
            var url = Constants.mechanicSkillsUpdateAPI
        var method = 'POST';
        var userId = await AsyncStorage.getItem('userId');
        var profileId=await AsyncStorage.getItem('ProfileId')
        var serviceId=await AsyncStorage.getItem('selectedServices')
       
        var params = JSON.stringify({
          "user_id": userId,
          "profile_id": profileId,
          "service_radius_in_miles": radius,
          "skills_id": skillIds,
          "skills": skills,
          "selected_offered_services": services,
          "other_service": otherService,
          "hourly_rate":hrsRate
          });
          
        let key = Constants.generateCmnToken("MechanicSkillsUpdateAPI" + userId)
        var md5 = require('md5');
        var token=md5('MechanicSkillsUpdateAPI'+userId)
        console.log("key : ",md5('MechanicSkillsUpdateAPI'+ userId));
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
              Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=token);  
          }else{
            
            alert(responseJson.RESPONSE_MESSAGE)
            Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=token);
            }
        })
        .catch((error) => {
          console.log('error',error)
        })
         }catch(msg) { 
          alert("msg "+msg)
        }
         });
        return promise;
        }

   }