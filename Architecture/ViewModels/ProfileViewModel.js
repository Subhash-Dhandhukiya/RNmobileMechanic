import React, { Component } from "react";
import { StyleSheet, Text, View,TextInput,Button,Image,Alert,TouchableHighlight, StatusBar, SafeAreaView, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from "../Helpers/Constants";
import base64 from 'base-64';
import  AsyncStorage  from '@react-native-async-storage/async-storage';

export default class ProfileViewModel extends Component{

static onViewClientProfile = async () => {

  const promise =  new  Promise(async (resolve, reject) => {
    try {
    var url = Constants.viewClientProfileAPI
    var method = 'POST';
    // const storage = new MMKV();
    var userId = await AsyncStorage.getItem('userId');
    var profileId = await AsyncStorage.getItem('ProfileId');
    var userType = await AsyncStorage.getItem('userType');
    var userEmail = await AsyncStorage.getItem('userEmail');
    var params = JSON.stringify({
        "user_id" : userId,
        "profile_id":profileId,
        "user_type":userType
    });
    var md5 = require('md5');
    var token=md5("ViewClientProfileAPI" + userId)
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
        Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken= userId);
    }else{
      alert("Something went wrong, please try again")
      Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=userId);
      }
    await AsyncStorage.setItem('userPhone', responseJson.RESPONSE_DATA.phone)
  })
  .catch((error) => {
    console.log('error',reject(error))
  })
   }catch(msg) { reject(msg);}

   });

  return promise;
  
  }


  static onViewMechanicProfile = async () => {

    const promise =  new  Promise(async (resolve, reject) => {
      try {
      var url = Constants.viewMechanicProfileAPI
      var method = 'POST';
    //   const storage = new MMKV();
    var userId = await AsyncStorage.getItem('userId');
    var profileId = await AsyncStorage.getItem('ProfileId');
    var userType = await AsyncStorage.getItem('userType');
    var userEmail = await AsyncStorage.getItem('userEmail');
    var params = JSON.stringify({
        "user_id" : userId,
        "profile_id":profileId,
        "user_type":userType
    });
      var md5 = require('md5');
      var token=md5("ViewMechanicProfileAPI" + userId)
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
          await AsyncStorage.setItem('self_des', responseJson.RESPONSE_DATA.self_description);
          Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken= userId);
      }else{
        alert("Something went wrong, please try again")
        Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=userId);
        }
        await AsyncStorage.setItem('userPhone', responseJson.RESPONSE_DATA.phone)
    })
    .catch((error) => {
      console.log('error',reject(error))
    })
     }catch(msg) { reject(msg);}
  
     });
  
    return promise;
    
    }


    static onClientProfileUpdate = async (firstName,lastName,profileImage,mobile) => {

        const promise =  new  Promise(async (resolve, reject) => {
          try {
          var url = Constants.clientProfileUpdateAPI
          var method = 'POST';
          // const storage = new MMKV();
          var image= base64.encode(profileImage)
          var userId = await AsyncStorage.getItem('userId');
          var profileId = await AsyncStorage.getItem('ProfileId');
          var userType = await AsyncStorage.getItem('userType');
          var userEmail = await AsyncStorage.getItem('userEmail');
          var params = JSON.stringify({
            "user_id":userId,
            "profile_id":profileId,
            "profile_image":image,
            "first_name":firstName,
            "last_name":lastName,
            "phone_number":mobile
          });
          var md5 = require('md5');
          var token=md5("ClientProfileUpdateAPI" + userId)
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
        .then((responseJson) => {
          console.log('res', responseJson)
           if (responseJson.RESPONSE_CODE === 200){
              resolve(responseJson);
              Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken= userId);
          }else{
            alert("Something went wrong, please try again")
            Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=userId);
            }
        })
        .catch((error) => {
          console.log('error',reject(error))
        })
         }catch(msg) { reject(msg);}
      
         });
      
        return promise;
        
        }


        static onMechanicProfileUpdate = async (firstName,lastName,profileImage,mobile,des) => {

            const promise =  new  Promise(async (resolve, reject) => {
              try {
              var url = Constants.mechanicProfileUpdateAPI
              var method = 'POST';
              // const storage = new MMKV();
              var userId = await AsyncStorage.getItem('userId');
              var profileId = await AsyncStorage.getItem('ProfileId');
              var userType = await AsyncStorage.getItem('userType');
              var userEmail = await AsyncStorage.getItem('userEmail');
              var selfDes = '';
              if(des == ""){
                selfDes = await AsyncStorage.getItem('self_des');
              }else{
                selfDes = des
              }
              // var selfDes = await AsyncStorage.getItem('self_des');
              var image= base64.encode(profileImage)
              var params = JSON.stringify({
                "user_id":userId,
                "profile_id":profileId,
                "profile_image":image,
                "first_name":firstName,
                "last_name":lastName,
                "phone_number":mobile,
                "self_description":selfDes
              });
              var md5 = require('md5');
              var token=md5("MechanicProfileUpdateAPI" + userId)
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
            .then((responseJson) => {
              console.log('res', responseJson)
               if (responseJson.RESPONSE_CODE === 200){
                  resolve(responseJson);
                  Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=userId);
              }else{
                alert("Something went wrong, please try again")
                Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken= userId);
                }
            })
            .catch((error) => {
              console.log('error',reject(error))
            })
             }catch(msg) { reject(msg);}
          
             });
          
            return promise;
            
            } 


            static onViewMechanicDetailsAPI = async () => {

              const promise =  new  Promise(async (resolve, reject) => {
                try {
                var url = Constants.viewMechanicDetailsAPI
                var method = 'POST';
                var userId = await AsyncStorage.getItem('userId');
                var profileId = await AsyncStorage.getItem('ProfileId');
                var userType = await AsyncStorage.getItem('userType');
                var params = JSON.stringify({
                  "profile_id":profileId
                });
                var md5 = require('md5');
                var token=md5("ViewMechanicDetailsAPI" + userId)
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
                    Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=userId);
                }else{
                  alert("Something went wrong, please try again")
                  Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=userId);
                  }
              })
              .catch((error) => {
                console.log('error',reject(error))
              })
               }catch(msg) { reject(msg);}
               });
              return promise;
              } 


              static onMechanicSkillsUpdateAPI = async (radius,selectedService,skills,skillId,otherService) => {

                const promise =  new  Promise(async (resolve, reject) => {
                  try {
                  var url = Constants.mechanicSkillsUpdateAPI
                  var method = 'POST';
                  var userId = await AsyncStorage.getItem('userId');
                  var profileId = await AsyncStorage.getItem('ProfileId');
                  var userType = await AsyncStorage.getItem('userType');
                  var params = JSON.stringify({
                    "profile_id":profileId,
                    "service_radius_in_miles":radius,
                    "selected_offered_services":selectedService,
                    "skills_id":skillId,
                    "skills":skills,
                    "other_service":otherService
                  });
                  var md5 = require('md5');
                  var token=md5("MechanicSkillsUpdateAPI" + userId)
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
                      Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=userId);
                  }else{
                    alert("Something went wrong, please try again")
                    Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=userId);
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