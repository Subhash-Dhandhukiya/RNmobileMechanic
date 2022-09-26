import React, { Component } from "react";
import { StyleSheet, Text, View,TextInput,Button,Image,Alert,TouchableHighlight,
    StatusBar, SafeAreaView, TouchableOpacity,FlatList,TouchableWithoutFeedback,BackHandler, ScrollView,} from 'react-native';
import { Card, CardItem, Left, Right } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import QuatationViewModel from "../../ViewModels/QuotationViewModel";
import MultiSelect from 'react-native-multiple-select';
import Modal from "react-native-modal";
import { Dropdown } from 'react-native-material-dropdown-v2-fixed';
import AsyncStorage from '@react-native-async-storage/async-storage';

var jobDetails = [];

export default class ScheduledJobDetails extends Component
 {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.getUserType();
    }

    async componentWillMount(){
         BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
         this.getUserType();
    }

    componentDidUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }

    getUserType = async () =>{
      this.setState({userType : await AsyncStorage.getItem('userType')});
      console.log('UserType : ', this.state.userType);
     }

    state = {
      description:'',
      userType:'',
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

    didTapOnCloseJobs() {
      this.props.navigation.navigate('CloseJobs', {passCloseJobsData : jobDetails});
     }
  
    render() {  
        const {detailJob} = this.props.route.params;
        jobDetails = detailJob; 
        console.log('Sceduled jobs deatils : ', jobDetails);

        return (
          <>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView style={styles.maincontainer}>
              <ScrollView>
          <TouchableOpacity style={styles.navBarBackButton} onPress={() => this.handleBackButtonClick()}>
            <Icon name="chevron-left" color='gray' size={30}/>
          </TouchableOpacity>
          <View style={styles.container}>
          <Text style={styles.titleText}>Jobs Details</Text>
          {
            this.state.userType === "3" ? <View style={styles.textView1}>
            <Text style={styles.textContainer1}> Client Name    :  </Text>
            <Text style={styles.textContainer1}> {jobDetails.client_name}  </Text>
            </View> : <View style={styles.textView1}>
          <Text style={styles.textContainer1}> Mechanic Name    :  </Text>
          <Text style={styles.textContainer1}> {jobDetails.mechanic_name}  </Text>
          </View>
          }
          <View style={styles.textView1}>
          <Text style={styles.textContainer1}> Vehicle Name        :  </Text>
          <Text style={styles.textContainer1}> {jobDetails.vehicle_name}  </Text>
          </View>
          <View style={styles.textView1}>
          <Text style={styles.textContainer1}> Vehicle Year           :  </Text>
          <Text style={styles.textContainer1}> {jobDetails.vehicle_year}  </Text>
          </View>
          {
            this.state.userType === "3" ? <View style={styles.textView1}>
            <Text style={styles.textContainer1}> Service Date           :  </Text>
            <Text style={styles.textContainer1}> {jobDetails.booking_date}  </Text>
            </View> : <View style={styles.textView1}>
          <Text style={styles.textContainer1}> Service Date           :  </Text>
          <Text style={styles.textContainer1}> {jobDetails.book_datetime}  </Text>
          </View>
          }
          {
            this.state.userType === "3" ? <View style={styles.textView1}>
            <Text style={styles.textContainer1}> Address                    :  </Text>
            <Text style={styles.textContainer1}> {jobDetails.mechanic_address}  </Text>
            </View> : <View style={styles.textView1}>
          <Text style={styles.textContainer1}> Address                    :  </Text>
          <Text style={styles.textContainer1}> {jobDetails.mechanic_address}  </Text>
          </View>
          }
          
          
          <Text style={{alignItems: 'flex-start',alignSelf:'flex-start',color: 'white',fontWeight:'bold',marginLeft:20,marginTop:15,fontSize:25,marginBottom:10,}}>
              Service Details
          </Text>
          <View
            style={{
              borderColor: 'white',
              borderWidth: 2,
              width:'90%',
              marginBottom:20,
            }}
          />
          <FlatList
              data={jobDetails.request_details}
              renderItem={({ item , index}) => 
                  {return(
                    <SafeAreaView style={styles.listContainer}>
                    <View style={styles.listContainer}>
                    <Card style={{flex: 1,marginLeft:10,marginRight:10, backgroundColor:'clear'}}>
                    <View style={{flexDirection: 'column',marginBottom:10, marginTop:5,borderRadius:10,backgroundColor:'#D3D3D3'}}>
                        <View style={styles.textView}>
                        <Text style={styles.textContainer}> Service details    :  </Text>
                        <Text style={styles.textContainer}> {item.service_details}  </Text>
                       </View>
                       <View style={styles.textView}>
                        <Text style={styles.textContainer}> Service price     :  </Text>
                        <Text style={styles.textContainer}> {item.service_price} </Text>
                       </View>
                       <View style={styles.textView}>
                        <Text style={styles.textContainer}> Service Quantity     :  </Text>
                        <Text style={styles.textContainer}> {item.qty_unit} </Text>
                       </View>
                       <View style={styles.textView}>
                        <Text style={styles.textContainer}> Service Total     :  </Text>
                        <Text style={styles.textContainer}> {item.total} </Text>
                       </View>
                       </View>
                    </Card>
                    </View>
                  </SafeAreaView>
                  )
                }}
                />
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
      marginTop:0
    },
    maincontainer: {
      height:"100%",
      width:'100%',
      flexDirection:'column',
      backgroundColor: '#002458',
    },
    navBarBackButton: {
      justifyContent: 'flex-start',
      marginLeft:20,
      height:35,
    },
    titleText: {
      alignItems: 'center',
      alignSelf:'center',
      color: 'white',
      fontWeight:'bold',
      fontSize:25,
      marginBottom:20,
     },
     listContainer: {
      flex: 1,
      justifyContent: 'space-evenly',
      padding: 5,
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
      color:'black',
      width:'50%'
    },
    buttonContainer: {
      height:50,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf:'center',
      marginTop:15,
      marginBottom:20,
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
     fontWeight:'bold',
     fontSize:25,
    },
    textView1:{
        flex:1,
        flexDirection:'row', 
        marginTop:10,
        marginBottom:10,
        justifyContent:'center',
        marginLeft:20,
      },
      textContainer1:{
        fontWeight:'500',
        fontSize:20,
        color:'white',
        width:'50%'
      },

      inputContainer2: {
        borderColor:'#A9A9A9',
        borderWidth:1,
        backgroundColor: '#FFFFFF',
        borderRadius:8,
        marginLeft:20,
        marginRight:20,
        height:200,
        paddingLeft:10,
        marginTop:10,
        marginBottom:15,
        justifyContent:'flex-start',
        flexDirection: 'row',
        alignItems:'center'
      },
      msgInputs:{
        height:200,
        marginLeft:16,
        fontSize:20,
        maxHeight:400,
        borderBottomColor: '#FFFFFF',
        flex:1,
    },

    
  

  });