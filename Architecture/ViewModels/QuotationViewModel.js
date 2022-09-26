import React, { Component } from "react";
import Constants from "../Helpers/Constants";
import base64 from 'base-64';
import AsyncStorage  from '@react-native-async-storage/async-storage';

export default class QuatationViewModel extends Component {

    static onAskQuotationToMechanicAPI = async (mechanicId,id,date) => {
        const promise =  new  Promise(async (resolve, reject) => {
          try {
          var url = Constants.askQuotationToMechanicAPI
          var method = 'POST';
          var userType = await AsyncStorage.getItem('userType');
          var userId = await AsyncStorage.getItem('userId');
          var profileId = await AsyncStorage.getItem('ProfileId');
          var userEmail = await AsyncStorage.getItem('userEmail');
          var requestId = await AsyncStorage.getItem('requestId');
          var selectedServiceIds = await AsyncStorage.getItem('selectedServiceIds');
          console.log('requestId______ : ',await AsyncStorage.getItem('requestId'));
          var params = JSON.stringify({
            "user_id":userId,
            "client_id":profileId,
            "request_id":requestId,
            "mechanic_ids":mechanicId,
            "service_ids":selectedServiceIds,
            "any_checkbox":id,
            "scheduled_datetime":date
          });
          let key = Constants.generateCmnToken("AskQuotationToMechanicAPI" + userId)
          var md5 = require('md5');
          var token=md5('AskQuotationToMechanicAPI' + userId)
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
              alert("Quote request is submitted successfully")
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


        static onGetQuotationRequestAPI = async () => {
          const promise =  new  Promise(async (resolve, reject) => {
            try {
            var url = Constants.getQuotationRequestAPI
            var method = 'POST';
            var userType = await AsyncStorage.getItem('userType');
            var userId = await AsyncStorage.getItem('userId');
            var profileId = await AsyncStorage.getItem('ProfileId');
            var userEmail = await AsyncStorage.getItem('userEmail');
            var requestId = await AsyncStorage.getItem('requestId');
            console.log('requestId______ : ',await AsyncStorage.getItem('requestId'));
            var params = JSON.stringify({
              "user_id":userId,
              "mechanic_profile_id":profileId
            });
            let key = Constants.generateCmnToken("GetQuotationRequestAPI" + userId)
            var md5 = require('md5');
            var token=md5('GetQuotationRequestAPI' + userId)
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
              // alert(""+responseJson.RESPONSE_MESSAGE)
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

        
          static onGenerateQuotationAPI = async (clientId,serviceId, vehicleId,request_detail,
            selected_ids,rqstId,labourDetails, partDetails,description) => {
            const promise =  new  Promise(async (resolve, reject) => {
              try {
              var url = Constants.generateQuoteAPI
              var method = 'POST';
              var userType = await AsyncStorage.getItem('userType');
              var userId = await AsyncStorage.getItem('userId');
              var profileId = await AsyncStorage.getItem('ProfileId');
              var userEmail = await AsyncStorage.getItem('userEmail');
              var requestId = await AsyncStorage.getItem('requestId');
              console.log('requestId______ : ',await AsyncStorage.getItem('requestId'));
          
              var params = JSON.stringify({

                "user_id":userId,
                "mechanic_user_id":profileId,
                "client_user_id":clientId,
                "service_id":selected_ids,
                "vehicle_id":vehicleId,
                "request_detailx":request_detail,
                "request_id":rqstId,
                "labour_details":labourDetails,
                "part_details":partDetails,
                "provide_feedback":description,
              });
              console.log('params', params);
              let key = Constants.generateCmnToken("GenerateQuoteAPI" + userId)
              var md5 = require('md5');
              var token=md5('GenerateQuoteAPI' + userId)
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
                alert("Quotation is created successfully.")
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

            static onGetQuotationAPI = async () => {
              const promise =  new  Promise(async (resolve, reject) => {
                try {
                var url = Constants.getQuotationAPI
                var method = 'POST';
                var userType = await AsyncStorage.getItem('userType');
                var userId = await AsyncStorage.getItem('userId');
                var profileId = await AsyncStorage.getItem('ProfileId');
                var userEmail = await AsyncStorage.getItem('userEmail');
                var requestId = await AsyncStorage.getItem('requestId');
                console.log('requestId______ : ',await AsyncStorage.getItem('requestId'));
                var params = JSON.stringify({
                  "user_id":userId, 
                  "client_id":profileId
                });
                let key = Constants.generateCmnToken("GetQuotationAPI" + userId)
                var md5 = require('md5');
                var token=md5('GetQuotationAPI' + userId)
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
                    // await AsyncStorage.setItem('mechId', responseJson.RESPONSE_DATA.mechanic_user_id)
                    // console.log('MechanicId : ', responseJson.RESPONSE_DATA.mechanic_user_id)
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


              static onMechanicBookedJobsAction = async () => {
                const promise =  new  Promise(async (resolve, reject) => {
                  try {
                  var url = Constants.mechanicBookedJobsAPI
                  var method = 'POST';
                  var userId = await AsyncStorage.getItem('userId');
                  var profileId = await AsyncStorage.getItem('ProfileId');
                  console.log('requestId______ : ',await AsyncStorage.getItem('requestId'));
                  var params = JSON.stringify({
                    "user_id":userId,
                    "mechanic_user_id":profileId
                  });
                  let key = Constants.generateCmnToken("MechanicBookedJobsAPI" + userId)
                  var md5 = require('md5');
                  var token=md5('MechanicBookedJobsAPI' + userId)
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