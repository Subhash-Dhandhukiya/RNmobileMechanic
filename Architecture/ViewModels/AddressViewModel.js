import React, { Component } from "react";
import Constants from "../Helpers/Constants";
import base64 from 'base-64';
import AsyncStorage  from '@react-native-async-storage/async-storage';

export default class AddressViewModel extends Component {

    static onViewClientAddressAPI = async () => {
        const promise =  new  Promise(async (resolve, reject) => {
          try {
          var url = Constants.viewClientAddressAPI
          var method = 'POST';
          var userType = await AsyncStorage.getItem('userType');
          var userId = await AsyncStorage.getItem('userId');
          var profileId = await AsyncStorage.getItem('ProfileId');
          var userEmail = await AsyncStorage.getItem('userEmail');
          var params = JSON.stringify({
            "user_id":userId,
            "profile_id":profileId,
            "user_type":userType
          });
          let key = Constants.generateCmnToken("ViewClientAddressAPI" + userId)
          var md5 = require('md5');
          var token=md5('ViewClientAddressAPI' + userId)
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
           reject(msg);
        }
         });
        return promise;
        }


        static onUpdateClientAddressAPI = async (title,address,city,state,zip,addressType) => {
            const promise =  new  Promise(async (resolve, reject) => {
              try {
              var url = Constants.updateClientAddressAPI
              var method = 'POST';
              var userType = await AsyncStorage.getItem('userType');
              var userId = await AsyncStorage.getItem('userId');
              var profileId = await AsyncStorage.getItem('ProfileId');
              var userEmail = await AsyncStorage.getItem('userEmail');
              var params = JSON.stringify({
                "user_id":userId,
                "profile_id":profileId,
                "user_type":userType,   
                "address":address,
                "city":city,
                "state":state,
                "zip_code":zip,
                "address_title":title,
                "address_type":addressType
              });
              let key = Constants.generateCmnToken("UpdateClientAddressAPI" + userId)
              var md5 = require('md5');
              var token=md5('UpdateClientAddressAPI' + userId)
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
               reject(msg);
            }
             });
            return promise;
            }


            static onViewMechanicAddressAPI = async () => {
                const promise =  new  Promise(async (resolve, reject) => {
                  try {
                  var url = Constants.viewMechanicAddressAPI
                  var method = 'POST';
                  var userType = await AsyncStorage.getItem('userType');
                  var userId = await AsyncStorage.getItem('userId');
                  var profileId = await AsyncStorage.getItem('ProfileId');
                  var userEmail = await AsyncStorage.getItem('userEmail');
                  var params = JSON.stringify({
                    "user_id":userId,
                    "profile_id":profileId,
                    "user_type":userType
                  });
                  let key = Constants.generateCmnToken("ViewMechanicAddressAPI" + userId)
                  var md5 = require('md5');
                  var token=md5('ViewMechanicAddressAPI' + userId)
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
                   reject(msg);
                }
                 });
                return promise;
                }
        
        
                static onUpdateMechanicAddressAPI = async (title,address,city,state,zip,addressType) => {
                    const promise =  new  Promise(async (resolve, reject) => {
                      try {
                      var url = Constants.updateMechanicAddressAPI
                      var method = 'POST';
                      var userType = await AsyncStorage.getItem('userType');
                      var userId = await AsyncStorage.getItem('userId');
                      var profileId = await AsyncStorage.getItem('ProfileId');
                      var userEmail = await AsyncStorage.getItem('userEmail');
                      var params = JSON.stringify({
                        "user_id":userId,
                        "profile_id":profileId,
                        "user_type":userType,
                        "address":address,
                        "city":city,
                        "state":state,
                        "zip_code":zip,
                        "address_title":title,
                        "address_type":addressType
                      });
                      let key = Constants.generateCmnToken("UpdateMechanicAddressAPI" + userId)
                      var md5 = require('md5');
                      var token=md5('UpdateMechanicAddressAPI' + userId)
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
                       reject(msg);
                    }
                     });
                    return promise;
                    }


                    static onAddNewAddressAPI = async (title,address,city,state,zip,addressType) => {
                      const promise =  new  Promise(async (resolve, reject) => {
                        try {
                        var url = Constants.addNewAddressAPI
                        var method = 'POST';
                        var userType = await AsyncStorage.getItem('userType');
                        var userId = await AsyncStorage.getItem('userId');
                        var profileId = await AsyncStorage.getItem('ProfileId');
                        var userEmail = await AsyncStorage.getItem('userEmail');
                        var params = JSON.stringify({
                          "user_id":userId, 
                          "profile_id":profileId, 
                          "user_type":userType, 
                          "address":address, 
                          "city":city, 
                          "state":state, 
                          "zip_code":zip,
                          "address_type":addressType,
                          "address_title":title
                        });
                        let key = Constants.generateCmnToken("AddAddressAPI" + userId)
                        var md5 = require('md5');
                        var token=md5('AddAddressAPI' + userId)
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
                         reject(msg);
                      }
                       });
                      return promise;
                      }
}