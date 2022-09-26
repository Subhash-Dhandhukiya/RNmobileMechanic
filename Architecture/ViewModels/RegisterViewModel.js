import React, { Component } from "react";
import { StyleSheet, Text, View,TextInput,Button,Image,Alert,TouchableHighlight,
  
    StatusBar, SafeAreaView, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from "../Helpers/Constants";
import base64 from 'base-64';
import ImgToBase64 from 'react-native-image-base64';

export default class RegisterViewModel extends Component{

   static AvailableServicesAPI= async () => {
    const promise =  new  Promise(async (resolve, reject) => {
  
      try {
        var url = Constants.availableServicesAPI
    var method = 'POST';
  
    var params = JSON.stringify({
        "user_id" :"1",
    });
    let key = Constants.generateCmnToken("AvailableServicesAPI1")
    var md5 = require('md5');
    var token=md5('AvailableServicesAPI1')
    console.log("key : ",md5('AvailableServicesAPI1'));
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
        //alert("Something went wrong, please try again")
        Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=token);
        }

       
    })
    .catch((error) => {
      console.log('error',error)
      //alert("error "+error)
    })
     }catch(msg) { 
      //alert("msg "+msg)
      // reject(msg);}
  
    }});
  
    return promise;
    
    }
    
    static onClientRegistration = async (firstName,lastName,email,phone,password,address
        ,city,zip,state,profileImg) => {
        const promise =  new  Promise(async (resolve, reject) => {
        try {
        // var url = Constants.baseUrl+"ClientRegistrationAPI";
        var url = Constants.clientRegistrationAPI;
        var method = 'POST';
        var image= "";
  
        var params = JSON.stringify({
            "first_name":firstName,
            "last_name":lastName,
            "state":state,
            "zip_code":zip,
            "phone":phone,
            "email":email,
            "password":password,
            "address":address,
            "city":city,
            "profile_image":profileImg,
            "address_title":"Home"
        });
         console.log('params', params);
        var md5 = require('md5');
        var token=md5('ClientRegistrationAPI' + email)
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
                console.log('response : ',responseJson)
                if (responseJson.RESPONSE_CODE === 200){
                    resolve(responseJson);
                    Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=email);
                }else
                {
                    var code=responseJson.RESPONSE_CODE;
                   if (code == 1104){
                    alert('First Name should not be empty');
                    Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=email);
                  }else if (code == 1105){
                    alert('Please check last name entered');
                    Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=email);
                  }else if (code == 1106){
                    alert('Please check phone number entered');
                    Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=email);
                  }else if (code == 1107){
                    alert('Please check email entered');
                    Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=email);
                  }else if (code == 1108){
                     alert('Please check the password entered, It must be minimum 8 characters, 1 uppercase , 1 lowercase, 1 numeric and 1 special chanracter');
                     Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=email);
                  }else if (code == 1109){
                    alert('Please check address entered');
                    Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=email);
                  }else if (code== 1110){
                    alert('Please check city entered');
                    Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=email);
                  }else if (code == 1111){
                    alert('Please check state entered');
                    Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=email);
                  }else if (code== 1112){
                    alert('Please check zip code entered');
                    Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=email);
                  }else if (code == 1114){
                    alert('Email already registered');
                    Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=email);
                  }else{
                    alert("Something went wrong, please try again")
                    Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=email);
                }
                }
            })
            .catch((error) => {
                Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=email);
                
                console.log('error',error)
            })
            }catch(msg) { 
                Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=email);
                
                reject(msg);}

            });
 
            return promise;
        };


    static onMechanicRegistration = async (firstName,lastName,email,phone,password,
        address,city,state,zip,skill,profileImg,radius,services,otherService,hrsRate) => {
            const promise =  new  Promise(async (resolve, reject) => {
            try {
            var url = Constants.mechanicRegistrationAPI;
            var method = 'POST';
            var image= "";
        
            var params = JSON.stringify({
                "first_name":firstName,
                "last_name":lastName,
                "phone":phone,
                "email":email, 
                "password":password,
                "address":address, 
                "city":city,
                "state":state,
                "zip_code":zip,
                "current_location":"-",
                "profile_image":profileImg,
                "service_radius_in_miles":radius,
                "selected_offered_services":services,
                "skills":skill,
                "other_service":otherService, 
                "address_title":"Home",
                "self_description":skill,
                "hourly_rate":hrsRate
                
            });
            console.log('params', params);
            var md5 = require('md5');
            var token=md5('MechanicRegistrationAPI' + email)
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
                    console.log('response : ',responseJson)
                    if (responseJson.RESPONSE_CODE === 200){
                        resolve(responseJson);
                        Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=email);
                    }else
                    {
                      var code=responseJson.RESPONSE_CODE;
                      if (code == 1204){
                        alert('First Name should not be empty');
                        Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=email);
                      }else if (code == 1205){
                        alert('Phone should not be empty');
                        Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=email);
                      }else if (code == 1206){
                        alert('Email should not be empty');
                        Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=email);
                      }else if (code == 1207){
                        alert('Password should not be empty');
                        Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=email);
                      }else if (code == 1208){
                        alert('Address should not be empty');
                        Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=email);
                      }else if (code == 1209){
                        alert('City should not be empty');
                        Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=email);
                      }else if (code == 1210){
                        alert('State should not be empty');
                        Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=email);
                      }else if (code== 1211){
                        alert('Zip Code should not be empty');
                        Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=email);
                      }else if (code== 1212){
                        alert('Current Location should not be empty');
                        Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=email);
                      }else if (code == 1213){
                        alert('Profile Pic should not be empty');
                        Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=email);
                      }else if (code == 1215){
                        alert('Email already registered');
                        Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=email);
                      }else if (code == 1216){
                        alert('One service should be selected');
                        Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=email);
                      }else if (code == 1217){
                        alert('Skills should not be empty');
                        Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=email);
                      }else if (code == 1218){
                        alert('Service radius should not be empty');
                        Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=email);
                      }else if (code == 1219){
                        alert('Last Name should not be empty');
                        Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=email);
                      }else{
                        alert("Something went wrong, please try again")
                        Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=email);
                    }
                    }
                    
                })
                .catch((error) => {
                    Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=email);
                
                    console.log('params', params);
                    console.log('error',error)
                })
                }catch(msg) { 
                    Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=email);
                
                    reject(msg);}
    
                });
     
                return promise;
            };

            static onCheckEmailExistAction = async (email,userType) => {
              const promise =  new  Promise(async (resolve, reject) => {
                try {
                var url = Constants.checkEmailExistAPI
                var method = 'POST';
                var params = JSON.stringify({
                  "email":email,
                  "user_type":userType
                });
                var md5 = require('md5');
                var token=md5("CheckEmailExistAPI" + email)
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
                    Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=email);
                }else if (responseJson.RESPONSE_CODE == 4307){
                  alert(responseJson.RESPONSE_MESSAGE);
                  Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=email);
                }else{
                  alert("Something went wrong, please try again");
                  Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=email);
                  }
              })
              .catch((error) => {
                console.log('error',reject(error))
              })
               }catch(msg) { reject(msg);}
            
               });
              return promise;
              }


              static onMyAvailableServicesAction = async () => {
                const promise =  new  Promise(async (resolve, reject) => {
                  try {
                  var url = Constants.myAvailableServicesAPI
                  var method = 'POST';
                  var userId = await AsyncStorage.getItem('userId');
                  var profileId = await AsyncStorage.getItem('ProfileId');
                  var params = JSON.stringify({
                    "user_id":userId,
                    "mechanic_id":profileId,
                    "user_type":"mechanic"
                  });
                  var md5 = require('md5');
                  var token=md5("MyAvailableServicesAPI" + userId)
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
                    alert("Something went wrong, please try again");
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