import React, { Component } from "react";
import { StyleSheet, Text, View,TextInput,Button,Image,Alert,TouchableHighlight,
   StatusBar, SafeAreaView, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {NetInfo, useNetInfo} from "@react-native-community/netinfo";
import ForgotPasswordViewModel from "../ViewModels/ForgotPasswordViewModel";
import { Dropdown } from 'react-native-material-dropdown-v2-fixed';
import Loader from "./Loader";

const data = [{value:'Client', id: 4},
      {value:'Mechanic',id: 3}];
let userType = "";

export default class ForgotPassword extends Component
{
  
  constructor(props) {
    super(props);
    state = {
      email:'',
      connection_Status:'',
    }
  }
  state = {
    termsAccepted: false,
    email: '', 
    connection_Status:'',
    selectedType:'',
    loading:false,
  }
 

    handleCheckBox = () => this.setState({ termsAccepted: !this.state.termsAccepted })


  validate = (text) => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      console.log('Email is Not Correct');
      this.setState({email: text});
      return false;
    } else {
      this.setState({email: text});
      console.log('Email is Correct');
    }
  };
  onClickListener = (id) => {
    const elementsIndex = data.findIndex(
      (element) => element.value == id,
    );
     const selectedAreaId = data[elementsIndex].id;
     this.setState({selectedType: selectedAreaId});
    console.log('UsertypeId : ', selectedAreaId);
    userType = selectedAreaId;
  };
  resetPswdButtonClicked = () => { 
    this.setState({loading: true});
   const NetInfo = require("@react-native-community/netinfo"); 
   NetInfo.fetch().then(state => {
   if (state.isConnected == true) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (this.state.selectedType === ''){
      this.setState({loading: false});
      alert('Please choose usertype');
      return false;
    }else if (this.state.email === '') {
      this.setState({loading: false});
      alert('Please enter email address');
      return false;
    } 
    else  if (reg.test(this.state.email) === false) {
      console.log('Email is not correct');
      this.setState({loading: false});
      alert('Email is not valid');
      return false;
    } 
    else {
      ForgotPasswordViewModel.onForgotPswdAction(this.state.email, this.state.selectedType).then(
        (response,error) => {
          //get callback here
          console.log('Output',response)
          if (response.RESPONSE_CODE == 200){
            this.setState({loading: false});
            alert('Successfully sent email for reset password')
            this.props.navigation.navigate('App');
          }else{
            this.setState({loading: false});
            alert('Something went wrong, please try again');
          }
       }
      );
      this.setState({email : ''});
    }
  }else{
    alert("Please check your internet connection");
  }
  });
  };
  onClickRegisterListener(){
    this.props.navigation.navigate('Register');
    this.setState({email : ''});
  };

  render() {
    const { navigate } = this.props.navigation; 
    
    return (
      <>
      <Loader loading={this.state.loading} />
      <StatusBar barStyle="dark-content" />
      {/* <KeyboardAwareScrollView style={{flex: 1}}
                innerRef={ref => {
                this.scroll = ref
              }}> */}
      <View style={styles.container}>
       <Image
          style={{alignSelf:'center', marginTop:75, width:185, height : 160, borderRadius: 15}}
          source={require('../assets/logo1.png')}
        />
        <Text style={styles.forgotPasswordTitle}>Forgot Password?</Text>
        <Text style={styles.forgotPswdText}>We just need your registerd email to send you password reset link</Text>
        <View style={{ flexDirection: "row",alignSelf:'center',marginLeft:15 }}>   
        </View>
        <View >
            <Dropdown style={styles.dropDownContainer}
              placeholder='Select type'
              underlineColor='transparent'
              iconColor='#E1E1E1'
              placeholderTextColor="#1B1E5C"
              useNativeDriver={false}
              animationDuration={0}
              data={data}
              onChangeText={(id) => this.onClickListener(id)}
              value={this.state.selectedType}
            /> 
         </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Registered Email"
              placeholderTextColor = '#A9A9A9'
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(text) => this.validate(text)}
              value={this.state.email}
              />
        </View>
        
        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.resetPswdButtonClicked()}>
          <Text style={styles.resetPswdText}>Reset Password</Text>
        </TouchableOpacity> 

        <View style={styles.signUpContainer} flexDirection="row" justifyContent='center' >
        <Text style={styles.accountText}>Don't have an account?</Text>
        <TouchableOpacity style={{ height:30 }} onPress={() => this.onClickRegisterListener()}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>
        </View>
      </View>
      {/* </KeyboardAwareScrollView> */}
      </>
    );
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor:'#002458',
    marginBottom:0,
    
  },
  inputContainer: {
      borderColor:'#A9A9A9',
      borderWidth:1,
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      marginLeft:30,
      marginRight:30,
      height:45,
      marginBottom:30,
      marginTop:10,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
      color:"black"
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor:'#FDD248',
  },
  resetPswdText: {
    color: '#4C4B0E',
    fontWeight:'bold',
    fontSize:20,
  },
  forgotPasswordTitle:{
    marginTop:30,
    marginBottom:10,
    justifyContent: 'center',
    alignItems: 'center',
    color:'white', //'#2F4F4F',
    fontWeight:"bold",
    fontSize:25,
  },
  forgotPswdText:{
    marginBottom:20,
    marginRight:20,
    marginLeft:20,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign:'center',
    color:'white', //'#2F4F4F',
    fontSize:20,
  },
  registerContainer:{
    height:30,
    fontWeight:'bold',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom:0,
    color:'#2F4F4F',
    alignSelf:'center',
    borderRadius:30,

  },
  resetContainer:{
    height:30,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop:0,
    marginBottom:18,
    color:'#2F4F4F',
    alignItems: 'center',
    borderRadius:30,
  },
    loggedInContainer:{
      // marginLeft:20,
      marginRight:80,
      height:30,
      marginBottom:20,
      justifyContent:'flex-start',
      flexDirection: 'row',
      alignItems:'center',
    },
    logContainer:{
      height:30,
      marginBottom:20,
      marginTop:20,
      flexDirection: 'row',
      alignItems:'center',
    },
    signUpText:{
    marginRight:20,
    marginLeft:20,
    fontWeight:'bold',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign:'center',
    color: 'white', //'#2F4F4F',
    fontSize:15,
    },
    forgotText:{
    justifyContent: 'center',
    alignItems: 'center',
    textAlign:'center',
    marginTop:0,
    color:'white', //'#2F4F4F',
    fontSize:15,
    },
    accountText:{
      height:30,
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom:0,
      color:'white', //'#2F4F4F',
      alignItems: 'center',
      textAlign:'center',
      fontSize:15,
      borderRadius:30,
    },
    signUpContainer:{
      flex:1,
      justifyContent:'flex-end',
    },
    radioCircle: {
      height: 30,
      width: 30,
      borderRadius: 100,
      borderWidth: 2,
      alignSelf:'center',
      marginRight:8,
      marginTop:7,
      borderColor: '#108210',
      alignItems: 'center',
      justifyContent: 'center',
    },
    selectedRb: {
      width: 15,
      height: 15,
      borderRadius: 50,
      backgroundColor: '#010801',
      },
      dropDownContainer:{
        borderColor:'white',
        borderWidth:1,
        backgroundColor :'white',
        borderRadius:30,
        borderTopEndRadius:30,
        borderTopRightRadius:30,
        borderTopLeftRadius:30,
        height:45,
        marginBottom:15,
        marginTop:25,
        flexDirection: 'row',
        justifyContent : 'space-evenly',
        alignSelf:'center',
        alignItems:'center',
        width:'90%',
},
    
});