import React, { Component } from 'react';
// import { Dimensions, View, Text, StyleSheet } from 'react-native';
import { Dimensions, StyleSheet, Text, View,TextInput,Button,Image,Alert,TouchableHighlight,
    StatusBar, SafeAreaView, TouchableOpacity,FlatList,TouchableWithoutFeedback} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import CheckBox from 'react-native-check-box';
import { Card, CardItem, Left, Right } from 'react-native-paper';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import JobsViewModel from '../../ViewModels/JobsViewModel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QuatationViewModel from '../../ViewModels/QuotationViewModel';
import RNRestart from 'react-native-restart';

class Scheduled extends Component {

   constructor() {
    super();
    this.getBookedJobsList();
    this.getCompletedJobsLists();
    this.getUserType();
    }

    state = {
      selectedIndex: 0,
      checkBox1:false,
      checkBox2:false,
      checkBox3:false,
      checkBox4:false,
      mechanic:false,
      listData:[],
      CompletedlistData:[],
    }

    async componentWillMount(){
      this.getCompletedJobsLists();
      // window.location.reload(false);
    }
    
    getBookedJobsList = async () => {
      let type = await AsyncStorage.getItem('userType');
      console.log('userType :::',type);
      if (type == "4"){
        JobsViewModel.BookedJobsListAPI().then(
          (response,error) => {
            console.log('res : ',response)
            if (response.RESPONSE_CODE == 200){
             this.setState({
               listData:response.RESPONSE_DATA
             });
             console.log('myJobsList : ',this.state.listData);
            }else{
             alert('Something went wrong, please try again');
            }
         }
        );
      }else{
        // this.setState({
        //   listData:[]
        // })
        QuatationViewModel.onMechanicBookedJobsAction().then(
          (response,error) => {
            console.log('res : ',response)
            if (response.RESPONSE_CODE == 200){
             this.setState({
               listData:response.RESPONSE_DATA
             });
             console.log('myJobsList : ',this.state.listData);
            }else{
             alert('Something went wrong, please try again');
            }
         }
        );
      }
    }
    getCompletedJobsLists = async () => {
      JobsViewModel.CompletedJobsListAPI().then(
        (response,error) => {
          console.log('res : ',response)
          if (response.RESPONSE_CODE == 200){
           this.setState({
            CompletedlistData:response.RESPONSE_DATA
           });
           console.log('myClosedJobsList : ',this.state.CompletedlistData);
          }else{
           alert('Something went wrong, please try again');
          }
       }
      );
    }
     handleIndexChange = index => {
      this.setState({
        ...this.state,
        selectedIndex: index
        });
     }
     actionOnRow(item) {
      console.log('Selected job :',item);
      this.props.navigation.navigate('ScheduledDetails', {passQuot : item});
     }
     onTapDetailsBtn(item) {
      console.log('Selected detailed job :',item);
      this.props.navigation.navigate('ScheduledJobDetails', {detailJob : item});
     }
     getUserType = async () =>{
      this.setState({userType : await AsyncStorage.getItem('userType')});
      console.log('UserType : ', this.state.userType);
     }
   render () {
  return (
    <View style={styles.container}>
      <SegmentedControlTab
        values              = { ["Scheduled", "Completed"] }
        selectedIndex       = { this.state.selectedIndex }
        onTabPress          = { this.handleIndexChange }
        tabsContainerStyle  = { styles.tabContainerStyle }
        tabStyle            = { styles.tabStyle }
        tabTextStyle        = { styles.tabTextStyle }
        activeTabStyle      = { styles.activeTabStyle }
        activeTabTextStyle  = { styles.activeTabTextStyle }
        borderRadius        = {10}
      />
        {
      this.state.selectedIndex === 0 ?
            <View>
              { this.state.listData.length == 0 ?
              <SafeAreaView style={styles.maincontainer}>
              <View style={styles.container}>
              <Text style={styles.noView}> No scheduled jobs found</Text>
              </View>
              </SafeAreaView> :
                <FlatList style={{textAlign: 'center',marginBottom:10,marginLeft:10,marginRight:10,height:"100%",
                marginTop:5,color:'#2F4F4F',fontWeight:"bold",fontSize:25,}}
                    data={this.state.listData}
                    renderItem={({ item}) =>
                        {return(
      // <TouchableWithoutFeedback onPress={ () => this.actionOnRow(item)}>
      <View style={styles.container}>
        <Card style={{justifyContent:'center', borderWidth:1, borderColor:'gray', borderRadius:10,marginBottom:40}}>
          <Text style={styles.paragraph}>
              Vehicle : {item.vehicle_name}
          </Text>
          <Text style={styles.paragraph}>
              Year : {item.vehicle_year}
          </Text>
          {/* <Text style={styles.paragraph}>
              Work : {item.work}
          </Text> */}
          {
            this.state.userType === "3" ? <Text style={styles.paragraph}>
            Client : {item.client_name }
            </Text> : <Text style={styles.paragraph}>
              Mechanic : {item.mechanic_name}
            </Text>
          }
          {
            this.state.userType === "3" ? <Text style={styles.paragraph}>
            Date : {item.booking_date }
            </Text> : <Text style={styles.paragraph}>
            Date : {item.book_datetime}
            </Text>
          }
          {
            this.state.userType == "4" ? <Text style={styles.paragraph}>
            Address : {item.mechanic_address}
            </Text> : <Text style={styles.paragraph}>
            Address : {item.client_address}
            </Text>
          }
          <View style={{flexDirection:'row',justifyContent:'space-evenly',marginBottom:10}}>
           <TouchableOpacity onPress={ () => this.onTapDetailsBtn(item)}>
                  <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:10}}>
                  <Text style={{color: 'black',
                      fontWeight:'bold',
                      fontSize:18,
                      justifyContent:'center',
                      marginTop:30,
                      textAlign:'center',borderWidth:2, borderRadius:5,}}> Details </Text>
                  </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={ () => this.actionOnRow(item)}>
                  <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:10}}>
                  <Text style={{color: 'black',
                      fontWeight:'bold',
                      fontSize:18,
                      justifyContent:'center',
                      marginTop:30,
                      textAlign:'center',borderWidth:2, borderRadius:5,}}> Close </Text>
                  </View>
                  </TouchableOpacity>
                  </View>
        </Card>
      </View>
    // </TouchableWithoutFeedback>
                  )
                }}
                />
              }
            </View> :
          //   <View style={styles.viewStyles}>
          // <Text style={styles.noView}> No completed jobs found</Text>
          // </View> }
             <View>
               { this.state.CompletedlistData.length == 0 ?
               <SafeAreaView style={styles.maincontainer}>
               <View style={styles.container}>
              <Text style={styles.noView}> No completed jobs found</Text>
              </View>
              </SafeAreaView> :
            <FlatList style={{textAlign: 'center',marginBottom:10,marginLeft:10,marginRight:10,height:"100%",
            marginTop:5,color:'#2F4F4F',fontWeight:"bold",fontSize:25,}}
                data={this.state.CompletedlistData}
                renderItem={({ item}) =>
                    {return(
                        <SafeAreaView style={styles.container}>
                        <View style={styles.container}>
                        <Card style={{justifyContent:'center', borderWidth:1, borderColor:'gray', borderRadius:10,marginBottom:40}}>
          <Text style={styles.paragraph}>
              Vehicle : {item.vehicle_name}
          </Text>
          <Text style={styles.paragraph}>
              Year : {item.vehicle_year}
          </Text>
          {
            this.state.userType == "4" ? <Text style={styles.paragraph}>
            Client : {item.mechanic_name }
            </Text> : <Text style={styles.paragraph}>
              Mechanic : {item.mechanic_name}
            </Text>
          }
          {
            this.state.userType == "4" ? <Text style={styles.paragraph}>
            Date : {item.book_datetime }
            </Text> : <Text style={styles.paragraph}>
            Date : {item.book_datetime}
            </Text>
          }
          {
            this.state.userType == "4" ? <Text style={styles.paragraph}>
            Address : {item.mechanic_address}
            </Text> : <Text style={styles.paragraph}>
            Address : {item.mechanic_address}
            </Text>
          }
          {
            item.job_closed_by != this.state.userType && item.review_status == "0" ? <View>
               <TouchableOpacity onPress={ () => this.actionOnRow(item)}>
                <View style={{justifyContent:'center',marginBottom:10}}>
                <Text style={{color: 'black', 
                    fontWeight:'bold',
                    fontSize:18,
                    justifyContent:'center',
                    marginLeft:15,
                    marginRight:15,
                    textAlign:'center',borderWidth:2, borderRadius:5,}}> Review </Text>
                </View>
                </TouchableOpacity> 
            </View> : <View>

            </View>
          }
          
        </Card>
            </View>
          </SafeAreaView>
              )
            }}
            />
            }
        </View>
          }
         </View>
  )
    }
}
const styles = StyleSheet.create({
  viewStyles: {
    textAlign: 'center',
  },
  maincontainer: {
    height:"100%",
    width:'100%',
    flexDirection:'column',
    backgroundColor: '#002458',
  },
  viewStyles2: {
    width:"100%",
    height:'100%',
    justifyContent: 'center',
    backgroundColor: '#ECF0F1',
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
    padding: 5,
    marginTop:0,
    marginLeft:15,
    marginBottom:5
  },
});
export default Scheduled;