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
// var editImage = "data:image/png;base64,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";
// var deleteImg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFx6hp_J-R3FVF7fs7aL2upFec1qGRPuc6zw&usqp=CAU";
// var proceedImg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvQYwq97Nvl-bWSJ6XqBvdQoypxGRRfRtPjw&usqp=CAU";

var proceedImg = "data:image/png;base64,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";
var deleteImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABF5JREFUeNrsmllIVFEYxzWXMY0mcyGxMrDFqKyIilCLNrPsoYKKiugpKoMeeqmg8MGXesgiH6J6aiHaKIJWi7J9gYgs23fKELOUchxndKb/R3/hPui95965YxebAz/Qmes593++c7/tGh0MBqN6wugV1UNGREhESJhGrI1zRYNEMBCMBjkgHfQGPtAAXoEa8B40g4CThPQHE0EBmAfG8/NW0gZigAsk8Lt34Dy4Ce6B2pB3MQT3mwSKwHowHbRzx1+AJ9x1sUILRYjgwWAUGAOGc45noAKcBXWWlYgQCxSAC8G/wwfKQREYovj3A8A0sA184zx3wVKL92NaSCzYCOq4+B4w2eriZCQoBR7QAnaB5HAKiQM7QAB8AsUUFmUT42kVGSdAv3AIERFHuMhVkGWjAC19wX7NUUuzU0gMKOPk58xMbhFZr4LrHQZuu4Ss4aT3QEaYRWhPwCGuu1PlCBu5X3GRNxjsJE68UXSGmWA+Y0jHiAd36ZpVRjKo4j0Ug2tW3W8COMBdWW1iN1PAdeAHrRrawHOQY9LNiye7BdKtWmQGuMpAtRL87uSaqfyunb/7GNnzdfauhlbuRUuLpY6Dy11cvx1sAmvBPrMWkTN5kLs6VWcnSoL2jC0GcaaWVkns6rqusl9J9maDB0whuhox3ZDzvQVXaOUcsxPIkckAe8EPnUW+gvti2BBEyGZ80vneD06DJWAFnUW7StIoCd5BMIue575B4tif3snPM6+c5nEj40Aj+KVzbQq4zWvzOksuO7NIGi0iu1RtcDPNRNztIqbtqtbpzRS+WuHaBl4nVsnlUTMUMoTHSny+R/Gm8nkMzVhDrFcGniqKf8lCbJgZITLxZ4eVzfU8vqmqi7v5MDU6rCxvoUVcZncx4DAhQbPHwcPPkxwmxMX7alMVUsvPMxwmxM37alQVIh2OJjDUYX2vbMaRj6pCJFo/ZMdjhIOO1VjwHTxWFdLKntNA1iBOGJO4qZe40UpCAhQiguYyAv/rsRD0ZbrvN+N+v7BmyGckVWmXWm2zqlSbkom/ZkpjKhp7wTFG0VUKi1mNOSqpSSF7ySd1M3GdgkZKyyqWmvkGJelY8N1kMdUMFhjMm83yuB4MDaX5MJPPSw0ffI9OTTGHnsWr6IUkuz5jcP1RsAyUGCalBjsSr+kxVXRTK6iDdVy3ko27kPta0ro8y0m3dpOI5ewFPwHD7GyZSpf9Bfu+pewGhkvESvAbNIG8cDSxs9jJCLILmGmzALemNStN8inhfK0gXuQUFxNvsky1N2vQHi1kc1zGHSuvKqwuvpm9JhkXwWIwyOQcqWCupsvvBbtVHmwr7ldvSJBaDTbw9+ds1dxko+ADA5iPJbWk4YP42k0yhgn8OY7BrtygYxO2d4gdNX8u3yUuBuNY+DSxu+JlbhTL2JFIQS6m4ycYpx7x+qh/JUQ7+jBDLWT/N403HscegATTn7RcJa3XZFdJHR35p5qIkIiQ/0PIHwEGANXr9tXc9f6eAAAAAElFTkSuQmCC";
var editImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABLhJREFUeNrsmldoVEEUhjdl3ZiIicbYYgkmNixYEBUTe1ewgBU1KBaiqKAvPigivuiDscQXy4uVWDAoNqIPYkcQjCVBsCNRsUY0iVGz/gf/wLDszZ1776yK7IGPkM29c+afmZ0550xigsGg73+wWN9/YlEhUSERsniDbcWARNAGdAddQHPQENSA9+AheACegK+g9l8S0hT0AzlgPOjNz7+RHyAOBEAC//YYnAGXwQ1Q7nkUPWy/SWAsWAaGgZ8c8TJQwlGXWaiiCBHcDnQDPUAntnEfFICT4I1rJSLEBTngbPC31YB8MBZkaL7fEgwB68ArtnMdzHDZH8dC4sEq8IbOd4D+bp2TrmA9qARVYCtoEkkhfrAZ1ILnYAKF+QzRm7MidhSkREKIiDhIJxdBe4MCVBqD3cpSSzMpJA5sZOOnnTTuEvFXQH8HQLIpIUvY6A3QymBnY2xWwH763aKzhO0cduKu8hp0NDjqWWCWTQflC1/CDWC4FyEJYA9HZZFBEbJUjoD3IE9jmxchV0Bzt0KGc4cqAo0MiUhSNo0gO7nAZplt4rNL3AiRKd8HvoPBEfoi15kM1nKbc6acs5LoVEhrvnwVNDUgoAWYz7ZkkHaGiPkMFlrsUH4Oqlgfp0Jm8sV1BkTI2j7F9uRnKojlCa7aF9Ddoo1JXIZbOKtaQgKgELwDAzyKSGFbqhXSR0AR85UbitXSEfFl4BFnV0tIGy6r2/WtSQ1SlZkINfm8GZeNHLa5Gu0d4bujdIVk84XjHrfYE8H67Ri/MzGabW4AP8HScH8Pl+pmSHQPXrjMDFqAXWCKzXMjQV/60rG34DtoppshJjNJ+uRSxD4wxua5SrAAXHDQdhVT44DT4oPTfDod7NEQ8Q7kgSKnOaDTnL2SApMcOOkA9jLltRvVpeCYi9kOsF8/dGeknJ+3cuAkEwzVELHQpYi6JR9rteTDCZEKRwXI0qh7NQB+rvV5fC+cifNccNhDoSSTvp7pFh8agmLwgnFOfVviYAZ1fv4+h7m3ahU8mb0crHJ43gJvrQoc4V6S8GElg7nFNg5Ws7MFHAD5bDrzF7GXYLKBMCeHA3JAGTStWCuLsU2R0sFwHFJGfpviRMQ8AVMNRc359DHRadAoSdV5TmXPeqb7Tsgy2q6ENRmGRKSDe+Ahwx6f7skuVg0KeYrmWjzTjVGATymRzubO5LP8Ujq30awly273wU2lUcLvS1xi2Rah/mOWbWTqp4FMj4FmKNJeKVdGlpfiwwhQbREJtwP9DCVeVhzmks3zWkVpoKSmBRGuZ4WSR7/FLNx5rmtJcnSSja79QyJm8zwq0S1D6TacwQytlgXnuAiKmMu0V86NQZEoYrdnJSPIKmC6YQHJSmlWiuQDI3mtkMnMMcjdZJZubdamPDqaxXGxa26uKtw6X8O8Xuwct962DtuQnH2cUrCrZnTQ2E2fvFy9ySG1CKzg76W8cpN7wbvgKQ+wGuY9Eoa35bVbNtPcHoxo5bDLBzf/xh1iXWLWk3eJ00AvJj4VvLWtZp4dz8QokYICPPmP8lL0Np/3/S0hqjUCnRlSyM1uGjvuZw1AMs+PnLlizl6FqStqk0Ki//kQFRIV8g/bLwEGANI1+K6uBntVAAAAAElFTkSuQmCC";

