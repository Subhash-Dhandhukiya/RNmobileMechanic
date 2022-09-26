import React, { Component } from "react";
import { StyleSheet, Text, View,TextInput,Button,Image,Alert,TouchableHighlight,
    StatusBar, SafeAreaView, TouchableOpacity,FlatList,BackHandler, TouchableWithoutFeedback, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-material-dropdown-v2-fixed';
import AddressViewModel from "../../ViewModels/AddressViewModel";
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import HelpRequestViewModel from "../../ViewModels/HelpRequestViewModel";

var userType = '';


export default class HelpRequest extends Component
 {

  constructor(props) {
    super(props);
    this.getHepRequestDetails();
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
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

  onClickGenerateListner(){
    this.onGenerateHepRequest();
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
      console.log('Message is Not Correct');
      this.setState({message: text});
      return false;
    } else {
      this.setState({message: text});
      console.log('Message is Correct');
    }
  };

  state=
  {
    
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
    helpRequestList:[],
    subject:'',
    message:'',
 }


    getHepRequestDetails(){
      HelpRequestViewModel.onGetHelpRequestAPI().then(
        (response,error) => {
        //get callback here
        console.log('View client helprequest output',response)
        if (response.RESPONSE_CODE == 200){
          console.log('Success res :',response.RESPONSE_DATA.request_number)
          let data = response.RESPONSE_DATA.request_number
           this.setState({ helpRequestList: [...this.state.helpRequestList, ...data ] }) //another array
           console.log('updated Array ::',this.state.helpRequestList)
        }else{
          alert('Something went wrong, please try again');
        }
     });
    }

    ReplaceText(message){
      var  text= message.replace('<br><br>'," ")
      var finalmessage=text.replace('<br>'," ")
      return<>
 <Text style={styles.listAddressText}>{'Message : ' + finalmessage}</Text>
      

      </>
    }

    onGenerateHepRequest(){
      const NetInfo = require("@react-native-community/netinfo"); 
      NetInfo.fetch().then(state => {
      console.log("Network Details :",state)
      if (state.isConnected == true) {
        let subReg = /^[a-zA-Z ]{2,40}([a-zA-Z ]{2,40})+$/;
        var msgReg = /^\w(\w(\.{1}|\s{1})?)+\w$/;
        if (this.state.subject === ''){
          alert('Please enter subject');
          return false;
        }
        else  if (subReg.test(this.state.subject) === false) {
          console.log('Subject is not correct');
          alert('Subject is not valid');
          return false;
        } 
        else if (this.state.message === ''){
          alert('Please enter message');
          return false;
        }
        else  if (msgReg.test(this.state.message) === false) {
          console.log('Message is not correct');
          alert('Message is not valid');
          return false;
        } 
        else {
          HelpRequestViewModel.onHelpRequest(this.state.subject,this.state.message).then(
            (response,error) => {
            console.log('Generate helprequest output',response)
            if (response.RESPONSE_CODE == 200){
              console.log('Success res :',response)
              Alert.alert('Successfully generated help request')
              this.setState({helpRequestList : []})
              this.getHepRequestDetails();
              this.setState({subject : ""});
              this.setState({message : ""});
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

    actionOnRow(item) {
      console.log('Selected Item :',item);
      this.props.navigation.navigate('EditHelpRequest',{passData:item});
   }
 
    render() {
      const selectedServices = (index) => {
        const elementsIndex = this.state.helpRequestList.findIndex(
          (element) => element.id == index,
        );
        let newArray = [...this.state.helpRequestList];
       
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
            helpRequestList: newArray,
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
        <Text style={styles.titleText}>Help Request</Text>
        {this.state.helpRequestList == "" ? <Text style={styles.titleText2}>No help request are available</Text> : 
        <FlatList
          data={this.state.helpRequestList}
          renderItem={({ item}) => 
              {return(
                <TouchableWithoutFeedback onPress={ () => this.actionOnRow(item)}>
                      <View style={styles.container}>
                            <Text style={styles.listTitleText}>{item.subject} </Text>
                           
                           
                           {/* { this.ReplaceText(item.message)} */}
                           <Text style={styles.listAddressText}>
                              {item.request_status == "1" ? "Request Status : Open"  : "Request Status : Close" }
                              </Text>
                            <Text style={styles.listAddressText}>{'Date : ' + item.created_on}</Text>
                            { this.ReplaceText(item.message)}
                            {/* <Text style={styles.listAddressText}>{'RequestId : ' + item.request_id}</Text> */}
                      </View>
             </TouchableWithoutFeedback>)
              }}
          />}

          <Text style={{alignItems: 'center',alignSelf:'center',color: 'white',fontWeight:'bold',fontSize:27,marginBottom:10,
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
          </View>

          <Text style={{color: 'white',fontWeight:'400',fontSize:23,marginLeft:15,marginTop:10,marginBottom:10,}}>
            Message
          </Text>
          <View style={styles.inputContainer2}>
          <TextInput style={styles.msgInputs}
           multiline
           placeholder = "Please enter message"
           placeholderTextColor = '#A9A9A9'
           keyboardType="default"
           underlineColorAndroid='transparent'
           onChangeText={(text) => this.validateMessage(text)}
           value={this.state.message}
           />
          </View>

          <TouchableOpacity style={[styles.buttonContainer, styles.connectButton]} onPress={() => this.onClickGenerateListner()} >
              <Text style={styles.connectText}>Generate</Text>
          </TouchableOpacity> 
        {/* <FlatList
   data={this.state.helpRequestList}
   renderItem={({ item}) => 
              {return(
                <TouchableWithoutFeedback onPress={ () => this.actionOnRow(item)}>
                      <View style={styles.container}>
                            <Text style={styles.listTitleText}>{item.subject} </Text>
                            <Text style={styles.listAddressText}>{'Message : ' + item.message}</Text>
                            <Text style={styles.listAddressText}>{'Date : ' + item.created_on}</Text>
                            <Text style={styles.listAddressText}>{'RequestId : ' + item.request_id}</Text>
                            <Text style={styles.listAddressText}>{'Request Status : ' + item.request_status}</Text>
                      </View>
             </TouchableWithoutFeedback>)
              }}
              /> */}
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
      height:75,
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
      height:75,
      marginLeft:16,
      fontSize:20,
      maxHeight:200,
      borderBottomColor: '#FFFFFF',
      flex:1,
      color:"black",
  },
  });