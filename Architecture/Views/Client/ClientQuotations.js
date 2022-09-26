import React, { Component } from "react";
import { StyleSheet, Text, View,TextInput,Button,Image,Alert,TouchableHighlight,
    StatusBar, SafeAreaView, TouchableOpacity,FlatList,TouchableWithoutFeedback,BackHandler, ScrollView} from 'react-native';
import { Card, CardItem, Left, Right } from 'react-native-paper';
import QuatationViewModel from "../../ViewModels/QuotationViewModel";
import BookAppointmentViewModel from "../../ViewModels/BookAppointmentViewModel";
import SegmentedControlTab from 'react-native-segmented-control-tab';
import RNRestart from 'react-native-restart';

export default class ClientQuotations extends Component
 {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.onGetClientQuotationDetails();
  }

    async componentWillMount(){
         this.onGetClientQuotationDetails();

        //  for(var i=0;i<this.state.dummyQuotationArr.length;i++){
        //   if(this.state.dummyQuotationArr[i].request_status == "Accepted"){
        //     this.state.acceptedJobs.push( this.state.dummyQuotationArr[i] );
        //   }else{
        //     this.state.newJobs.push( this.state.dummyQuotationArr[i] );
        //   }
        //  }
         console.log('Accepted Jobs :: ', this.state.acceptedJobs);
         console.log('New Jobs : ', this.state.newJobs);
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
     selectedIndex: 0,
     quotationDetails:[],
     requestDetails:[],
     quotationList:[
      {
          "vehicle_id": "1",
          "request_id": "8",
          "client_id": "2",
          "vehicle_name": "",
          "vehicle_make": "Mercedes",
          "vehicle_model": "Mehbachk",
          "vehicle_year": "2021",
          "vehicle_status": "Active",
          "created_on": "2021-12-03 19:00:11",
          "services": [
              {
                  "service_id": "1",
                  "service_name": "car repairing"
              },
              {
                  "service_id": "2",
                  "service_name": "paints"
              }
          ]
        },
        {
          "vehicle_id": "2",
          "request_id": "10",
          "client_id": "3",
          "vehicle_name": "",
          "vehicle_make": "Test",
          "vehicle_model": "Hoshiarpur ",
          "vehicle_year": "2021",
          "vehicle_status": "Active",
          "created_on": "2021-12-04 10:37:50",
          "services": [
              {
                  "service_id": "1",
                  "service_name": "car repairing"
              },
              {
                  "service_id": "2",
                  "service_name": "paints"
              }
          ]
        }
        ],
        servicesArr:[],
        servNameArr:"",
        dummyQuotationArr:[
          {
            "vehicle_id":"2",
            "client_user_id":"3",
            "mechanic_user_id":"3",
            "request_id":"34",
            "request_status":"Accepted",
            "provide_feedback":"",
            "request_details":
            [
              {
                "service_id":"3",
                "service_details":"Wheel Alignment",
                "service_price":"25",
                "amount":25,"tax":"2",
                "qty_unit":"1",
                "qty_unit_name":"0",
                "total":25.5
              }
            ],
            "labour_details":[],
            "parts_details":[]
          },
          {
            "vehicle_id":"2",
            "client_user_id":"3",
            "mechanic_user_id":"6",
            "request_id":"40",
            "request_status":"NotAccepted",
            "provide_feedback":"This is Rajkumar mechanic - 1",
            "request_details":
            [
              {
                "service_id":"1",
                "service_details":"Car Denting",
                "service_price":"25",
                "amount":25,
                "tax":"0",
                "qty_unit":"1",
                "qty_unit_name":"0",
                "total":25
              },
              {
                "service_id":"2",
                "service_details":"Wheel Balancing",
                "service_price":"25",
                "amount":50,
                "tax":"0",
                "qty_unit":"2",
                "qty_unit_name":"0",
                "total":50
              },
              {
                "service_id":"3",
                "service_details":"Wheel Alignment",
                "service_price":"50",
                "amount":50,
                "tax":"0",
                "qty_unit":"1",
                "qty_unit_name":"0",
                "total":50
              },
              {"service_id":"4",
              "service_details":"Car Painting",
              "service_price":"50",
              "amount":100,
              "tax":"0",
              "qty_unit":"2",
              "qty_unit_name":"0",
              "total":100
            }
          ],
          "labour_details":
          [
            {
              "labour_details":"Labour - 1",
              "labour_amount":"200",
              "labour_taxes":"0",
              "labour_total":"200"
            }
          ],
          "parts_details":
          [
            {
              "parts_details":"Part - 1",
              "parts_amount":"150",
              "parts_taxes":"value",
              "parts_total":"150"
            },
            {
              "parts_details":"Part - 2",
              "parts_amount":"200",
              "parts_taxes":"value",
              "parts_total":"200"
            }
          ]
        },
      ],
      acceptedJobs:[],
      newJobs:[],
      }

      handleIndexChange = index => {
        this.setState({
           ...this.state,
           selectedIndex: index
       });
          }

      actionOnRow(item) {
        console.log('Selected Item :',item);
        if(item.request_status == "0"){
          alert("RFQ waiting for mechanic quote genaeration");
        }else if(item.request_status == "2"){
          this.props.navigation.navigate('BookQuotation', {passQuot : item});
        }else{
          alert("Already appointment booked");
        }
        
      //   BookAppointmentViewModel.onBookAppointmentAPI(item.client_user_id,item.mechanic_user_id,
      //     item.vehicle_id,item.request_details[0].service_id,).then(
      //     (response,error) => {
      //     //get callback here
      //     console.log('Output',response)
      //     if (response.RESPONSE_CODE == 200){
      //       const elementsIndex = this.state.quotationDetails.findIndex(
      //         (element) => element.vehicle_id == item.vehicle_id,
      //       );
      //       // let sta = this.state.quotationDetails[elementsIndex].status = true
      //       // this.setState({quotationDetails : sta})
      //       this.state.quotationDetails[elementsIndex].status = true
      //       console.log('QuoteDetails : ', this.state.quotationDetails)
      //       alert('Successfully booked appointment')
      //     }else{
      //       alert('Something went wrong, please try again');
      //     }
      //  });
       }

    onGetClientQuotationDetails(){
      QuatationViewModel.onGetQuotationAPI().then(
        (response,error) => {
        //get callback here
        console.log('Output',response)
        if (response.RESPONSE_CODE == 200){
          for(var i=0;i<response.RESPONSE_DATA.length;i++){
            this.setState({requestDetails:response.RESPONSE_DATA[i].request_details});
          }
          this.setState({quotationDetails:response.RESPONSE_DATA});
          console.log('quotation Details : ',this.state.quotationDetails);
          console.log('request Details : ',this.state.requestDetails);
          this.state.servicesArr.push( this.state.requestDetails[i].service_details);
          this.state.servNameArr = this.state.servicesArr.map(item => item).join(', ');
          console.log('Service Name Details : ',this.state.servNameArr);

        }else{
          alert('Something went wrong, please try again');
        }
     });
    }

    onClickBookAppointmentListener(){
      BookAppointmentViewModel.onBookAppointmentAPI().then(
        (response,error) => {
        //get callback here
        console.log('Output',response)
        if (response.RESPONSE_CODE == 200){
          
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
          <ScrollView>
          <View style={styles.container}>
          <Text style={styles.titleText}>Quotations Received</Text>
          {
            this.state.quotationDetails.length == 0 ? 
            <Text style={{alignItems: 'center',
            alignSelf:'center',
            color: 'white',
            fontWeight:'bold',
            fontSize:25,
            marginBottom:20,marginTop:150,height:60}}>No quotation received</Text> :
          
          <FlatList
              data={this.state.quotationDetails}
              // data={this.state.requestDetails}
              renderItem={({ item , index}) => 
                  {return(
                    <TouchableWithoutFeedback onPress={ () => this.actionOnRow(item)}>
                    <SafeAreaView style={styles.listContainer}>
                    <View style={styles.listContainer}>
                    <Card style={{flex: 1,marginLeft:10,marginRight:10, backgroundColor:'clear'}}>
                    <View style={{flexDirection: 'column',marginBottom:10, marginTop:5,borderRadius:10,backgroundColor:'#D3D3D3'}}>
                        
                       <View style={styles.textView}>
                        {/* <Text style={styles.textContainer}> Service Price      :  </Text> */}
                        {/* <Text style={styles.textContainer}> {item.request_details[0].service_price} </Text> */}
                        <Text style={styles.textContainer}> Mechanic Name : </Text>
                        <Text style={styles.textContainer}> {item.mechanic_name} </Text>
                       </View>
                       <View style={styles.textView}>
                        {/* <Text style={styles.textContainer}> Service Hours     :  </Text> */}
                        {/* <Text style={styles.textContainer}> {item.request_details[0].qty_unit_name} </Text> */}
                        <Text style={styles.textContainer}> Mechanic Address : </Text>
                        <Text style={styles.textContainer}> {item.mechanic_address} </Text>
                       </View>
                       <View style={styles.textView}>
                        {/* <Text style={styles.textContainer}> Service total        :  </Text> */}
                        {/* <Text style={styles.textContainer}> {item.request_details[0].total} </Text> */}
                        <Text style={styles.textContainer}> RFQ Date : </Text>
                        <Text style={styles.textContainer}> {item.created_on} </Text>
                       </View>

                       <View style={styles.textView}>
                        <Text style={styles.textContainer}> Service Details : </Text>
                        {/* <Text style={styles.textContainer}> {item.request_details[0].service_details} </Text> */}
                        <Text style={styles.textContainer}> {(item.request_details).map(serItems => serItems.service_details).join(', ')}  </Text>
                        
                       </View>
                       </View>
                    </Card>
                    </View>
                  </SafeAreaView>
                  </TouchableWithoutFeedback>
                  )
                }}
                />
              }
          </View>
          </ScrollView>
          </SafeAreaView>
          </>


      // <View style={styles.container}>
      // <SegmentedControlTab
      //   values              = { ["New", "Accepted"] }
      //   selectedIndex       = { this.state.selectedIndex }
      //   onTabPress          = { this.handleIndexChange }
      //   tabsContainerStyle  = { styles.tabContainerStyle }
      //   tabStyle            = { styles.tabStyle }
      //   tabTextStyle        = { styles.tabTextStyle }
      //   activeTabStyle      = { styles.activeTabStyle }
      //   activeTabTextStyle  = { styles.activeTabTextStyle }
      //   borderRadius        = {10}
      // />
      //   {
      // this.state.selectedIndex === 0 ?
      //       <View>
      //         { this.state.newJobs.length == 0 ?
      //         <SafeAreaView style={styles.maincontainer}>
      //         <View style={styles.container}>
      //         <Text style={styles.noView}> No new quotations found</Text>
      //         </View>
      //         </SafeAreaView> :
      //           <FlatList style={{textAlign: 'center',height:"100%",width:'100%',
      //           marginTop:5,color:'#2F4F4F',fontWeight:"bold",fontSize:25}}
      //           data={this.state.newJobs}
      //           renderItem={({ item , index}) => 
      //               {return(
      //                 <TouchableWithoutFeedback onPress={ () => this.actionOnRow(item)}>
      //                 <SafeAreaView style={styles.maincontainer}>
      //                 <View style={styles.container}>
      //                 <Card style={{justifyContent:'center', borderWidth:1, borderColor:'gray', borderRadius:10,width:'95%'}}>
      //                 <View style={{flexDirection: 'column',marginBottom:10, marginTop:5,borderRadius:10}}>
      //                     <Text style={styles.paragraph}> Service Details    :  {(item.request_details).map(serItems => serItems.service_details).join(', ')} </Text>
      //                     <Text style={styles.paragraph}> Service Price      :  {item.request_details[0].service_price}</Text>
      //                     <Text style={styles.paragraph}> Service Hours     :  {item.request_details[0].qty_unit_name}</Text>
      //                     <Text style={styles.paragraph}> Service total        :  {item.request_details[0].total}</Text>
      //                    </View>
      //                 </Card>
      //                 </View>
      //               </SafeAreaView>
      //               </TouchableWithoutFeedback>
      //               )
      //             }}
      //             />
      //         }
      //       </View> :
      //        <View>
      //          { this.state.acceptedJobs.length == 0 ?
      //          <SafeAreaView style={styles.maincontainer}>
      //          <View style={styles.container}>
      //         <Text style={styles.noView}> No accepted quotes found</Text>
      //         </View>
      //         </SafeAreaView> :
      //       <FlatList style={{textAlign: 'center',marginBottom:10,marginLeft:10,marginRight:10,height:"100%",
      //       marginTop:5,color:'#2F4F4F',fontWeight:"bold",fontSize:25,}}
      //       data={this.state.acceptedJobs}
      //       renderItem={({ item , index}) => 
      //           {return(
      //             <TouchableWithoutFeedback onPress={ () => this.actionOnRow(item)}>
      //             <SafeAreaView style={styles.maincontainer}>
      //             <View style={styles.container}>
      //             <Card style={{flex: 1,width:'95%', backgroundColor:'clear'}}>
      //             <View style={{flexDirection: 'column',marginBottom:10, marginTop:5,borderRadius:10}}>
      //                     <Text style={styles.paragraph}> Service Details    :  {(item.request_details).map(serItems => serItems.service_details).join(', ')} </Text>
      //                     <Text style={styles.paragraph}> Service Price      :  {item.request_details[0].service_price}</Text>
      //                     <Text style={styles.paragraph}> Service Hours     :  {item.request_details[0].qty_unit_name}</Text>
      //                     <Text style={styles.paragraph}> Service total        :  {item.request_details[0].total}</Text>
      //                    </View>
      //             </Card>
      //             </View>
      //           </SafeAreaView>
      //           </TouchableWithoutFeedback>
      //           )
      //         }}
      //         />
      //       }
      //   </View>
      //     }
      //    </View>
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
      backgroundColor:'#03254c',
    },
    connectButton1: {
      backgroundColor:'gray',
    },
    connectText: {
     color: 'white',
     fontWeight:'bold',
     fontSize:25,
    },


    noView:{
      marginTop:0,
      textAlign: 'center',
      marginBottom:10,
      marginLeft:10,
      marginRight:10,
      height:"100%",
      marginTop:55,
      color: "white",//'#2F4F4F',
      fontWeight:"bold",
      fontSize:25,
    },
    container: { // entire view/screen
      backgroundColor: '#002458',
      flex: 1,
      alignItems: 'center', 
      justifyContent: 'center'
      // flex: 1,
      //  height:"100%",
      //  flexDirection:'column',
      //  // backgroundColor: '#FFFFFF',
      //  backgroundColor: '#002458',
      //  alignItems: 'center',
  
      //  marginBottom:0,
    },
    tabContainerStyle: {  // the tab container
      backgroundColor: 'clear',
          marginTop:100,
      width: '100%',
          height: '8%',
      borderRadius: 10,
    },
    tabStyle: {     // tab not selected
      backgroundColor: 'lightgray',
      borderRadius: 10, borderColor: 'transparent',
      fontSize: 18,
      margin: 5
    },
    tabTextStyle: {   // text of the unselected tab
      color: '#818181',
      fontSize: 18
    },
    activeTabStyle: {   // tab selected
      backgroundColor: '#FDD248',
      borderRadius: 10, borderColor: 'transparent',
      margin: 5,
      shadowOpacity: 0.5, shadowRadius: 1, shadowOffset: {width: 0, height: 0}
    },
    activeTabTextStyle: { // selected tab's text
      color: 'black',
          fontWeight:'bold',
      fontSize: 18
    },
    textStyle: {
      color: 'black',
      fontSize: 20, fontWeight: '700',
      marginTop: 10
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 15,
      backgroundColor: '#002458',
    },
    paragraph: {
      fontSize: 18,
      fontWeight: 'bold',
      // textAlign: '',
      marginLeft:15,
      marginBottom:10
    },

  
  });