import React, { Component } from "react";
import { StyleSheet, Text, View,TextInput,Button,Image,Alert,TouchableHighlight,
    StatusBar, SafeAreaView, TouchableOpacity,FlatList,BackHandler, TouchableWithoutFeedback, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-material-dropdown-v2-fixed';
import AddressViewModel from "../../ViewModels/AddressViewModel";
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import HelpRequestViewModel from "../../ViewModels/HelpRequestViewModel";
import ProfileViewModel from "../../ViewModels/ProfileViewModel";
import Loader from "../Loader";

var userType = '';
var selfDescription = '';

export default class SelfDescription extends Component
 {

  constructor(props) {
    super(props);
    this.getUserName();
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  state=
  {
    mechanic:false,
    subject:'',
    description:'',
    userFrstName:'',
    userLastName:'',
    userEmail:'',
    userPhone:'',
    userProfile:'',
    loading:false,
  }

  componentWillMount = async () => {
    userType = await AsyncStorage.getItem('userType');
    console.log('***',userType);
    this.getUserName();
    selfDescription = await AsyncStorage.getItem('self_des');
    this.setState({description : selfDescription});
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
   this.props.navigation.goBack(null);
   return true;
  }

  onClickGenerateListner(){
    this.setState({loading: true});
   const NetInfo = require("@react-native-community/netinfo"); 
   NetInfo.fetch().then(state => {
   if (state.isConnected == true) {
    // let reg = /[^0-9a-zA-Z]/;
    let reg = /^\w(\w(\.{1}|\s{1})?)+\w$/;
    if (this.state.description === '') {
      this.setState({loading: false});
      alert('Please enter self description');
      return false;
    } 
    else  if (reg.test(this.state.description) === false) {
      console.log('Email is not correct');
      this.setState({loading: false});
      alert('Self description is not valid');
      return false;
    }else{
    ProfileViewModel.onMechanicProfileUpdate(this.state.userFrstName,this.state.userLastName,this.state.userProfile,this.state.userPhone,this.state.description).then((response,error) => {
      //get callback here
      console.log('Output',response)
      if (response.RESPONSE_CODE == 200){
        this.setState({loading: false});
        this.onMechanicProfileView();
        alert('Successfully updated the self description');
      }else{
        this.setState({loading: false});
        alert('Something went wrong, please try again');
      }
   });
  }
  }else{
    this.setState({loading: false});
    alert("Please check your internet connection");
  }
  });  
  }

  onMechanicProfileView = async() => {
    ProfileViewModel.onViewMechanicProfile().then(
      async (response,error) => {
      console.log('Mechanic profile output',response.RESPONSE_DATA);
      if (response.RESPONSE_CODE == 200){
        this.setState({loading: false});
       console.log('Profiledata updated for mechanic');
      // this.props.navigation.navigate('Home');
      this.props.navigation.reset({
        index: 3,
        routes: [{name: 'Home'}],
      });
      }else{
        this.setState({loading: false});
        alert('Something went wrong, please try again');
      }
   });
  }

  validateSubject = (text) =>{
    console.log(text);
    let reg = /^[a-zA-Z ]{2,40}([a-zA-Z ]{2,40})+$/;
    if (reg.test(text) === false) {
      console.log('Subject is Not Correct');
      this.setState({subject: text});
      return false;
    } else {
      this.setState({subject: text});
      console.log('Subject is Correct');
    }
  };

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

  actionOnRow(item) {
      console.log('Selected Item :',item);
      this.props.navigation.navigate('EditHelpRequest',{passData:item});
   }

   getUserName = async () => {
    this.setState({userFrstName : await AsyncStorage.getItem('userFrstName')});
    this.setState({userLastName : await AsyncStorage.getItem('userLastName')});
    this.setState({userEmail : await AsyncStorage.getItem('userEmail')});
    this.setState({userPhone : await AsyncStorage.getItem('userPhone')});
    this.setState({userProfile : await AsyncStorage.getItem('profileImg')});
   console.log('Profile<><><>value :<><><><><><><><> ',this.state.userName)
  
    return userType;
  };
 
    render() {
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
        <Text style={styles.titleText}>Self Description</Text>
          {/* <Text style={{alignItems: 'center',alignSelf:'center',color: 'white',fontWeight:'bold',fontSize:27,marginBottom:10,
        marginTop:35}}>
            Generate Help Request</Text>
          <Text style={{color: 'white',fontWeight:'400',fontSize:23,marginLeft:15,marginTop:10,marginBottom:10,}}>
            Subject
          </Text>
          <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
           placeholder = "Subject"
           placeholderTextColor = '#A9A9A9'
           keyboardType="default"
           underlineColorAndroid='transparent'
           onChangeText={(text) => this.validateSubject(text)}
           value={this.state.subject}
           />
          </View> */}

          <Text style={{color: 'white',fontWeight:'400',fontSize:20,marginLeft:8,marginRight:8,marginTop:10,marginBottom:10,}}>
          Provide an overview of your experience as a mechanic. Potential clients will use this history to choose to hire you.
          </Text>
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

          <TouchableOpacity style={[styles.buttonContainer, styles.connectButton]} onPress={() => this.onClickGenerateListner()} >
              <Text style={styles.connectText}>Update</Text>
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
      marginTop:5,
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
  textContainer:{
    color:'#2F4F4F',
     fontWeight:"normal",
 
     justifyContent:"center",
     alignSelf:"center",
    flex:0.3,
     fontSize:15,
     marginLeft:15,
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
        marginLeft:10,
        marginRight:10,
        height:45,
        paddingLeft:10,
        marginTop:10,
        justifyContent:'flex-start',
        flexDirection: 'row',
        alignItems:'center'
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
    buttonContainer: {
      height:50,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf:'center',
      marginTop:15,
      marginBottom:10,
      width:'75%',
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
      width:200,
      borderRadius:8,
    },
    listButton: {
      backgroundColor:'#229aca',
    },
    listTitleText: {
     color: 'white',
     fontWeight:'normal',
     alignSelf:'flex-start',
     fontSize:20,
     fontWeight:'bold',
     marginBottom:8,
    },
    listAddressText: {
        color: 'white',
        fontWeight:'normal',
        alignSelf:'flex-start',
        fontSize:15,
        marginBottom:3,
       },
   titleText: {
      alignItems: 'center',
      alignSelf:'center',
      color: 'white',
      fontWeight:'bold',
      fontSize:25,
      marginBottom:20,
     },
     titleText2: {
      alignItems: 'center',
      alignSelf:'center',
        color: 'white',
        fontSize:23,
        marginTop:25,
        marginBottom:10,
       },
       navBarBackButton: {
        justifyContent: 'flex-start',
        marginLeft:10,
        marginTop:10,
        height:35,
      },
      dropDownContainer:{
        borderColor:'#A9A9A9',
        backgroundColor : 'white',
        height:40,
        flexDirection: 'row',
        justifyContent : 'center',
        width:'100%',
      },
      inputs:{
        height:45,
        marginLeft:16,
        fontSize:20,
        color:"black",
        borderBottomColor: '#FFFFFF',
        flex:1,
    },
    msgInputs:{
      height:200,
      marginLeft:16,
      fontSize:20,
      maxHeight:400,
      borderBottomColor: '#FFFFFF',
      flex:1,
      color:"black",
  },
  });