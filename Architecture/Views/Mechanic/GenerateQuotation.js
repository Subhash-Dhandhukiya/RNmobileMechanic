// onChangeText={(text) => setValue({ ...value, username: text })}
import React, { Component, useEffect, useState } from "react";
import { StyleSheet, Text, View,TextInput,Button,Image,Alert,TouchableHighlight,
    StatusBar, SafeAreaView, TouchableOpacity,FlatList,TouchableWithoutFeedback,BackHandler, ScrollView,} from 'react-native';
import { Card, CardItem, Left, Right } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import QuatationViewModel from "../../ViewModels/QuotationViewModel";
import MultiSelect from 'react-native-multiple-select';
import Modal from "react-native-modal";
import { Dropdown } from 'react-native-material-dropdown-v2-fixed';
import Loader from "../Loader";
import MechanicListViewModel from "../../ViewModels/MechanicListViewModel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import NotificationServices from "../../../NotificationServices";
import CloseJobsViewModel from "../../ViewModels/CloseJobsViewModel";

var selectedQuotations = [];
const data = [{value:'hourly', id: 0},
      {value:'monthly',id: 1},  {value:'quarterly',id: 2},  {value:'yearly',id: 3}, 
       {value:'once as fixed price',id: 4},  {value:'per visit',id: 5}
      ,  {value:'per pc',id: 6},  {value:'per pkt',id: 7}];
const multiply = (num1, num2) => {
    return num1 * num2;
};
var imgUrl = "data:image/png;base64,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";
var crossMark = "data:image/png;base64,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";

