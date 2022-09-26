import React, { Component } from "react";
import Constants from "../Helpers/Constants";
import base64 from 'base-64';
import AsyncStorage  from '@react-native-async-storage/async-storage';

export default class HelpRequestViewModel extends Component {

    static onHelpRequest = async (subject,message) => {
        const promise =  new  Promise(async (resolve, reject) => {
          try {
          var url = Constants.helpRequestAPI
          var method = 'POST';
          var userId = await AsyncStorage.getItem('userId');
          var profileId = await AsyncStorage.getItem('ProfileId');
          var userType = await AsyncStorage.getItem('userType');
          var userEmail = await AsyncStorage.getItem('userEmail');
          var params = JSON.stringify({
              "user_id" : userId,
              "profile_id":profileId,
              "user_type":userType,
              "subject":subject,
              "message":message
          });
          var md5 = require('md5');
          var token=md5("HelpRequestAPI" + userId)
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

        static onGetHelpRequestAPI = async () => {
            const promise =  new  Promise(async (resolve, reject) => {
              try {
              var url = Constants.getHelpRequestAPI
              var method = 'POST';
              var userId = await AsyncStorage.getItem('userId');
              var params = JSON.stringify({
                  "user_id" : userId
              });
              var md5 = require('md5');
              var token=md5("GetHelpRequestAPI" + userId)
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

            static onReplyHelpRequestAPI = async (requestId,message) => {
                const promise =  new  Promise(async (resolve, reject) => {
                  try {
                  var url = Constants.replyHelpRequestAPI
                  var method = 'POST';
                  var userId = await AsyncStorage.getItem('userId');
                  var profileId = await AsyncStorage.getItem('ProfileId');
                  var userType = await AsyncStorage.getItem('userType');
                  var userEmail = await AsyncStorage.getItem('userEmail');
                  var params = JSON.stringify({
                    "request_id":requestId,
                    "user_id":userId,
                    "user_profile_id":profileId,
                    "message":message
                  });
                  var md5 = require('md5');
                  var token=md5("ReplyHelpRequestAPI" + userId)
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

}