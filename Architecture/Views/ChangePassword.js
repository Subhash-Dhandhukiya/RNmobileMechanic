import React, { Component } from "react";
import { StyleSheet, Text, View,TextInput,Button,Image,Alert,TouchableHighlight,
   StatusBar, SafeAreaView, TouchableOpacity, BackHandler, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import ChangePasswordViewModel from "../ViewModels/ChangePasswordViewModel";
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import Loader from "./Loader";

export default class ChangePassword extends Component
{
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    state = {
      email:'',
      currentPassword:'',
      newPassword:'',
      reenterPassword:'',
    }
  }
  state = {
    termsAccepted: false,
    email: '', 
    currentPassword:'',
    newPassword:'',
    reenterPassword:'',
    hidePassword:true,
    loading:false,
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
}

componentDidUnmount() {
   BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}

handleBackButtonClick() {
   this.props.navigation.goBack(null);
   return true;
}

  setPasswordVisibility = () => {
    this.setState({ hidePassword: !this.state.hidePassword });
  }

  onClickListener(){
    alert("Change Password Pressed");
    this.setState({email : '', password : '',termsAccepted: false});
  }
  onClickRegisterListener(){
    this.props.navigation.navigate('Register');
    this.setState({email : '', password : '',termsAccepted: false});
  }

  onClickChangePswdBtn = async () => {
    this.setState({loading: true});
    let crntPswd = await AsyncStorage.getItem('currentPswd');
    this.setState({loading:true});
    var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    if (this.state.currentPassword === '') {
      this.setState({loading: false});
      alert('Please enter current password');
      return false;
    }
    else if (this.state.currentPassword != crntPswd){ 
      this.setState({loading: false});
      alert('Please check entered current password');
      return false;
    }
    else  if (this.state.newPassword === '') {
      this.setState({loading: false});
      alert('Please enter new password');
      return false;
    } 
    else if (regularExpression.test(this.state.newPassword) === false) {
      this.setState({loading: false});
      alert('New password is not valid, it must contain atleast 1 lowercase alphabet, 1 uppercase alphabet, 1 numeric, 1 special character, and also must be 8 characters or longer');
      return false;
    }else if (this.state.newPassword == this.state.currentPassword) {
      this.setState({loading: false});
      alert('New password entered should not be same as current password');
      return false;
    }  
    else  if (this.state.reenterPassword === '') {
      this.setState({loading: false});
        alert('Please re-enter password');
        return false;
      } 
    else if (regularExpression.test(this.state.reenterPassword) === false) {
      this.setState({loading: false});
        alert('Re-entered password is not valid, it must contain atleast 1 lowercase alphabet, 1 uppercase alphabet, 1 numeric, 1 special character, and also must be 8 characters or longer');
        return false;
      } 
    else if (this.state.reenterPassword != this.state.newPassword) {
      this.setState({loading: false});
        alert('Re-entered password is not same as new password, pleases check and re-enter again');
        return false;
      } 
    else {//i'm going to diconect now ok?
      ChangePasswordViewModel.onChangePswdAction(this.state.currentPassword,this.state.newPassword).then(
        async (response,error) => {
          //get callback here
          console.log('Output',response)
          if (response.RESPONSE_CODE == 200){
            this.setState({loading: false});
            Alert.alert('Password changed successfully');
            // const asyncStorageKeys = await AsyncStorage.getAllKeys();
            // if (asyncStorageKeys.length > 0) {
            //   if (Platform.OS === 'android') {
            //     await AsyncStorage.clear();
            //   }
            //   if (Platform.OS === 'ios') {
            //     await AsyncStorage.multiRemove(asyncStorageKeys);
            //   }
            // }
            // this.props.navigation.navigate('Home');
            this.props.navigation.reset({
              index: 3,
              routes: [{name: 'Home'}],
            });
          }else{
            this.setState({loading: false});
            alert('Something went wrong, please try again');
          }
       }
      );
      this.setState({loading: false});
      this.setState({currentPassword : '', newPassword : '',reenterPassword : '',});
    
    }
  }

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
  validateCurrentPassword = (text) => {
    var regularExpression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    console.log(text);
    if (regularExpression.test(text) === false) {
      this.setState({currentPassword: text});
      return false;
    } else {
      this.setState({currentPassword: text});
    }
  };
  validateNewPassword = (text) => {
    var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    console.log(text);
    if (regularExpression.test(text) === false) {
      this.setState({newPassword: text});
      return false;
    } else {
      this.setState({newPassword: text});
    }
  };
  validateReEnterPassword = (text) => {
    var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    console.log(text);
    if (regularExpression.test(text) === false) {
      this.setState({reenterPassword: text});
      return false;
    } else {
      this.setState({reenterPassword: text});
    }
  };
  

  render() {
    const { navigate } = this.props.navigation; 
    
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
        <View>
        {/* <Image
        source={require('../images/AppIntro/1.png')} 
        style={{ width: '100%', height: 150 }}
         />
        <Icon name="md-close" 
          style={{
                position: 'absolute',
                right: 5,
                top: 5,
          }} /> */}
        </View>
        <Text style={styles.forgotPasswordTitle}>Change Password</Text>
        <Text style={styles.forgotPswdText}>We just need your current password and new password to change the password.</Text>
 
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Current password"
              placeholderTextColor = '#A9A9A9'
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(text) => this.validateCurrentPassword(text)}
              value={this.state.currentPassword}
              />
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="New password"
              placeholderTextColor = '#A9A9A9'
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(text) => this.validateNewPassword(text)}
              value={this.state.newPassword}
              />
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Re-enter password"
              placeholderTextColor = '#A9A9A9'
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(text) => this.validateReEnterPassword(text)}
              value={this.state.reenterPassword}
              />
        </View>
        
        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickChangePswdBtn()}>
          <Text style={styles.resetPswdText}>Change Password</Text>
        </TouchableOpacity>

        {/* <View style={styles.signUpContainer} flexDirection="row" justifyContent='center' >
        <Text style={styles.accountText}>Don't have an account?</Text>
        <TouchableOpacity style={{ height:30 }} onPress={() => this.onClickRegisterListener()}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>
        </View> */}

      </View>
      </ScrollView>
      </SafeAreaView> 
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
    marginBottom:0,
    
  },
  maincontainer: {
    height:"100%",
    width:'100%',
    flexDirection:'column',
    backgroundColor: '#002458',
  },
  inputContainer: {
      borderColor:'#A9A9A9',
      borderWidth:1,
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      marginLeft:30,
      marginRight:30,
      height:45,
      marginBottom:15,
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
    // backgroundColor:'#a8a8a8',229aca
    backgroundColor:'#FDD248',
  },
  resetPswdText: {
    color: 'black',
    fontWeight:'bold',
    fontSize:20,
  },
  forgotPasswordTitle:{
    marginTop:80,
    marginBottom:10,
    justifyContent: 'center',
    alignItems: 'center',
    color:"white",//'#2F4F4F',
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
    color: "white",//'#2F4F4F',
    fontSize:20,
  },
  registerContainer:{
    // flex: 1,
    // justifyContent: 'flex-end',
    // marginBottom: 36,
    height:30,
    // fontSize:40,
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
      // marginLeft:20,
      // marginRight:20,
      height:30,
      marginBottom:20,
      marginTop:20,
      // justifyContent:'space-between',
      flexDirection: 'row',
      alignItems:'center',
    },
    signUpText:{
    marginRight:20,
    marginLeft:20,
    // marginTop:20,
    fontWeight:'bold',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign:'center',
    color:'#2F4F4F',
    fontSize:15,
    },
    forgotText:{
    justifyContent: 'center',
    alignItems: 'center',
    textAlign:'center',
    marginTop:0,
    color:'#2F4F4F',
    fontSize:15,
    },
    accountText:{
      // height:30,
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom:0,
      color:'#2F4F4F',
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
      navBarBackButton: {
        justifyContent: 'flex-start',
        marginLeft:20,
        height:35,
      }
    
});