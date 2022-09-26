import React, { Component } from "react";
import { Dimensions, StyleSheet, Text, View,TextInput,Button,Image,Alert,TouchableHighlight,
  StatusBar, SafeAreaView, TouchableOpacity,FlatList} from 'react-native';
import CheckBox from 'react-native-check-box';
import { Card, CardItem, Left, Right } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/FontAwesome';
import { Rating, AirbnbRating } from 'react-native-ratings';
 

export default class Favourite extends Component
 {
  constructor() {
    super();
    this.state = {
        selectedIndex: 0,
        checkBox:false,
          
          listData: [
            {
              id: "1",
              rate: "$35/hr",
              work: "Oil Change Brakes, Break fittings",
              mechanicName:"Mechanic-1",
              check:false,
            },
            {
              id: "2",
              rate: "$30/hr",
              work: "Oil Change Brakes, Lights adjusting",
              mechanicName:"Mechanic-2",
              check:false,
            },
            {
              id: "3",
              rate: "$48/hr",
              work: "Break fittings, Engine work checking",
              mechanicName:"Mechanic-3",
              check:false,
            },
            {
              id: "4",
              rate: "$20/hr",
              work: "Break fittings",
              mechanicName:"Mechanic-4",
              check:false,
            },
            {
              id: "5",
              rate: "$45/hr",
              work: "Engine work checking, Oil changes",
              mechanicName:"Mechanic-5",
              check:false,
            },
          ],
          
    }
      }
      ratingCompleted(rating) {
        console.log("Rating is: " + rating)
      }
    render() {

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
        {/* // <Text style={styles.titleView}>Favourite Mechanics</Text> */}
         <View style={styles.viewStyles}>
      {/* <Image
          style={{width:250, height : 200,justifyContent:'center',alignSelf:'center'}}
          source={require('./Architecture/assets/logo1.png')}
        /> */}
        <Text style={styles.noView}> No favourite mechanics found.</Text>
      </View>
         {/* <FlatList
              data={this.state.listData}
              renderItem={({ item}) => 
                  {return(
                    <SafeAreaView style={styles.container}>
                    <View style={styles.container}>
                      <Card>
                      <View style={{flexDirection: 'row',marginBottom:10, marginTop:5, alignContent:'center',justifyContent:'center' }}>
                          <CheckBox style={{alignSelf:'flex-start'}}
                                style={{width:'10%',alignSelf:'center'}}
                                checkedCheckBoxColor="#6495ED"
                                size="lg"
                                uncheckedCheckBoxColor="#A9A9A9"
                                onClick={() => selectedServices(item.id)}
                                isChecked={item.check}
                          /> 
                          <View style={styles.detailsContainer}>
                          <Image source={{ uri:"https://image.shutterstock.com/image-photo/athletic-shirtless-young-sports-man-260nw-695401201.jpg" }} style={styles.profileImg} />
                          <View style={styles.detailsViewContainer}>
                          <View style={styles.nameContainer}>
                          <Text style={styles.nameStyle} >
                                {item.mechanicName}
                          </Text>
                          <Text style={styles.rateStyle} >
                                {item.rate}
                          </Text>
                          </View>
                          <Rating
                              ratingCount={5}
                              imageSize={25}
                              jumpValue={0}
                              onFinishRating={this.ratingCompleted}
                              style={{ paddingVertical: 5 }}
                          />
                          <Text style={styles.ratingStyle} >
                                {item.work}
                          </Text>
                          </View>
                          </View>
                          
                    </View>
                    </Card>
                    </View>
                  </SafeAreaView>
                  )
                }}
                /> */}
           </SafeAreaView>
          </>
        );
 }
}
 const styles = StyleSheet.create({
  viewStyles: {
   
    width:"100%",
    height:"100%",
    justifyContent: 'center',

    backgroundColor: "clear",//'#ecf0f1',
    
  },
  maincontainer: {
    height:"100%",
    width:'100%',
    flexDirection:'column',
    backgroundColor: '#002458',
  },
  titleView:{
    marginBottom:10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    color:'#2F4F4F',
    fontWeight:"bold",
    fontSize:25,
  },
  noView:{
    marginBottom:10,
    marginLeft:10,
    marginRight:10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    color: "white",//'#2F4F4F',
    fontWeight:"bold",
    fontSize:25,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    fontSize: 15,
    fontWeight: 'bold',
    // textAlign: '',
    padding: 5,
    marginTop:5,
    marginBottom:5,
    backgroundColor:'red'
  },
  detailsContainer:{
    flex: 1,
    marginLeft:15,
    flexDirection:'row',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  detailsViewContainer:{
    flex: 1,
    marginLeft:10,
    justifyContent: 'center',
    flexDirection:'column',
    backgroundColor: '#ecf0f1',
  },
  nameContainer:{
    flex: 1,
    marginRight: 5,
    padding:5,
    width:'100%',
    flexDirection:'row',
    justifyContent: 'center',
  },
  nameStyle:{
    flex: 1,
    fontWeight: "bold",
    fontSize: 16,
    justifyContent: 'center',

  },
  rateStyle:{
    flex: 1,
    fontSize: 15,
    justifyContent: 'center',
    textAlign:'right'

  },
  ratingStyle:{
    flex: 1,
    fontSize: 15,
    marginLeft:10,
    justifyContent: 'center',

  },
  profileImg: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },

});