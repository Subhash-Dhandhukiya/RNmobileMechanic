
import React, { Component } from "react";
import { StyleSheet, Text, View,TextInput,Button,Image,Alert,TouchableHighlight,
    StatusBar, SafeAreaView, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as NetInfo from "@react-native-community/netinfo";
// import { NativeModules, Platform} from "react-native"
import DeviceInfo from 'react-native-device-info';
import { getUniqueId, getManufacturer } from 'react-native-device-info';
import moment from "moment";


export default class Constants extends Component
 {

   static headers = new Headers();
  //  static baseUrl                                   = 'http://3.210.84.236/staging/api/';
   static baseUrl                                   = "http://181.214.83.118/~bilworks/_mob-mech/api/";
   static apiLogManager                             =  "http://181.214.83.118/~bilworks/test-api-manager/LogApi.php";
   
   static clientRegistrationAPI                     = Constants.baseUrl + "ClientRegistrationAPI"
   static mechanicRegistrationAPI                   = Constants.baseUrl + "MechanicRegistrationAPI"
   static loginAPI                                  = Constants.baseUrl + "LoginAPI"
   static forgotPasswordAPI                         = Constants.baseUrl + "ForgotPasswordAPI"
   static changePasswordAPI                         = Constants.baseUrl + "ChangePasswordAPI"
   static availableServicesAPI                      = Constants.baseUrl + "AvailableServicesAPI"
   static viewMechanicProfileAPI                    = Constants.baseUrl + "ViewMechanicProfileAPI"
   static viewClientProfileAPI                      = Constants.baseUrl + "ViewClientProfileAPI" 
   static clientProfileUpdateAPI                    = Constants.baseUrl + "ClientProfileUpdateAPI"
   static mechanicProfileUpdateAPI                  = Constants.baseUrl + "MechanicProfileUpdateAPI"
   static helpRequestAPI                            = Constants.baseUrl + "HelpRequestAPI"
   static viewClientAddressAPI                      = Constants.baseUrl + "ViewClientAddressAPI"
   static updateClientAddressAPI                    = Constants.baseUrl + "UpdateClientAddressAPI"
   static viewMechanicAddressAPI                    = Constants.baseUrl + "ViewMechanicAddressAPI"
   static updateMechanicAddressAPI                  = Constants.baseUrl + "UpdateMechanicAddressAPI"
   static viewMechanicDetailsAPI                    = Constants.baseUrl + "ViewMechanicDetailsAPI"
   static mechanicSkillsUpdateAPI                   = Constants.baseUrl + "MechanicSkillsUpdateAPI"
   static getHelpRequestAPI                         = Constants.baseUrl + "GetHelpRequestAPI"
   static replyHelpRequestAPI                       = Constants.baseUrl + "ReplyHelpRequestAPI"
   static addVehicleAPI                             = Constants.baseUrl + "AddVehicleAPI"
   static showVehicleAPI                            = Constants.baseUrl + "ViewVehicleAPI"
   static updateVehicleAPI                          = Constants.baseUrl + "UpdateVehicleAPI"
   static clientSelectServicesToShareAPI            = Constants.baseUrl + "ClientSelectServicesToShareAPI"
   static displayMechanicOfServiceSelectedAPI       = Constants.baseUrl + "DisplayMechanicOfServiceSelectedAPI"
   static askQuotationToMechanicAPI                 = Constants.baseUrl + "AskQuotationToMechanicAPI"
   static viewAverageChargesAPI                     = Constants.baseUrl + "ViewAverageChargesAPI"
   static generateQuoteAPI                          = Constants.baseUrl + "GenerateQuoteAPI"
   static getQuotationRequestAPI                    = Constants.baseUrl + "GetQuotationRequestAPI"
   static bookAppointmentAPI                        = Constants.baseUrl + "BookAppointmentAPI"
   static getQuotationAPI                           = Constants.baseUrl + "GetQuotationAPI"
   static viewMechanicDetailsAPI                    = Constants.baseUrl + "ViewMechanicDetailsAPI"
   static mechanicSkillsUpdateAPI                   = Constants.baseUrl + "MechanicSkillsUpdateAPI"
   static addNewAddressAPI                          = Constants.baseUrl + "AddAddressAPI"
   static bokedJobsAPI                              = Constants.baseUrl + "MyBookedJobsAPI"
   static checkEmailExistAPI                        = Constants.baseUrl + "CheckEmailExistAPI"
   static deleteVehicleAPI                          = Constants.baseUrl + "DeleteVehicleAPI"
   static myAvailableServicesAPI                    = Constants.baseUrl + "MyAvailableServicesAPI"
   static mechanicBookedJobsAPI                     = Constants.baseUrl + "MechanicBookedJobsAPI"
   static becomeMechanicAPI                         = Constants.baseUrl + "BecomeMechanicAPI"
   static logoutAPI                                 = Constants.baseUrl + "LogoutAPI"
   static quotationStatusUpdateAPI                  = Constants.baseUrl + "QuotationStatusUpdateAPI"
   static getCompletedJobsAPI                       = Constants.baseUrl + "GetCompletedJobsAPI"
   static closedJobsReviewAPI                       = Constants.baseUrl + "ClosedJobsReviewAPI"
   
   


   static getLastItem = thePath => thePath.substring(thePath.lastIndexOf('/') + 1)
   static commonToken = "";
   static generateCmnToken(key=""){
    console.log("Key : ",key);
      var md5 = require('md5');
      commonToken = md5(key)
      console.log("MD5 Token : ",commonToken);

    }


    static ApiManagerCall(url='',method='',parameters=[String=any],header=Helpers.headers.set('' , ''),res=[String=any],emailToken='') {
      const NetInfo = require("@react-native-community/netinfo");
      NetInfo.fetch().then(state => {
      console.log("Network Details :",state.type);
      
      var md5 = require('md5');
      var md5Password = md5("ApiLogManager")
      console.log("MD5Password : ",md5Password);

      let api = Constants.apiLogManager;
      let base64 = require('base-64');
      let username = "Authorization"
      let password = md5Password;
      let headers = new Headers();
      headers.set('Authorization', 'Basic ' + base64.encode(username + ":" + password));
      headers.set('Content-Type', 'Application/json');

      let requestSent = url + '(POST VALUES)' + JSON.stringify(parameters);
      let interfaceMode = '';
      let eventAction = JSON.stringify(parameters);
      let responseReceived = JSON.stringify(res);
      let methodType = method;


      if(url === Constants.loginAPI){
        interfaceMode = 'Login';
      }else if(url === Constants.clientRegistrationAPI){
        interfaceMode = 'Client Registration';
      }else if(url === Constants.mechanicRegistrationAPI){
        interfaceMode = 'Mechanic Registration';
      }else if(url === Constants.forgotPasswordAPI){
        interfaceMode = 'Forgot Password';
      }else if(url === Constants.changePasswordAPI){
        interfaceMode = 'Change Password';
      }else if(url === Constants.availableServicesAPI){
        interfaceMode = 'All Available services';
      }else if(url === Constants.viewMechanicProfileAPI){
        interfaceMode = 'View Mechanic Profile';
      }else if(url === Constants.viewClientProfileAPI){
        interfaceMode = 'View Client Profile';
      }else if(url === Constants.clientProfileUpdateAPI){
        interfaceMode = 'Client Profile Update';
      }else if(url === Constants.mechanicProfileUpdateAPI){
        interfaceMode = 'Mechanic Profile Update';
      }else if(url === Constants.helpRequestAPI){
        interfaceMode = 'Help Request';
      }else if(url === Constants.viewClientAddressAPI){
        interfaceMode = 'View Client Address';
      }else if(url === Constants.updateClientAddressAPI){
        interfaceMode = 'Update Client Address';
      }else if(url === Constants.viewMechanicAddressAPI){
        interfaceMode = 'View Mechanic Address';
      }else if(url === Constants.updateMechanicAddressAPI){
        interfaceMode = 'Update Mechanic Address';
      }else if(url === Constants.viewMechanicDetailsAPI){
        interfaceMode = 'View Mechanic Details';
      }else if(url === Constants.mechanicSkillsUpdateAPI){
        interfaceMode = 'Mechanic Skills Update';
      }else if(url === Constants.getHelpRequestAPI){
        interfaceMode = 'Get Help Request';
      }else if(url === Constants.replyHelpRequestAPI){
        interfaceMode = 'Reply Help Request';
      }else if(url === Constants.addVehicleAPI){
        interfaceMode = 'Add Vehicle';
      }else if(url === Constants.showVehicleAPI){
        interfaceMode = 'Show Vehicle';
      }else if(url === Constants.updateVehicleAPI){
        interfaceMode = 'Update Vehicle';
      }else if(url === Constants.clientSelectServicesToShareAPI){
        interfaceMode = 'Client Select Services To Share';
      }else if(url === Constants.displayMechanicOfServiceSelectedAPI){
        interfaceMode = 'Display Mechanic Of Service Selected';
      }else if(url === Constants.askQuotationToMechanicAPI){
        interfaceMode = 'Ask Quotation To Mechanic';
      }else if(url === Constants.viewAverageChargesAPI){
        interfaceMode = 'View Average Charges';
      }else if(url === Constants.generateQuoteAPI){
        interfaceMode = 'Generate Quote';
      }else if(url === Constants.getQuotationRequestAPI){
        interfaceMode = 'Get Quotation Request';
      }else if(url === Constants.bookAppointmentAPI){
        interfaceMode = 'Book Appointment';
      }else if(url === Constants.viewMechanicDetailsAPI){
        interfaceMode = 'View Mechanic Details';
      }else if(url === Constants.mechanicSkillsUpdateAPI){
        interfaceMode = 'Mechanic Skills Update';
      }else if(url === Constants.getQuotationAPI){
        interfaceMode = 'Get Quotation';
      }else if(url === Constants.addNewAddressAPI){
        interfaceMode = 'Add New Address';
      }else if(url === Constants.checkEmailExistAPI){
        interfaceMode = 'Check Email Exist';
      }else if(url === Constants.deleteVehicleAPI){
        interfaceMode = 'Delete Vehicle';
      }else if(url === Constants.myAvailableservicesAPI){
        interfaceMode = 'My Available Services';
      }else if(url === Constants.mechanicBookedJobsAPI){
        interfaceMode = 'Mechanic Booked Jobs';
      }else if(url === Constants.becomeMechanicAPI){
        interfaceMode = 'Become a mechanic';
      }else if(url === Constants.logoutAPI){
        interfaceMode = 'Logout';
      }else if(url === Constants.quotationStatusUpdateAPI){
        interfaceMode = 'QuotationStatusUpdateAPI';
      }else if(url === Constants.getCompletedJobsAPI){
        interfaceMode = 'GetCompletedJobsAPI';
      }else if(url === Constants.closedJobsReviewAPI){
        interfaceMode = 'ClosedJobsReviewAPI';
      }else{
        interfaceMode = 'Boked Jobs';
        
      }

      var DeviceInfo = require('react-native-device-info');
      console.log("Device Unique ID", DeviceInfo.getUniqueId());  // e.g. FCDBD8EF-62FC-4ECB-B2F5-92C9E79AC7F9 
      console.log("Device Manufacturer", DeviceInfo.getManufacturer());  // e.g. Apple
      console.log("Device Model", DeviceInfo.getModel());  // e.g. iPhone 6
      console.log("Device ID", DeviceInfo.getDeviceId());  // e.g. iPhone7,2 / or the board on Android e.g. goldfish
      console.log("Device Name", DeviceInfo.getSystemName());  // e.g. iPhone OS
      console.log("Device Version", DeviceInfo.getSystemVersion());  // e.g. 9.0
      console.log("Bundle Id", DeviceInfo.getBundleId());  // e.g. com.learnium.mobile
      console.log("Build Number", DeviceInfo.getBuildNumber());  // e.g. 89
      console.log("App Version", DeviceInfo.getVersion());  // e.g. 1.1.0
      console.log("App Version (Readable)", DeviceInfo.getReadableVersion());  // e.g. 1.1.0.89
      console.log("Device Name", DeviceInfo.getDeviceName());  // e.g. Becca's iPhone 6
      console.log("User Agent", DeviceInfo.getUserAgent()); // e.g. Dalvik/2.1.0 (Linux; U; Android 5.1; Google Nexus 4 - 5.1.0 - API 22 - 768x1280 Build/LMY47D)
      // console.log("Device Locale", DeviceInfo.getDeviceLocale()); // e.g en-US
      // console.log("Device Country", DeviceInfo.getDeviceCountry()); // e.g US
      var dateAndTime = moment().format("YYYY-MM-DD HH:mm:ss")


      let params = JSON.stringify({
        "project_name" : "Mobile Mechanic App",
        "device_model": DeviceInfo.getModel(),
        "os_ver": DeviceInfo.getSystemVersion(),
        "app_ver": DeviceInfo.getVersion(),
        "network": state.type.toString(),
        "net_speed": "0" + "kbps",
        "driving_speed": "0",
        "email_token": emailToken,
        "geo_lat": "0.00",
        "geo_long": "0.00",
        "assignment": "Mobile Mechanic",
        "module_interface": interfaceMode.toString(),
        "event_action": eventAction.toString(),
        "api_url": url,
        "method_type": methodType.toString(),
        "request_sent": requestSent.toString(),
        "response_received": JSON.stringify(responseReceived),
        "created_at": dateAndTime
})
      console.log(params);
      fetch(api, {
                  method: 'POST',
                  headers:headers,
                  body: params
                })
        .then(response => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          console.log('API Success');
            console.log('getting data from fetch', responseJson);
          
            this.setState({
                loading: false,
                dataSource: responseJson
            })
            
        })
        .catch(error => console.log(error))
        console.log('API Failed');
      });
};


  
 static httpPost(apiMethod = "",apiUrl='', headers = Constants.headers.set('' , ''), parameters = [String=any]){
    fetch(apiUrl, {
                method: apiMethod,
                headers:headers,
                body: parameters
            }).then(response => response.json())
  .then((responseJson) => {
     if (responseJson.RESPONSE_CODE === 200){

    }else{

      }
      this.setState({
          loading: false,
          dataSource: responseJson
      })
  })
  .catch(error => console.log(error));
  };
  
  
  static httpGet(apiMethod = "",apiUrl='', headers = Constants.headers.set('' , ''), parameters = [String=any]){
    fetch(apiUrl, {
                method: apiMethod,
                headers:headers,
                body: parameters
            }).then(response => response.json())
  .then((responseJson) => {
     if (responseJson.RESPONSE_CODE === 200){

    }else{
        
        
      }
      this.setState({
          loading: false,
          dataSource: responseJson
      })
  })
  .catch(error => console.log(error));
  };
 }