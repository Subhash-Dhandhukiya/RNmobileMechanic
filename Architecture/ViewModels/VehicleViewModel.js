import React, { Component } from "react";
import { StyleSheet, Text, View,TextInput,Button,Image,Alert,TouchableHighlight,
  
    StatusBar, SafeAreaView, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from "../Helpers/Constants";
import base64 from 'base-64';
import  AsyncStorage  from '@react-native-async-storage/async-storage';

export default class VehicleViewModel extends Component{

  
 static AvailableServicesAPI = async () => {
    const promise =  new  Promise(async (resolve, reject) => {
      try {
        var url = Constants.availableServicesAPI
    var method = 'POST';
    var userId = await AsyncStorage.getItem('userId');
    var params = JSON.stringify({
        "user_id" :userId,
    });
    let key = Constants.generateCmnToken("AvailableServicesAPI" + userId)
    var md5 = require('md5');
    var token=md5('AvailableServicesAPI'+userId)
    console.log("key : ",md5('AvailableServicesAPI'+ userId));
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
        alert("Something went wrong, please try again")
        Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=token);
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


    static onAddVehicleAPI = async (vehicleMake, vehicleModel, vehicleYear) => {
      const promise =  new  Promise(async (resolve, reject) => {
        try {
        var url = Constants.addVehicleAPI
        var method = 'POST';
        var userId = await AsyncStorage.getItem('userId');
        var profileId = await AsyncStorage.getItem('ProfileId');
        var params = JSON.stringify({
          "user_id":userId,
          "client_id":profileId,
          "vehicle_make":vehicleMake,
          "vehicle_model":vehicleModel,
          "vehicle_year":vehicleYear
        });
        var md5 = require('md5');
        var token=md5("AddVehicleAPI" + userId)
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
        }else if (responseJson.RESPONSE_CODE === 2910){
          alert("Please select a year between 1930 and the current year");
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


      static onShowVehicleAPI = async () => {
        const promise =  new  Promise(async (resolve, reject) => {
          try {
          var url = Constants.showVehicleAPI
          var method = 'POST';
          var userId = await AsyncStorage.getItem('userId');
          var profileId = await AsyncStorage.getItem('ProfileId');
          var params = JSON.stringify({
            "user_id":userId,
            "client_id":profileId
          });
          var md5 = require('md5');
          var token=md5("ViewVehicleAPI" + userId)
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


        static onUpdateVehicleAPI = async (vehicleId,vehicleMake,vehicleModel,vehicleYear) => {
          const promise =  new  Promise(async (resolve, reject) => {
            try {
            var url = Constants.updateVehicleAPI
            var method = 'POST';
            var userId = await AsyncStorage.getItem('userId');
            var profileId = await AsyncStorage.getItem('ProfileId');
            var params = JSON.stringify({
              "user_id":userId,
              "vehicle_id":vehicleId,
              "client_id":profileId,
              "vehicle_make":vehicleMake,
              "vehicle_model":vehicleModel,
              "vehicle_year":vehicleYear
            });
            var md5 = require('md5');
            var token=md5("UpdateVehicleAPI" + userId)
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
            }else if(responseJson.RESPONSE_CODE === 3112){
              alert("Please select a year between 1930 and the current year");
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


          static onClientSelectServicesToShareAPI = async (serviceId,vehicleId) => {
            const promise =  new  Promise(async (resolve, reject) => {
              try {
              var url = Constants.clientSelectServicesToShareAPI
              var method = 'POST';
              var userId = await AsyncStorage.getItem('userId');
              var profileId=await AsyncStorage.getItem('ProfileId')
              await AsyncStorage.setItem('selectedServices',serviceId)
              console.log('ProfileId______ : ',await AsyncStorage.getItem('ProfileId'));
              var params = JSON.stringify({
                "user_id":userId,
                "client_id":profileId,
                "service_id":serviceId,
                "vehicle_id":vehicleId
              });
              var md5 = require('md5');
              var token=md5("ClientSelectServicesToShareAPI" + userId)
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
                  console.log('RequestId :', responseJson.RESPONSE_DATA.request_id);
                  await AsyncStorage.setItem('requestId', responseJson.RESPONSE_DATA.request_id);
                  console.log('requestId______ : ',await AsyncStorage.getItem('requestId'));
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



            static onDisplayMechanicOfServiceSelectedAPI = async (clientId,serviceId) => {
              const promise =  new  Promise(async (resolve, reject) => {
                try {
                var url = Constants.displayMechanicOfServiceSelectedAPI
                var method = 'POST';
                var userId = await AsyncStorage.getItem('userId');
                var params = JSON.stringify({
                  "user_id":userId,
                  "client_id":"1",
                  "service_id":"1,2"
                });
                var md5 = require('md5');
                var token=md5("DisplayMechanicOfServiceSelectedAPI" + userId)
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
  


              static onAskQuotationToMechanicAPI = async (clientId,serviceId) => {
                const promise =  new  Promise(async (resolve, reject) => {
                  try {
                  var url = Constants.askQuotationToMechanicAPI
                  var method = 'POST';
                  var userId = await AsyncStorage.getItem('userId');
                  var params = JSON.stringify({
                    "user_id":userId,
                    "client_id":"1",
                    "service_id":"1,2"
                  });
                  var md5 = require('md5');
                  var token=md5("AskQuotationToMechanicAPI" + userId)
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


                static onViewAverageChargesAPI = async (clientId,serviceId,requestId) => {
                  const promise =  new  Promise(async (resolve, reject) => {
                    try {
                    var url = Constants.viewAverageChargesAPI
                    var method = 'POST';
                    var userId = await AsyncStorage.getItem('userId');
                    var params = JSON.stringify({
                      "user_id":userId,
                      "client_id":"1",
                      "service_id":"1,2",
                      "request_id":"1"
                    });
                    var md5 = require('md5');
                    var token=md5("ViewAverageChargesAPI" + userId)
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

                  static onDeleteVehicleAction = async (vehicleId) => {
                    const promise =  new  Promise(async (resolve, reject) => {
                      try {
                      var url = Constants.deleteVehicleAPI
                      var method = 'POST';
                      var userId = await AsyncStorage.getItem('userId');
                      var profileId = await AsyncStorage.getItem('ProfileId');
                      var params = JSON.stringify({
                        "user_id":userId,
                        "client_id":profileId,
                        "vehicle_id":vehicleId
                      });
                      var md5 = require('md5');
                      var token=md5("DeleteVehicleAPI" + userId)
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


                    static MyAllAvailableServicesAPI = async () => {
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
                      let key = Constants.generateCmnToken("MyAvailableServicesAPI" + userId)
                      var md5 = require('md5');
                      var token=md5('MyAvailableServicesAPI'+userId)
                      console.log("key : ",md5('MyAvailableServicesAPI'+ userId));
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
                          alert("Something went wrong, please try again")
                          Constants.ApiManagerCall(url=url,method=method,parameters=params,header=headers,res=responseJson,emailToken=token);
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