export default class GenerateQuotation extends Component
 {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.getUserType();
    // this.getMechanicDetails();
  }

    async componentWillMount() {
        this.getMechanicDetails();
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.getUserType();
        this.getFCMToken();
        this.requestPermission();
        const unsubscribe = messaging().onMessage(async remoteMessage => {
          console.log('remoteMessage', JSON.stringify(remoteMessage));
          DisplayNotification(remoteMessage);
          // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
        });
        return unsubscribe;
    }

    componentDidUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    getFCMToken = () => {
      messaging()
        .getToken()
        .then(token => {
          console.log('token=>>>', token);
        });
    };
  
     requestPermission = async () => {
      const authStatus = await messaging().requestPermission();
    };
  
    async DisplayNotification(remoteMessage) {
      // Create a channel
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });
  
      // Display a notification
      await notifee.displayNotification({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        android: {
          channelId,
          smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
        },
      });
    }
  
    async localDisplayNotification() {
      // Create a channel
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });
  
      // Display a notification
      notifee.displayNotification({
        title:
          '<p style="color: #4caf50;"><b>Styled HTMLTitle</span></p></b></p> &#128576;',
        subtitle: '&#129395;',
        body: 'The <p style="text-decoration: line-through">body can</p> also be <p style="color: #ffffff; background-color: #9c27b0"><i>styled too</i></p> &#127881;!',
        android: {
          channelId,
          color: '#4caf50',
          actions: [
            {
              title: '<b>Dance</b> &#128111;',
              pressAction: {id: 'dance'},
            },
            {
              title: '<p style="color: #f44336;"><b>Cry</b> &#128557;</p>',
              pressAction: {id: 'cry'},
            },
          ],
        },
      });
    }
  
     sendNotification =  async (pushNotifyToken) => {
      var str = pushNotifyToken;
      var new_str = str.replace(/"/g, '');
      console.log(new_str);
      let notificationData = {
        title: 'Generated Quotation Successfully',
        body: 'Quotation generate successfully',
        token : new_str,
      //   token:
      //     'ergZd17WQQqGY_bqpdsNsC:APA91bFp37eoaQbBuqwFp0INuolLujRqx_uPaZtYAKsexNYBTqlzej2YZFrBkh-Kbd4bbsBd4OYZp_Hbzul2TR_j9W7OPM7dBPw8m5Z3MExC9IiUIhCQ06eXKc0Fqsv8Dpzp9j2wR0Tc',
      };
      await NotificationServices.sendSingleDeviceNotification(notificationData);
    };
  
     sendMultiNotification = async (pushNotifyTokenArr) => {
      let notificationData = {
        title: 'Generated Quotation Successfully',
        body: 'Quotation generate successfully',
        token : pushNotifyTokenArr,
      //   token: [
      //     'ergZd17WQQqGY_bqpdsNsC:APA91bFp37eoaQbBuqwFp0INuolLujRqx_uPaZtYAKsexNYBTqlzej2YZFrBkh-Kbd4bbsBd4OYZp_Hbzul2TR_j9W7OPM7dBPw8m5Z3MExC9IiUIhCQ06eXKc0Fqsv8Dpzp9j2wR0Tc',
      //     'fMsRIXrkQhyaiCIDpYIdJI:APA91bHVDJQAXOTzxn3xbTXdE9EoIvJejghJoUUz_yhR7d0X5DgcaFOLrsvAsngiUzuTG8VNc2toqcY5jCjtrwPCm5286lXuLxeoCQZYkHSC3J80c_fgypSuvbZI0VSPMmjORGkrDfYl'
      //   ],
      };
      await NotificationServices.sendMultiDeviceNotification(notificationData);
    };

    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }
    onClickGenerateListener(){
      this.setState({loading: true});
      var selected_ids = selectedQuotations.services.map(item => item.service_id).join(', ');
      console.log('selectedIDS Array : ', selected_ids);
      const request_detailx = [];
      for(var i=0;i<selectedQuotations.services.length;i++)
      {
        // 1 unit = ((amount + tax) * hour)
        // 2 units = 2 * ((amount + tax) * hour)
        // Total = Unit * ((amount + tax) * hour)
        // total = (amount + (amount*percent/100) ) * unit_qty 

        // var  sum = this.state.amtTextInputs[i] + this.state.taxTextInputs[i]
        // var multiple = multiply(sum, this.state.Dropdown[i]) 
        // var totalDivide = multiply(sum, this.state.unitTextInputs[i]) 
        // var total = totalDivide / 10

        // this.state.taxTextInputs[i]

        // let amtPrcnt = multiply(this.state.amtTextInputs[i], this.state.taxTextInputs[i]);
        // console.log('amt*tax', amtPrcnt);
        // let amtPrcntDev = amtPrcnt / 100;
        // console.log('amt*tax/100', amtPrcntDev);
        // console.log('amt', this.state.amtTextInputs[i]);
        // let totAmtPrcnt = parseInt(this.state.amtTextInputs[i]) + amtPrcntDev;
        // console.log('amt*tax/100 + amt', totAmtPrcnt);
        // let totalVal = multiply(totAmtPrcnt , this.state.Dropdown[i]);
        // console.log('amt*tax/100 + amt * hrs', totalVal);

        let totalVal = multiply(this.state.amount , this.state.Dropdown[i]);

       request_detailx.push({ service_id:selectedQuotations.services[i].service_id,
          service_details: selectedQuotations.services[i].service_name,
          service_price: this.state.amount, amount:  multiply(this.state.amount, this.state.Dropdown[i]),
          tax: "0",
          qty_unit:  this.state.Dropdown[i],qty_unit_name:"0", "total":totalVal
        });
      }
      if(this.state.amount == "" || this.state.Dropdown == "" ){
        this.setState({loading: false});
        alert('Please fill the quotation details')  
      }else{
      console.log('Request Array : ', request_detailx);
        QuatationViewModel.onGenerateQuotationAPI(selectedQuotations.client_id, "" ,
         selectedQuotations.vehicle_id, request_detailx,selected_ids,selectedQuotations.request_id, this.state.custom_fields, this.state.custom_parts_fields,this.state.description).then(
            (response,error) => {
            //get callback here
            console.log('Output',response)
            if (response.RESPONSE_CODE == 200){
              this.setState({loading: false});
              let res = response.RESPONSE_DATA.tokens;
              console.log("Res for output : ",res);
              let tokenArray = res.map(({
                notification_token
              }) => notification_token);
              notifyToken = tokenArray[0];
              console.log("Notification Token : ",notifyToken);
              this.sendNotification(notifyToken);
              // this.props.navigation.navigate('Home')
              this.props.navigation.reset({
                index: 0,
                routes: [{name: 'Home'}],
              });
              this.setState({amount : ''});
              this.setState({taxTextInputs : ''});
              this.setState({Dropdown : ''});
              this.setState({unitTextInputs : ''});

            }else{
              this.setState({loading: false});
              alert('Something went wrong, please try again');
            }
         });
        }
    }

    validateMake = (text) =>{
        console.log(text);
        let reg = /^[a-zA-Z ]{2,60}([a-zA-Z ]{2,60})+$/;
        if (reg.test(text) === false) {
          console.log('Vehicle make is not correct');
          this.setState({make: text});
          return false;
        } else {
          this.setState({make: text});
          console.log('Vehicle make is correct');
        }
      };
      validateModel = (text) =>{
        console.log(text);
        let reg = /^[a-zA-Z ]{2,60}([a-zA-Z ]{2,60})+$/;
        if (reg.test(text) === false) {
          console.log('Vehicle model is not correct');
          this.setState({model: text});
          return false;
        } else {
          this.setState({model: text});
          console.log('Vehicle model is correct');
        }
      };
      validateYear = (text) =>{
        console.log(text);
        let reg = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
        if (reg.test(text) === false) {
          console.log('Vehicle year is not correct');
          this.setState({year: text});
          return false;
        } else {
          this.setState({year: text});
          console.log('Vehicle year is correct');
        }
      };
      validateStatus = (text) =>{
        console.log(text);
        let reg = /^[a-zA-Z ]{2,60}([a-zA-Z ]{2,60})+$/;
        if (reg.test(text) === false) {
          console.log('Vehicle status is not correct');
          this.setState({status: text});
          return false;
        } else {
          this.setState({status: text});
          console.log('Vehicle status is correct');
        }
      };
      validateDate = (text) =>{
        console.log(text);
        let reg = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
        if (reg.test(text) === false) {
          console.log('Vehicle date is not correct');
          this.setState({date: text});
          return false;
        } else {
          this.setState({date: text});
          console.log('Vehicle date is correct');
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

      validateAmt = (text) =>{
        console.log(text);
        let reg = /^[a-zA-Z ]{2,60}([a-zA-Z ]{2,60})+$/;
        if (reg.test(text) === false) {
          console.log('Service Amount is not correct');
          this.setState({amt: text});
          return false;
        } else {
          this.setState({amt: text});
          console.log('Service Amount is correct');
        }
      };
      validateTax = (text) =>{
        console.log(text);
        let reg = /^[a-zA-Z ]{2,60}([a-zA-Z ]{2,60})+$/;
        if (reg.test(text) === false) {
          console.log('Service tax is not correct');
          this.setState({tax: text});
          return false;
        } else {
          this.setState({tax: text});
          console.log('Service tax is correct');
        }
      };
      validateUnit = (text) =>{
        console.log(text);
        let reg = /^[a-zA-Z ]{2,60}([a-zA-Z ]{2,60})+$/;
        if (reg.test(text) === false) {
          console.log('Service unit is not correct');
          this.setState({unit: text});
          return false;
        } else {
          this.setState({unit: text});
          console.log('Service unit is correct');
        }
      };
      
      validateDetails = (text) =>{
        console.log(text);
        let reg = /^[a-zA-Z ]{2,60}([a-zA-Z ]{2,60})+$/;
        if (reg.test(text) === false) {
          console.log('Labour details is not correct');
          this.setState({details: text});
          return false;
        } else {
          this.setState({details: text});
          console.log('Labour details is correct');
        }
      };
      validateAmt = (text) =>{
        console.log(text);
        let reg = /^[a-zA-Z ]{2,60}([a-zA-Z ]{2,60})+$/;
        if (reg.test(text) === false) {
          console.log('Labour amount is not correct');
          this.setState({lbrAmt: text});
          return false;
        } else {
          this.setState({lbrAmt: text});
          console.log('Labour amount is correct');
        }
      };
      validateTax = (text) =>{
        console.log(text);
        let reg = /^[a-zA-Z ]{2,60}([a-zA-Z ]{2,60})+$/;
        if (reg.test(text) === false) {
          console.log('Labour tax is not correct');
          this.setState({lbrTax: text});
          return false;
        } else {
          this.setState({lbrTax: text});
          console.log('Labour tax is correct');
        }
      };

      onclickLabour(){
        this.setState({
          custom_fields:[... this.state.custom_fields, {labour_details:'value',labour_amount:'value',labour_taxes:'0',labour_total:'value'}]
        })
      }
      onCustomDetails = (value, index) => {
        this.state.custom_fields[index].labour_details = value;
        this.setState({custom_fields:this.state.custom_fields});
      } 
      onCustomAmt = (value, index) => {
        this.state.custom_fields[index].labour_amount = value;
        this.setState({custom_fields:this.state.custom_fields});
        this.setState({lbrAmt : value});

        this.onCustomTotal(value,index);
      } 
      onCustomTax = (value, index) => {
        this.state.custom_fields[index].labour_taxes = value;
        this.setState({custom_fields:this.state.custom_fields});
        this.setState({lbrTax : value});
        // var lbrTotal = this.state.lbrAmt + value;

        let amtPrcnt = multiply(this.state.lbrAmt, value);
        console.log('Labour amt*tax', amtPrcnt);
        let amtPrcntDev = amtPrcnt / 100;
        console.log('Labour amt*tax/100', amtPrcntDev);
        let totAmtPrcnt = parseInt(this.state.lbrAmt) + amtPrcntDev;
        console.log('Labour  amt*tax/100 + amt', totAmtPrcnt);

        // this.onCustomTotal(totAmtPrcnt,index);
      } 
      onCustomTotal = (total,index) => {
        this.state.custom_fields[index].labour_total = total;
        this.setState({custom_fields:this.state.custom_fields}); 
        this.setState({lbrAmt : ''});
        this.setState({lbrTax : ''});
      }
      onClickDelete = (index) => {
        this.state.custom_fields.splice(index,1);
        this.setState({custom_fields:this.state.custom_fields});
      }


      onclickParts(){
        this.setState({
          custom_parts_fields:[... this.state.custom_parts_fields, {parts_details:'value',parts_amount:'value',parts_taxes:'0',parts_total:'value'}]
        })
      }
      onCustomPrtDetails = (value, index) => {
        this.state.custom_parts_fields[index].parts_details = value;
        this.setState({custom_parts_fields:this.state.custom_parts_fields});
      } 
      onCustomPrtAmt = (value, index) => {
        this.state.custom_parts_fields[index].parts_amount = value;
        this.setState({custom_parts_fields:this.state.custom_parts_fields});
        this.setState({prtAmt : value});
        this.onCustomPrtTotal(value,index);
      } 
      onCustomPrtTax = (value, index) => {
        this.state.custom_parts_fields[index].parts_taxes = value;
        this.setState({custom_parts_fields:this.state.custom_parts_fields});
        this.setState({prtTax : value});
        // var prtTotal = this.state.prtAmt + value;

        let amtPrcnt = multiply(this.state.prtAmt, value);
        console.log('Parts amt*tax', amtPrcnt);
        let amtPrcntDev = amtPrcnt / 100;
        console.log('Parts amt*tax/100', amtPrcntDev);
        let totAmtPrcnt = parseInt(this.state.prtAmt) + amtPrcntDev;
        console.log('Parts  amt*tax/100 + amt', totAmtPrcnt);

        // this.onCustomPrtTotal(totAmtPrcnt,index);
      } 
      onCustomPrtTotal = (total,index) => {
        this.state.custom_parts_fields[index].parts_total = total;
        this.setState({custom_parts_fields:this.state.custom_parts_fields}); 
        this.setState({prtAmt : ''});
        this.setState({prtTax : ''});
      }
      onClickPrtDelete = (index) => {
        this.state.custom_parts_fields.splice(index,1);
        this.setState({custom_parts_fields:this.state.custom_parts_fields});
      }

      validateMessage = (text) =>{
        console.log(text);
        // let reg = /^[a-zA-Z ]{2,300}([a-zA-Z ]{2,300})+$/;
        let reg = /^\w(\w(\.{1}|\s{1})?)+\w$/;
        if (reg.test(text) === false) {
          console.log('Description is Not Correct');
          this.setState({description: text});
          return false;
        } else {
          this.setState({description: text});
          console.log('Description is Correct');
        }
      };

      getMechanicDetails(){
        MechanicListViewModel.onViewMechanicDetailsAPI().then(
          (response,error) => {
            console.log('res : ',response)
            if (response.RESPONSE_CODE == 200){
              this.setState({amount : response.RESPONSE_DATA[0].profile_mechanic.hourly_rate});
              console.log('Updated hourly_rates : ',this.state.amount)  
            }else{
             alert('Something went wrong, please try again');
            }
         }
        );
      }

      getUserType = async () =>{
        this.setState({userType : await AsyncStorage.getItem('userType')});
        console.log('UserType : ', this.state.userType);
        console.log('RequestId : ', closeJobDetails.request_id);
      }

      onDenyQuotation = async () => {
        // this.props.navigation.navigate("Home");
        let status = '';
        {
          this.state.userType === "3" ?  status = "4" : status = "-4"
        }
        let ratings = "0";
        CloseJobsViewModel.onCloseJobsAPI(status,this.state.description,ratings,selectedQuotations.request_id).then(
          async (response,error) => {
            console.log('res : ',response)
            if (response.RESPONSE_CODE == 200){
              alert('Successfully denyed the quotation');
              // this.props.navigation.navigate('Home');
              this.props.navigation.reset({
                index: 0,
                routes: [{name: 'Home'}],
              });
            }else{
            alert('Something went wrong, please try again');
            }
        }
        );
      }  
      

    state = {
      request_detailx:[],
     quotationDetails:[],
     make:'',
     model:'',
     year:'',
     date:'',
     status:'',
     requestList:[],
     amt:'',
     tax:'',
     unit:'',
     radius:'',
     amtTextInputs: [],
     taxTextInputs: [],
     radiusTextInputs: [],
     unitTextInputs: [],
     Dropdown:[],
     loading:false,
     custom_fields : [],
     details:'',
     lbrAmt:'',
     lbrTax:'',
     custom_parts_fields : [],
     prtAmt:'',
     prtTax:'',
     description:'',
     amount:'',
    }

    render() {  
        const { navigate } = this.props.navigation;
        const { selectedItems } = this.state;
        const {passDetails} = this.props.route.params;
        selectedQuotations = passDetails
        

        console.log('Selected quotations : ', selectedQuotations);
        return (
          <>
          <Loader loading={this.state.loading} />
          <StatusBar barStyle="dark-content" />
          <SafeAreaView style={styles.maincontainer}>
              <ScrollView>
          <TouchableOpacity style={styles.navBarBackButton} onPress={() => this.handleBackButtonClick()}>
            <Icon name="chevron-left" color='gray' size={30}/>
          </TouchableOpacity>
          <View style={styles.container}>
          <Text style={styles.titleText}>Generate Quotations</Text>
          <View
            style={{
              borderColor: 'white',
              borderWidth: 2,
              width:'95%',
              marginBottom:25,
            }}
          />
          <Text style={{color: 'white',fontWeight:'bold',fontSize:28,marginBottom:10,marginLeft:20,alignSelf:'flex-start'}}>Vehicle Information</Text>
          <View style={styles.textView1}>
                        <Text style={styles.textContainer1}> Vehicle Name     :  </Text>
                        <Text style={styles.textContainer1}> {selectedQuotations.vehicle_make} </Text>
          </View>
          <View style={styles.textView1}>
                        <Text style={styles.textContainer1}> Vehicle Model    :  </Text>
                        <Text style={styles.textContainer1}> {selectedQuotations.vehicle_model} </Text>
          </View>
          <View style={styles.textView1}>
                        <Text style={styles.textContainer1}> Vehicle Year        :  </Text>
                        <Text style={styles.textContainer1}> {selectedQuotations.vehicle_year} </Text>
          </View>
          <View style={styles.textView1}>
                        <Text style={styles.textContainer1}> Status                   :  </Text>
                        <Text style={styles.textContainer1}> {selectedQuotations.vehicle_status} </Text>
          </View>
          <View style={styles.textView1}>
                        <Text style={styles.textContainer1}> Date                       :  </Text>
                        <Text style={styles.textContainer1}> {selectedQuotations.created_on} </Text>
          </View>
          {/* <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
                  placeholderTextColor = '#A9A9A9'
                  keyboardType="default"
                  underlineColorAndroid='transparent'
                  placeholder='Vehicle Make'
                  value = {selectedQuotations.vehicle_make}
          />
          </View>
          <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
                placeholderTextColor = '#A9A9A9'
                keyboardType="default"
                underlineColorAndroid='transparent'
                placeholder='Vehicle Model'
                value = {selectedQuotations.vehicle_model}
          />
          </View>
          <View style={styles.inputContainer}>
             <TextInput style={styles.inputs}
                placeholder='Vehicle Year'
                placeholderTextColor = '#A9A9A9'
                keyboardType="default"
                underlineColorAndroid='transparent'
                value = {selectedQuotations.vehicle_year}
           />
           </View>
           <View style={styles.inputContainer}>
             <TextInput style={styles.inputs}
                placeholder='Vehicle Status'
                placeholderTextColor = '#A9A9A9'
                keyboardType="default"
                underlineColorAndroid='transparent'
                value = {selectedQuotations.vehicle_status}
           />
           </View>
           <View style={styles.inputContainer}>
             <TextInput style={styles.inputs}
                placeholder='Quotation Date'
                placeholderTextColor = '#A9A9A9'
                keyboardType="default"
                underlineColorAndroid='transparent'
                value = {selectedQuotations.created_on}
           />
           </View> */}
           <View
            style={{
              borderColor: 'white',
              borderWidth: 2,
              width:'95%',
              marginBottom:25,
            }}
          />
           {/* <Text style={styles.titleText2}>File quotation for services</Text> */}
           <Text style={{color: 'white',fontWeight:'bold',fontSize:28,marginBottom:10,marginLeft:20,alignSelf:'flex-start'}}>Services Information</Text>
           <FlatList
              data={selectedQuotations.services}
              renderItem={({ item, index}) => 
                  {return(
                    // <TouchableWithoutFeedback onPress={ () => this.actionOnRow(item)}>
                    // <SafeAreaView style={styles.listContainer}>
                    <View style={styles.listContainer}>
                    <Card style={{flex: 1,width: '100%',backgroundColor:'clear'}}>
                    <View style={{flexDirection: 'column',marginBottom:10, marginTop:5,borderRadius:10,backgroundColor:'#D3D3D3'}}>
                        <View style={styles.textView}>
                        <Text style={styles.textContainer}> Service Name   :  </Text>
                        <Text style={styles.textContainer}> {item.service_name} </Text>
                       </View>
                       {/* <View style={styles.textView}>
                       <Text style={styles.textContainer}> Note </Text>
                       </View>
                       <View style={{borderColor:'#A9A9A9',
                            borderWidth:1,
                            backgroundColor: '#FFFFFF',
                            borderRadius:8,
                            marginLeft:10,
                            marginRight:10,
                            height:120,
                            paddingLeft:10,
                            marginTop:10,
                            marginBottom:10,
                            justifyContent:'flex-start',
                            flexDirection: 'row',
                            alignItems:'center'}}>
                        <TextInput style={{height:120,
                            marginLeft:10,
                            marginRight:8,
                            fontSize:20,
                            color:"black",
                            numberOfLines:10,
                            borderBottomColor: '#FFFFFF',
                            flex:1,}}
                            multiline
                            placeholder = "Enter something"
                            placeholderTextColor = '#A9A9A9'
                            keyboardType="default"
                            underlineColorAndroid='white' //noteInputs
                            onChangeText={text => {
                              let { noteInputs } = this.state;
                              noteInputs[index] = text;
                              this.setState({
                                noteInputs,
                              });
                              console.log('Note value : ', this.state.noteInputs)
                            }}
                            value={this.state.noteInputs[index]}
                        />
                        </View>
                        <View style={styles.textView}>
                       <Text style={styles.textContainer}> Amount </Text>
                       </View> */}
                       <View style={styles.inputContainer1}>
                        <TextInput style={styles.inputs}
                            placeholder='Hourly rate in USD'
                            placeholderTextColor = '#A9A9A9'
                            keyboardType="numeric"
                            underlineColorAndroid='transparent'
                            // onChangeText={text => {
                            //   let { amtTextInputs } = this.state;
                            //   amtTextInputs[index] = text;
                            //   this.setState({
                            //     amtTextInputs,
                            //   });
                            //   console.log('Amt value : ', this.state.amtTextInputs)
                            //   // this.setState(prevState => ({
                            //   //   requestList: [...prevState.requestList, {"Amount":this.state.amtTextInputs,"Tax": this.state.taxTextInputs,"Radius":this.state.Dropdown,"Unit":this.state.unitTextInputs}]
                            //   // }))
                            // }}
                            // value={this.state.amtTextInputs[index]}
                            value={this.state.amount}
                            
                        />
                      </View>
                      {/* <View style={styles.inputContainer1}>
                        <TextInput style={styles.inputs}
                            placeholder='Service Tax in 0.00%'
                            placeholderTextColor = '#A9A9A9'
                            keyboardType='decimal-pad'
                            underlineColorAndroid='transparent'
                            onChangeText={text => {
                              let { taxTextInputs } = this.state;
                              taxTextInputs[index] = text;
                              this.setState({
                                taxTextInputs,
                              });
                              console.log('Tax value : ', this.state.taxTextInputs)
                              // this.setState(prevState => ({
                              //   requestList: [...prevState.requestList, {"Amount":this.state.amtTextInputs,"Tax": this.state.taxTextInputs,"Radius":this.state.Dropdown,"Unit":this.state.unitTextInputs}]
                              // }))
                            }}
                            value={this.state.taxTextInputs[index]}
                        />
                      </View> */}
                      {/* <Dropdown
                            style={styles.dropDownContainer}
                            placeholder='Select Hours'
                            placeholderTextColor = '#A9A9A9'
                            underlineColor='transparent'
                            iconColor='white'
                            useNativeDriver={false}
                            animationDuration={0}
                            data={data}
                            // onChangeText={(id) => this.onClickRadiusListener(id)}
                            // value={this.state.radius}
                            onChangeText={(id) => {
                              let { Dropdown } = this.state;
                              Dropdown[index] = id;
                              this.setState({
                                Dropdown,
                              });
                              console.log('Radius value : ', this.state.Dropdown)
                              // this.setState(prevState => ({
                              //   requestList: [...prevState.requestList, {"Amount":this.state.amtTextInputs,"Tax": this.state.taxTextInputs,"Radius":this.state.Dropdown,"Unit":this.state.unitTextInputs}]
                              // }))
                            }}
                            value={this.state.Dropdown[index]}
                      />  */}
                      <View style={styles.inputContainer1}>
                        <TextInput style={styles.inputs}
                            placeholder='Total hours'
                            placeholderTextColor = '#A9A9A9'
                            keyboardType="numeric"
                            underlineColorAndroid='transparent'
                            onChangeText={text => {
                              let { Dropdown } = this.state;
                              Dropdown[index] = text;
                              this.setState({
                                Dropdown,
                              });
                              console.log('Total hours value : ', this.state.Dropdown)
                            }}
                            value={this.state.Dropdown[index]}
                        />
                      </View>
                      {/* <View style={styles.inputContainer1}>
                        <TextInput style={styles.inputs}
                            placeholder='Service Unit'
                            placeholderTextColor = '#A9A9A9'
                            keyboardType="numeric"
                            underlineColorAndroid='transparent'
                            onChangeText={text => {
                              let { unitTextInputs } = this.state;
                              unitTextInputs[index] = text;
                              this.setState({
                                unitTextInputs,
                              });
                              console.log('Unit value : ', this.state.unitTextInputs)
                              // this.setState(prevState => ({
                              //   requestList: [...prevState.requestList, {"Amount":this.state.amtTextInputs,"Tax": this.state.taxTextInputs,"Radius":this.state.Dropdown,"Unit":this.state.unitTextInputs}]
                              // }))
                            }}
                            value={this.state.unitTextInputs[index]}
                        />
                        </View> */}

                       </View>
                    </Card>
                    </View>
                    // </SafeAreaView>
                  // </TouchableWithoutFeedback>
                  )
                }}
                />
          <View
            style={{
              borderColor: 'white',
              borderWidth: 2,
              width:'95%',
              marginTop:25
            }}
          />
          <Text style={{color: 'white',fontWeight:'bold',fontSize:28,marginTop:15,marginLeft:20,alignSelf:'flex-start'}}>Labour Information</Text>
            {
              this.state.custom_fields.map((customInput, key)=> {
                return(
                  <View style={{flexDirection:'column',justifyContent:'space-between',marginTop:20,marginBottom:10,width:'95%',borderWidth:1,borderRadius:8,borderColor:'white'}}>
                  <TouchableOpacity style={{alignItems:'flex-end'}} 
                      onPress={() => this.onClickDelete(key)} >
                  <Image
                    style={{alignSelf:'flex-end', marginTop:15,marginRight:10, width:35, height : 35, borderRadius: 8}}
                    source={{uri:crossMark}}
                  />
                  </TouchableOpacity> 
                  <Text style={{color: 'white',
                          fontWeight:'bold',
                          fontSize:20,
                          justifyContent:'center',
                          textAlign:'left',marginTop:25,}}> Labour Details </Text>
                  <View style={styles.inputContainer1}>
                              <TextInput style={styles.inputs}
                                  placeholder='Labour details'
                                  placeholderTextColor = '#A9A9A9'
                                  keyboardType='email-address'
                                  underlineColorAndroid='transparent'
                                  // onChangeText={text => this.validateDetails(text)}
                                  // value={this.state.details}
                                  onChangeText={details => {this.onCustomDetails(details,key)}}
                              />
                            </View>
                            <Text style={{color: 'white',
                          fontWeight:'bold',
                          fontSize:20,
                          justifyContent:'center',
                          textAlign:'left',marginTop:10,}}> Labour Amount </Text>
                  <View style={styles.inputContainer1}>
                              <TextInput style={styles.inputs}
                                  placeholder='Labour amount'
                                  placeholderTextColor = '#A9A9A9'
                                  keyboardType='number-pad'
                                  underlineColorAndroid='transparent'
                                  onChangeText={amt => {this.onCustomAmt(amt,key)}}
                                  // value={customInput.key}
                              />
                            </View>
                            {/* <Text style={{color: 'white',
                          fontWeight:'bold',
                          fontSize:20,
                          justifyContent:'center',
                          textAlign:'left',marginTop:10,}}> Labour Tax </Text>
                  <View style={styles.inputContainer1}>
                              <TextInput style={styles.inputs}
                                  placeholder='Labour tax'
                                  placeholderTextColor = '#A9A9A9'
                                  keyboardType='number-pad'
                                  underlineColorAndroid='transparent'
                                  // onChangeText={text => this.validateTax(text)}
                                  onChangeText={tax => {this.onCustomTax(tax,key)}}
                                  // value={this.state.lbrTax}
                              />
                            </View> */}
                  {/* <TouchableOpacity style={[styles.buttonContainer, styles.connectButton]} 
                      onPress={() => this.onClickDelete(key)} >
                  <Text style={styles.connectText}>Delete</Text>
                  </TouchableOpacity>  */}
                  </View>
                )
              })
            }
            
              <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:15,width:'85%'}}>
              <Text style={{color: 'white',
                    fontWeight:'bold',
                    fontSize:25,
                    justifyContent:'center',
                    textAlign:'center',marginTop:25,}}> Labour </Text>
              <TouchableOpacity 
                onPress={() => this.onclickLabour()} >
              <Image
                        style={{alignSelf:'flex-end',justifyContent:'center', marginTop:25, width:35, height : 35, borderRadius: 8}}
                        source={{uri:imgUrl}}
              />
              </TouchableOpacity>
              </View>
              <View
                style={{
                  borderColor: 'white',
                  borderWidth: 2,
                  width:'95%',
                }}
              />
              <Text style={{color: 'white',fontWeight:'bold',fontSize:28,marginTop:15,marginLeft:20,alignSelf:'flex-start'}}>Parts Information</Text>
              {
              this.state.custom_parts_fields.map((customPrtInput, key)=> {
                return(
                  <View style={{flexDirection:'column',justifyContent:'space-between',marginTop:20,marginBottom:10,width:'95%',borderWidth:1,borderRadius:8,borderColor:'white'}}>
                  <TouchableOpacity style={{alignItems:'flex-end'}} 
                      onPress={() => this.onClickPrtDelete(key)} >
                  <Image
                    style={{alignSelf:'flex-end', marginTop:15,marginRight:10, width:35, height : 35, borderRadius: 8}}
                    source={{uri:crossMark}}
                  />
                  </TouchableOpacity> 
                  <Text style={{color: 'white',
                          fontWeight:'bold',
                          fontSize:20,
                          justifyContent:'center',
                          textAlign:'left',marginTop:25,}}> Part Details </Text>
                  <View style={styles.inputContainer1}>
                              <TextInput style={styles.inputs}
                                  placeholder='Part details'
                                  placeholderTextColor = '#A9A9A9'
                                  keyboardType='email-address'
                                  underlineColorAndroid='transparent'
                                  // onChangeText={text => this.validateDetails(text)}
                                  // value={this.state.details}
                                  onChangeText={prtDetails => {this.onCustomPrtDetails(prtDetails,key)}}
                              />
                            </View>
                            <Text style={{color: 'white',
                          fontWeight:'bold',
                          fontSize:20,
                          justifyContent:'center',
                          textAlign:'left',marginTop:10,}}> Part Amount </Text>
                  <View style={styles.inputContainer1}>
                              <TextInput style={styles.inputs}
                                  placeholder='Part amount'
                                  placeholderTextColor = '#A9A9A9'
                                  keyboardType='number-pad'
                                  underlineColorAndroid='transparent'
                                  onChangeText={prtAmt => {this.onCustomPrtAmt(prtAmt,key)}}
                                  // value={customInput.key}
                              />
                            </View>
                            {/* <Text style={{color: 'white',
                          fontWeight:'bold',
                          fontSize:20,
                          justifyContent:'center',
                          textAlign:'left',marginTop:10,}}> Part Tax </Text>
                  <View style={styles.inputContainer1}>
                              <TextInput style={styles.inputs}
                                  placeholder='Part tax'
                                  placeholderTextColor = '#A9A9A9'
                                  keyboardType='number-pad'
                                  underlineColorAndroid='transparent'
                                  // onChangeText={text => this.validateTax(text)}
                                  onChangeText={prtTax => {this.onCustomPrtTax(prtTax,key)}}
                                  // value={this.state.lbrTax}
                              />
                            </View> */}
                  {/* <TouchableOpacity style={[styles.buttonContainer, styles.connectButton]} 
                      onPress={() => this.onClickPrtDelete(key)} >
                  <Text style={styles.connectText}>Delete</Text>
                  </TouchableOpacity>  */}
                  </View>
                )
              })
            }
              <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:10,width:'85%'}}>
              <Text style={{color: 'white',
                    fontWeight:'bold',
                    fontSize:25,
                    justifyContent:'center',
                    textAlign:'center',marginTop:25,}}> Parts </Text>
              <TouchableOpacity 
                onPress={() => this.onclickParts()} >
              <Image
                        style={{alignSelf:'flex-end',justifyContent:'center', marginTop:25, width:35, height : 35, borderRadius: 8}}
                        source={{uri:imgUrl}}
              />
              </TouchableOpacity>
              </View>
              <View
                style={{
                  borderColor: 'white',
                  borderWidth: 2,
                  width:'95%',
                  marginBottom:20,
                }}
              />
              <Text style={{color: 'white',
                    fontWeight:'bold',
                    fontSize:25,
                    justifyContent:'center',
                    textAlign:'left',marginTop:10,marginLeft:15}}> Provide feedback </Text>
          <View style={styles.inputContainer2}>
          <TextInput style={styles.msgInputs}
           multiline
           placeholder = "Please enter description"
           placeholderTextColor = '#A9A9A9'
           keyboardType="default"
           underlineColorAndroid='transparent'
           onChangeText={(text) => this.validateMessage(text)}
           value={this.state.description}
           />
          </View>
          <View
            style={{
              borderColor: 'white',
              borderWidth: 2,
              width:'95%',
              marginTop:20,
              marginBottom:25,

            }}
          />
           </View>
           
          
           <TouchableOpacity style={[styles.buttonContainer, styles.connectButton]} 
                onPress={() => this.onClickGenerateListener()} >
            <Text style={styles.connectText}>Generate</Text>
            </TouchableOpacity> 
            <TouchableOpacity style={[styles.buttonContainer, styles.connectButton]} 
                onPress={() => this.onDenyQuotation()} >
            <Text style={styles.connectText}>Deny</Text>
            </TouchableOpacity> 
            </ScrollView>
           </SafeAreaView>
           </>
          );
        }
      }
 const styles = StyleSheet.create({
    container: {
      flexDirection:'column',
      alignItems: 'center',
      marginBottom:0,
      marginTop:0
    },
    maincontainer: {
      height:"100%",
      width:'100%',
      flexDirection:'column',
      backgroundColor: '#002458',
    },
    titleText: {
        alignItems: 'center',
        alignSelf:'center',
        color: 'white',
        fontWeight:'bold',
        fontSize:25,
        marginBottom:20,
       },
       inputContainer: {
        borderColor:'#A9A9A9',
        borderWidth:1,
        backgroundColor: '#FFFFFF',
        borderRadius:8,
        marginLeft:25,
        marginRight:25,
        height:45,
        paddingLeft:10,
        marginTop:10,
        marginBottom:10,
        justifyContent:'flex-start',
        flexDirection: 'row',
        alignItems:'center'
      },
      buttonContainer: {
        height:60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:'center',
        marginTop:15,
        marginBottom:20,
        width:250,
        borderRadius:8,
      },
      inputs:{
        height:45,
        marginLeft:12,
        fontSize:20,
        borderBottomColor: '#FFFFFF',
        flex:1,
        color:"black",
      },
      connectButton: {
        backgroundColor:'#FDD248',
      },
      connectText: {
        color: 'black',
        fontWeight:'bold',
        fontSize:25,
      },
     titleText2: {
        color: 'white',
        fontWeight:'400',
        fontSize:25,
        marginTop:15,
        marginBottom:10,
       },
       listContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
        // backgroundColor: '#ecf0f1',
      },
      textView:{
        flex:1,
        flexDirection:'row', 
        marginTop:10,
        marginBottom:10,
      },
      textContainer:{
        fontWeight:'500',
        fontSize:24,
        color:'black',
      },
      inputContainer1: {
        borderColor:'#A9A9A9',
        borderWidth:1,
        backgroundColor: '#FFFFFF',
        borderRadius:8,
        marginLeft:10,
        marginRight:10,
        height:45,
        paddingLeft:10,
        marginTop:10,
        marginBottom:10,
        justifyContent:'flex-start',
        flexDirection: 'row',
        alignItems:'center'
      },
      dropDownContainer:{
        borderColor:'#A9A9A9',
        borderWidth:1,
        backgroundColor : 'white',
        borderRadius:8,
        borderTopEndRadius:8,
        borderTopRightRadius:8,
        borderTopLeftRadius:8,
        marginLeft:10,
        marginRight:10,
        height:45,
        flexDirection: 'row',
        alignItems:'center'
      },
      textView1:{
        flex:1,
        flexDirection:'row', 
        marginTop:10,
        marginBottom:10,
        justifyContent:'center',
        alignSelf:'center',
        width:'90%',
        flex:1
      },
      textContainer1:{
        fontWeight:'500',
        fontSize:20,
        color:'white',
        width:'50%',
        justifyContent:'center',
        alignSelf:'center'
      },

      containerL: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white'
      },
      inputsContainerL: {
        flex: 1, marginBottom: 20
      },
      inputContainerL: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: "lightgray"
      },
      inputContainer2: {
        borderColor:'#A9A9A9',
        borderWidth:1,
        backgroundColor: '#FFFFFF',
        borderRadius:8,
        marginLeft:10,
        marginRight:10,
        height:200,
        paddingLeft:10,
        marginTop:10,
        justifyContent:'flex-start',
        flexDirection: 'row',
        alignItems:'center'
      },
      msgInputs:{
        height:120,
        marginLeft:16,
        fontSize:20,
        maxHeight:200,
        borderBottomColor: '#FFFFFF',
        flex:1,
        color:"black",
    },
  });