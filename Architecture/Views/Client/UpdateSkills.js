import React, { Component } from "react";
import { StyleSheet, Text, View,TextInput,Button,Image,Alert,TouchableHighlight,
    StatusBar, SafeAreaView, TouchableOpacity,FlatList,BackHandler, ScrollView,TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-material-dropdown-v2-fixed';
import AddressViewModel from "../../ViewModels/AddressViewModel";
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import MultiSelect from 'react-native-multiple-select';
import VehicleViewModel from "../../ViewModels/VehicleViewModel";
import MaterialCommunityIcons from 'react-native-vector-icons/FontAwesome';
import MechanicListViewModel from "../../ViewModels/MechanicListViewModel";
import RegisterViewModel from "../../ViewModels/RegisterViewModel";
import CheckBox from 'react-native-check-box';
import SelectMultiple from 'react-native-select-multiple';

var userType = '';
var selectedSkills = [];
// const data = [{value:'0.5', id: 0},
//       {value:'1',id: 1},  {value:'1.5',id: 2},  {value:'2',id: 3}, {value:'2.5', id: 4}, {value:'3', id: 5},
//       {value:'3.5', id: 6},{value:'4', id: 7},{value:'4.5', id: 8},{value:'5', id: 9},{value:'5.5', id: 10},
//       {value:'6', id: 11},{value:'6.5', id: 12},{value:'7', id: 13},{value:'7.5', id: 14},{value:'8', id: 15},
//       {value:'8.5', id: 16},{value:'9', id: 17},{value:'9.5', id: 18},{value:'10', id: 19},{value:'10.5', id: 20},
//       {value:'11', id: 21},{value:'11.5', id: 22},{value:'12', id: 23},{value:'12.5', id: 24},{value:'13', id: 25},
//       {value:'13.5', id: 26},{value:'14', id: 27},{value:'14.5', id: 28},{value:'15', id: 29},{value:'15.5', id: 30},
//       {value:'16', id: 31},{value:'16.5', id: 32},{value:'17', id: 33},{value:'17.5', id: 34},{value:'18', id: 35},
//       {value:'18.5', id: 36},{value:'19', id: 37},{value:'19.5', id: 38},{value:'20', id: 39},{value:'20.5', id: 40},
//       {value:'21', id: 41},{value:'21.5', id: 42},{value:'22', id: 43},{value:'22.5', id: 44},{value:'23', id: 45},
//       {value:'23.5', id: 46},{value:'24', id: 47},{value:'24.5', id: 48},{value:'25', id: 49}];
const data = [{value:'5 miles', id: 0},
      {value:'10 miles',id: 1},{value:'25 miles', id: 2},{value:'50 miles', id: 3}];
const item = [];
const serNameObject = [];

export default class UpdateSkills extends Component
 {

  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    // this.getAvailableServices();
    this.getMechanicDetails();
    // this.getAllMyAvailableSer();
  }

  getAvailableServices(){
    VehicleViewModel.AvailableServicesAPI().then(
      (response,error) => {
        console.log('res : ',response)
        if (response.RESPONSE_CODE == 200){
         this.setState({
           item:response.RESPONSE_DATA
         })
         console.log("ServicesList : ",this.state.item)
        }else{
         alert('Something went wrong, please try again');
        }
     }
    );
  }

  getMechanicDetails(){
    MechanicListViewModel.onViewMechanicDetailsAPI().then(
      (response,error) => {
        console.log('res : ',response)
        if (response.RESPONSE_CODE == 200){
          this.setState({radius : response.RESPONSE_DATA[0].profile_mechanic.service_radius_in_miles + " miles"})
          this.setState({hrlyRate : response.RESPONSE_DATA[0].profile_mechanic.hourly_rate})
          // if (response.RESPONSE_DATA[0].profile_mechanic.hourly_rate != ""){
          //   this.setState({hrlyRate : response.RESPONSE_DATA[0].profile_mechanic.hourly_rate + " $"})
          // }
          this.setState({skills : response.RESPONSE_DATA[0].mechanic_skill_details})
          this.setState({services : response.RESPONSE_DATA[0].mechanic_services_offered})
          console.log('Updated mechlist : ',this.state.skills)

          this.setState(prevState => ({
            skills: [...prevState.skills, {"skill_id":0,
                "skill_name": "Other"
                }]
            }))
          console.log('Updated skills list : ',this.state.skills)

          let utils = (this.state.skills).map(item => {
            let check = false
            return ({ ...item, check });
            });
            console.log('Utils : ', utils)

            this.setState({skills : utils})
            console.log('Updated mechlist : ',this.state.skills)
            
        }else{
         alert('Something went wrong, please try again');
        }
     }
    );
  }
   getAllMyAvailableSer(){
    VehicleViewModel.MyAllAvailableServicesAPI().then(
      (response,error) => {
        console.log('res : ',response)
        if (response.RESPONSE_CODE == 200){
            this.setState({
                item:response.RESPONSE_DATA
              })
        //   this.setState({myAvailableServices : response.RESPONSE_DATA});
         console.log("ServicesList : ",this.state.myAvailableServices);
        }else{
         alert('Something went wrong, please try again');
        }
     }
    );
   }

  UNSAFE_componentWillMount = async () => {

    this.getAllMyAvailableSer();
    
    this.setState(prevState => {
      const tasks = prevState.myAvailableServices.filter(task => task.service_status !== "Disabled");
      console.log('Tasks : ',tasks);
      this.state.enabledServices = tasks;
      return { tasks };
    });

    // const enabledArr = this.state.myAvailableServices.filter(function(vendor){ return vendor.service_status === "Enabled" })
    // this.state.enabledServices = enabledArr
    // console.log('Enabled array : ',enabledArr);

    

    const disabledArr = this.state.myAvailableServices.filter(function(vendor){ return vendor.service_status === "Disabled" })
    console.log('Disabled array : ',disabledArr);

    for(let i=0;i<disabledArr.length;i++)
    {
      serNameObject.push( disabledArr[i].service_name);
    }
    this.state.selectedServicesNames = serNameObject.map(item => item).join(', ');
    console.log('selectedServiceName array : ',this.state.selectedServicesNames);
    console.log('serviceName array : ',serNameObject);
  }

  componentWillMount = async () => {
    userType = await AsyncStorage.getItem('userType');
    console.log('***',userType)
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
    validateSkill = (text) =>{
      console.log(text);
      let reg = /^[a-zA-Z ]{2,40}([a-zA-Z ]{2,40})+$/;
      if (reg.test(text) === false) {
        console.log('Skill is Not Correct');
        this.setState({skill: text});
        return false;
      } else {
        this.setState({skill: text});
        console.log('Skill is Correct');
      }
    };
    validateOtherServices = (text) =>{
      console.log(text);
      let reg = /^[a-zA-Z ]{2,40}([a-zA-Z ]{2,40})+$/;
      if (reg.test(text) === false) {
        console.log('Other services is not correct');
        this.setState({otherServices: text});
        return false;
      } else {
        this.setState({otherServices: text});
        console.log('Other services is Correct');
      }
    };
    validateHrlyRate = (text) => {
      console.log(text);
      let reg = /^(\d+(\.\d{0,2})?|\.?\d{1,2})$/;
      if (reg.test(text) === false) {
        console.log('Hourly rate is Not Correct');
        this.setState({hrlyRate: text});
        return false;
      } else {
        this.setState({hrlyRate: text});
        console.log('Hourly rate is Correct');
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
    onSelectedItemsChange = selectedItems => {
      this.setState({selectedItems});
      this.setState({services : selectedItems });
      console.log('Services : ', this.state.services);
      console.log('Selected Items : ', selectedItems);
      console.log('Other item : ', selectedItems.includes("0"));
    };
  
    onClickUpdateDetailsListener(){
      MechanicListViewModel.onMechanicSkillsUpdateAPI(this.state.radius,this.state.selectedIDS,this.state.skill,
        this.state.services.toString(),this.state.otherServices,this.state.hrlyRate).then(
        (response,error) => {
          console.log('res : ',response)
          if (response.RESPONSE_CODE == 200){
            // this.props.navigation.navigate('Home');
            this.props.navigation.reset({
              index: 3,
              routes: [{name: 'Home'}],
            });
          }else{
           alert('Something went wrong, please try again');
          }
       }
      );
    };
      
      state=
      {
        selectedItems : [],
        selectedSkills : [],
        item : [],
        checkArray:[
            {
              id: 1,
              check:false
            },
            {
              id: 2,
              check:false
            },
            {
              id: 3,
              check:false
            },
        ],
          selectedServiceData:[],
          selectedIDS:"",
          skill:'',
          skillsPlaceholder:'Skills',
          otherSkillsPlaceholder:'Other services',
          radius:'',
          skills:[],
          services:[],
          otherServices:'',
          myAvailableServices : [
            {
                "service_id": "1",
                "service_name": "car repairing1",
                "service_image": "",
                "service_status": "Disabled",
                "created_on": "2021-12-21 14:30:28",
                "my_service": "True"
            },
            {
                "service_id": "2",
                "service_name": "Android changes",
                "service_image": "",
                "service_status": "Enabled",
                "created_on": "2021-12-22 10:59:01",
                "my_service": "True"
            },
            {
                "service_id": "3",
                "service_name": "Ios changes",
                "service_image": "",
                "service_status": "Enabled",
                "created_on": "2021-12-22 11:00:52",
                "my_service": "True"
            },
            {
                "service_id": "4",
                "service_name": "php changes",
                "service_image": "",
                "service_status": "Enabled",
                "created_on": "2021-12-22 20:32:43",
                "my_service": "False"
            },
            {
                "service_id": "7",
                "service_name": "Detailing",
                "service_image": "",
                "service_status": "Disabled",
                "created_on": "2022-02-08 23:40:09",
                "my_service": "False"
            },
            {
              "service_id": "0",
              "service_name": "other",
              "service_image": "",
              "service_status": "",
              "created_on": "2022-02-08 23:40:09",
              "my_service": "False"
          }
        ],
        // myAvailableServices:[],
        selectedServicesNames:"",
        enabledServices:[],
        selectedOffrdServiceData:[],
        offrdSelectedIDS:"",
        selectedItems : [],
        hrlyRate : '',
        check: {},
        isChecked : false,
        }

        checkBox_Test = (id) => {
          const checkCopy = {...this.state.check}
          if (checkCopy[id]) checkCopy[id] = false;
          else checkCopy[id] = true;
          this.setState({ check: checkCopy });
          this.setState({
            isChecked:!this.state.isChecked
        })
          console.log('Updated check ids : ', id + " " + this.state.isChecked);
        }

        handleOnChange = (position) => {
          const updatedCheckedState = this.state.check.map((item, index) =>
            index === position ? !item : item
          );
          console.log('Updated ids : ', updatedCheckedState);
        };

    checkService(name,image,check,serviceid,serStatus,mySer)
      { 
      console.log('service selected : ', check)
      console.log('service selected : ', name)
      console.log('service Status : ', serStatus);
      console.log('service offered by me : ', mySer);
      if(mySer == "True"){
        return( 
            <View style={styles.cardSelectedContainer}>
            <View style={{flexDirection: 'row',justifyContent: 'center',
            alignItems: 'center',width:'90%',borderBottomColor: '#818EB7',
            borderBottomWidth: 1,
            flex:1}}>
                  
                  <Text style={{ color: 'white',
                //  textTransform:'uppercase',
              fontWeight:'bold',
              fontSize:18,
              marginLeft:10,
            alignItems: 'center', 
            flex:1,
              }}>{name}</Text>
        <TouchableOpacity
                    style={{height: 30,
                        width: 30,
                        borderRadius: 100,
                        borderWidth: 2,
                        alignSelf:'center',
                        marginRight:8,
                        marginTop:7,
                        marginBottom:15,
                        borderColor: '#818EB7',
                        alignItems: 'center',
                        justifyContent: 'center',backgroundColor: '#FDD248',}}
                  >
                    {check === true && <View style={{width: 15,height: 15, borderRadius: 50,backgroundColor: '#FDD248',}} />}
                  </TouchableOpacity>
                                </View>
        </View>)
      }else{
      if(check==true)
      {
        return( 
            <View style={styles.cardSelectedContainer}>
            <View style={{flexDirection: 'row',justifyContent: 'center',
            alignItems: 'center',width:'90%',borderBottomColor: '#818EB7',
            borderBottomWidth: 1,
            flex:1}}>
                  
                  <Text style={{ color: 'white',
                //  textTransform:'uppercase',
              fontWeight:'bold',
              fontSize:18,
              marginLeft:10,
            alignItems: 'center', 
            flex:1,
              }}>{name}</Text>
        <TouchableOpacity
                    style={styles.radioCircle}
                  >
                    {check === true && <View style={{width: 15,height: 15, borderRadius: 50,backgroundColor: '#FDD248',}} />}
                  </TouchableOpacity>
                                </View>
        </View>)
      }
      else{
        return( 
            <View style={styles.cardContainer}>
            <View style={{flexDirection: 'row',justifyContent: 'center', //Centered horizontally
            alignItems: 'center', borderBottomColor: '#818EB7',
            borderBottomWidth: 1,
            flex:1}}> 
            <Text style={{color: 'white',
              fontWeight:'bold',
              fontSize:18,
              marginLeft:10,
            alignItems: 'center',
            flex:1,
              }}>{name}</Text>
            <View
                    style={styles.radioCircle}
            >
            </View>
            </View>
        </View>)
      }
      }
      } 
   
      
 
    render() {
      const { selectedItems } = this.state;
      const { selectedSkills } = this.state;
      MaterialCommunityIcons.loadFont();

    const selectedServices = (index) => {
      const elementsIndex = this.state.skills.findIndex(
        (element) => element.skill_id == index,
      );
      let newArray = [...this.state.skills];
      const checkValue=newArray[elementsIndex].check;
      if(checkValue)
      {
        newArray[elementsIndex] = {
          ...newArray[elementsIndex],
          check: false,
        };
        if(this.state.selectedServiceData.length!=0)
        {
          for(var i=0;i< this.state.selectedServiceData.length;i++)
          {
            if(this.state.selectedServiceData[i]==newArray[elementsIndex].skill_id)
            {
              this.state.selectedServiceData.splice(i, 1);
            }
            console.log( this.state.selectedServiceData[i]+"<><> "+newArray[elementsIndex].skill_id);
          }
        }
        }
      else{
        newArray[elementsIndex] = {
          ...newArray[elementsIndex],
          check: true,
        };
        this.state.selectedServiceData.push( newArray[elementsIndex].skill_id);
      }
      this.state.selectedIDS = this.state.selectedServiceData.map(item => item).join(', ');
      console.log("Selected Skills : ",this.state.selectedIDS);
      // selectedSkills = this.state.selectedIDS.toString()
      this.setState({
        skills: newArray,
      });
    };

    const selectedOfferedServices = (index) => {
      const elementsIndex = this.state.item.findIndex(
        (element) => element.service_id == index,
      );
      let newArray = [...this.state.item];
      const checkValue=newArray[elementsIndex].check;
      if(checkValue)
      {
        newArray[elementsIndex] = {
          ...newArray[elementsIndex],
          check: false,
        };
        if(this.state.selectedOffrdServiceData.length!=0)
        {
          for(var i=0;i< this.state.selectedOffrdServiceData.length;i++)
          {
            if(this.state.selectedOffrdServiceData[i]==newArray[elementsIndex].service_id)
            {
              this.state.selectedOffrdServiceData.splice(i, 1);
            }
            console.log( this.state.selectedOffrdServiceData[i]+"<><> "+newArray[elementsIndex].service_id);
          }
        }
        }
      else{
        newArray[elementsIndex] = {
          ...newArray[elementsIndex],
          check: true,
        };
        this.state.selectedOffrdServiceData.push( newArray[elementsIndex].service_id);
      }
      this.state.offrdSelectedIDS = this.state.selectedOffrdServiceData.map(item => item).join(', ');
      console.log( 'Selected serviceIds : ',this.state.offrdSelectedIDS);
      this.setState({services : this.state.offrdSelectedIDS });
      this.setState({
        item: newArray,
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
        {/* <View style={styles.container}> */}
        <Text style={styles.titleText}>Update Skills</Text>
        <Text style={{
            color: 'white',
            fontWeight:'500',
            fontSize:25,
            marginBottom:15,marginLeft:"6%"}}>How far from home will you travel?</Text>
          <Dropdown
              style={styles.dropDownContainer}
              placeholder='Select Radius'
              underlineColor='transparent'
              iconColor='#E1E1E1'
              useNativeDriver={false}
              animationDuration={0}
              data={data}
              onChangeText={(id) => this.onClickRadiusListener(id)}
              value= {this.state.radius}
          /> 
          <Text style={{
            color: 'white',
            fontWeight:'500',
            fontSize:25,
            marginBottom:15,marginLeft:"6%"}}>How much hourly rate will charge ?</Text>
          <View style={{borderColor:'#A9A9A9',
      borderWidth:1,
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      marginLeft:20,
      marginRight:20,
      height:45,
      marginBottom:30,
      marginTop:10,
      flexDirection: 'row',
      alignItems:'center'}}>
          <TextInput style={{height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
      color:"black"}}
              placeholder="Hourly Rate"
              placeholderTextColor = '#A9A9A9'
              keyboardType='decimal-pad'
              underlineColorAndroid='transparent'
              onChangeText={(text) => this.validateHrlyRate(text)}
              value={this.state.hrlyRate}
              />
        </View> 
          {/* <Text style={{
            color: 'white',
            fontWeight:'500',
            fontSize:25,
            marginBottom:15,marginLeft:"6%",marginRight:'6%'}}>Provide an overview of your experience as a mechanic</Text>
          <FlatList
            data={this.state.skills}
            renderItem={({ item}) => 
            {return(
              <View style={{flexDirection: 'row',marginBottom:10, marginTop:5, alignContent:'center',justifyContent:'center' }}>
    
                    <CheckBox style={{alignSelf:'flex-start'}}
                    style={{width:'10%',alignSelf:'center'}}
                    checkedCheckBoxColor= "white"//"#6495ED"
                    size="lg"
                    uncheckedCheckBoxColor= "#A9A9A9"
                    onClick={() => selectedServices(item.skill_id)}
                    isChecked={item.check}
                    /> 
                    <Text style={{width: '40%',color:'white', marginTop: 2}}>
                      {item.skill_name}
                    </Text>
              </View>)
            }}
            /> */}
            {/* { selectedSkills.includes("0") ?
             <View style={styles.inputAddressContainer}>
                <TextInput style={styles.inputs}
                      placeholder = {this.state.skillsPlaceholder}
                      placeholderTextColor = '#A9A9A9'
                      keyboardType="default"
                      underlineColorAndroid='transparent'
                      onChangeText={(text) => this.validateSkill(text)}
                      value = {this.state.skill}
                  />
            </View> 
             : <View> </View> }  */}
             <Text style={{
            color: 'white',
            fontWeight:'500',
            fontSize:25,
            marginBottom:15,marginLeft:"6%"}}>Which services will you offer to clients?</Text>

            <View style={{width:'100%'}}>
                    <View style={{borderRadius:30,
            marginLeft:20,
            marginRight:20,
            marginBottom:15,
            justifyContent:'space-evenly',
            flexDirection: 'row',
            alignItems:'center'}}>
                    <FlatList
                      data={this.state.item}
                      renderItem={({ item}) => {
                      return(
                      <TouchableOpacity
                        style={{marginBottom:10}}
                        onPress={()=> selectedOfferedServices(item.service_id)}>
                        {this.checkService(item.service_name,item.service_image,item.check,item.service_id, item.service_status,item.my_service)}
                      </TouchableOpacity>)
                        }}
                        />
                    </View>
                </View>

                  {/* <View style={{borderRadius:30,
                    marginLeft:20,
                    marginRight:20,
                    marginBottom:15,
                    justifyContent:'space-evenly',
                    flexDirection: 'row',
                    alignItems:'center'}}>
                            <FlatList
                            data={this.state.item}
                            renderItem={({ item}) => {
                            return(
                              <View style={{flexDirection: 'row',justifyContent: 'center',
                              alignItems: 'center',width:'95%',borderBottomColor: '#818EB7',
                              borderBottomWidth: 1,flex:1}}>
                                <Text style = {{ color: 'white',fontWeight:'bold',fontSize:22,marginLeft:10,alignItems: 'center', 
                                flex:1}}>
                                {item.service_name}
                                </Text>
                                <CheckBox
                                  isChecked={this.state.isChecked} 
                                  color="white"
                                  checkBoxColor="white"
                                  value = { this.state.check[item.service_id] }
                                  onClick = {() => this.checkBox_Test(item.service_id) }
                                />
                              </View>
                            )}
                            }
                      />
                  </View> */}

          <TouchableOpacity style={[styles.buttonContainer, styles.connectButton]} 
                 onPress={() => this.onClickUpdateDetailsListener()} >
            <Text style={styles.connectText}>Update Details</Text>
          </TouchableOpacity>  
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
      borderRadius:30,
      marginLeft:20,
      marginRight:20,
      height:45,
      marginBottom:15,
      justifyContent:'space-evenly',
      flexDirection: 'row',
      alignItems:'center'
  },
  inputAddressContainer: {
    borderColor:'#A9A9A9',
    borderWidth:1,
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    marginLeft:20,
    marginRight:20,
    height:45,
    marginBottom:15,
    justifyContent:'space-evenly',
    flexDirection: 'row',
    alignItems:'center'
 },
  inputContainerName: {
      borderColor:'#A9A9A9',
      borderWidth:1,
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      marginTop:25,
      marginLeft:20,
      marginRight:20,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  multiSelectContainer: {
    // flex: 1,
    backgroundColor:'#FFFFFF',
    borderColor:'#A9A9A9',
    borderWidth:1,
    borderRadius:30,
    marginBottom:15,
    paddingLeft:15,
    paddingRight:15,
    paddingTop:10,
    justifyContent:'center',
    marginLeft:20,
    marginRight:20,
 
 },
  inputs:{
      height:50,
      marginLeft:16,
      fontSize:20,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputName:{
      marginTop:20,
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  dropDownContainer:{
    borderColor:'#A9A9A9',
            borderWidth:1,
            // backgroundColor: '#FFFFFF',
            backgroundColor : 'white',
            borderRadius:30,
            borderTopEndRadius:30,
            borderTopRightRadius:30,
            borderTopLeftRadius:30,
            // marginTop:25,
            marginLeft:20,
            marginRight:20,
            height:45,
            marginBottom:15,
            flexDirection: 'row',
            alignItems:'center'
  },
  radioCircle: {
    height: 30,
    width: 30,
    borderRadius: 100,
    borderWidth: 2,
    alignSelf:'center',
    marginRight:8,
    marginTop:7,
    marginBottom:15,
    borderColor: '#818EB7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRb: {
    width: 15,
    height: 15,
    borderRadius: 50,
    backgroundColor: '#818EB7',
    },
    cardSelectedContainer: {
      // height: 65,
      alignItems: 'center', 
      flex:1,
      borderRadius: 20,
      flexDirection: 'row',
    },
  });