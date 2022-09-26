import React, { Component } from "react";
import { StyleSheet, Text, View,TextInput,Button,Image,Alert,TouchableHighlight,
    StatusBar, SafeAreaView, TouchableOpacity,FlatList,BackHandler,ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import VehicleViewModel from "../../ViewModels/VehicleViewModel";
import CheckBox from 'react-native-check-box';
import { useNavigation } from '@react-navigation/native';
import {useState, useEffect} from "react";
import Modal from "react-native-modal";

var serviceIds = "";
var vehicleId = "";
var edited = false;
var editImage = "data:image/png;base64,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";
var deleteImg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFx6hp_J-R3FVF7fs7aL2upFec1qGRPuc6zw&usqp=CAU";
var vehicleDetails = [];
var selectedServs = '';

export default class EditVehicle extends Component
 {

  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentWillMount = async () => {
    const { navigate } = this.props.navigation;
    const {passVehicle} = this.props.route.params;
    const {passServiceId} = this.props.route.params;
    vehicleDetails = passVehicle;
    selectedServs = passServiceId;
    console.log('vehicle details : ', passVehicle);
    console.log('service details : ', passServiceId);
    this.setState({ make : passVehicle.vehicle_make });
    this.setState({ model : passVehicle.vehicle_model });
    this.setState({ year : passVehicle.vehicle_year });
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }

  // Show_Custom_Alert(visible) {
  //   this.setState({Alert_Visibility: visible});
  // }

  
  editAction = () => {
    let item = this.state.vehicleSelected;
    console.log('Selected vehicle for edit : ', item)
    
  }
  
  

  state=
  {
    listData: [
      {
        id: "1",
        name:"Vehicle 1 from profile",
        check:false,
      },
      {
        id: "2",
        name:"Vehicle 2 from profile",
        check:false,
      },
      
    ],
    vehiclesList:[],
    model:'',
    make:'',
    year:'',
    selectedServiceIds : '',
    // Alert_Visibility:false,
    vehicleSelected:[],
 }
  
    onClickEditVehicleListener(){
      console.log(vehicleDetails);
      const NetInfo = require("@react-native-community/netinfo"); 
      NetInfo.fetch().then(state => {
      console.log("Network Details :",state)
      if (state.isConnected == true) {
        VehicleViewModel.onUpdateVehicleAPI (vehicleDetails.vehicle_id, this.state.make, this.state.model,this.state.year).then(
          (response,error) => {
          console.log('Output',response)
          if (response.RESPONSE_CODE == 200){
            this.setState({ make : "" });
            this.setState({ model : "" });
            this.setState({ year : "" });
            // this.props.navigation.navigate('Home');
            this.props.navigation.reset({
              index: 3,
              routes: [{name: 'Home'}],
            });
          }else{
            alert('Something went wrong, please try again');
          }
       });
      }else{
        Alert.alert("Please check your Network Connection.");
      }
     });
    }


    validateModel = (text) =>{
      console.log(text);
      let reg = /^[a-zA-Z ]{0,40}([a-zA-Z ]{0,40})+$/;
      if (reg.test(text) === false) {
        console.log('Model is not correct');
        this.setState({model: text});
        return false;
      } else {
        this.setState({model: text});
        console.log('Model is correct');
      }
    };

    validateMake = (text) =>{
      console.log(text);
      let reg = /^[a-zA-Z ]{0,40}([a-zA-Z ]{0,40})+$/;
      if (reg.test(text) === false) {
        console.log('Make is not correct');
        this.setState({make: text});
        return false;
      } else {
        this.setState({make: text});
        console.log('Make is correct');
      }
    };

    validateYear = (text) =>{
      console.log(text);
      let reg = /^[a-zA-Z ]{0,40}([a-zA-Z ]{0,40})+$/;
      if (reg.test(text) === false) {
        console.log('Year is not correct');
        this.setState({year: text});
        return false;
      } else {
        this.setState({year: text});
        console.log('Year is correct');
      }
    };

    render() {
      
  
        return (
          <>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView style={styles.maincontainer}>
          <ScrollView >
          <TouchableOpacity style={styles.navBarBackButton} onPress={() => this.handleBackButtonClick()}>
            <Icon name="chevron-left" color='gray' size={30}/>
            </TouchableOpacity>
          <View style={styles.container}>
          <Text style={styles.titleText}>Edit Vehicle</Text>
          
          <Text style={styles.titleText2}>Edit an existing vehicle</Text>
          <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
                  placeholderTextColor = '#A9A9A9'
                  keyboardType="default"
                  underlineColorAndroid='transparent'
                  placeholder='Make'
                  onChangeText={(text) => this.validateMake(text)}
                  value = {this.state.make}
          />
        </View>
        <View style={styles.inputContainer}>
        <TextInput style={styles.inputs}
                placeholderTextColor = '#A9A9A9'
                keyboardType="default"
                underlineColorAndroid='transparent'
                placeholder='Model'
                onChangeText={(text) => this.validateModel(text)}
                value = {this.state.model}
          />
        </View>
        <View style={styles.inputContainer}>
             <TextInput style={styles.inputs}
                placeholder='Year in YYYY'
                placeholderTextColor = '#A9A9A9'
                keyboardType='numeric'
                underlineColorAndroid='transparent'
                onChangeText={(text) => this.validateYear(text)}
                value = {this.state.year}
          />
          </View>
                </View>
                
                <TouchableOpacity style={[styles.buttonContainer, styles.connectButton]} 
                onPress={() => this.onClickEditVehicleListener()} >
                <Text style={styles.connectText}>Update Vehicle</Text>
                </TouchableOpacity> 
    </ScrollView>    
    </SafeAreaView>
  
            </>
        );
 }
}
 const styles = StyleSheet.create({
    container: {
      marginTop:15,
      marginLeft:20,
          marginRight:20,
      justifyContent: 'center',
     
    },
    maincontainer: {
      height:"100%",
      width:'100%',
      flexDirection:'column',
      backgroundColor: '#002458',
    },
    profileTitle:{
        marginTop:150,
        marginBottom:10,
        justifyContent: 'center',
        alignItems: 'center',
        color:'#2F4F4F',
        fontWeight:"bold",
        fontSize:35,
      },
      checkBox: {
        height: 30,
        width: 30,
        borderWidth: 2,
        alignSelf:'center',
        marginRight:8,
        marginTop:7,
        borderColor: '#108210',
        alignItems: 'center',
        justifyContent: 'center',
      },
      selectedCheckBox: {
        width: 30,
        height:30,
          backgroundColor: '#2F4F4F',
        },
        inputContainer: {
          borderColor:'#A9A9A9',
          borderWidth:1,
          backgroundColor: '#FFFFFF',
          borderRadius:8,
          marginLeft:20,
          marginRight:20,
          height:45,
          paddingLeft:10,
          marginTop:10,
          marginBottom:15,
          justifyContent:'flex-start',
          flexDirection: 'row',
          alignItems:'center'
      },
      inputs:{
        height:45,
        fontSize:18,
        color:"black",
        borderBottomColor: '#FFFFFF',
        flex:1,
    },
      buttonContainer: {
        height:60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:'center',
        marginTop:20,
        marginBottom:20,
        width:250,
        borderRadius:8,
      },
      connectButton: {
        backgroundColor:'#FDD248',
      },
      connectText: {
       color: 'black',
       fontWeight:'bold',
       fontSize:25,
      },

      listbuttonContainer: {
        height:60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:'center',
        marginTop:20,
        marginBottom:20,
        width:'90%',
        borderRadius:8,
      },
      listButton: {
        backgroundColor:'#03254c',
      },
      listText: {
       color: 'black',
       fontWeight:'bold',
       fontSize:20,
       justifyContent:'center',
       padding:5,
       marginTop:10,
       textAlign:'center',
      },
     titleText: {
      alignItems: 'center',
      alignSelf:'center',
        color: 'white',
        fontWeight:'bold',
        fontSize:25,
        marginBottom:10,
       },
       titleText2: {
        alignItems: 'center',
        alignSelf:'center',
          color: 'white',
          fontSize:23,
          marginTop:30,
          marginBottom:10,
         },
         navBarBackButton: {
          justifyContent: 'flex-start',
          marginLeft:10,
          marginTop:10,
          height:35,
        },
        Alert_Main_View:{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor : "#03254c", 
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
          height: '28%',
          fontWeight:'bold'
        },
        Alert_Message:{
          fontSize: 22, 
          color: "#fff",
          textAlign: 'center',
          justifyContent:'center',
          padding:10
        },
    });