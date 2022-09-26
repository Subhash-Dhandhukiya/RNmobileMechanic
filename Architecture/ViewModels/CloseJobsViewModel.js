import React, { Component } from "react";
import Constants from "../Helpers/Constants";
import base64 from 'base-64';
import AsyncStorage  from '@react-native-async-storage/async-storage';
import moment from "moment";

export default class CloseJobsViewModel extends Component {

    static onCloseJobsAPI = async (status,feedback,rating,rqstId) => {
        const promise =  new  Promise(async (resolve, reject) => {
          try {
          var url = Constants.quotationStatusUpdateAPI
          var method = 'POST';
          var userType = await AsyncStorage.getItem('userType');
          var userId = await AsyncStorage.getItem('userId');
          var profileId = await AsyncStorage.getItem('ProfileId');
          var userEmail = await AsyncStorage.getItem('userEmail');
          var requestId = await AsyncStorage.getItem('requestId');
          // var mechanicId = await AsyncStorage.getItem('mechId');
          var date = moment().utcOffset('+05:30').format('YYYY-MM-DD');
          console.log('requestId______ : ',await AsyncStorage.getItem('requestId'));
          var params = JSON.stringify({
            "user_type":userType,
            "profile_id":profileId,
            "request_id":rqstId,
            "status":status,
            "feedback_comment":feedback,
            "rating":rating
          });
          let key = Constants.generateCmnToken("QuotationStatusUpdateAPI" + profileId)
          var md5 = require('md5');
          var token=md5('QuotationStatusUpdateAPI' + profileId)
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


        static onReviewJobsAPI = async (status,feedback,rating,rqstId) => {
          const promise =  new  Promise(async (resolve, reject) => {
            try {
            var url = Constants.closedJobsReviewAPI
            var method = 'POST';
            var userType = await AsyncStorage.getItem('userType');
            var userId = await AsyncStorage.getItem('userId');
            var profileId = await AsyncStorage.getItem('ProfileId');
            var userEmail = await AsyncStorage.getItem('userEmail');
            var requestId = await AsyncStorage.getItem('requestId');
            // var mechanicId = await AsyncStorage.getItem('mechId');
            var date = moment().utcOffset('+05:30').format('YYYY-MM-DD');
            console.log('requestId______ : ',await AsyncStorage.getItem('requestId'));
            var params = JSON.stringify({

              "user_id":userId,
              "user_type":userType,
              "profile_id":profileId,
              "request_id":rqstId,
              "add_review":feedback,
              "rating":rating
              
            });
            let key = Constants.generateCmnToken("ClosedJobsReviewAPI" + userId)
            var md5 = require('md5');
            var token=md5('ClosedJobsReviewAPI' + userId)
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