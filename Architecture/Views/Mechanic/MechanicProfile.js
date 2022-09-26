import React, { Component } from "react";
import { StyleSheet, Text, View,TextInput,Button,Image,Alert,TouchableHighlight,
    StatusBar, SafeAreaView, TouchableOpacity, Platform} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {MaterialCommunityIcons} from 'react-native-vector-icons/FontAwesome';
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/FontAwesome';
import ProfileViewModel from "../../ViewModels/ProfileViewModel";


export default class MechanicProfile extends Component
 {
  constructor(props) {
    super(props);
        ProfileViewModel.onViewMechanicProfile().then(
            (response,error) => {
                //get callback here
                console.log('Output',response)
                if (response.RESPONSE_CODE == 200){
                  this.props.navigation.navigate('Profile');
                }else{
                  alert('Something went wrong, please try again');
                }
             }
        );
  }

  state = {
    Alert_Visibility:false,
    filepath: {
      data: '',
      uri: ''
    },
    fileData: '',
    fileUri: ''
    }
  launchCamera = () => {
    this.setState({Alert_Visibility: false});
    console.log('capture cammera = ');
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
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
      }
    });

  }

  chooseImage = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response = uti',  response.assets[0].uri );

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
      }
    });

  }
  Show_Custom_Alert(visible) {
 
    this.setState({Alert_Visibility: visible});
    
  }
  onClickLogoutListener(){
    this.props.navigation.navigate('App');
  };
  onClickEditAccount(){
    this.props.navigation.navigate('EditAccount');
  };
  onClickChangePassword(){
    this.props.navigation.navigate('ChangePassword');
  };
  onClickVehiclesdListener(){
    this.props.navigation.navigate('VehicleNeedAdd');
  };
  onClickAddressListener(){
    this.props.navigation.navigate('AddAddress');
  };
  onClickPaymentAddressListener(){
    this.props.navigation.navigate('App');
  };

  renderFileUri() {
      return<Image
      source={{uri:"https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg?size=626&ext=jpg"}}
      style={{width: 150, height: 150,borderRadius: 150/ 2,marginTop:20} } 
    />
  }
    render() {
     
        return (
          <>
          <StatusBar barStyle="dark-content" />
          {/* <SafeAreaView> */}
          <View style={styles.container}>
          {this.renderFileUri()}
          <Text style={styles.nameContainer}>John Doe</Text>
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

          <View style={{ flexDirection: "row", marginTop:15, }}>
          <Text style={styles.textContainer}>Account</Text>
          <TouchableOpacity style={styles.inputContainer} onPress={() => this.onClickEditAccount()}>
              <Text style={styles.inputs}>
                bainslabs@mobilemech.com
              </Text>
          </TouchableOpacity>
          </View>
     <View style={{ flexDirection: "row",   justifyContent:"space-around",marginTop:10, }}>
          <Text style={styles.textContainer}>Change Password</Text>
      <TouchableOpacity style={styles.navBarLeftButton} onPress={() => this.onClickChangePassword()}>
          <Text style={styles.buttonText}>
            <Icon name="chevron-right" color='gray' size={20}/>
          </Text>
      </TouchableOpacity>
     </View>
     <View style={{ flexDirection: "row",   justifyContent:"space-around",marginTop:10, }}>
          <Text style={styles.textContainer}>Vehicles</Text>
     <TouchableOpacity style={styles.navBarLeftButton} onPress={() => this.onClickVehiclesdListener()}>
          <Text style={styles.buttonText}>
            <Icon name="chevron-right" color='gray' size={20}/>
          </Text>
      </TouchableOpacity>
     </View>
     <View style={{ flexDirection: "row",   justifyContent:"space-between",marginTop:10, }}>
          <Text style={styles.textContainer}  >Address</Text>
        <TouchableOpacity style={styles.navBarLeftButton} onPress={() => this.onClickAddressListener()}>
            <Text style={styles.buttonText}>
              <Icon name="chevron-right" color='gray' size={20}/>
            </Text>
        </TouchableOpacity>
   </View>
   <View style={{ flexDirection: "row",   justifyContent:"space-between",marginTop:10, }}>
          <Text style={styles.textContainer}>Payment Address</Text>

          <TouchableOpacity style={styles.navBarLeftButton} >
            <Text style={styles.buttonText}>
              <Icon name="chevron-right" color='gray' size={20}/>
            </Text>
          </TouchableOpacity>
   </View>  
   <TouchableOpacity style={[styles.buttonContainer]}  >
   <Text style={styles.logoutTextContainer}>Become a Mechanic</Text>     
    </TouchableOpacity> 

   <TouchableOpacity style={[styles.buttonContainer]} onPress={() => this.onClickLogoutListener()} >
   <Text style={styles.logoutTextContainer}>Logout</Text>     
    </TouchableOpacity> 
  
          </View>
            </>
        );
 }
}
 const styles = StyleSheet.create({
    container: {

      flexDirection:'column',
       // backgroundColor: '#FFFFFF',
      alignItems: 'center',
      marginTop: Platform.OS == "ios" ? 50 : 25,
      marginBottom:0,
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
       flex:0.3,
        fontSize:15,
        marginLeft:15,
      },
      inputs:{
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        justifyContent:"center",    
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
      color:'white',
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
    backgroundColor:'#229aca',
  },
  navBarLeftButton: {
    paddingLeft: 15,
    width: 100,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight:20,
    height:45,
  }
  
});