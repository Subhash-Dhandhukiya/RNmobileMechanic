// onChangeText={(text) => setValue({ ...value, username: text })}
import React, { Component } from "react";
import { StyleSheet, Text, View,TextInput,Button,Image,Alert,TouchableHighlight,
    StatusBar, SafeAreaView, TouchableOpacity,FlatList,TouchableWithoutFeedback,BackHandler, ScrollView,} from 'react-native';
import { Card, CardItem, Left, Right } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import QuatationViewModel from "../../ViewModels/QuotationViewModel";
import MultiSelect from 'react-native-multiple-select';
import Modal from "react-native-modal";
import { Dropdown } from 'react-native-material-dropdown-v2-fixed';
import BookAppointmentViewModel from "../../ViewModels/BookAppointmentViewModel";
import Loader from "../Loader";
// import PushNotification, {Importance} from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import CloseJobsViewModel from "../../ViewModels/CloseJobsViewModel";
import AsyncStorage from "@react-native-async-storage/async-storage";

var quatData = [];

export default class BookQuotation extends Component
 {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.getUserType();
  }

    UNSAFE_componentWillMount = async () => {
        const { navigate } = this.props.navigation;
        const {passQuot} = this.props.route.params;
        quatData = passQuot;
        console.log('Quotation Data : ',quatData);
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.getUserType();
    }
    // componentDidMount() {
    //      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    // }

    componentDidUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
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
    onBookAppointment(){
          this.setState({loading: true});
          let serArr = [];
          let services = "";

          for(var i=0;i<quatData.request_details.length;i++){
            serArr.push( quatData.request_details[i].service_id);
          }
          services = serArr.map(item => item).join(', ');
          console.log('serArr : ',serArr);
          console.log('services : ',services);
        BookAppointmentViewModel.onBookAppointmentAPI(quatData.client_user_id,quatData.mechanic_user_id,
            quatData.vehicle_id,services,quatData.request_id,this.state.description).then(
          (response,error) => {
          //get callback here
          console.log('Output',response)
          if (response.RESPONSE_CODE == 200){
            this.setState({loading: false});
            alert('Successfully booked appointment')
            // this.props.navigation.navigate("Home");
            this.props.navigation.reset({
              index: 1,
              routes: [{name: 'Home'}],
            });
          }else{
            this.setState({loading: false});
            alert('Something went wrong, please try again');
          }
       });
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
        CloseJobsViewModel.onCloseJobsAPI(status,this.state.description,ratings,quatData.request_id).then(
          async (response,error) => {
            console.log('res : ',response)
            if (response.RESPONSE_CODE == 200){
              alert('Successfully denyed the quotation');
              // this.props.navigation.navigate('Home');
              this.props.navigation.reset({
                index: 1,
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
     description:'',
     userType:'',
    }

    render() {  
        const { navigate } = this.props.navigation;
        const {passQuot} = this.props.route.params;
        quatData = passQuot;
        console.log('Quotation Data : ',quatData);
        
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
            <Text style={styles.titleText}>Quotations Details</Text>
            <View
            style={{
              borderColor: 'white',
              borderWidth: 2,
              width:'95%',
              marginBottom:25,
            }}
            />
            <Text style={{alignItems: 'flex-start',alignSelf:'flex-start',color: 'white',fontWeight:'bold',fontSize:25,
        marginBottom:10,marginLeft:10}}>Services Information</Text>
            <FlatList
              data={quatData.request_details}
              renderItem={({ item , index}) => 
                  {return(
                    // <TouchableWithoutFeedback onPress={ () => this.actionOnRow(item)}>
                    <SafeAreaView style={styles.listContainer}>
                    <View style={styles.listContainer}>
                    <Card style={{flex: 1, width: '100%',backgroundColor:"clear", borderWidth:1,borderColor:'white',borderRadius:8}}>
                        <View style={{flexDirection: 'column',marginBottom:10,backgroundColor:'clear', marginTop:5,borderRadius:10}}>
                        <View style={styles.textView}>
                        <Text style={styles.textContainer}> Service Details : {item.service_details}</Text>
                        {/* <Text style={styles.textContainer}> {item.service_details} </Text> */}
                       </View>
                       <View style={styles.textView}>
                        <Text style={styles.textContainer}> Service Price : {item.service_price}  </Text>
                        {/* <Text style={styles.textContainer}> {item.service_price} </Text> */}
                       </View>
                       <View style={styles.textView}>
                        <Text style={styles.textContainer}> Service Tax : {item.tax} </Text>
                        {/* <Text style={styles.textContainer}> {item.tax} </Text> */}
                       </View>
                       <View style={styles.textView}>
                        <Text style={styles.textContainer}> Service Hours : {item.qty_unit} </Text>
                        {/* <Text style={styles.textContainer}> {item.qty_unit} </Text> */}
                       </View>
                       {/* <View style={styles.textView}>
                        <Text style={styles.textContainer}> Service Quantity     :  </Text>
                        <Text style={styles.textContainer}> {item.qty_unit} </Text>
                       </View> */}
                       <View style={styles.textView}>
                        <Text style={styles.textContainer}> Service total : {item.total}</Text>
                        {/* <Text style={styles.textContainer}> {item.total} </Text> */}
                       </View>
                       </View>
                       </Card>
                       </View>
                       </SafeAreaView>
                    //    </TouchableWithoutFeedback>
                     )}
                    }
                    />
                    <View
                      style={{
                        borderColor: 'white',
                        borderWidth: 2,
                        width:'95%',
                        marginBottom:25,
                      }}
                      />
                    <Text style={{alignItems: 'flex-start',alignSelf:'flex-start',color: 'white',fontWeight:'bold',fontSize:25,
                  marginBottom:10,marginLeft:10}}>Labour Information</Text>
                  <FlatList
              data={quatData.labour_details}
              renderItem={({ item , index}) => 
                  {return(
                    <SafeAreaView style={styles.listContainer}>
                    <View style={styles.listContainer}>
                    <Card style={{flex: 1, width: '100%',backgroundColor:"clear", borderWidth:1,borderColor:'white',borderRadius:8}}>
                        <View style={{flexDirection: 'column',marginBottom:10,backgroundColor:'clear', marginTop:5,borderRadius:10}}>
                        <View style={styles.textView}>
                        <Text style={styles.textContainer}> Details : {item.labour_details}  </Text>
                        {/* <Text style={styles.textContainer}> {item.labour_details} </Text> */}
                       </View>
                       <View style={styles.textView}>
                        <Text style={styles.textContainer}> Amount : {item.labour_amount} </Text>
                        {/* <Text style={styles.textContainer}> {item.labour_amount} </Text> */}
                       </View>
                       <View style={styles.textView}>
                        <Text style={styles.textContainer}> Tax : {item.labour_taxes} </Text>
                        {/* <Text style={styles.textContainer}> {item.labour_taxes} </Text> */}
                       </View>
                       </View>
                       </Card>
                       </View>
                       </SafeAreaView>
                     )}
                    }
                    />

<View
                      style={{
                        borderColor: 'white',
                        borderWidth: 2,
                        width:'95%',
                        marginBottom:25,
                      }}
                      />
                    <Text style={{alignItems: 'flex-start',alignSelf:'flex-start',color: 'white',fontWeight:'bold',fontSize:25,
                  marginBottom:10,marginLeft:10}}>Parts Information</Text>
                  <FlatList
              data={quatData.parts_details}
              renderItem={({ item , index}) => 
                  {return(
                    <SafeAreaView style={styles.listContainer}>
                    <View style={styles.listContainer}>
                    <Card style={{flex: 1, width: '100%',backgroundColor:"clear", borderWidth:1,borderColor:'white',borderRadius:8}}>
                        <View style={{flexDirection: 'column',marginBottom:10,backgroundColor:'clear', marginTop:5,borderRadius:10}}>
                        <View style={styles.textView}>
                        <Text style={styles.textContainer}> Part Details : {item.parts_details} </Text>
                        {/* <Text style={styles.textContainer}> {item.parts_details} </Text> */}
                       </View>
                       <View style={styles.textView}>
                        <Text style={styles.textContainer}> Part Amount : {item.parts_amount} </Text>
                        {/* <Text style={styles.textContainer}> {item.parts_amount} </Text> */}
                       </View>
                       <View style={styles.textView}>
                        <Text style={styles.textContainer}> Part Tax : {item.parts_taxes} </Text>
                        {/* <Text style={styles.textContainer}> {item.parts_taxes} </Text> */}
                       </View>
                       </View>
                       </Card>
                       </View>
                       </SafeAreaView>
                     )}
                    }
                    />
                    <View
                      style={{
                        borderColor: 'white',
                        borderWidth: 2,
                        width:'95%',
                        marginBottom:25,
                      }}
                      />
                    <Text style={{alignItems: 'flex-start',alignSelf:'flex-start',color: 'white',fontWeight:'bold',fontSize:25,
                  marginBottom:10,marginLeft:10}}> Provide Feedback</Text>
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

                    <TouchableOpacity style={[styles.buttonContainer, styles.connectButton]} 
                            onPress={() => this.onBookAppointment()} >
                            <Text style={styles.connectText}>Book Appointment</Text>
                    </TouchableOpacity> 

                    <TouchableOpacity style={[styles.buttonContainer, styles.connectButton]} 
                            onPress={() => this.onDenyQuotation()} >
                            <Text style={styles.connectText}>Deny Quotation</Text>
                    </TouchableOpacity>
                    </View>
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
      marginTop:0,
      height:'100%'
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
        marginTop:0,
        marginBottom:50,
        width:250,
        borderRadius:8,
      },
      inputs:{
        height:45,
        marginLeft:12,
        fontSize:20,
        borderBottomColor: '#FFFFFF',
        flex:1,
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
        color: 'black',
        fontWeight:'400',
        fontSize:25,
        marginTop:15,
        marginBottom:10,
       },
       listContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
        padding: 10,
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
        fontSize:20,
        color:'white',
        marginLeft:15,
        // marginRight:10,
        width:'90%',
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
      textContainer1:{
        fontWeight:'500',
        fontSize:20,
        color:'white',
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
        marginBottom:25,
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
        color:"black"
    },
  });