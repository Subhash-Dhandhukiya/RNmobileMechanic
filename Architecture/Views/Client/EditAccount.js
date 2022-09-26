import React, { Component } from "react";
import { StyleSheet, Text, View,TextInput,Button,Image,Alert,TouchableHighlight,
    StatusBar, SafeAreaView, TouchableOpacity, Platform , BackHandler} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {MaterialCommunityIcons} from 'react-native-vector-icons/FontAwesome';
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from "react-native-image-picker";
import ProfileViewModel from "../../ViewModels/ProfileViewModel";
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import ImgToBase64 from 'react-native-image-base64';
var userType = '';
var uri = '';
export default class EditAccount extends Component
 {
  constructor(props) {
    super(props);
    this.getUserName();
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

    componentWillMount() {
         this.getUserName();
         BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }

  state = {
    Alert_Visibility:false,
    filepath: {
      data: '',
      uri: ''
    },
    fileData: '',
    fileUri: '',
    email:'',
    profilePic:'',
    firstName:'',
    lastName:'',
    phoneNumber:'',
    userEmail : '',
    userFrstName : '',
    userLastName : '',
    userProfile:'',
    userPhone:'',
    imageBase64:'',
    }
  launchCamera = () => {
    this.setState({Alert_Visibility: false});
    console.log('capture cammera = ');
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      maxWidth: 350,
      maxHeight: 350,
      quality: 0.1,
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
      ImgToBase64.getBase64String(this.state.fileUri)
      .then(base64String => {
        this.setState({ imageBase64 : base64String})
      })
      .catch(err => console.log('Base64 String error : ',err));
      }
    });
  }

  chooseImage = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      maxWidth: 350,
      maxHeight: 350,
      quality: 0.1,
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
  Show_Custom_Alert(visible) {
 
    this.setState({Alert_Visibility: visible});
    
  }

  validateFirstName = (text) =>{
    console.log(text);
    let reg = /^[a-zA-Z ]{2,40}([a-zA-Z ]{2,40})+$/;
    if (reg.test(text) === false) {
      console.log('Firstname is not correct');
      this.setState({userFrstName: text});
      return false;
    } else {
      this.setState({userFrstName: text});
      console.log('Firstname is correct');
    }
  };
  validateLastName = (text) =>{
    console.log(text);
    let reg = /^[a-zA-Z ]{2,40}([a-zA-Z ]{2,40})+$/;
    if (reg.test(text) === false) {
      console.log('Lastname is not correct');
      this.setState({userLastName: text});
      return false;
    } else {
      this.setState({userLastName: text});
      console.log('Lastname is correct');
    }
  };
  validatePhone = (text) =>{
    console.log(text);
    let reg = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
     if (reg.test(text) === false) {
      console.log('Mobile number is Not Correct');
      this.setState({userPhone: text});
      return false;
    } else {
      this.setState({userPhone: text});
      console.log('Mobile Number is Correct');
    }
  };


  _getStorageProfileValue = async (frstName, lastName, profile,emailId,phone) => {
    await AsyncStorage.setItem('userFrstName',frstName);
    await AsyncStorage.setItem('userLastName',lastName);
    await AsyncStorage.setItem('profileImg',profile);
    await AsyncStorage.setItem('userEmail',emailId);
    await AsyncStorage.setItem('userPhone',phone);
    let userFirstname = await AsyncStorage.getItem('userFrstName');
    let userLaststname = await AsyncStorage.getItem('userLastName');
    let userProfile = await AsyncStorage.getItem('profileImg');
    let userEmail = await AsyncStorage.getItem('userEmail');
    let userPhone = await AsyncStorage.getItem('userPhone');
    
   console.log('Profilevalue : ',userFirstname, userLaststname ,userProfile, userEmail, userPhone)
   return userFirstname
  }

  onClientProfileView = async() => {
    ProfileViewModel.onViewClientProfile().then(
      async (response,error) =>  {
     console.log('Client profile output',response.RESPONSE_DATA);
     if (response.RESPONSE_CODE == 200){
       console.log('Profiledata updated for client');
       await AsyncStorage.removeItem("userFrstName");
       await AsyncStorage.removeItem("userLastName");
       await AsyncStorage.removeItem("profileImg");
       await AsyncStorage.removeItem("userPhone");
       await AsyncStorage.removeItem("userEmail");
       if (response.RESPONSE_DATA === null){
         this._getStorageProfileValue("","","","","");
       }else{
         this._getStorageProfileValue(response.RESPONSE_DATA.first_name,response.RESPONSE_DATA.last_name,response.RESPONSE_DATA.profile_image,
           response.RESPONSE_DATA.user_email,response.RESPONSE_DATA.phone);
       }
      //  this.props.navigation.navigate('Home');
       this.props.navigation.reset({
        index: 3,
        routes: [{name: 'Home'}],
      });
     }else{
       alert('Something went wrong, please try again');
     }
  });
  }

  onMechanicProfileView = async() => {
    ProfileViewModel.onViewMechanicProfile().then(
      async (response,error) => {
      console.log('Mechanic profile output',response.RESPONSE_DATA);
      if (response.RESPONSE_CODE == 200){
       console.log('Profiledata updated for mechanic');
       await AsyncStorage.removeItem("userFrstName");
       await AsyncStorage.removeItem("userLastName");
       await AsyncStorage.removeItem("profileImg");
       await AsyncStorage.removeItem("userPhone");
       await AsyncStorage.removeItem("userEmail");
       if (response.RESPONSE_DATA === null){
        this._getStorageProfileValue("","","","","");
      }else{
      this._getStorageProfileValue(response.RESPONSE_DATA.first_name,response.RESPONSE_DATA.last_name,response.RESPONSE_DATA.profile_image,
        response.RESPONSE_DATA.user_email,response.RESPONSE_DATA.phone);
      }
      // this.props.navigation.navigate('Home');
      this.props.navigation.reset({
        index: 3,
        routes: [{name: 'Home'}],
      });
      }else{
        alert('Something went wrong, please try again');
      }
   });
  }

  onClickSaveListener = async () =>{
    // const storage = new MMKV();
    userType = await AsyncStorage.getItem('userType');
    console.log('user_type',userType);
    if (userType == "4"){
      ProfileViewModel.onClientProfileUpdate(this.state.userFrstName,this.state.userLastName,
        this.state.fileUri,this.state.userPhone).then((response,error) => {
        //get callback here
        console.log('Output',response)
        if (response.RESPONSE_CODE == 200){
          this.onClientProfileView();
          alert('Successfully updated the profile');
        }else{
          alert('Something went wrong, please try again');
        }
     });
    }else{
      ProfileViewModel.onMechanicProfileUpdate(this.state.userFrstName,this.state.userLastName,this.state.fileUri,this.state.userPhone,"").then((response,error) => {
        //get callback here
        console.log('Output',response)
        if (response.RESPONSE_CODE == 200){
          this.onMechanicProfileView();
          alert('Successfully updated the profile');
        }else{
          alert('Something went wrong, please try again');
        }
     });
    }
     
  };
  onClickChangePassword(){
    this.props.navigation.navigate('ChangePassword');
  };
  onClickVehiclesdListener(){
    console.log('Vehicleneeds btn clicked');
    //this.props.navigation.navigate('VehicleNeedAdd');
  };
  onClickAddressListener(){
    console.log('Addaddress btn clicked');
    //this.props.navigation.navigate('AddAddress');
  };
  onClickPaymentAddressListener(){
    this.props.navigation.navigate('App');
  };

  renderFileUri() {
    var uri = '';
    uri = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLIbLTGKz4waJGU2vkbhQkRavjf2OdeY7Eo4l8yFnggdF3fX1bUF4FEUP13o34ioSCm-M&usqp=CAU';
    console.log('******** : ', this.state.userProfile);
    if (this.state.userProfile == '' || this.state.userProfile == null){
        uri = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLIbLTGKz4waJGU2vkbhQkRavjf2OdeY7Eo4l8yFnggdF3fX1bUF4FEUP13o34ioSCm-M&usqp=CAU';
    }else{
      uri = this.state.userProfile;
    }

    if (this.state.fileUri) {
      return <TouchableOpacity onPress={() => { this.Show_Custom_Alert(true) }}><Image
        source={{ uri: this.state.fileUri }}
        style={{width: 40, height: 40,borderRadius: 40/ 2,marginTop:15, marginRight:10} } 
      />
      </TouchableOpacity>
    } else {
      return<TouchableOpacity onPress={() => { this.Show_Custom_Alert(true) }}  >
      <Image
      source={{uri:uri}}
      style={{width: 40, height: 40,borderRadius: 40/ 2,marginTop:15, marginRight:10} }
    />
    </TouchableOpacity>  
    }
  }
  
    render() {   

        return (
            
          <>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView style={styles.maincontainer}>
          <TouchableOpacity style={styles.navBarBackButton} onPress={() => this.handleBackButtonClick()}>
            <Icon name="chevron-left" color='gray' size={30}/>
            </TouchableOpacity>
          <View style={styles.container}>

          <View style={{ flexDirection: "row", marginTop:15, }}>
          <Text style={{color:'white',//'#2F4F4F',
        fontWeight:"normal",
        justifyContent:"center",
        alignSelf:"center",
        fontSize:15,
        marginLeft:20,}}>Profile Photo</Text>
          <TouchableOpacity style={styles.navBarLeftButton} >
              {this.renderFileUri()}
          </TouchableOpacity>
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

          <TouchableOpacity onPress={ () => { this.Show_Custom_Alert(false)} }>
             <Text style={styles.Alert_Message}> Dismiss</Text>

</TouchableOpacity>
        
        
      </View>

  </View>


</Modal>
          </View>

     <View style={{ flexDirection: "row", justifyContent:"space-around",marginTop:10, borderColor:'#A9A9A9',borderWidth:1,backgroundColor: '#FFFFFF',
    borderRadius:30}}>
          <Text style={styles.textContainer}> First Name</Text>
       <View style={styles.navBarLeftButton}>
       <TextInput style={styles.textInputs}
           placeholder = {this.state.userFrstName}
           value = {this.state.userFrstName}
           placeholderTextColor = 'black'//'#A9A9A9'
           keyboardType="name-phone-pad"
           underlineColorAndroid='transparent'
           color='black'
           onChangeText={(text) => this.validateFirstName(text)}
       />
     </View>
     </View>
     <View style={{ flexDirection: "row", justifyContent:"space-around",marginTop:10, borderColor:'#A9A9A9',borderWidth:1,backgroundColor: '#FFFFFF',
    borderRadius:30}}>
          <Text style={styles.textContainer}> Last Name</Text>
       <View style={styles.navBarLeftButton}>
       <TextInput style={styles.textInputs}
           placeholder = {this.state.userLastName}
           value = {this.state.userLastName}
           placeholderTextColor = 'black'//'#A9A9A9'
           keyboardType="name-phone-pad"
           underlineColorAndroid='transparent'
           color='black'
           onChangeText={(text) => this.validateLastName(text)}
       />
     </View>
     </View>

     <View style={{ flexDirection: "row",   justifyContent:"space-between",marginTop:10, borderColor:'#A9A9A9',borderWidth:1,backgroundColor: '#FFFFFF',
    borderRadius:30, backgroundColor:'#d3d3d3'}}>
          <Text style={styles.textContainer}  >Email</Text>
          <View style={styles.navBarLeftButton}>
            <Text style={{color: 'black', fontWeight:'bold'}}>
             {this.state.userEmail}
            </Text>
     </View>
        
   </View>
   <View style={{ flexDirection: "row",   justifyContent:"space-between",marginTop:10, borderColor:'#A9A9A9',borderWidth:1,backgroundColor: '#FFFFFF',
    borderRadius:30}}>
          <Text style={styles.textContainer}>Phone Number</Text>

          <View style={styles.navBarLeftButton}>
       <TextInput style={styles.textInputs}
           placeholder = {this.state.userPhone}
           placeholderTextColor = 'black'//'#A9A9A9'
           keyboardType='phone-pad'
           underlineColorAndroid='transparent'
           color='black'
           onChangeText={(text) => this.validatePhone(text)}
           value={this.state.userPhone}
           
       />
     </View>
   </View>  
   <TouchableOpacity style={[styles.buttonContainer]} onPress={() => this.onClickSaveListener()} >
   <Text style={styles.logoutTextContainer}>Update</Text>     
    </TouchableOpacity> 
  
          </View>
          </SafeAreaView>
            </>
        );
 }



 getUserName = async () => {
   this.setState({userFrstName : await AsyncStorage.getItem('userFrstName')});
   this.setState({userLastName : await AsyncStorage.getItem('userLastName')});
   this.setState({userEmail : await AsyncStorage.getItem('userEmail')});
   this.setState({userPhone : await AsyncStorage.getItem('userPhone')});
   this.setState({userProfile : await AsyncStorage.getItem('profileImg')});
  // await AsyncStorage.getItem('userName').then((value) => this.setState({ userName : value }))
  // await AsyncStorage.getItem('userEmail').then((value) => this.setState({ userEmail : value }))
  // await AsyncStorage.getItem('userProile').then((value) => this.setState({ userProile : value }))
  // await AsyncStorage.getItem('userPhone').then((value) => this.setState({ userPhone : value }))
  console.log('Profile<><><>value :<><><><><><><><> ',this.state.userName)
 
 return userType;
}
}
 const styles = StyleSheet.create({
   
  Alert_Main_View:{

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor : "#009688", 
    height: 220 ,
    width: '90%',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius:7,
   
  },
  maincontainer: {
    height:"100%",
    width:'100%',
    flexDirection:'column',
    backgroundColor: '#002458',
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
    container: {
      flexDirection:'column',
       // backgroundColor: '#FFFFFF',
      alignItems: 'center',
      marginBottom:0,
      marginTop:0
    },
    nameContainer:{
        marginTop:5,
        marginBottom:10,
        justifyContent: 'center',
        alignItems: 'center',
        color:'#2F4F4F',
        fontWeight:"bold",
        fontSize:15,
      },
     textContainer:{
       color:'#2F4F4F',
        fontWeight:"normal",
        justifyContent:"center",
        alignSelf:"center",
        fontSize:15,
        marginLeft:20,
      },
      inputs:{
        marginLeft:16,
        borderBottomColor: '#FFFFFF',    
      },
      imageContainer:{
        color:'#2F4F4F',
         fontWeight:"normal",
         justifyContent:"center",
         alignSelf:"center",
         height:30,
         weidth :30,
         marginLeft:10,
       },
    
    inputContainer: {
      borderColor:'#A9A9A9',
      borderWidth:0,
      flex:0.7,
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      marginLeft:20,
      width:"55%",
      marginRight:20,
      height:45,
      justifyContent:'space-around',
      flexDirection: 'row',
      textAlign:"center",
      alignSelf:"flex-end",
      alignItems:'center'
  },

  bottomTextContainer:{
    color:'#5C5CFF',
     fontWeight:"normal",
     marginTop:35,
     justifyContent:"center",
     alignSelf:"center",
     fontSize:15,

   },
   logoutTextContainer:{
      color:'black',
     fontWeight:"bold",
     justifyContent:"center",
     alignSelf:"center",
     fontSize:20,

   },
   buttonContainer: {
    height:50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    marginTop:15,
    marginBottom:10,
    width:250,
    borderRadius:30,
    backgroundColor:'#FDD248',
  },
  navBarLeftButton: {
    paddingLeft: 15,
    width: "50%",
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight:20,
    height:45,
  },
  navBarButton: {
    borderColor:'#A9A9A9',
    borderWidth:1,
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    paddingLeft: 15,
    width: 100,
    flex: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-arround',
    marginRight:20,
    height:45,
  },
  textInputs:{
    height:45,
    width:'50%',
    color:"black",
    marginLeft:50,
    textAlign:'right',
    // alignSelf:'center',
    // alignItems:'center',
    // justifyContent: 'center',
    // alignContent:'center',
    borderBottomColor: '#FFFFFF',
    // flex:1,
},
navBarBackButton: {
    // paddingLeft: 15,
    // flex: 1,
    justifyContent: 'flex-start',
    marginLeft:10,
     marginTop:10,
    height:35,
  }
  
});