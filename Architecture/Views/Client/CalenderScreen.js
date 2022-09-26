import React, { Component } from "react";
import { StyleSheet, Text, View,TextInput,Button,Image,Alert,TouchableHighlight,
    StatusBar, SafeAreaView, TouchableOpacity,FlatList,BackHandler} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/FontAwesome';
import { Checkbox } from "react-native-paper";
import CheckBox from 'react-native-check-box';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from "moment";

const today = moment().format("YYYY-mm-dd");
// disable past dates
// const yesterday = moment().subtract(1, 'day');
// const disablePastDt = current => {
//   return current.isAfter(yesterday);
// };
export default class CalenderScreen extends Component
 {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }
  onDayPress = day => {
    setSelected(day.dateString);
  };
  disablePastDt = current => {
     let yesterday = moment().subtract(1, 'day');
     return current.isAfter(yesterday);
  };
  getSelectedDayEvents = date => {
    let markedDates = {};
    markedDates[date] = { selected: true, color: '#00B0BF', textColor: '#FFFFFF' };
    let serviceDate = moment(date);
    serviceDate = serviceDate.format("YYYY-MM-DD hh:mm:ss"); //2022-03-15 11:35:22
    this.setState({
        selectedDate: serviceDate,
        markedDates: markedDates
    });
    console.log('SelectedDate :: ', this.state.selectedDate)
    console.log('Selected Dates : ', serviceDate)
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
      selectedDate: "",
      markedDates: {}
 }
  

    onClickCancelListener(){
      // this.props.navigation.navigate('Home');
      this.props.navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
    }
    
    onClickNextListener(){
      if(this.state.selectedDate == ''){
        alert('Please select date')
      }else{
        this.props.navigation.navigate('MechanicsProfileList',{selectedDate: this.state.selectedDate});
      }
      // this.props.navigation.navigate('MechanicsProfileList',{selectedDate: this.state.selectedDate});
      //this.setState({email : ''});
    };
    handleCheckBox = () => this.setState({ checkBox1: !this.state.checkBox1 })
    handleCheckBox2 = () => this.setState({ checkBox2: !this.state.checkBox2 })
    handleCheckBox3 = () => this.setState({ checkBox3: !this.state.checkBox3 })
    render() {
      let check1=this.state.checkBox1;
      let check2=this.state.checkBox2;
      const selectedServices = (index) => {
        const elementsIndex = this.state.listData.findIndex(
          (element) => element.id == index,
        );
        let newArray = [...this.state.listData];
       
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
          listData: newArray,
        });
    
      };

  
        return (
          <>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView style={styles.maincontainer}>
          <TouchableOpacity style={styles.navBarBackButton} onPress={() => this.handleBackButtonClick()}>
            <Icon name="chevron-left" color='gray' size={30}/>
            </TouchableOpacity>
          <View style={styles.container}>

          {/* <Calendar
            markingType={'multi-period'}
            style={{
              borderWidth: 1,
              borderColor: 'gray',
              height: 350
            }}
            theme={{
              backgroundColor: '#ffffff',
              calendarBackground: '#ffffff',
              textSectionTitleColor: '#b6c1cd',
              textSectionTitleDisabledColor: '#d9e1e8',
              selectedDayBackgroundColor: 'red',
              selectedDayTextColor: 'blue',
              todayTextColor: 'red',
              dayTextColor: '#2d4150',
              textDisabledColor: '#d9e1e8',
              markedColor:'#00adf5',
              // dotColor: '#00adf5',
              selectedDotColor: 'blue',
              arrowColor: 'orange',
              disabledArrowColor: '#d9e1e8',
              monthTextColor: 'blue',
              indicatorColor: 'blue',
              textDayFontFamily: 'monospace',
              textMonthFontFamily: 'monospace',
              textDayHeaderFontFamily: 'monospace',
              textDayFontWeight: '300',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '300',
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16,
            }}
          /> */}
          <Calendar
            style={{ borderWidth: 1,
              borderColor: 'gray',
              height: 350 }}
            theme={{
              backgroundColor: "clear",//"#ffffff",
              calendarBackground: "clear",
              // todayBackgroundColor : 'black',
              todayTextColor: "#229aca", //"#57B9BB",
              dayTextColor: "white",//"#222222",
              textDisabledColor: "gray",//"#d9e1e8",
              monthTextColor: "white",// "#229aca", //"#57B9BB",
              arrowColor: "white", //"#57B9BB",
              textDayFontWeight: "500",
              textDayFontWeight:'bold',
              textMonthFontWeight: "bold",
              textDayHeaderFontWeight: "500",
              textDayFontSize: 18,
              textMonthFontSize: 18,
              selectedDayBackgroundColor: "gray",
              selectedDayTextColor: "white",
              textDayHeaderFontSize: 14
            }}
            minDate={this.disablePastDt}
            maxDate={"2050-07-30"}
            monthFormat={"MMMM yyyy "}
            markedDates={this.state.markedDates}
            scrollEnabled={true}
            horizontal={true}
            showScrollIndicator={true}
            disableMonthChange={true}
            onDayPress={day => {
              this.getSelectedDayEvents(day.dateString);
            }}
          />

<View style={{flexDirection: 'row',marginBottom:10, marginTop:15, alignContent:'center',justifyContent:'flex-start' }}>
        
        <CheckBox style={{alignSelf:'flex-start'}}
        style={{width:'10%',alignSelf:'center'}}
        checkedCheckBoxColor= "white" //"#6495ED"
        size="lg"
        uncheckedCheckBoxColor="#A9A9A9"
        onClick={()=> this.handleCheckBox()}
        isChecked={this.state.checkBox1}
        /> 
                        <Text style={{width: '40%',color:'white', marginTop: 2}}>
                          Morning
                        </Text>
                  </View>
     <View style={{flexDirection: 'row',marginBottom:10, marginTop:5, alignContent:'center',justifyContent:'flex-start' }}>
   
        <CheckBox style={{alignSelf:'flex-start'}}
        style={{width:'10%',alignSelf:'center'}}
        checkedCheckBoxColor="#6495ED"
        size="lg"
        uncheckedCheckBoxColor="#A9A9A9"
        onClick={()=> this.handleCheckBox2()}
        isChecked={this.state.checkBox2}
        /> 
                        <Text style={{width: '40%',color:'white', marginTop: 2}}>
                         Afternoon
                        </Text>
                  </View>

                  <View style={{flexDirection: 'row',marginBottom:10, marginTop:5, alignContent:'center',justifyContent:'flex-start' }}>
  
        <CheckBox style={{alignSelf:'flex-start'}}
        style={{width:'10%',alignSelf:'center'}}
        checkedCheckBoxColor="#6495ED"
        size="lg"
        uncheckedCheckBoxColor="#A9A9A9"
        onClick={()=> this.handleCheckBox3()}
        isChecked={this.state.checkBox3}
      
       
        /> 
                        <Text style={{width: '40%',color:'white', marginTop: 2}}>
                       Evening
                        </Text>
                  </View>

                  <TouchableOpacity style={[styles.buttonContainer, styles.connectButton]} onPress={() => this.onClickNextListener()} >
    <Text style={styles.connectText}>Next Step</Text>
    </TouchableOpacity> 

    <TouchableOpacity style={[styles.buttonContainer1, styles.connectButton]} 
                   onPress={() => this.onClickCancelListener()} >
    <Text style={styles.connectText}>Cancel</Text>
    </TouchableOpacity>   
          </View>
          </SafeAreaView>
            </>
        );
 }
}
 const styles = StyleSheet.create({
    container: {
      marginTop:30,
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
      buttonContainer1: {
        height:60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:'center',
        marginTop:10,
        marginBottom:20,
        width:250,
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
        backgroundColor:'#03254c',
      },
      listText: {
       color: 'white',
       fontWeight:'bold',
       fontSize:17,
      },
     titleText: {
      alignItems: 'center',
      alignSelf:'center',
        color: 'black',
        fontWeight:'bold',
        fontSize:25,
        marginBottom:20,
       },
       titleText2: {
        alignItems: 'center',
        alignSelf:'center',
          color: 'black',
          fontSize:23,
          marginTop:20,
          marginBottom:10,
         },
    });