export default class VehicleNeedAdd extends Component
 {

  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentWillMount() {
    this.onGetVehicleDetails();
    edited = false;
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

  // proceedAction = () => {
  //      let item = this.state.vehicleSelected;
  //      console.log('Selected vehicle details : ', item)
  //      VehicleViewModel.onClientSelectServicesToShareAPI (serviceIds,item.vehicle_id).then(
  //         (response,error) => {
  //         console.log('Output',response)
  //         if (response.RESPONSE_CODE == 200){
  //           this.props.navigation.navigate('CalenderScreen');
  //         }else{
  //           alert('Something went wrong, please try again');
  //         }
  //      });
  // }
  // editAction = () => {
  //   let item = this.state.vehicleSelected;
  //   console.log('Selected vehicle for edit : ', item)
  //   this.setState({ make : item.vehicle_make });
  //   this.setState({ model : item.vehicle_model });
  //   this.setState({ year : item.vehicle_year });
  //   edited = true;
  // }
  // deleteAction = () => {
  //   let item = this.state.vehicleSelected;
  //   console.log('Selected vehicle for delete : ', item)
  //   VehicleViewModel.onDeleteVehicleAction (item.vehicle_id).then(
  //     (response,error) => {
  //     console.log('Output',response)
  //     if (response.RESPONSE_CODE == 200){
  //       alert('Successfully deleted vehicle details');
  //       this.onGetVehicleDetails();
  //     }else{
  //       alert('Something went wrong, please try again');
  //     }
  //  });
  // }
  

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

    onClickCancelListener(){
      // this.props.navigation.navigate('Home');
      this.props.navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
    }
  
    onClickEditVehicleListener(){
      let item = this.state.vehicleSelected;
      console.log('Selected vehicle for edit : ', item)
      const NetInfo = require("@react-native-community/netinfo"); 
      NetInfo.fetch().then(state => {
      console.log("Network Details :",state)
      if (state.isConnected == true) {
        VehicleViewModel.onUpdateVehicleAPI (item.vehicle_id, this.state.make, this.state.model,this.state.year,).then(
          (response,error) => {
          console.log('Output',response)
          if (response.RESPONSE_CODE == 200){
            this.onGetVehicleDetails();
            edited = false;
            this.setState({ make : "" });
            this.setState({ model : "" });
            this.setState({ year : "" });
          }else{
            alert('Something went wrong, please try again');
          }
       });
      }else{
        Alert.alert("Please check your Network Connection.");
      }
     });
    }

    
    onClickAddVehicleListener(){
      const NetInfo = require("@react-native-community/netinfo"); 
      NetInfo.fetch().then(state => {
      console.log("Network Details :",state)
      if (state.isConnected == true) {
        let reg = /^[a-zA-Z ]{0,40}([a-zA-Z ]{0,40})+$/;
        if (this.state.make === '') {
          alert('Please enter vehicle make');
          return false;
        } 
        else  if (reg.test(this.state.make) === false) {
          alert('vehicle make is not valid');
          return false;
        }
        else if (this.state.model === '') {
          alert('Please enter vehicle model');
          return false;
        } 
        // else  if (reg.test(this.state.model) === false) {
        //   alert('vehicle model is not valid');
        //   return false;
        // }
        else if (this.state.year === '') {
          alert('Please enter vehicle year');
          return false;
        } 
        // else  if (reg.test(this.state.year) === false) {
        //   alert('vehicle make is not valid');
        //   return false;
        // } 
        else{
          this.onAddingVehicleDetails();        
        } 
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

    onGetVehicleDetails = async () => {
      
        VehicleViewModel.onShowVehicleAPI().then(
          (response,error) => {
          console.log('Show vehicle details output',response)
          if (response.RESPONSE_CODE == 200){
            console.log('Success res :',response)
            if(this.state.vehiclesList.size!=0)
            {
              this.setState({ vehiclesList: [] })
              this.setState({ vehiclesList: [...this.state.vehiclesList, ...response.RESPONSE_DATA ] })
            }
            else
            {
              this.setState({ vehiclesList: [...this.state.vehiclesList, ...response.RESPONSE_DATA ] })
            }
         
          
            // {"created_on": "2021-11-26 11:31:11", "vehicle_id": "1",
            //  "vehicle_make": "hundyi", "vehicle_model": "2012", "vehicle_year": "2015"}
            console.log('Updated vehicle details : ',this.state.vehiclesList)
          }else{
            alert('Something went wrong, please try again');
          }
       });
    }

    onAddingVehicleDetails = async () => {
      VehicleViewModel.onAddVehicleAPI(this.state.make, this.state.model, this.state.year).then(
        (response,error) => {
        console.log('Adding vehicle details output',response)
        if (response.RESPONSE_CODE == 200){
          this.componentWillMount()
          console.log('Success res :',response)
          this.setState({ model : "" });
          this.setState({ make : "" });
          this.setState({ year : "" });
        }else if (response.RESPONSE_CODE == 2910){
          alert('Please select a year between 1930 and the current year');
        }else{
          alert('Something went wrong, please try again');
        }
     });
  }

    editActionOnRow(item) {
      console.log('Selected Item :',item);
      this.setState({vehicleSelected : item});
      this.props.navigation.navigate('EditVehicle',{passVehicle : item, passServiceId : serviceIds});
    }

    deleteActionOnRow(item){
      console.log('Selected Item :',item);
      this.setState({vehicleSelected : item});
      VehicleViewModel.onDeleteVehicleAction (item.vehicle_id).then(
        (response,error) => {
        console.log('Output',response)
        if (response.RESPONSE_CODE == 200){
          alert('Successfully deleted vehicle details');
          this.onGetVehicleDetails();
        }else{
          alert('Something went wrong, please try again');
        }
     });
    }

    proceedActionOnRow(item){
      console.log('Selected Item :',item);
      this.setState({vehicleSelected : item});
      VehicleViewModel.onClientSelectServicesToShareAPI (serviceIds,item.vehicle_id).then(
        (response,error) => {
        console.log('Output',response)
        if (response.RESPONSE_CODE == 200){
          this.props.navigation.navigate('CalenderScreen');
        }else{
          alert('Something went wrong, please try again');
        }
     });
    }
 
    render() {
      const { navigate } = this.props.navigation;
      const {passServices} = this.props.route.params;
      serviceIds = passServices;
      console.log('selected services : ',passServices);


      let check1=this.state.checkBox1;
      let check2=this.state.checkBox2;
      const selectedServices = (index) => {
        const elementsIndex = this.state.vehiclesList.findIndex(
          (element) => element.id == index,
        );
        let newArray = [...this.state.vehiclesList];
       
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
          vehiclesList: newArray,
        });
    
      };

  
        return (
          <>
          <StatusBar barStyle="dark-content" />
         
          <SafeAreaView style={styles.maincontainer}>
          <ScrollView >
          <View style={styles.container}>
          <TouchableOpacity style={styles.navBarBackButton} onPress={() => this.handleBackButtonClick()}>
            <Icon name="chevron-left" color='gray' size={30}/>
            </TouchableOpacity>
          <View style={styles.container}>
          <Text style={styles.titleText}>What Vehicle is this for?</Text>
          <FlatList
     data={this.state.vehiclesList}
     renderItem={({ item}) => 
                {return(   
                  <View style={{marginTop: 15,marginBottom:15,marginLeft: 5,marginRight: 5,flexDirection:'column',justifyContent:'space-evenly',borderWidth:1,borderColor:'white',borderRadius:8}}>
                  <View style={{flexDirection:'row',textAlign:'center'}}>
                  <Text style={styles.listText}>{item.vehicle_make + " , " } </Text>
                  <Text style={styles.listText}>{item.vehicle_model + " , " } </Text>
                  <Text style={styles.listText}>{item.vehicle_year } </Text>
                  </View>
                  <View style={{flexDirection:'row',justifyContent:'space-evenly',marginBottom:10}}>
                  <TouchableOpacity onPress={ () => this.editActionOnRow(item)}>
                  <View style={{flexDirection:'row',justifyContent:'space-evenly',marginBottom:10}}>
                  <Image
                    style={{alignSelf:'flex-end',justifyContent:'center', marginTop:25, width:35, height : 35, borderRadius: 8}}
                    source={{uri:editImage}}
                  />
                  <Text style={{color: 'white',
       fontWeight:'bold',
       fontSize:18,
       justifyContent:'center',
       marginTop:30,
       textAlign:'center',}}> Edit </Text>
                  </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={ () => this.deleteActionOnRow(item)}>
                  <View style={{flexDirection:'row',justifyContent:'space-evenly',marginBottom:10}}>
                  <Image
                    style={{alignSelf:'flex-end', marginTop:25, width:35, height : 35, borderRadius: 8}}
                    source={{uri:deleteImg}}
                  />
                  <Text style={{color: 'white',
       fontWeight:'bold',
       fontSize:18,
       justifyContent:'center',
       marginTop:30,
       textAlign:'center',}}> Delete </Text>
                  </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={ () => this.proceedActionOnRow(item)}>
                  <View style={{flexDirection:'row',justifyContent:'space-evenly',marginBottom:10}}>
                  <Image
                    style={{alignSelf:'flex-end', marginTop:25, width:35, height : 35, borderRadius: 8}}
                    source={{uri:proceedImg}}
                  />
                  <Text style={{color: 'white',
       fontWeight:'bold',
       fontSize:18,
       justifyContent:'center',
       marginTop:30,
       textAlign:'center',}}> Proceed </Text>
                  </View>
                  </TouchableOpacity>
                  </View>
                  </View>
                    // <TouchableOpacity onPress={ () => this.actionOnRow(item)} style={[styles.listbuttonContainer, styles.listButton]}>
                    // <Text style={styles.listText}>{item.vehicle_make + " , " + item.vehicle_model} </Text>
                    // </TouchableOpacity>
                    )
                }}
                />

              {/* <Modal
              visible={this.state.Alert_Visibility}
              transparent={true}
              animationType={"fade"}
              onRequestClose={ () => { this.Show_Custom_Alert(!this.state.Alert_Visibility)} } >
                <View style={{ flex:1, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={styles.Alert_Main_View}>
                        <Text style={styles.Alert_Title}>Please Select</Text>
                        <View style={{ width: '100%', height: 2, backgroundColor: '#fff'}} />
                        <TouchableOpacity onPress={this.proceedAction}>
                        <Text style={styles.Alert_Message}> Proceed </Text>
                        </TouchableOpacity>
                        <View style={{ width: '100%', height: 2, backgroundColor: '#fff'}} />
                        <TouchableOpacity  onPress={this.editAction}>
                          <Text style={styles.Alert_Message}> Edit</Text>
              </TouchableOpacity>
              <View style={{ width: '100%', height: 2, backgroundColor: '#fff'}} />
              <TouchableOpacity  onPress={this.deleteAction}>
                <Text style={styles.Alert_Message}>Delete</Text>
              </TouchableOpacity>
                        <View style={{ width: '100%', height: 2, backgroundColor: '#fff'}} />
                        <TouchableOpacity onPress={ () => { this.Show_Custom_Alert(false)} }>
                          <Text style={styles.Alert_Message}> Dismiss</Text>
              </TouchableOpacity>
                    </View>
                </View>
              </Modal> */}


          <Text style={styles.titleText2}>Add a new vehicle</Text>
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
                {/* {
                  edited == true ?  <TouchableOpacity style={[styles.buttonContainer, styles.connectButton]} 
                  onPress={() => this.onClickEditVehicleListener()} >
                  <Text style={styles.connectText}>Update Vehicle</Text>
                  </TouchableOpacity> : 
                  <TouchableOpacity style={[styles.buttonContainer, styles.connectButton]} 
                  onPress={() => this.onClickAddVehicleListener()} >
                  <Text style={styles.connectText}>Add Vehicle</Text>
                  </TouchableOpacity>
                } */}
                <TouchableOpacity style={[styles.buttonContainer, styles.connectButton]} 
                onPress={() => this.onClickAddVehicleListener()} >
                <Text style={styles.connectText}>Add Vehicle</Text>
                </TouchableOpacity> 
                <TouchableOpacity style={[styles.buttonContainer, styles.connectButton]} 
                   onPress={() => this.onClickCancelListener()} >
                   <Text style={styles.connectText}>Cancel</Text>
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
      flex:1,
      flexDirection:'column',
      height:'100%',
      marginLeft:10,
      marginRight:10,
      backgroundColor: '#002458',
      marginBottom:0,
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
        color:'black',
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
       color: '#4C4B0E',
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
       color: 'white',
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