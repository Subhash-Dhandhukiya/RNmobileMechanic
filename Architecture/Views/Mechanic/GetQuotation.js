import React, { Component } from "react";
import { StyleSheet, Text, View,TextInput,Button,Image,Alert,TouchableHighlight,
    StatusBar, SafeAreaView, TouchableOpacity,FlatList,TouchableWithoutFeedback,BackHandler, ScrollView} from 'react-native';
import { Card, CardItem, Left, Right } from 'react-native-paper';
import QuatationViewModel from "../../ViewModels/QuotationViewModel";


export default class GetQuotation extends Component
 {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.onGetQuotationDetails();
  }

  async componentWillMount(){
      this.onGetQuotationDetails();
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentDidUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }

    state = {
     quotationDetails:[],
    //  quotationList:[
    //   {
    //       "vehicle_id": "1",
    //       "request_id": "8",
    //       "client_id": "2",
    //       "vehicle_name": "",
    //       "vehicle_make": "Mercedes",
    //       "vehicle_model": "Mehbachk",
    //       "vehicle_year": "2021",
    //       "vehicle_status": "Active",
    //       "created_on": "2021-12-03 19:00:11",
    //       "services": [
    //           {
    //               "service_id": "1",
    //               "service_name": "car repairing"
    //           },
    //           {
    //               "service_id": "2",
    //               "service_name": "paints"
    //           }
    //       ]
    //     },
    //     {
    //       "vehicle_id": "2",
    //       "request_id": "10",
    //       "client_id": "3",
    //       "vehicle_name": "",
    //       "vehicle_make": "Test",
    //       "vehicle_model": "Hoshiarpur ",
    //       "vehicle_year": "2021",
    //       "vehicle_status": "Active",
    //       "created_on": "2021-12-04 10:37:50",
    //       "services": [
    //           {
    //               "service_id": "1",
    //               "service_name": "car repairing"
    //           },
    //           {
    //               "service_id": "2",
    //               "service_name": "paints"
    //           }
    //       ]
    //     }
    //     ],
      }

      actionOnRow(item) {
        console.log('Selected Item :',item);

        if(item.request_type == "-3"){
          alert("Quotation already accepted");
        }else if(item.request_type == "2"){
          alert("Quotation already generated");
        }else if(item.request_type == "5"){
          alert("Quotation already done with booking");
        }else{
          this.props.navigation.navigate("GenerateQuotation",{ passDetails : item }); 
        } 
       }

    onGetQuotationDetails(){
      QuatationViewModel.onGetQuotationRequestAPI().then(
        (response,error) => {
        //get callback here
        console.log('Output',response)
        if (response.RESPONSE_CODE == 200){
          this.setState({quotationDetails:response.RESPONSE_DATA})
        }else{
          alert('Something went wrong, please try again');
        }
     });
    }
  
  
    render() {   
        return (
          <>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView style={styles.maincontainer}>
          <View style={styles.container}>
          <Text style={styles.titleText}>Get Quotations</Text>
  
          <FlatList
              data={this.state.quotationDetails}
              renderItem={({ item}) => 
                  {return(
                    <TouchableWithoutFeedback onPress={ () => this.actionOnRow(item)}>
                    <SafeAreaView style={styles.listContainer}>
                    <View style={styles.listContainer}>
                    <Card style={{flex: 1, width: '100%',backgroundColor:'clear'}}>
                    <View style={{flexDirection: 'column',marginBottom:10, marginTop:5,borderRadius:10,backgroundColor:'#D3D3D3'}}>
                        <View style={styles.textView}>
                        <Text style={styles.textContainer}> Vehicle Make    :  </Text>
                        <Text style={styles.textContainer}> {item.vehicle_make} </Text>
                       </View>
                       <View style={styles.textView}>
                        <Text style={styles.textContainer}> Vehicle Model   :  </Text>
                        <Text style={styles.textContainer}> {item.vehicle_model} </Text>
                       </View>
                       <View style={styles.textView}>
                        <Text style={styles.textContainer}> Vehicle Status   :  </Text>
                        <Text style={styles.textContainer}> {item.vehicle_status} </Text>
                       </View>
                       <View style={styles.textView}>
                        <Text style={styles.textContainer}> Quotation Date :  </Text>
                        <Text style={styles.textContainer}> {item.created_on} </Text>
                       </View>
                       <View style={styles.textView}>
                        <Text style={styles.textContainer}> Services              :  </Text>
                        <Text style={styles.textContainer}> {(item.services).map(serItems => serItems.service_name).join(', ')} </Text>
                       </View>
                       {
                         item.request_type == "-3"  ? 
                         <View style={styles.textView}>
                         <Text style={styles.textContainer}> Job Status              :  </Text>
                         <Text style={styles.textContainer}> Quotation Accepted </Text>
                        </View> : item.request_type == "-4"  ? 
                        <View style={styles.textView}>
                         <Text style={styles.textContainer}> Job Status              :  </Text>
                         <Text style={styles.textContainer}> Quotation Denied </Text> 
                         </View> : item.request_type == "5"  ?
                         <View style={styles.textView}>
                         <Text style={styles.textContainer}> Job Status              :  </Text>
                         <Text style={styles.textContainer}> Booking Received </Text> 
                         </View> : item.request_type == "2"  ?
                         <View style={styles.textView}>
                         <Text style={styles.textContainer}> Job Status              :  </Text>
                         <Text style={styles.textContainer}> Quotation Generated </Text> 
                         </View> :
                         <View style={styles.textView}>
                         <Text style={styles.textContainer}> Job Status            :  </Text>
                         <Text style={styles.textContainer}> RFQ Received </Text>
                        </View>
                       }
                       </View>
                    </Card>
                    </View>
                  </SafeAreaView>
                  </TouchableWithoutFeedback>
                  )
                }}
                />

          </View>
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
      padding: 10,
      backgroundColor: 'clear',//'#ecf0f1',
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

  
  });