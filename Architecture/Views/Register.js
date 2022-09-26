import React, { Component } from "react";
import  {crashlytics, firebase } from "@react-native-firebase/crashlytics";
import { StyleSheet, Text, View,TextInput,Button,Image,Alert,TouchableHighlight,
    StatusBar, SafeAreaView, TouchableOpacity,Dimensions,ScrollView, FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {useState, useEffect} from "react";
import CheckBox from 'react-native-check-box';
import { Dropdown } from 'react-native-material-dropdown-v2-fixed';
import {NetworkInfo} from 'react-native-network-info'; 
import * as ImagePicker from "react-native-image-picker"
import MultiSelect from 'react-native-multiple-select';
import Modal from "react-native-modal";
import RegisterViewModel from "../ViewModels/RegisterViewModel";
import MaterialCommunityIcons from 'react-native-vector-icons/FontAwesome';
import VehicleViewModel from "../ViewModels/VehicleViewModel";
import ImgToBase64 from 'react-native-image-base64';
import Loader from "./Loader";
import SelectMultiple from 'react-native-select-multiple'; 

const { width } = Dimensions.get("window");
const data = [{value:'5 miles', id: 0},
      {value:'10 miles',id: 1},{value:'25 miles', id: 3},{value:'50 miles', id: 4}];
// const data = [{value:'0.5', id: 0},
//       {value:'1',id: 1},  {value:'1.5',id: 2},  {value:'2',id: 3}, {value:'2.5', id: 4}, {value:'3', id: 5},
//       {value:'3.5', id: 6},{value:'4', id: 7},{value:'4.5', id: 8},{value:'5', id: 9},{value:'5.5', id: 10},
//       {value:'6', id: 11},{value:'6.5', id: 12},{value:'7', id: 13},{value:'7.5', id: 14},{value:'8', id: 15},
//       {value:'8.5', id: 16},{value:'9', id: 17},{value:'9.5', id: 18},{value:'10', id: 19},{value:'10.5', id: 20},
//       {value:'11', id: 21},{value:'11.5', id: 22},{value:'12', id: 23},{value:'12.5', id: 24},{value:'13', id: 25},
//       {value:'13.5', id: 26},{value:'14', id: 27},{value:'14.5', id: 28},{value:'15', id: 29},{value:'15.5', id: 30},
//       {value:'16', id: 31},{value:'16.5', id: 32},{value:'17', id: 33},{value:'17.5', id: 34},{value:'18', id: 35},
//       {value:'18.5', id: 36},{value:'19', id: 37},{value:'19.5', id: 38},{value:'20', id: 39},{value:'20.5', id: 40},
//       {value:'21', id: 41},{value:'21.5', id: 42},{value:'22', id: 43},{value:'22.5', id: 44},{value:'23', id: 45},
//       {value:'23.5', id: 46},{value:'24', id: 47},{value:'24.5', id: 48},{value:'25', id: 49}];
const item = [];
    const items = [
      {"created_on":"2021-09-18 14:18:45",
    "id":"7",
    "service_image":"http://3.210.84.236/staging/uploads/services/",
    "name":"services 2",
    "service_status":"Disabled",
    "check":false,
 },
 {
    "created_on":"2021-10-11 17:46:03",
    "id":"8",
    "service_image":"http://3.210.84.236/staging/uploads/services/service_8.png",
    "name":"Brakes",
    "service_status":"Enabled",
    "check":false,
 },
 {
    "created_on":"2021-10-11 17:48:08",
    "id":"9",
    "service_image":"http://3.210.84.236/staging/uploads/services/service_9.png",
    "name":"Brake",
    "service_status":"Enabled",
    "check":false,
 },
 {
    "created_on":"2021-10-11 17:48:42",
    "id":"10",
    "service_image":"http://3.210.84.236/staging/uploads/services/",
    "name":"Mandrake Linux",
    "service_status":"Disabled",
    "check":false,
 },
 {
    "created_on":"2021-10-11 17:48:52",
    "id":"11",
    "service_image":"http://3.210.84.236/staging/uploads/services/",
    "name":"Linux",
    "service_status":"Disabled",
    "check":false,
 },
 {
    "created_on":"2021-10-18 09:53:27",
    "id":"12",
    "service_image":"http://3.210.84.236/staging/uploads/services/",
    "name":"Brakeing",
    "service_status":"Disabled",
    "check":false,
 },
 {
    "created_on":"2021-10-18 09:55:33",
    "id":"13",
    "service_image":"http://3.210.84.236/staging/uploads/services/service_13.png",
    "name":"test service",
    "service_status":"Enabled",
    "check":false,
 },
 {
    "created_on":"2021-10-18 09:55:33",
    "id":"0",
    "service_image":"http://3.210.84.236/staging/uploads/services/service_13.png",
    "name":"other",
    "service_status":"Enabled",
    "check":false,
 }
  ];

// const fruits = ['Apples', 'Oranges', 'Pears']
// const checkValue = "";
      
export default class Register extends Component
{
 
 validate = (text) => {
   console.log(text);
   let reg = /^\w+([\.\+\£\&\^\*\%\@\!-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3,4})+$/;
   if (reg.test(text) === false) {
     console.log('Email is Not Correct');
     this.setState({email: text});
     return false;
   } else {
     this.setState({email: text});
     console.log('Email is Correct');
   }
 };
 validateFirstName = (text) =>{
   console.log(text);
   let reg = /^[a-zA-Z ]{0,40}([a-zA-Z ]{0,40})+$/;
   if (reg.test(text) === false) {
     console.log('First Name is Not Correct');
     this.setState({firstName: text});
     return false;
   } else {
     this.setState({firstName: text});
     console.log('First Name is Correct');
   }
 };
 validateLastName = (text) =>{
   console.log(text);
   let reg = /^[a-zA-Z ]{0,40}([a-zA-Z ]{0,40})+$/;
   if (reg.test(text) === false) {
     console.log('Last Name is Not Correct');
     this.setState({lastName: text});
     return false;
   } else {
     this.setState({lastName: text});
     console.log('Last Name is Correct');
   }
 };
 Show_Alert_Boxt(visible) {
  this.setState({show_alert: visible});
 }
validatePassword = (text) => {
  var regularExpression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  console.log(text);
  if (regularExpression.test(text) === false) {
    console.log('Password is not correct');
    this.setState({password: text});
    return false;
  } else {
    console.log('Password is correct');
    this.setState({password: text});
  }
};
 validateAddress = (text) =>{
   console.log(text);
   let reg = /^[#.0-9a-zA-Z\s,-]+$/;
  //  let reg = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g;
   if (reg.test(text) === false) {
     console.log('Address is Not Correct');
     this.setState({address: text});
     return false;
   } else {
     this.setState({address: text});
     console.log('Address is Correct');
   }
 };
 validateCity = (text) =>{
   console.log(text);
   let reg = /^[#.0-9a-zA-Z\s,-]+$/;
   if (reg.test(text) === false) {
     console.log('City is Not Correct');
     this.setState({city: text});
     return false;
   } else {
     this.setState({city: text});
     console.log('City is Correct');
   }
 };
 validateState = (text) =>{
   console.log(text);
   let reg = /^[#.0-9a-zA-Z\s,-]+$/;
   if (reg.test(text) === false) {
     console.log('State is Not Correct');
     this.setState({state: text});
     return false;
   } else {
     this.setState({state: text});
     console.log('State is Correct');
   }
 };
 validateZipCode = (text) =>{
   console.log(text);
  //  let reg = /^[#.0-9a-zA-Z\s,-]+$/; 
   let reg = /^[0-9]{5}(?:-[0-9]{4})?$/;
   if (reg.test(text) === false) {
     console.log('ZipCode is Not Correct');
     this.setState({zipCode: text});
     return false;
   } else {
     this.setState({zipCode: text});
     console.log('ZipCode is Correct');
   }
 };
 validateSkill = (text) =>{
   console.log(text);
   let reg = /^[a-zA-Z ]{2,40}([a-zA-Z ]{2,40})+$/;
   if (reg.test(text) === false) {
     console.log('Skill is Not Correct');
     this.setState({skill: text});
     return false;
   } else {
     this.setState({skill: text});
     console.log('Skill is Correct');
   }
 };
 validateOtherServices = (text) =>{
   console.log(text);
   let reg = /^[a-zA-Z ]{2,40}([a-zA-Z ]{2,40})+$/;
   if (reg.test(text) === false) {
     console.log('Other services is not correct');
     this.setState({otherServices: text});
     return false;
   } else {
     this.setState({otherServices: text});
     console.log('Other services is Correct');
   }
 };
 validatePhone = (text) =>{
   console.log(text);
   let reg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (reg.test(text) === false) {
     console.log('Mobile number is Not Correct');
     this.setState({phone: text});
     return false;
   } else {
     this.setState({phone: text});
     console.log('Mobile Number is Correct');
   }
 };
 validateHrlyRate = (text) => {
  console.log(text);
  let reg = /^(\d+(\.\d{0,2})?|\.?\d{1,2})$/;
  if (reg.test(text) === false) {
    console.log('Hourly rate is Not Correct');
    this.setState({hrlyRate: text});
    return false;
  } else {
    this.setState({hrlyRate: text});
    console.log('Hourly rate is Correct');
  }
};
 onClickRadiusListener = (id) => {
   const elementsIndex = data.findIndex(
     (element) => element.value == id,
   );
    const selectedAreaId = data[elementsIndex].value;
    this.setState({radius: selectedAreaId});
   console.log('Radius : ', selectedAreaId);
 };
 onSelectedItemsChange = selectedItems => {
   this.setState({selectedItems});
   this.setState({services : selectedItems });
   console.log('Services : ', this.state.services);
   console.log('Selected Items : ', selectedItems);
   console.log('Other item : ', selectedItems.includes("0"));
 };

 Show_Custom_Alert(visible) {

   this.setState({Alert_Visibility: visible});
   
 }
 constructor(props) {
   super(props);
   
   state = {
     name:'',
     area:'',
     email:'',
     phone:'',
     token:'',
     
     Alert_Visibility:false,
  
     mCountryCode: '91',
   
       filepath: {
         data: '',
         uri: ''
       },
       fileData: '',
       fileUri: '',
       loading:false,
     
   }

   RegisterViewModel.AvailableServicesAPI().then(
     (response,error) => {
       console.log('AVALIABLESREVICES<>< ><><> <><><> ',response)
       if (response.RESPONSE_CODE == 200){
          this.setState({ item:response.RESPONSE_DATA }) //another array
          // this.setState(prevState => ({
          //  item: [...prevState.item, {"service_id":"0",
          //      "service_name": "Other"
          //      }]
          //  }))
         console.log('Updated skills list : ',this.state.skills)
          this.setState({
           serviceList:response.RESPONSE_DATA
         })
          console.log("ServicesList : ",this.state.item)
       }else{
        alert('Something went wrong, please try again');
       }
    }
   );
 }
 state={
  first_stp_register:true,
  second_step_register:false,
  third_step_register:false,
  fourth_step_register:false,
  show_alert:false,
  alert_message:"",
   serviceList:[],
   selectedItems : [],
   item : [],
   checkArray:[
       {
         id: 1,
         check:false
       },
       {
         id: 2,
         check:false
       },
       {
         id: 3,
         check:false
       },
   ],
   user:true,
   mechanic:false,
   skill:'',
   imageBase64:'',
   privacyPolicy:false,
     firstNamePlaceholder:'First Name',
     lastNamePlaceholder:'Last Name',
     areaPlaceholder:'Area',
     emailPlaceholder:'Email',
     phonePlaceholder:'Phone',
     addressPlaceholder:'Address',
     cityPlaceholder:'City',
     statePlaceholder:'State',
     zipCodePlaceholder:'Zip Code',
     skillsPlaceholder:'Skills',
     radiusPlaceholder:'How far from your home will you work?',
     otherSkillsPlaceholder:'Other services',
     connectMeText:'SIGN UP',
     firstName:'',
     lastName:'',
     area:'',
     email:'',
     address:'',
     password:'',
     city:'',
     current_address:'',
     radius:'',
     phone:'',
     selectedArea:'',
     loading:false,
     Alert_Visibility:false,
     state:'',
     zipCode:'',
     services:[],
     otherServices:'',
     selectedServiceData:[],
     selectedIDS:"",
     selectedFruits: [],
     hrlyRate : '',
 }

  // renderLabel(name,image,check,serviceid, style){
  //   return (
  //     <View style={{flexDirection: 'row', alignItems: 'center'}}>
  //       <Image style={{width: 42, height: 42}} source={{uri: 'https://dummyimage.com/100x100/52c25a/fff&text=S'}} />
  //       <View style={{marginLeft: 10}}>
  //         <Text style={style}>{name}</Text>
  //       </View>
  //     </View>
  //   )
  // }
 checkService(name,image,check,serviceid)
      { 
      console.log('service selected : ', check)
      if(check==true)
      {
        return( 
            <View style={styles.cardSelectedContainer}>
            <View style={{flexDirection: 'row',justifyContent: 'center',
            alignItems: 'center',width:'90%',borderBottomColor: '#818EB7',
            borderBottomWidth: 1,
            flex:1}}>
                  
                  <Text style={{ color: 'white',
                //  textTransform:'uppercase',
              fontWeight:'bold',
              fontSize:18,
              marginLeft:10,
            alignItems: 'center', 
            flex:1,
              }}>{name}</Text>
        <TouchableOpacity
                    style={styles.radioCircle}
                  >
                    {check === true && <View style={{width: 15,height: 15, borderRadius: 50,backgroundColor: '#FDD248',}} />}
                  </TouchableOpacity>
                                </View>
        </View>)
      }
      else{
        return( 
            <View style={styles.cardContainer}>
            <View style={{flexDirection: 'row',justifyContent: 'center', //Centered horizontally
            alignItems: 'center', borderBottomColor: '#818EB7',
            borderBottomWidth: 1,
            flex:1}}> 
            <Text style={{color: 'white',
              fontWeight:'bold',
              fontSize:18,
              marginLeft:10,
            alignItems: 'center',
            flex:1,
              }}>{name}</Text>
            <View
                    style={styles.radioCircle}
            >
            </View>
            </View>
        </View>)
      }
      } 

  handleCheckBox = () => this.setState({ termsAccepted: !this.state.termsAccepted })

  onClickPreButton(page){
   if(page==2)
   {
    this.setState({ first_stp_register: true,
        second_step_register: false,
        third_step_register: false,
        fourth_step_register: false, })
   }
   else if(page==3)
   {
   this.setState({ first_stp_register: false,
        second_step_register: true,
        third_step_register: false,
        fourth_step_register: false, })
   }
   else if(page==4)
   {
   this.setState({ first_stp_register: false,
        second_step_register: false,
        third_step_register: true,
        fourth_step_register: false, })
   }
}
  onClickNextButton(page){
    if (page == 1){
      let frstNameReg = /^[a-zA-Z ]{0,40}([a-zA-Z ]{0,40})+$/;
      let lstNameReg = /^[a-zA-Z ]{0,40}([a-zA-Z ]{0,40})+$/;
      // let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3,4})+$/;
      let emailReg = /^\w+([\.\+\£\&\^\*\%\@\!-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3,4})+$/;
      // let pswdReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.[!@#$%^&])(?=.{8,})$/;
      let pswdReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
      if (this.state.firstName === '') {
         alert('Please enter first name.');
          // this.setState({ show_alert: true,
          //   alert_message: "Please enter first name.",
          //   })
          return false;
        } 
        else  if (frstNameReg.test(this.state.firstName) === false) {
          console.log('First Name is not correct');
          // this.setState({ show_alert: true,
          //   alert_message: "First Name is not valid.",
          //   })
         alert('First Name is not valid');
          return false;
        }
        else  if (this.state.lastName === '') {
         alert('Please enter last name');
          // this.setState({ show_alert: true,
          //   alert_message: "Please enter last name.",
          //   })
          return false;
        } 
        else  if (lstNameReg.test(this.state.lastName) === false) {
          // this.setState({ show_alert: true,
          //   alert_message: "Last Name is not valid.",
          //   })
          console.log('Last Name is not correct');
         alert('Last Name is not valid');
          return false;
        }
        else  if (this.state.email === '') {
          // this.setState({ show_alert: true,
          //   alert_message: "Please enter email.",
          //   })
         alert('Please enter email');
          return false;
        }
        else  if (emailReg.test(this.state.email) === false) {
          // this.setState({ show_alert: true,
          //   alert_message: "Email is not valid.",
          //   })
          console.log('Email is not correct');
         alert('Email is not valid');
          return false;
        }
       else  if (this.state.password === '') {
          // this.setState({ show_alert: true,
          //   alert_message: "Please enter password.",
          //   })
          alert('Please enter password');
          return false;
        }
        else  if (pswdReg.test(this.state.password) === false) {
          // this.setState({ show_alert: true,
          //   alert_message: "Password must contain atleast 1 lowercase alphabet, 1 uppercase alphabet, 1 numeric, 1 special character, and also must be eight characters or longer.",
          // })
          alert('Password must contain atleast 1 lowercase alphabet, 1 uppercase alphabet, 1 numeric, 1 special character, and also must be 8 characters or longer.');
          return false;
        }else{
          let user_type = "";
          if(this.state.user)
          {
            user_type = "client"
          }else{
            user_type = "mechanic"
          }
          var email=this.state.email;
          RegisterViewModel.onCheckEmailExistAction(email,user_type).then(
            (response,error) => {
              //get callback here
              console.log('Output',response)
              if (response.RESPONSE_CODE == 200){
                if(page==1)
              {
                this.setState({ first_stp_register: false,
                    second_step_register: true,
                    third_step_register: false,
                    fourth_step_register: false, })
              }
              else if(page==2)
              {
                this.setState({ first_stp_register: false,
                    second_step_register: false,
                    third_step_register: true,
                    fourth_step_register: false, })
              }
              else if(page==3)
              {
              this.setState({ first_stp_register: false,
                    second_step_register: false,
                    third_step_register: false,
                    fourth_step_register: true, })
              }
              }else if (response.RESPONSE_CODE == 4307){
                alert(response.RESPONSE_MESSAGE);
              }else{
                alert('Something went wrong, please try again');
              }
           }
          );
        }
    }else if (page == 2){
      let phoneReg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
      // let addressReg = /^[a-zA-Z ]{2,40}([a-zA-Z ]{2,40})+$/;^[#.0-9a-zA-Z\s,-]+$
      // let addressReg = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=.:,_-]+$/g;
      let addressReg = /^[#.0-9a-zA-Z\s,-]+$/;
      let cityReg = /^[#.0-9a-zA-Z\s,-]+$/;
      let stateReg = /^[#.0-9a-zA-Z\s,-]+$/;
      // let zipCodeReg = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
      let zipCodeReg = /^[0-9]{5}(?:-[0-9]{4})?$/;

      if (this.state.phone === '') {
        // this.setState({ show_alert: true,
        //   alert_message: "Please enter phone.",
        //   })
       alert('Please enter phone');
        return false;
      }
      else  if (phoneReg.test(this.state.phone) === false) {
        // this.setState({ show_alert: true,
        //   alert_message: "Phone number is not valid.",
        //   })
        console.log('Phone number is not correct');
       alert('Phone number is not valid');
        return false;
      }
      else  if (this.state.address === '') {
        // this.setState({ show_alert: true,
        //   alert_message: "Please enter address.",
        //   })
        alert('Please enter address');
        return false;
      }
      else  if (addressReg.test(this.state.address) === false) {
        // this.setState({ show_alert: true,
        //   alert_message: "Address is not correct.",
        //   })
        console.log('Address is not correct');
       alert('Address is not valid');
        return false;
      }
      else  if (this.state.city === '') {
        // this.setState({ show_alert: true,
        //   alert_message: "Please enter city.",
        //   })
       alert('Please enter city');
        return false;
      }
      else  if (cityReg.test(this.state.city) === false) {
        console.log('City is not correct');
        // this.setState({ show_alert: true,
        //   alert_message: "City is not correct.",
        //   })
       alert('City is not valid');
        return false;
      }
      else  if (this.state.state === '') {
        // this.setState({ show_alert: true,
        //   alert_message: "Please enter state.",
        //   })
       alert('Please enter state');
        return false;
      }
      else  if (stateReg.test(this.state.state) === false) {
        console.log('State is not correct');
        // this.setState({ show_alert: true,
        //   alert_message: "State is not valid.",
        //   })
       alert('State is not valid');
        return false;
      }
      else  if (this.state.zipCode === '') {
        // this.setState({ show_alert: true,
        //   alert_message: "Please enter zipcode.",
        //   })
        alert('Please enter zipcode');
        return false;
      }
      else  if (zipCodeReg.test(this.state.zipCode) === false) {
        console.log('Please check ZipCode, the expected format is xxxxx and xxxxx-xxxx');
        // this.setState({ show_alert: true,
        //   alert_message: "ZipCode is not valid.",
        //   })
       alert('Please check ZipCode, the expected format is xxxxx and xxxxx-xxxx');
        return false;
      }else{
        if(page==1)
         {
          this.setState({ first_stp_register: false,
              second_step_register: true,
              third_step_register: false,
              fourth_step_register : false, })
         }
         else if(page==2)
         {
          this.setState({ first_stp_register: false,
              second_step_register: false,
              third_step_register: true,
              fourth_step_register : false, })
         }
         else if(page==3)
         {
         this.setState({ first_stp_register: false,
              second_step_register: false,
              third_step_register: false,
              fourth_step_register : true, })
         }
      }
    }else if(page == 3){
      let desReg = /^\w(\w(\.{1}|\s{1})?)+\w$/;
      let hrRateRegex = /^(\d+(\.\d{0,2})?|\.?\d{1,2})$/;
      if (this.state.skill === '') {
       alert('Please enter self decription');
        return false;
      }
      else if(desReg.test(this.state.skill) === false) {
        console.log('self decription is not correct');
       alert('Self decription is not valid');
        return false;
      }else if(this.state.hrlyRate === ''){
        alert('Please enter hourly rate');
        return false;
      }else if(hrRateRegex.test(this.state.hrlyRate) === false){
        alert('Self decription is not valid');
        return false;
      }else if(this.state.radius === ''){
        alert('Please choose radius');
        return false;
      }else{
        if(page==1)
         {
          this.setState({ first_stp_register: false,
              second_step_register: true,
              third_step_register: false,
              fourth_step_register : false, })
         }
         else if(page==2)
         {
          this.setState({ first_stp_register: false,
              second_step_register: false,
              third_step_register: true,
              fourth_step_register : false, })
         }
         else if(page==3)
         {
         this.setState({ first_stp_register: false,
              second_step_register: false,
              third_step_register: false,
              fourth_step_register : true, })
         }
      }
    }else{

    }
  }

  onClickRegisterListener(){
    this.setState({loading: true});
   const NetInfo = require("@react-native-community/netinfo"); 
   NetInfo.fetch().then(state => {
   if (state.isConnected == true) {

     let frstNameReg = /^[a-zA-Z ]{0,40}([a-zA-Z ]{0,40})+$/;
     let lstNameReg = /^[a-zA-Z ]{0,40}([a-zA-Z ]{0,40})+$/;
    //  let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3,4})+$/;
     let emailReg = /^\w+([\.\+\£\&\^\*\%\@\!-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3,4})+$/;
     let pswdReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
     let phoneReg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
     // let addressReg = /^[a-zA-Z ]{2,40}([a-zA-Z ]{2,40})+$/;
     let addressReg = /^[#.0-9a-zA-Z\s,-]+$/;
     let cityReg = /^[#.0-9a-zA-Z\s,-]+$/;
     let stateReg = /^[#.0-9a-zA-Z\s,-]+$/;
     let zipCodeReg = /^[0-9]{5}(?:-[0-9]{4})?$/;
     let hrRateRegex = /^(\d+(\.\d{0,2})?|\.?\d{1,2})$/;
    
     if (this.state.firstName === '') {
        alert('Please enter first name.');
        //  this.setState({ show_alert: true,
        //    alert_message: "Please enter first name.",
        //    })
        this.setState({loading: false});
         return false;
       } 
       else  if (frstNameReg.test(this.state.firstName) === false) {
         console.log('First Name is not correct');
        //  this.setState({ show_alert: true,
        //    alert_message: "First Name is not valid.",
        //    })
        alert('First Name is not valid');
        this.setState({loading: false});
         return false;
       }
       else  if (this.state.lastName === '') {
        alert('Please enter last name');
        //  this.setState({ show_alert: true,
        //    alert_message: "Please enter last name.",
        //    })
        this.setState({loading: false});
         return false;
       } 
       else  if (lstNameReg.test(this.state.lastName) === false) {
        //  this.setState({ show_alert: true,
        //    alert_message: "Last Name is not valid.",
        //    })
         console.log('Last Name is not correct');
        alert('Last Name is not valid');
        this.setState({loading: false});
         return false;
       }
       else  if (this.state.email === '') {
        //  this.setState({ show_alert: true,
        //    alert_message: "Please enter email.",
        //    })
        alert('Please enter email');
        this.setState({loading: false});
         return false;
       }
       else  if (emailReg.test(this.state.email) === false) {
        //  this.setState({ show_alert: true,
        //    alert_message: "Email is not valid.",
        //    })
         console.log('Email is not correct');
        alert('Email is not valid');
        this.setState({loading: false});
         return false;
       }
       else  if (this.state.phone === '') {
        //  this.setState({ show_alert: true,
        //    alert_message: "Please enter phone.",
        //    })
        alert('Please enter phone');
        this.setState({loading: false});
         return false;
       }
       else  if (phoneReg.test(this.state.phone) === false) {
        //  this.setState({ show_alert: true,
        //    alert_message: "Phone number is not valid.",
        //    })
         console.log('Phone number is not correct');
        alert('Phone number is not valid');
        this.setState({loading: false});
         return false;
       }
       else  if (this.state.password === '') {
        //  this.setState({ show_alert: true,
        //    alert_message: "Please enter password.",
        //    })
         alert('Please enter password');
         this.setState({loading: false});
         return false;
       }
       else  if (pswdReg.test(this.state.password) === false) {
        //  this.setState({ show_alert: true,
        //    alert_message: "Password is not valid.",
        //    })
         console.log('Password is not correct');
         alert('Password is not valid');
         this.setState({loading: false});
         return false;
       }
       else  if (this.state.address === '') {
        //  this.setState({ show_alert: true,
        //    alert_message: "Please enter address.",
        //    })
         alert('Please enter address');
         this.setState({loading: false});
         return false;
       }
       else  if (addressReg.test(this.state.address) === false) {
        //  this.setState({ show_alert: true,
        //    alert_message: "Address is not correct.",
        //    })
         console.log('Address is not correct');
        alert('Address is not valid');
        this.setState({loading: false});
         return false;
       }
       else  if (this.state.city === '') {
        //  this.setState({ show_alert: true,
        //    alert_message: "Please enter city.",
        //    })
        alert('Please enter city');
        this.setState({loading: false});
         return false;
       }
       else  if (cityReg.test(this.state.city) === false) {
         console.log('City is not correct');
        //  this.setState({ show_alert: true,
        //    alert_message: "City is not correct.",
        //    })
        alert('City is not valid');
        this.setState({loading: false});
         return false;
       }
       else  if (this.state.state === '') {
        //  this.setState({ show_alert: true,
        //    alert_message: "Please enter state.",
        //    })
        alert('Please enter state');
        this.setState({loading: false});
         return false;
       }
       else  if (stateReg.test(this.state.state) === false) {
         console.log('State is not correct');
        //  this.setState({ show_alert: true,
        //    alert_message: "State is not valid.",
        //    })
        alert('State is not valid');
        this.setState({loading: false});
         return false;
       }
       else  if (this.state.zipCode === '') {
        //  this.setState({ show_alert: true,
        //    alert_message: "Please enter zipcode.",
        //    })
         alert('Please enter zipcode');
         this.setState({loading: false});
         return false;
       }
       else  if (zipCodeReg.test(this.state.zipCode) === false) {
         console.log('Please check ZipCode, the expected format is xxxxx and xxxxx-xxxx');
        //  this.setState({ show_alert: true,
        //    alert_message: "ZipCode is not valid.",
        //    })
 
        alert('Please check ZipCode, the expected format is xxxxx and xxxxx-xxxx');
        this.setState({loading: false});
         return false;
       }
     else{
      //  if(this.state.termsAccepted === true){
   if(this.state.user)
   { 
     var firstName = this.state.firstName;
     var lastName = this.state.lastName;
     var email=this.state.email;
     var phone=this.state.phone;
     var password=this.state.password;
     var address=this.state.address;
     var city=this.state.city;
     var state = this.state.state;
     var zip = this.state.zipCode;
     var profileImg = this.state.fileUri;
     console.log("address<><>: ",address);
     // RegisterViewModel.RegisterClientAPI(name,email,phone,password,address);
     RegisterViewModel.onClientRegistration(firstName,lastName,email,phone,password,
       address,city,zip,state,this.state.imageBase64).then(
       (response,error) => {
         //get callback here
         console.log('Output',response)
         if (response.RESPONSE_CODE == 200){
          this.setState({loading: false});
           alert('you have successfully registered. please login');
           this.props.navigation.navigate('App');
         }else if (response.RESPONSE_CODE == 1104){
          this.setState({loading: false});
          alert('Please check first name entered');
        }else if (response.RESPONSE_CODE == 1105){
          this.setState({loading: false});
          alert('Please check last name entered');
        }else if (response.RESPONSE_CODE == 1106){
          this.setState({loading: false});
          alert('Please check phone number entered');
        }else if (response.RESPONSE_CODE == 1107){
          this.setState({loading: false});
          alert('Please check email entered');
        }else if (response.RESPONSE_CODE == 1108){
          this.setState({loading: false});
           alert('Please check the password entered, It must be minimum 8 characters, 1 uppercase , 1 lowercase, 1 numeric and 1 special chanracter');
         }else if (response.RESPONSE_CODE == 1109){
          this.setState({loading: false});
          alert('Please check address entered');
        }else if (response.RESPONSE_CODE == 1110){
          this.setState({loading: false});
          alert('Please check city entered');
        }else if (response.RESPONSE_CODE == 1111){
          this.setState({loading: false});
          alert('Please check state entered');
        }else if (response.RESPONSE_CODE == 1112){
          this.setState({loading: false});
          alert('Please check zip code entered');
        }else if (response.RESPONSE_CODE == 1114){
          this.setState({loading: false});
          alert('Email already registered');
        }else{
          this.setState({loading: false});
           alert('Something went wrong, please try again');
         }
      }
     );
   }else{
    if (this.state.services.length == 0) {
      alert('Please select atleast one service');
      this.setState({loading: false});
       return false;
     }else {
     var firstName = this.state.firstName;
     var lastName = this.state.lastName;
     var email=this.state.email;
     var phone=this.state.phone;
     var password=this.state.password;
     var address=this.state.address;
     var city=this.state.city;
     var state = this.state.state;
     var zip = this.state.zipCode;
     var skill=this.state.skill;
     var radius = this.state.radius;
     var profileImg = this.state.fileUri;
     var serviceStr = this.state.services.toString();
     var otherService =  this.state.otherServices;
     var hrsRate = this.state.hrlyRate;
     RegisterViewModel.onMechanicRegistration(firstName,lastName,email,phone,password,
       address,city,state,zip,skill,this.state.imageBase64,radius,serviceStr,otherService,hrsRate).then(
       (response,error) => {
         //get callback here
         console.log('Output',response)
         if (response.RESPONSE_CODE == 200){
          this.setState({loading: false});
          //  alert('you have successfully registered. please login');
           console.log('register response : ', response.RESPONSE_DATA[0]);
           alert(response.RESPONSE_DATA.user_status);
           this.props.navigation.navigate('App');
         }else if (response.RESPONSE_CODE == 1204){
          this.setState({loading: false});
          alert('First Name should not be empty');
        }else if (response.RESPONSE_CODE == 1205){
          this.setState({loading: false});
          alert('Phone should not be empty');
        }else if (response.RESPONSE_CODE == 1206){
          this.setState({loading: false});
          alert('Email should not be empty');
        }else if (response.RESPONSE_CODE == 1207){
          this.setState({loading: false});
          alert('Password should not be empty');
        }else if (response.RESPONSE_CODE == 1208){
          this.setState({loading: false});
          alert('Address should not be empty');
        }else if (response.RESPONSE_CODE == 1209){
          this.setState({loading: false});
          alert('City should not be empty');
        }else if (response.RESPONSE_CODE == 1210){
          this.setState({loading: false});
          alert('State should not be empty');
        }else if (response.RESPONSE_CODE == 1211){
          this.setState({loading: false});
          alert('Zip Code should not be empty');
        }else if (response.RESPONSE_CODE == 1212){
          this.setState({loading: false});
          alert('Current Location should not be empty');
        }else if (response.RESPONSE_CODE == 1213){
          this.setState({loading: false});
          alert('Profile Pic should not be empty');
        }else if (response.RESPONSE_CODE == 1215){
          this.setState({loading: false});
          alert('Email already registered');
        }else if (response.RESPONSE_CODE == 1216){
          this.setState({loading: false});
          alert('One service should be selected');
        }else if (response.RESPONSE_CODE == 1217){
          this.setState({loading: false});
          alert('Skills should not be empty');
        }else if (response.RESPONSE_CODE == 1218){
          this.setState({loading: false});
          alert('Service radius should not be empty');
        }else if (response.RESPONSE_CODE == 1219){
          this.setState({loading: false});
          alert('Last Name should not be empty');
        }else{
          this.setState({loading: false});
           alert('Something went wrong, please try again');
         }
      }
     );
    }
   }
//  }else{
//      alert("Please accept terms and condition")
//    }
 }
 }else{
   alert("Please check your internet connection")
 }
 });
 };

 onClickLoginButton(){
     this.props.navigation.navigate('App');
 }

  loginButtonClicked = () => { 
    this.setState({loading:true});
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3,4})+$/;
    var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (this.state.email === '') {
      alert('Please enter email address');
      return false;
    } 
    else  if (reg.test(this.state.email) === false) {
      console.log('Email is not correct');
      alert('Email is not valid');
      return false;
    } 
    else  if (this.state.password === '') {
      alert('Please enter password');
      return false;
    }
    else {
     
    console.log("check value"," "+this.state.privacyPolicy+"  checkvalue ")
    
    }
  };
  launchCamera = () => {
   this.setState({Alert_Visibility: false});
   console.log('capture cammera = ');
   let options = {
     storageOptions: {
       skipBackup: true,
       path: 'images',
     },
     maxWidth: 150,
     maxHeight: 150,
     quality: 0.5,
   };
   ImagePicker.launchCamera(options, (response) => {
    // console.log('Response = ', response);
     console.log('Uri', response );
     if (response.didCancel) {
       console.log('User cancelled image picker');
     } else if (response.error) {
       console.log('ImagePicker Error: ', response.error);
     } else if (response.customButton) {
       console.log('User tapped custom button: ', response.customButton);
       alert(response.customButton);
     } else {
       const source = { uri:response.assets[0].uri  };
       console.log('response', JSON.stringify(response));
       this.setState({
         filePath: response,
         fileData: response.assets[0].data,
         fileUri: response.assets[0].uri 
       });

        
     //  ImgToBase64.getBase64String(this.state.fileUri)
     // .then(base64String =>  this.setState({
     //   imageBase64:base64String
     //   }))
     // .catch(); 
     ImgToBase64.getBase64String(this.state.fileUri)
     .then(base64String => {
      
       this.setState({ imageBase64 : base64String})
     })
     .catch(err => console.log('Base64 String error : ',err));
 
     }
   });

 }
 userPressed(){
  this.state.firstName = '',
  this.state.lastName='',
  this.state.email='',
  this.state.password='',

  this.state.phone='',
  this.state.address='',
  this.state.city='',
  this.state.state='',
  this.state.zipCode='',
  
   this.setState({
       first_stp_register:true,
       second_step_register: false,
       third_step_register: false,
       fourth_step_register: false,
      }) 
   this.setState({
     user:true,
     mechanic: false,
   
   })
 }
   mechanicPressed(){
    this.state.firstName = '',
    this.state.lastName='',
    this.state.email='',
    this.state.password='',

    this.state.phone='',
    this.state.address='',
    this.state.city='',
    this.state.state='',
    this.state.zipCode='',

    this.state.skill='',
    this.state.radius='',
    this.state.otherServices='',
 
      this.setState({
               first_stp_register:true,
               second_step_register: false,
               third_step_register: false,
               fourth_step_register: false,
              })       
     this.setState({
       user:false,
       mechanic: true,
      })
   }
 chooseImage = () => {
   let options = {
     storageOptions: {
       skipBackup: true,
       path: 'images',
     },
     maxWidth: 150,
     maxHeight: 150,
     quality: 0.5,
   };
   ImagePicker.launchImageLibrary(options, (response) => {
     console.log('Response = uti',  response.assets[0].uri );
     if(!response.didCancel)    
     {    
       if ( response.assets[0].didCancel) {
         console.log('User cancelled image picker');
       } else if ( response.assets[0].error) {
         console.log('ImagePicker Error: ',  response.assets[0].error);
       } else if ( response.assets[0].customButton) {
         console.log('User tapped custom button: ',  response.assets[0].customButton);
         alert( response.assets[0].customButton);
       } else {
         const source = { uri:  response.assets[0].uri };
         console.log('response', JSON.stringify(response));
         this.setState({
           filePath: response,
           fileData:  response.assets[0].data,
           fileUri:  response.assets[0].uri
         });
         ImgToBase64.getBase64String(this.state.fileUri)
         .then(base64String => {
           
           this.setState({ imageBase64 : base64String})
         })
         .catch(err => console.log('Base64 String error : ',err));
       }
       this.Show_Custom_Alert(false) 
     }
  
   });
 }

 removeImage = () => {
  this.setState({
    filePath: "",
    fileData: "",
    fileUri:  "",
    imageBase64 : ""
  });
  this.Show_Custom_Alert(false)
}
 renderFileUri() {
   console.log('fileUri',""+this.state.fileUri);
   if (this.state.fileUri) {
     return <TouchableOpacity onPress={() => { this.Show_Custom_Alert(true) }}><Image
       source={{ uri: this.state.fileUri }}
       style={{width: 150, height: 150,borderRadius: 150/ 2} } 
     />
       {/* <Image
    source={require('../assets/logo1.png')}
     style={{width: 30, height: 30,borderRadius: 30/ 2,alignSelf:"center",marginTop:-20} } 
   /> */}
     </TouchableOpacity>
   } else {
     //
     return<TouchableOpacity onPress={() => { this.Show_Custom_Alert(true) }}  >
     <Image
    //  source={{uri:"https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?b=1&k=20&m=1300845620&s=170667a&w=0&h=JbOeyFgAc6-3jmptv6mzXpGcAd_8xqkQa_oUK2viFr8="}}
     source={require('../assets/Profile.jpeg')}
    style={{width: 150, height: 150,borderRadius: 150/ 2} } 
   />
  
   </TouchableOpacity>      
  
   }
 }
 onSelectionsChange = (selectedFruits) => {
  // selectedFruits is array of { label, value }
  this.setState({ selectedFruits })
  console.log("Selected fruits : ", this.state.selectedFruits);
}
 render() {
    
  const { selectedItems } = this.state;
  let checkUser=this.state.user;
  let checkMchanic=this.state.mechanic;
  MaterialCommunityIcons.loadFont();
  
  const selectedServices = (index) => {
    const elementsIndex = this.state.item.findIndex(
      (element) => element.service_id == index,
    );
    let newArray = [...this.state.item];
    console.log('Index : ', elementsIndex);
    console.log('Array : ', newArray);
    let checkValue = "";
    if(elementsIndex > 0){
       checkValue=newArray[elementsIndex].check;
    }else{
       checkValue = false;
    }
    // const checkValue=newArray[elementsIndex].check;
    if(checkValue)
    {
      newArray[elementsIndex] = {
        ...newArray[elementsIndex],
        check: false,
      };
      if(this.state.selectedServiceData.length!=0)
      {
        for(var i=0;i< this.state.selectedServiceData.length;i++)
        {
          if(this.state.selectedServiceData[i]==newArray[elementsIndex].service_id)
          {
            this.state.selectedServiceData.splice(i, 1);
          }
          console.log( this.state.selectedServiceData[i]+"<><> "+newArray[elementsIndex].service_id);
        }
      }
      }
    else{
      newArray[elementsIndex] = {
        ...newArray[elementsIndex],
        check: true,
      };
      this.state.selectedServiceData.push( newArray[elementsIndex].service_id);
    }
    this.state.selectedIDS = this.state.selectedServiceData.map(item => item).join(', ');
    console.log( 'Selected serviceIds : ',this.state.selectedIDS);
    this.setState({services : this.state.selectedIDS });
    this.setState({
      item: newArray,
    });

  };
  



 return(
  <>
  <Loader loading={this.state.loading} />
 <SafeAreaView style={styles.maincontainer}>

<ScrollView >  

<View style={styles.container}>
   <Image
          style={{alignSelf:'center', marginTop:10, width:185, height : 160, borderRadius: 15}}
          source={require('../assets/logo1.png')}
          // source={{uri:imageUri}}
        />
 
        
<Modal

visible={this.state.Alert_Visibility}

transparent={true}

animationType={"fade"}

onRequestClose={ () => { this.Show_Custom_Alert(!this.state.Alert_Visibility)} } >


  <View style={{ flex:1, alignItems: 'center', justifyContent: 'center' }}>


      <View style={styles.Alert_Main_View}>


          <Text style={styles.Alert_Title}>Please Select</Text>


          <View style={{ width: '100%', height: 2, backgroundColor: '#fff'}} />

          <TouchableOpacity onPress={this.launchCamera}>
          <Text style={styles.Alert_Message}> Camera</Text>
          </TouchableOpacity>
          <View style={{ width: '100%', height: 2, backgroundColor: '#fff'}} />

          <TouchableOpacity  onPress={this.chooseImage}>
             <Text style={styles.Alert_Message}> Gallery</Text>

</TouchableOpacity>
<View style={{ width: '100%', height: 2, backgroundColor: '#fff'}} />

<TouchableOpacity  onPress={this.removeImage}>
   <Text style={styles.Alert_Message}>Remove Image</Text>

</TouchableOpacity>
          <View style={{ width: '100%', height: 2, backgroundColor: '#fff'}} />

          <TouchableOpacity onPress={ () => { this.Show_Custom_Alert(false)} }>
             <Text style={styles.Alert_Message}> Dismiss</Text>

</TouchableOpacity>
        
        
      </View>

  </View>


</Modal>



<Modal
 visible={this.state.show_alert}
  transparent={true}
  animationType={"fade"}
  onRequestClose={ () => { this.Show_Alert_Boxt(!this.state.show_alert)} } >
 <View style={{ flex:1, alignItems: 'center', justifyContent: 'center' }}>
 <View style={styles.alert_box}>
 <Text style={styles.alert_box_title}>{this.state.alert_message}</Text>

 <View style={styles.buttonviewalertcontainer}>
    <TouchableOpacity style={[styles.alertButton, styles.connectButton]} onPress={ () => { this.Show_Alert_Boxt(false)} } >
    <Text style={styles.alertbuttonconnectText}>OK</Text>
    </TouchableOpacity> 
    </View>
      
 </View>
 </View>


</Modal>
{this.state.first_stp_register ?
<View style={{width:'100%'}}>
<View style={styles.ProfileImage} onPress={this.launchCamera}>   
{this.renderFileUri()}
</View>

<View style={{ flexDirection: "row",alignSelf:'center' }}>
<View style={{width:'30%',flexDirection:'row',marginBottom:20, alignSelf:'center',alignItems:'center'}}>
 <TouchableOpacity
              style={styles.radioCircle}
              onPress={()=> this.userPressed()}>
              {checkUser === true && <View style={styles.selectedRb} />}
            </TouchableOpacity>
            <Text  style={{marginTop:5, fontWeight:'bold',color:'#818EB7',}}>CLIENT</Text>
           </View>
           <View style={{width:'30%',flexDirection:'row',marginBottom:20, alignSelf:'center',alignItems:'center'}}>
  <TouchableOpacity
              style={styles.radioCircle}
              onPress={()=> this.mechanicPressed()}>
              {checkMchanic === true && <View style={styles.selectedRb} />}</TouchableOpacity>
            <Text style={{marginTop:5, fontWeight:'bold', color:'#818EB7',}}>MECHANIC</Text>
           </View>
           </View>
           
<View style={styles.inputContainer}>
     <TextInput style={styles.inputs}
         placeholder = {this.state.firstNamePlaceholder}
         placeholderTextColor = '#A9A9A9'
         itemTextColor="green"
         keyboardType="default"
         underlineColorAndroid='white'
         onChangeText={(text) => this.validateFirstName(text)}
         value={this.state.firstName}
         />
   </View>
   <View style={styles.inputContainer}>
     <TextInput style={styles.inputs}
         placeholder = {this.state.lastNamePlaceholder}
         placeholderTextColor = '#A9A9A9'
         keyboardType="default"
         underlineColorAndroid='white'
         onChangeText={(text) => this.validateLastName(text)}
         value={this.state.lastName}
         />
   </View>


   <View style={styles.inputContainer}>
     <TextInput style={styles.inputs}
         placeholder = {this.state.emailPlaceholder}
         placeholderTextColor = '#A9A9A9'
         keyboardType="email-address"
         underlineColorAndroid='white'
         onChangeText={(text) => this.validate(text)}
         value={this.state.email}
     />
   </View>
   <View style={styles.inputContainer}>
   <TextInput style={styles.inputs}
  underlineColorAndroid='white'
     placeholder="Password" 
     secureTextEntry={true}
     placeholderTextColor = '#A9A9A9' 
     onChangeText={(text) => this.validatePassword(text)}
     value={this.state.password}
     />
     </View>


      <View style={styles.buttonviewcontainer}>
     
            <TouchableOpacity style={[styles.buttonContainer, styles.connectButton]} onPress={() => this.onClickNextButton(1)} >
  <Text style={styles.connectText}>NEXT</Text>
  </TouchableOpacity> 
           
          </View>
     </View>
:
this.state.second_step_register ?
<View style={{width:'100%'}}>
<View style={styles.inputContainer}>

<TextInput style={styles.inputs}
    placeholder = {this.state.phonePlaceholder}
    placeholderTextColor = '#A9A9A9'
    keyboardType="phone-pad"
    maxLength={10}
    underlineColorAndroid='white'
    // onChangeText={(phone) => this.setState({phone})}
    onChangeText={(text) => this.validatePhone(text)}
    value = {this.state.phone}
    />
</View>
<View style={styles.inputAddressContainer}>
<TextInput style={styles.inputs}
    placeholder = {this.state.addressPlaceholder}
    placeholderTextColor = '#A9A9A9'
    keyboardType="default"
    underlineColorAndroid='white'
    onChangeText={(text) => this.validateAddress(text)}
    value = {this.state.address}
    />
</View>
<View style={styles.inputAddressContainer}>
<TextInput style={styles.inputs}
    placeholder = {this.state.cityPlaceholder}
    placeholderTextColor = '#A9A9A9'
    keyboardType="default"
    underlineColorAndroid='white'
    onChangeText={(text) => this.validateCity(text)}
    value = {this.state.city}
    />
</View>

<View style={styles.inputAddressContainer}>
<TextInput style={styles.inputs}
    placeholder = {this.state.statePlaceholder}
    placeholderTextColor = '#A9A9A9'
    keyboardType="default"
    underlineColorAndroid='white'
    onChangeText={(text) => this.validateState(text)}
    value = {this.state.state}
    />
</View>
<View style={styles.inputAddressContainer}>
<TextInput style={styles.inputs}
    placeholder = {this.state.zipCodePlaceholder}
    placeholderTextColor = '#A9A9A9'
    keyboardType="number-pad"
    underlineColorAndroid='white'
    onChangeText={(text) => this.validateZipCode(text)}
    value = {this.state.zipCode}
    />
</View>
{
  this.state.mechanic ? 
  <View style={styles.buttonviewcontainer}>
<TouchableOpacity style={[styles.buttonContainer2, styles.connectButton]} onPress={() => this.onClickPreButton(2)} >
  <Text style={styles.buttonconnectText}>PREVIOUS</Text>
  </TouchableOpacity> 
  <TouchableOpacity style={[styles.buttonContainer2, styles.connectButton]} onPress={() => this.onClickNextButton(2)} >
  <Text style={styles.buttonconnectText}>NEXT</Text>
  </TouchableOpacity> 
          </View> :
          <View style={styles.buttonviewcontainer}>
<TouchableOpacity style={[styles.buttonContainer2, styles.connectButton]} onPress={() => this.onClickPreButton(2)} >
  <Text style={styles.buttonconnectText}>PREVIOUS</Text>
  </TouchableOpacity> 
  <TouchableOpacity style={[styles.buttonContainer2, styles.connectButton]} onPress={() => this.onClickRegisterListener()} >
  <Text style={styles.buttonconnectText}>SUBMIT</Text>
  </TouchableOpacity> 
          </View>
}

</View>:   this.state.third_step_register ?
   <View style={{width:'100%'}}>

    <View style={styles.inputAddressContainer}>
    <Text style={{height:100,marginTop:40,marginBottom:25,marginLeft:10,color:"white",fontSize:18,borderBottomColor: '#FFFFFF',numberOfLines:5, ellipsizeMode:'end'}}> 
    Provide an overview of your experience as a mechanic. Potential clients will use this history to choose to hire you.</Text>
    </View>
    {/* <View style={styles.inputAddressContainer}>
    <TextInput style={{height:45,marginLeft:16,color:"white",fontSize:18,borderBottomColor: '#FFFFFF',flex:1,color:'black',backgroundColor:"white",borderRadius:30}}
        placeholder = {this.state.skillsPlaceholder}
        placeholderTextColor = '#A9A9A9'
        keyboardType="default"
        underlineColorAndroid='white'
        onChangeText={(text) => this.validateSkill(text)}
        value = {this.state.skill}
        />
    </View> */}
    <View style={{borderColor:'#A9A9A9',
        borderWidth:1,
        backgroundColor: '#FFFFFF',
        borderRadius:8,
        marginLeft:25,
        marginRight:25,
        paddingLeft:10,
        marginTop:10,
        marginBottom:15,
        justifyContent:'flex-start',
        flexDirection: 'row',
        alignItems:'center'}}>
    <TextInput style={{height:200,
        marginLeft:10,
        marginRight:8,
        fontSize:20,
        color:"black",
        // maxHeight:200,
        numberOfLines:10,
        borderBottomColor: '#FFFFFF',
        flex:1,}}
        multiline
        placeholder = "Enter something"
        placeholderTextColor = '#A9A9A9'
        keyboardType="default"
        underlineColorAndroid='white'
        onChangeText={(text) => this.validateSkill(text)}
        value={this.state.skill}
     />
     </View>
     {/* <View style={styles.inputAddressContainer}> */}
    <Text style={{height:60,marginTop:15,color:"white",textAlign:'left',marginLeft:30,
      marginRight:30,fontSize:18,borderBottomColor: '#FFFFFF',numberOfLines:5}}>I am willing to provide my service for vehicles on this much hourly rate </Text>
    {/* </View> */}
    <View style={{borderColor:'#A9A9A9',
      borderWidth:1,
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      marginLeft:20,
      marginRight:20,
      height:45,
      marginBottom:30,
      marginTop:10,
      flexDirection: 'row',
      alignItems:'center'}}>
          <TextInput style={{height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
      color:"black"}}
              placeholder="Hourly Rate"
              placeholderTextColor = '#A9A9A9'
              keyboardType='decimal-pad'
              underlineColorAndroid='transparent'
              onChangeText={(text) => this.validateHrlyRate(text)}
              value={this.state.hrlyRate}
              />
        </View> 

    <View style={styles.inputAddressContainer}>
    <Text style={{height:60,marginTop:15,marginLeft:10,color:"white",fontSize:18,borderBottomColor: '#FFFFFF',numberOfLines:5}}>I am willing to work on vehicles this many miles from my home </Text>
    </View>
    <Dropdown
        style={styles.dropDownContainer}
        placeholder='Select Distance'
        underlineColor='transparent'
        iconColor='#E1E1E1'
        useNativeDriver={false}
        animationDuration={0}
        data={data}
        onChangeText={(id) => this.onClickRadiusListener(id)}
        value= {this.state.radius}
    /> 

    <View style={styles.buttonviewcontainer}>
    <TouchableOpacity style={[styles.buttonContainer2, styles.connectButton]} onPress={() => this.onClickPreButton(3)} >
      <Text style={styles.buttonconnectText}>PREVIOUS</Text>
      </TouchableOpacity> 
      <TouchableOpacity style={[styles.buttonContainer2, styles.connectButton]} onPress={() => this.onClickNextButton(3)} >
      <Text style={styles.buttonconnectText}>NEXT</Text>
      </TouchableOpacity> 
    </View>

    {/* <View style={styles.inputAddressContainer}>
    <Text style={{height:25,marginLeft:16,color:"white",fontSize:18,borderBottomColor: '#FFFFFF',flex:1}}> Which services will you offer to clients?</Text>
    </View>
    <View >
    <MultiSelect
    hideTags
    items={this.state.item}
    uniqueKey="service_id"
    ref={(component) => { this.multiSelect = component }}
    onSelectedItemsChange={this.onSelectedItemsChange}
    selectedItems={selectedItems}
    selectText="Services"
    areaPlaceholder={styles.SelectContainer}
    searchInputPlaceholderText="Search Items..."
    onChangeInput={ (text)=> console.log(text)}
    altFontFamily="ProximaNova-Light"
    tagRemoveIconColor="#CCC"
    tagBorderColor="#FDD14C"
    tagTextColor="#FDD14C"
    selectedItemTextColor="#FDD14C"
    selectedItemIconColor="#FDD14C"
    backgroundColor="#FDD14C"
    itemTextColor="#000"
    displayKey="service_name"
    searchInputStyle={{ color: '#000' }}
    submitButtonColor="#03254c"
    submitButtonText="Submit"
    styleMainWrapper={styles.multiSelectContainer}
    />
    </View>
    { selectedItems.includes("0") ?
    <View>
    <View style={styles.inputAddressContainer}>
      <Text style={{height:45,marginLeft:16,color:"white",fontSize:18,borderBottomColor: '#FFFFFF',flex:1}}> 
      What additional services would you like to offer? Separate by comma</Text>
      </View>
    <View style={styles.inputAddressContainer}>
    <TextInput style={{height:50,marginLeft:16,color:"white",fontSize:18,borderBottomColor: '#FFFFFF',flex:1,color:'black',backgroundColor:"white",borderRadius:30}}
        placeholder = {this.state.otherSkillsPlaceholder}
        placeholderTextColor = '#A9A9A9'
        keyboardType="default"
        underlineColorAndroid='white'
        onChangeText={(text) => this.validateOtherServices(text)}
        value = {this.state.otherServices}
        />
    </View> */}
    </View> : this.state.mechanic ? <View style={{width:'100%'}}>
        <View style={styles.inputAddressContainer}>
        <Text style={{height:25,marginLeft:16,color:"white",fontSize:18,borderBottomColor: '#FFFFFF',flex:1}}> Which services will you offer to clients?</Text>
        </View>
        {/* <View style={{borderRadius:30,marginLeft:20,marginRight:20,marginBottom:15,justifyContent:'space-evenly',
          flexDirection: 'row',alignItems:'center'}}>
        <SelectMultiple
          items={this.state.item}
          selectedItems={this.state.selectedIDS}
          onSelectionsChange={selectedServices(item.service_id)} 
        />
        </View> */}
 <View style={{borderRadius:30,
 marginLeft:20,
 marginRight:20,
 marginBottom:15,
 justifyContent:'space-evenly',
 flexDirection: 'row',
 alignItems:'center'}}>
        <FlatList
          data={this.state.item}
          renderItem={({ item}) => {
          return(
          <TouchableOpacity
            style={{marginBottom:10}}
            onPress={()=> selectedServices(item.service_id)}>
            {this.checkService(item.service_name,item.service_image,item.check,item.service_id)}
          </TouchableOpacity>)
            }}
            />
        </View>
    <View style={styles.buttonviewcontainer}>
    <TouchableOpacity style={[styles.buttonContainer2, styles.connectButton]} onPress={() => this.onClickPreButton(4)} >
      <Text style={styles.buttonconnectText}>PREVIOUS</Text>
      </TouchableOpacity> 
      <TouchableOpacity style={[styles.buttonContainer2, styles.connectButton]} onPress={() => this.onClickRegisterListener()} >
      <Text style={styles.buttonconnectText}>SUBMIT</Text>
      </TouchableOpacity> 
              </View>
    </View>:  <View></View>

 }

   
 


   {/* <View
   style={{flexDirection:"row", marginLeft:15}}>
  
      <CheckBox style={{width:'2%',alignSelf:'flex-start'}}
      style={{width:'10%',alignSelf:'center'}}
      checkedCheckBoxColor="#6495ED"
      uncheckedCheckBoxColor="#A9A9A9"
      onClick={()=> this.handleCheckBox()}
      isChecked={this.state.termsAccepted}
      />
    
<Text style={styles.privacyPolicyText}>I agree to terms & conditions and privacy policy.</Text>
   </View>
  <TouchableOpacity style={[styles.buttonContainer, styles.connectButton]} onPress={() => this.onClickRegisterListener()} >
  <Text style={styles.connectText}>{this.state.connectMeText}</Text>
  </TouchableOpacity>  */}
   
    {}


   <View style={styles.signUpContainer} flexDirection="row" justifyContent='center' >
   <Text style={styles.accountText}>Already have account?</Text>
   <TouchableOpacity style={styles.registerContainer}  onPress={() => this.onClickLoginButton()}>
     <Text style={styles.signUpText}>Login</Text>
   </TouchableOpacity>
   </View>
       </View>
</ScrollView>   

 </SafeAreaView>
 </>
);
}
}
const styles = StyleSheet.create({
maincontainer: {

  height:"100%",
  width:'100%',
  flexDirection:'column',
  // backgroundColor: '#FFFFFF',
  backgroundColor: '#002458',

  
},
buttonviewalertcontainer: {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'flex-end',
  justifyContent: 'flex-end',
  marginBottom:20
},

  buttonviewcontainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
  },
  alert_box:{

    backgroundColor : "#002458", 
    height: 190 ,
    width: '80%',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius:7,
   
  },

  alert_box_title:{
    marginTop:20,
    fontSize: 22, 
    color: "#fff",
    textAlign: 'center',
    padding: 10,
    height: '28%',
    margin:15,
    multiline:true,
    numberOfLines:4
  },
  alertButton: {
    height:40,
     justifyContent: 'center',
      alignItems: 'center',
     alignSelf:'flex-end',
      width:60,
      marginRight:20,
      borderRadius:30
        },
        alertbuttonconnectText: {
          color: '#4C4B0E',
          fontWeight:'bold',
          fontSize:20,
         },
  buttonviewcontainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
  },
  buttonContainer2: {
flex: 1,
height:60,
justifyContent: 'center',
alignItems: 'center',
marginBottom:20,
marginTop:20,
marginLeft:20,
marginRight:20,
width:210,
borderRadius:30
  },
  buttonconnectText: {
      color: '#4C4B0E',
      fontWeight:'bold',
      fontSize:20,
     },
container: {

  height:"100%",
  width:'100%',
  flexDirection:'column',
  // backgroundColor: '#FFFFFF',
  backgroundColor: '#002458',
  alignItems: 'center',

  marginBottom:0,
  
},
   logoImage:{
     marginTop:20,
     justifyContent:'flex-start',
     alignSelf:'center',
     height:'40%',
     width:'85%',
     backgroundColor:'black',
   },

   Alert_Main_View:{

     alignItems: 'center',
     justifyContent: 'center',
     backgroundColor : "#009688", 
     height: 280 ,
     width: '90%',
     borderWidth: 1,
     borderColor: '#fff',
     borderRadius:7,
    
   },
    
   Alert_Title:{
    
     fontSize: 25, 
     color: "#fff",
     textAlign: 'center',
     padding: 10,
     height: '28%'
    
   },
    
   Alert_Message:{
    
       fontSize: 22, 
       color: "#fff",
       textAlign: 'center',
       justifyContent:'center',
       padding:10
      
     },
    
   buttonStyle: {
       
       width: '50%',
       height: '100%',
       justifyContent: 'center',
       alignItems: 'center'
    
   },
      
   TextStyle:{
       color:'#fff',
       textAlign:'center',
       fontSize: 22,
       marginTop: -5
   }
    
   ,
   ProfileImage:{
    
     alignSelf:'center',
     marginBottom:10,
    
   },
   registerTitle:{
       justifyContent:'center',
       textAlign:'center',
       height:40,
       fontWeight:'bold',
       marginTop:10,
       marginBottom:20,
       fontSize:30,
       alignSelf:'center',
       color:'#2F4F4F',
   },
   termsText:{
     justifyContent:'center',
     textAlign:'center',
     fontWeight:'bold',
     marginTop:20,
     marginBottom:20,
     fontSize:15,
     alignSelf:'center',
     color:'#2F4F4F',
 },
 inputContainer: { borderRadius:30,
   marginLeft:20,
   marginRight:20,
   height:45,
   marginBottom:15,
   justifyContent:'space-evenly',
   flexDirection: 'row',
   alignItems:'center'
},
inputAddressContainer: {
 borderRadius:30,
 marginLeft:20,
 marginRight:20,
 height:45,
 marginBottom:15,
 justifyContent:'space-evenly',
 flexDirection: 'row',
 alignItems:'center'
},
inputContainerName: {
   borderColor:'#A9A9A9',
   borderWidth:1,
   backgroundColor: '#FFFFFF',
   borderRadius:30,
   marginTop:25,
   marginLeft:20,
   marginRight:20,
   height:45,
   marginBottom:20,
   flexDirection: 'row',
   alignItems:'center'
},
multiSelectContainer: {
 flex: 1,
 backgroundColor :'white',
 borderColor:'white',
 borderWidth:1,
 borderRadius:30,
 marginBottom:15,
 paddingLeft:15,
 paddingRight:15,
 paddingTop:10,
 justifyContent:'center',
 marginLeft:30,
 marginRight:22,

},
SelectContainer: {
backgroundColor :'white',
borderColor:'white',
justifyContent:'center',


},
inputs:{
   height:50,
   marginLeft:16,
    color:"white",
   fontSize:18,
   borderBottomColor: '#FFFFFF',
   flex:1,
},
inputName:{
   marginTop:20,
   height:45,
   marginLeft:16,
   borderBottomColor: '#FFFFFF',
   flex:1,
},
privacyPolicyText:{
marginTop:3,
justifyContent: 'center',
alignItems: 'center',
color:'#A9A9A9',
textAlign:'center',
flexDirection: 'row'
},
buttonContainer: {
height:60,
flexDirection: 'row',
justifyContent: 'center',
alignItems: 'center',
marginBottom:20,
marginTop:20,
width:250,
borderRadius:30,
},
connectButton: {
 backgroundColor:'#FDD248',
},
connectText: {
color: '#4C4B0E',
fontWeight:'bold',
fontSize:25,
},
dropDownContainer:{
marginLeft:30,
marginRight:22,
borderColor:'white',
borderWidth:1,
backgroundColor : 'white',
borderRadius:30,
borderTopEndRadius:30,
borderTopRightRadius:30,
borderTopLeftRadius:30,
height:45,
marginBottom:25,
marginTop:5,
flexDirection: 'row',
justifyContent : 'flex-start',

},

dropDownContainer1:{

     // backgroundColor: '#FFFFFF',
        backgroundColor : 'white',
        alignItems:'center'
},
accountText:{
 // height:30,
 flexDirection: 'row',
 justifyContent: 'flex-end',
 marginBottom:20,
 color:'#818EB7',
 alignItems: 'center',
 textAlign:'center',
 fontSize:15,
 borderRadius:30,
},
loginPageText:{
   fontWeight:'bold',
   fontSize:15,
 flexDirection: 'row',
 color:'#000080',
 alignItems: 'center',
 alignSelf:'center',
 textAlign:'center',
 borderRadius:30,
},
signUpText:{
 
marginLeft:5,
// marginTop:20,
fontWeight:'bold',
justifyContent: 'center',
alignItems: 'center',
textAlign:'center',
color:'#818EB7',
fontSize:15,
},
 forgotText:{
 justifyContent: 'flex-end',
 alignItems: 'center',
 textAlign:'center',
 // color:'#2F4F4F',
 fontSize:18,
 },
 accountText:{
   flexDirection: 'row',
   justifyContent: 'flex-end',
   marginBottom:15,
   color:'#818EB7',
   alignItems: 'center',
   textAlign:'center',
   fontSize:15,
   borderRadius:30,
 },
 signUpContainer:{
   marginTop:15,
 },
 registerContainer:{
   height:30,
   fontWeight:'bold',
   flexDirection: 'row',
   justifyContent: 'flex-end',
   marginBottom:20,
   color:'#2F4F4F',
   alignSelf:'center',
   borderRadius:30,
 },
 radioCircle: {
   height: 30,
   width: 30,
   borderRadius: 100,
   borderWidth: 2,
   alignSelf:'center',
   marginRight:8,
   marginTop:7,
   marginBottom:15,
   borderColor: '#818EB7',
   alignItems: 'center',
   justifyContent: 'center',
 },
 selectedRb: {
   width: 15,
   height: 15,
   borderRadius: 50,
   backgroundColor: '#818EB7',
   },
  
   touachableButton: {
     position: 'absolute',
     right: 3,
     height: 35,
     width: 35,
     padding: 2
   },
   pickerTitleStyle: {
     justifyContent: 'center',
     flexDirection: 'row',
     alignSelf: 'center',
     fontWeight: 'bold',
     flex: 1,
     marginLeft: 10,
     fontSize: 16,
     color: '#000',
   },
   pickerStyle: {
     height: 45,
     width: 120,
     marginBottom: 10,
     marginTop:10,
     justifyContent: 'center',
     padding: 10,
     borderWidth: 2,
     borderColor: '#A9A9A9',
     borderBottomLeftRadius:30,
     borderTopLeftRadius:30,
     backgroundColor: 'white',
   },
   selectedCountryTextStyle: {
     paddingLeft: 5,
     paddingRight: 5,
     color: '#000',
     textAlign: 'right',
   },
 
   countryNameTextStyle: {
     paddingLeft: 10,
     color: '#000',
     textAlign: 'right',
   },
 
   searchBarStyle: {
     flex: 1,
     justifyContent: 'center',
     flexDirection: 'row',
     marginLeft: 8,
     marginRight: 10,
   },
   btnSection: {
     width: 225,
     height: 50,
     backgroundColor: '#DCDCDC',
     alignItems: 'center',
     justifyContent: 'center',
     borderRadius: 3,
     marginBottom:10
   },
   MainContainer :{

     flex:1,
     justifyContent: 'center', 
     alignItems: 'center',
     backgroundColor: "#80000000",
     marginTop: (Platform.OS == 'ios') ? 20 : 0
     
    },
    viewWrapper: {
     flex: 1,
     alignItems: "center",
     justifyContent: "center",
     backgroundColor: "rgba(0, 0, 0, 0.2)",
 },
 modalView: {
     alignItems: "center",
     justifyContent: "center",
     position: "absolute",
     top: "50%",
     left: "50%",
     elevation: 5,
     transform: [{ translateX: -(width * 0.4) }, 
                 { translateY: -90 }],
     
     backgroundColor: "#80000000",
     borderRadius: 7,
 },

cardSelectedContainer: {
  // height: 65,
  alignItems: 'center', 
  flex:1,
  borderRadius: 20,
  flexDirection: 'row',
},
});
