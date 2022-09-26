import React, { Component } from "react";
import { StyleSheet, Text, View,TextInput,Button,Image,Alert,TouchableHighlight,
    StatusBar, SafeAreaView, TouchableOpacity,FlatList,BackHandler, TouchableWithoutFeedback, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/FontAwesome';
import { Checkbox } from "react-native-paper";
import CheckBox from 'react-native-check-box';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-material-dropdown-v2-fixed';
import AddressViewModel from "../../ViewModels/AddressViewModel";
import  AsyncStorage  from '@react-native-async-storage/async-storage';

var userType = '';
const data = [{value:'Andhra Pradesh', id: 0},
      {value:'Punjab',id: 1},  {value:'Haryana',id: 2},  {value:'Delhi',id: 3}, {value:'Tamil Nadu', id: 4}, {value:'Kerala', id: 5},
      {value:'Karnataka', id: 6},{value:'Maharastra', id: 7},{value:'Madhya Pradesh', id: 8},{value:'Rajastan', id: 9},{value:'Bihar', id: 10},
      {value:'Assam', id: 11},{value:'Orissa', id: 12}];
var startEdit = false;
var edited = false;
// var editImage = "data:image/png;base64,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";
var editImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABLhJREFUeNrsmldoVEEUhjdl3ZiIicbYYgkmNixYEBUTe1ewgBU1KBaiqKAvPigivuiDscQXy4uVWDAoNqIPYkcQjCVBsCNRsUY0iVGz/gf/wLDszZ1776yK7IGPkM29c+afmZ0550xigsGg73+wWN9/YlEhUSERsniDbcWARNAGdAddQHPQENSA9+AheACegK+g9l8S0hT0AzlgPOjNz7+RHyAOBEAC//YYnAGXwQ1Q7nkUPWy/SWAsWAaGgZ8c8TJQwlGXWaiiCBHcDnQDPUAntnEfFICT4I1rJSLEBTngbPC31YB8MBZkaL7fEgwB68ArtnMdzHDZH8dC4sEq8IbOd4D+bp2TrmA9qARVYCtoEkkhfrAZ1ILnYAKF+QzRm7MidhSkREKIiDhIJxdBe4MCVBqD3cpSSzMpJA5sZOOnnTTuEvFXQH8HQLIpIUvY6A3QymBnY2xWwH763aKzhO0cduKu8hp0NDjqWWCWTQflC1/CDWC4FyEJYA9HZZFBEbJUjoD3IE9jmxchV0Bzt0KGc4cqAo0MiUhSNo0gO7nAZplt4rNL3AiRKd8HvoPBEfoi15kM1nKbc6acs5LoVEhrvnwVNDUgoAWYz7ZkkHaGiPkMFlrsUH4Oqlgfp0Jm8sV1BkTI2j7F9uRnKojlCa7aF9Ddoo1JXIZbOKtaQgKgELwDAzyKSGFbqhXSR0AR85UbitXSEfFl4BFnV0tIGy6r2/WtSQ1SlZkINfm8GZeNHLa5Gu0d4bujdIVk84XjHrfYE8H67Ri/MzGabW4AP8HScH8Pl+pmSHQPXrjMDFqAXWCKzXMjQV/60rG34DtoppshJjNJ+uRSxD4wxua5SrAAXHDQdhVT44DT4oPTfDod7NEQ8Q7kgSKnOaDTnL2SApMcOOkA9jLltRvVpeCYi9kOsF8/dGeknJ+3cuAkEwzVELHQpYi6JR9rteTDCZEKRwXI0qh7NQB+rvV5fC+cifNccNhDoSSTvp7pFh8agmLwgnFOfVviYAZ1fv4+h7m3ahU8mb0crHJ43gJvrQoc4V6S8GElg7nFNg5Ws7MFHAD5bDrzF7GXYLKBMCeHA3JAGTStWCuLsU2R0sFwHFJGfpviRMQ8AVMNRc359DHRadAoSdV5TmXPeqb7Tsgy2q6ENRmGRKSDe+Ahwx6f7skuVg0KeYrmWjzTjVGATymRzubO5LP8Ujq30awly273wU2lUcLvS1xi2Rah/mOWbWTqp4FMj4FmKNJeKVdGlpfiwwhQbREJtwP9DCVeVhzmks3zWkVpoKSmBRGuZ4WSR7/FLNx5rmtJcnSSja79QyJm8zwq0S1D6TacwQytlgXnuAiKmMu0V86NQZEoYrdnJSPIKmC6YQHJSmlWiuQDI3mtkMnMMcjdZJZubdamPDqaxXGxa26uKtw6X8O8Xuwct962DtuQnH2cUrCrZnTQ2E2fvFy9ySG1CKzg76W8cpN7wbvgKQ+wGuY9Eoa35bVbNtPcHoxo5bDLBzf/xh1iXWLWk3eJ00AvJj4VvLWtZp4dz8QokYICPPmP8lL0Np/3/S0hqjUCnRlSyM1uGjvuZw1AMs+PnLlizl6FqStqk0Ki//kQFRIV8g/bLwEGANI1+K6uBntVAAAAAElFTkSuQmCC";


export default class AddAddress extends Component
 {

  constructor(props) {
    super(props);
    this.getAddressDetails();
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentWillMount = async () => {
    userType = await AsyncStorage.getItem('userType');
    console.log('***',userType)
    startEdit = false;
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
}

componentWillUnmount() {
   BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}

handleBackButtonClick() {
   this.props.navigation.goBack(null);
   return true;
}
onClickStateListener = (id) => {
  const elementsIndex = data.findIndex(
    (element) => element.value == id,
  );
   const selectedAreaId = data[elementsIndex].value;
   this.setState({selectState: selectedAreaId});
  console.log('State : ', selectedAreaId);
};
  
  state=
  {
    checkBox1:false,
    checkBox2:false,
    checkBox3:false,
    checkBox4:false,
    mechanic:false,
    listData: [
      {
        title:"Home",
        address:"N79W28946 Park Dr\nHartland WI 553029",
        city:'New York',
        state:'US',
        zipcode:'895662'
      },
      {
        title:"Work",
        address:"1234 54th St\nMillwaukee, WI 53211",
        city:'Washington',
        state:'US',
        zipcode:'899862'
      },
      
    ],
    selectState:'',
    address:'',
    city:'',
    state:'',
    zipCode:'',
    title:'',
    addressList:[],
    count : 0,
    clicked : false,
    addressType:'',
 }

  
 
 validateAddress = (text) =>{
  console.log(text);
  let reg = /^[#.0-9a-zA-Z\s,-]+$/;
  if (reg.test(text) === false) {
    console.log('Address is Not Correct');
    this.setState({address: text});
    return false;
  } else {
    this.setState({address: text});
    console.log('Address is Correct');
  }
};
validateTitle = (text) =>{
  console.log(text);
  let reg = /^[a-zA-Z ]{2,40}([a-zA-Z ]{2,40})+$/;
  if (reg.test(text) === false) {
    console.log('Title is Not Correct');
    this.setState({title: text});
    return false;
  } else {
    this.setState({title: text});
    console.log('Title is Correct');
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

    onClickDisabledListener(){
      alert('Maximum 3 addresses can be saved');
    }

    onClickCancelListener(){
      this.props.navigation.navigate('VehicleNeeds');
    }
    
    onClickNextListener(){   
      const NetInfo = require("@react-native-community/netinfo"); 
    NetInfo.fetch().then(state => {
      console.log("Network Details :",state)
      if (state.isConnected == true) {
        let addReg = /^[#.0-9a-zA-Z\s,-]+$/;
        let addressReg = /^[#.0-9a-zA-Z\s,-]+$/;
        let zipCodeReg = /^[0-9]{5}(?:-[0-9]{4})?$/;
        if (this.state.address === ''){
          alert('Please enter address');
          return false;
        } 
        else  if (addressReg.test(this.state.address) === false) {
          console.log('Address is not correct');
          alert('Address is not valid');
          return false;
        } 
        else  if (this.state.city === '') {
          alert('Please enter city');
          return false;
        }
        else  if (addReg.test(this.state.city) === false) {
          console.log('City is not correct');
          alert('City is not valid');
          return false;
        } 
        else  if (this.state.state === '') {
          alert('Please enter state');
          return false;
        }
        else  if (addReg.test(this.state.state) === false) {
          console.log('State is not correct');
          alert('State is not valid');
          return false;
        } 
        else  if (this.state.zipCode === '') {
          alert('Please enter zipcode');
          return false;
        }
        else  if (zipCodeReg.test(this.state.zipCode) === false) {
          console.log('Zipcode is not correct');
          alert('Please check ZipCode, the expected format is xxxxx and xxxxx-xxxx');
          return false;
        } 
        else {
      // this.setState({count: this.state.count + 1})
      // console.log('Btn count : ', this.state.count)

      let addCnt = this.state.addressList.length 
      console.log('addCount',addCnt);
      if (addCnt == 0){
        this.setState({count: 1})
      }else if (addCnt == 1){
        this.setState({count: 2})
      }else if (addCnt == 2){
        this.setState({count: 3})
      }else{

      }  
      AddressViewModel.onAddNewAddressAPI(this.state.title,this.state.address,this.state.city,this.state.state,this.state.zipCode,this.state.count).then(
        (response,error) => {
        //get callback here
        console.log('Add address output',response)
        if (response.RESPONSE_CODE == 200){
          console.log('Success res :',response)
          this.setState({ addressList : []});
          this.getAddressDetails();
          this.setState({ title : "" });
          this.setState({ address : "" });
          this.setState({ city : "" });
          this.setState({ selectState : "" });
          this.setState({ zipCode : "" });
          this.setState({ state : "" });
        }else{
          alert('Something went wrong, please try again');
        }
     });
    }
    } else {
      Alert.alert("Please check your Network Connection.");
    }
    });
  }

    onClickEditListener(){
      const NetInfo = require("@react-native-community/netinfo"); 
    NetInfo.fetch().then(state => {
      console.log("Network Details :",state)
      if (state.isConnected == true) {
        let addReg = /^[#.0-9a-zA-Z\s,-]+$/;
        let addressReg = /^[#.0-9a-zA-Z\s,-]+$/;
        let zipCodeReg = /^[0-9]{5}(?:-[0-9]{4})?$/;
        if (this.state.address === ''){
          alert('Please enter address');
          return false;
        } 
        else  if (addressReg.test(this.state.address) === false) {
          console.log('Address is not correct');
          alert('Address is not valid');
          return false;
        } 
        else  if (this.state.city === '') {
          alert('Please enter city');
          return false;
        }
        else  if (addReg.test(this.state.city) === false) {
          console.log('City is not correct');
          alert('City is not valid');
          return false;
        } 
        else  if (this.state.state === '') {
          alert('Please enter state');
          return false;
        }
        else  if (addReg.test(this.state.state) === false) {
          console.log('State is not correct');
          alert('State is not valid');
          return false;
        } 
        else  if (this.state.zipCode === '') {
          alert('Please enter zipcode');
          return false;
        }
        else  if (zipCodeReg.test(this.state.zipCode) === false) {
          console.log('Zipcode is not correct');
          alert('Please check ZipCode, the expected format is xxxxx and xxxxx-xxxx');
          return false;
        } 
        else {
          this.editAddressDetails();
          startEdit = false;
          this.setState({ title : "" });
          this.setState({ address : "" });
          this.setState({ city : "" });
          this.setState({ selectState : "" });
          this.setState({ zipCode : "" });
          this.setState({ state : "" });
        }
      } else {
        Alert.alert("Please check your Network Connection.");
      }
    });
      
    };

    getAddressDetails = async () => {
      let type = await AsyncStorage.getItem('userType');
      console.log('userType :::',type);
      if (type == "4"){
      AddressViewModel.onViewClientAddressAPI().then(
        (response,error) => {
        //get callback here
        console.log('View client address output',response)
        console.log('View client address output',response)
        if (response.RESPONSE_CODE == 200){
          console.log('Success res :',response)
          // let address = response.RESPONSE_DATA[0].address;
          // let city = response.RESPONSE_DATA[0].city;
          // let state = response.RESPONSE_DATA[0].state;
          // let zip = response.RESPONSE_DATA[0].zip_code;
          // this.setState(prevState => ({
          //   addressList: [...prevState.addressList, {"title":"","address": address,"city":city,"state":state,"zipcode":zip}]
          // }))
          console.log('*******', response.RESPONSE_DATA)
          for(var i=0;i<response.RESPONSE_DATA.length;i++){
            console.log('address : ',response.RESPONSE_DATA[i].address)
            let title = response.RESPONSE_DATA[i].address_title;
            let address = response.RESPONSE_DATA[i].address;
            let city = response.RESPONSE_DATA[i].city;
            let state = response.RESPONSE_DATA[i].state;
            let zip = response.RESPONSE_DATA[i].zip_code;
            this.setState(prevState => ({
              addressList: [...prevState.addressList, {"title":title,"address": address,"city":city,"state":state,"zipcode":zip}]
            }))
          }
          startEdit = false;
          this.props.navigation.navigate('AddAddress');
        }else{
          alert('Something went wrong, please try again');
        }
     });
    }else{
      AddressViewModel.onViewMechanicAddressAPI().then(
        (response,error) => {
        //get callback here
        console.log('View mechanic address output',response)
        if (response.RESPONSE_CODE == 200){
          console.log('Success res :',response)
          for(var i=0;i<response.RESPONSE_DATA.length;i++){
            console.log('address : ',response.RESPONSE_DATA[i].address)
            let title = response.RESPONSE_DATA[i].address_title;
            let address = response.RESPONSE_DATA[i].address;
            let city = response.RESPONSE_DATA[i].city;
            let state = response.RESPONSE_DATA[i].state;
            let zip = response.RESPONSE_DATA[i].zip_code;
            this.setState(prevState => ({
              addressList: [...prevState.addressList, {"title":title,"address": address,"city":city,"state":state,"zipcode":zip}]
            }))
          }
          // let address = response.RESPONSE_DATA.address;
          // let city = response.RESPONSE_DATA.city;
          // let state = response.RESPONSE_DATA.state;
          // let zip = response.RESPONSE_DATA.zip_code;
          // this.setState(prevState => ({
          //   addressList: [...prevState.addressList, {"title":"","address": address,"city":city,"state":state,"zipcode":zip}]
          // }))
          this.props.navigation.navigate('AddAddress');
        }else{
          alert('Something went wrong, please try again');
        }
     });
    } 
    }

    editAddressDetails(){
      if (userType == "4" ){
      AddressViewModel.onUpdateClientAddressAPI(this.state.title,this.state.address,this.state.city,this.state.state,this.state.zipCode,this.state.addressType).then(
        (response,error) => {
        //get callback here
        console.log('Updated client address output',response)
        if (response.RESPONSE_CODE == 200){
          console.log('Success res :',response)
          this.setState({ addressList : []});
          startEdit = false;
          this.getAddressDetails()
          alert('Address is updated')
        }else{
          alert('Something went wrong, please try again');
        }
     }); 
    }else{
      AddressViewModel.onUpdateMechanicAddressAPI(this.state.title,this.state.address,this.state.city,this.state.state,this.state.zipCode,this.state.addressType).then(
        (response,error) => {
        //get callback here
        console.log('Updated mechanic address output',response)
        if (response.RESPONSE_CODE == 200){
          console.log('Success res :',response)
          this.setState({ addressList : []});
          this.getAddressDetails()
          alert('Address is updated')
        }else{
          alert('Something went wrong, please try again');
        }
     }); 
    }
  }

    actionOnRow(item) {
      console.log('Selected Item :',item);
      const elementsIndex = this.state.addressList.findIndex(
        (element) => element.address == item.address,
      );
      console.log('IndexValue : ', elementsIndex)
      let cnt = "";
      if(elementsIndex == 0){
        cnt = "1";
      }else if(elementsIndex == 1){
        cnt = "2";
      }else if(elementsIndex == 2){
        cnt = "3";
      }else{

      }
      this.setState({ addressType : cnt});
      this.props.navigation.navigate('EditAddress',{ passDetails : item , addType : cnt});
      startEdit = true;
   }
 
    render() {
      let check1=this.state.checkBox1;
      let check2=this.state.checkBox2;
      const selectedServices = (index) => {
        const elementsIndex = this.state.addressList.findIndex(
          (element) => element.id == index,
        );
        let newArray = [...this.state.addressList];
       
        const checkValue=newArray[elementsIndex].check;
        if(checkValue)
        {
          newArray[elementsIndex] = {
            ...newArray[elementsIndex],
            check: false,
          };
        }
        else{
          newArray[elementsIndex] = {
            ...newArray[elementsIndex],
            check: true,
          };
        }
        this.setState({
          addressList: newArray,
        });
    
      };

  
      return (
        <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.maincontainer}>
          <ScrollView>
        <TouchableOpacity style={styles.navBarBackButton} onPress={() => this.handleBackButtonClick()}>
            <Icon name="chevron-left" color='gray' size={30}/>
            </TouchableOpacity>
        <View style={styles.container}>
        <Text style={styles.titleText}>Addresses</Text>
        <Text style={{alignItems: 'center',alignSelf:'center',color: 'white',fontSize:23,marginBottom:10,}}>
          Select below address to edit</Text>

        <FlatList
   data={this.state.addressList}
   renderItem={({ item}) => 
              {return(
                  <View style={{marginTop: 15,marginBottom:15,marginLeft: 5,marginRight: 5,flexDirection:'row',borderRadius:8,borderWidth:1,borderColor:'white',justifyContent:'space-between'}}>
                  <View style={styles.container}>
                            <Text style={styles.listTitleText}>{item.title} </Text>
                            <Text style={styles.listAddressText}>{item.address + ',' + item.state}</Text>
                            <Text style={styles.listAddressText}>{item.city + ',' + item.zipcode}</Text>
                  </View>
                  <TouchableWithoutFeedback onPress={ () => this.actionOnRow(item)}>
                  <Image
                    style={{alignSelf:'center',marginRight:15, marginTop:10, width:45, height : 45, borderRadius: 15}}
                    source={{uri:editImage}}
                  />
                  </TouchableWithoutFeedback>
                  </View>
                  )
              }}
              />

<Text style={styles.titleText2}>Add Address</Text>
<View style={styles.inputContainer}>
<TextInput style={styles.inputs}
    placeholder = 'Title'
    placeholderTextColor = '#A9A9A9'
    keyboardType="default"
    underlineColorAndroid='transparent'
    onChangeText={(text) => this.validateTitle(text)}
    value={this.state.title}
     />
     </View>
<View style={styles.inputContainer}>
<TextInput style={styles.inputs}
    placeholder = 'Address'
    placeholderTextColor = '#A9A9A9'
    keyboardType="default"
    underlineColorAndroid='transparent'
    onChangeText={(text) => this.validateAddress(text)}
    value={this.state.address}
     />
     </View>
     {/* <View style={styles.inputContainer}>
   <TextInput style={styles.inputs}
   placeholderTextColor = '#A9A9A9'
   keyboardType="default"
   underlineColorAndroid='transparent'
   placeholder='Street'
   onChangeText={(text) => this.validateAddress(text)}
   value={this.state.address}
   />
   </View> */}
   <View style={styles.inputContainer}>
    <TextInput style={styles.inputs}
    placeholder='City'
   placeholderTextColor = '#A9A9A9'
   keyboardType="default"
   underlineColorAndroid='transparent'
   onChangeText={(text) => this.validateCity(text)}
   value={this.state.city}
   />
</View>

<View style={{ flexDirection: "row", marginTop:8, }}>
{/* <View style={styles.inputContainer2}>
   <Dropdown
     style={styles.dropDownContainer}
     placeholder='State'
     underlineColor='transparent'
     iconColor='#E1E1E1'
     useNativeDriver={false}
     animationDuration={0}
     data={data}
     onChangeText={(id) => this.onClickStateListener(id)}
     value= {this.state.selectState}
   />
     </View> */}

<View style={styles.inputContainer2}>
    <TextInput style={styles.inputs}
    placeholder='State'
   placeholderTextColor = '#A9A9A9'
   keyboardType="default"
   underlineColorAndroid='transparent'
   onChangeText={(text) => this.validateState(text)}
   value={this.state.state}
   />
</View>

<View style={styles.inputContainer2}>
    <TextInput style={styles.inputs}
    placeholder='Zip Code'
   placeholderTextColor = '#A9A9A9'
   keyboardType="default"
   underlineColorAndroid='transparent'
   onChangeText={(text) => this.validateZipCode(text)}
   value={this.state.zipCode}
   />
     </View>
     </View>
              </View>

              {
                this.state.addressList.length == 3 ? <TouchableOpacity style={[styles.buttonContainer, styles.connectButton1]}
                    onPress={() => this.onClickDisabledListener()} >
                    <Text style={styles.connectText}>Add Address</Text>
                    </TouchableOpacity> : <TouchableOpacity style={[styles.buttonContainer, styles.connectButton]} 
                   onPress={() => this.onClickNextListener()} >
                   <Text style={styles.connectText}>Add Address</Text>
                </TouchableOpacity> 
              }

                {/* <TouchableOpacity style={[styles.buttonContainer, styles.connectButton]} 
                   onPress={() => this.onClickCancelListener()} >
                   <Text style={styles.connectText}>Cancel</Text>
                </TouchableOpacity>  */}
            
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
    // fontWeight:"bold",
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
        marginLeft:15,
        marginRight:15,
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
        marginLeft:20,
        marginRight:20,
        height:45,
        // paddingLeft:15,
        flex:0.5,
        marginTop:10,
        marginBottom:15,
        justifyContent:'center',
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
    buttonContainer1: {
      height:0,
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
    connectButton1: {
      backgroundColor:'gray',
    },
    connectText: {
     color: 'black',
     //fontWeight:'bold',
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
    // fontWeight:'normal',
     alignSelf:'flex-start',
     fontSize:20,
    // fontWeight:'bold',
     marginBottom:8,
    },
    listAddressText: {
        color: 'white',
       // fontWeight:'normal',
        alignSelf:'flex-start',
        fontSize:15,
        marginBottom:13,
       },
   titleText: {
      alignItems: 'center',
      alignSelf:'center',
      color: 'white',
      //fontWeight:'bold',
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
  });