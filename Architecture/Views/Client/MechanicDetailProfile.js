import React, { Component } from "react";
import { StyleSheet, Text, View,TextInput,Button,Image,Alert,TouchableHighlight,
  StatusBar, SafeAreaView, TouchableOpacity,FlatList,BackHandler, TouchableWithoutFeedback, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import VehicleViewModel from "../../ViewModels/VehicleViewModel";
import CheckBox from 'react-native-check-box';
import { useNavigation } from '@react-navigation/native';
import {useState, useEffect} from "react";
import { Rating, AirbnbRating } from 'react-native-ratings';


 export default class MechanicDetailProfile extends Component {

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

    ratingCompleted(rating) {
      console.log("Rating is: " + rating)
    }

    actionOnRow(item) {
      console.log('Selected Item :',item);
     
   }
 

    state={
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

  renderFileUri(image)
  { 
   var uri = image;
   console.log('profileData : ', uri)
  
   if(!uri.includes(".jpg")||!uri.includes(".jpeg") ||!uri.includes(".png"))
   {
    return<Image
    source={{uri:uri}}
    style={{width: 100, height: 100,borderRadius: 100/ 2,  marginLeft:10,} } 
    />
   }
   else{
    return<Image
    source={{uri:"https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?b=1&k=20&m=1300845620&s=170667a&w=0&h=JbOeyFgAc6-3jmptv6mzXpGcAd_8xqkQa_oUK2viFr8="}}
    style={{width: 100, height: 100,borderRadius: 100/ 2,  marginLeft:10,} } 
  />
   }
   
  }

 renderFileUri2(image)
  { 
   var uri = image;
   console.log('profileData : ', uri)
  
   if(!uri.includes(".jpg")||!uri.includes(".jpeg") ||!uri.includes(".png"))
   {
    return<Image
    source={{uri:uri}}
    style={{width: 50, height: 50,borderRadius: 50/ 2,  marginLeft:10,} } 
    />
   }
   else{
    return<Image
     source={{uri:"https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?b=1&k=20&m=1300845620&s=170667a&w=0&h=JbOeyFgAc6-3jmptv6mzXpGcAd_8xqkQa_oUK2viFr8="}}
     style={{width: 50, height: 50,borderRadius: 50/ 2,  marginLeft:10,} } 
    />
   }
   
  }

      launchCamera = () => {
        this.setState({Alert_Visibility: false});
        console.log('capture cammera = ');
        let options = {
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.launchCamera(options, (response) => {
         // console.log('Response = ', response);
          console.log('Uri', response );
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
          } else {
            const source = { uri:response.assets[0].uri  };
            console.log('response', JSON.stringify(response));
            this.setState({
              filePath: response,
              fileData: response.assets[0].data,
              fileUri: response.assets[0].uri 
            });
          }
        });
        }
    
      state={

      }

   render(){
    const { navigate } = this.props.navigation;
    const {passData} = this.props.route.params;
    // {"average_price": 20, "average_rating": "4.5", "background": "I am mechanic", 
    // "check": false, "current_location": "delhi", "first_name": "John", "last_name":
    //  "Test", "profile_id": "1",
    //  "profile_image": "http://3.214.72.245/staging/assets/images/signatur"}
   
    var name=passData.first_name+" "+passData.last_name;
    var rating=passData.average_rating;
    var skills = passData.offered_services.map(item => item.service_name).join(', ');
    var reviewCount=passData.reviews.length;
   
    console.log('mechanic name : ', name+" <><><> "+rating+" <><><> "+skills+" <><> "+reviewCount)
    console.log('mechanic data : ', passData)
    
       return(
            <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.maincontainer}>
          <ScrollView >
          <TouchableOpacity style={styles.navBarBackButton} onPress={() => this.handleBackButtonClick()}>
            <Icon name="chevron-left" color='gray' size={30}/>
            </TouchableOpacity>
          <View style={styles.container}>
          {/* <Text style={styles.titleText}>Mechanic profile details</Text> */}
          <View style={{flexDirection: 'row'}}>
          <View style={styles.ProfileImage} onPress={this.launchCamera}>   
            {this.renderFileUri(passData.profile_image)}
          </View>
          <View style={{flexDirection: 'column',marginTop:'7%'}}>
          <Text style={styles.titleText}>{name}</Text>
          <View style={{flexDirection: 'row'}}>
          <AirbnbRating
            ratingCount={5}
            size={20}
            showRating={false}
            isDisabled={true}
            selectedColor="#FDD248"
            defaultRating={rating}
            style={{ paddingVertical: 5}}
          />
          <Text style={styles.ratingStyle} >
            ({reviewCount} reviews)
          </Text>
          </View>
          </View>
          </View>

          <Text style={styles.titleText2} >
            Skills
          </Text>
          <Text style={styles.listText} >
          {skills}
          </Text>

          <Text style={styles.titleText2} >
            Background
          </Text>
          <Text style={styles.listText} >
         {passData.background}
          </Text>

          {
            passData.self_description == "" ? <View></View> : <View> 
            <Text style={styles.titleText2} >
            Background
            </Text>
            <Text style={styles.listText} >
            {passData.background}
            </Text>
            </View>
          }

          <Text style={styles.titleText2} >
            Reviews
          </Text>

          <FlatList
    data={passData.reviews}
    renderItem={({ item}) => 
    {return(
      <View style={styles.container}>
      <View style={{flexDirection: 'row',marginBottom:10, marginTop:5, }}>
      {this.renderFileUri2(item.client_pic)}
      <View style={{ flexDirection:'column', marginRight:20}}>
      <Text style={{color: 'white',
          fontWeight:'400',
          fontSize:23,
          marginLeft:15,
          marginBottom:10,}} > {item.from_name} </Text>
      <Text style={{marginLeft:15,color:'white'}}> {item.review_date} </Text>
      </View>
      <AirbnbRating
          ratingCount={5}
          size={20}
          showRating={false}
          selectedColor="#FDD248"
          defaultRating={item.rating}
      />
       </View>
       <Text style={{marginTop:10,marginBottom:10,color:'white'}}>{item.job_done}</Text>
       <Text style={{marginTop:10,marginBottom:10,color:'white'}}>{item.review}</Text>
       </View>
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
      connectButton: {
        backgroundColor:'#229aca',
      },
      connectText: {
       color: 'white',
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
      listText: {
       color: 'white',
       marginLeft:15,
       fontSize:17,
       marginBottom:15,
      },
     titleText: {
      // alignItems: 'center',
      // alignSelf:'center',
        color: 'white',
        fontWeight:'bold',
        fontSize:25,
        marginBottom:5,
        justifyContent:'flex-start'
       },
       titleText2: {
          color: 'white',
          fontWeight:'400',
          fontSize:23,
          marginLeft:15,
          marginTop:10,
          marginBottom:10,
         },
         navBarBackButton: {
          justifyContent: 'flex-start',
          marginLeft:10,
          marginTop:5,
          height:35,
        },
        ProfileImage:{
            alignSelf:'flex-start',
            marginLeft:0,

          },
          ratingStyle:{
            fontSize: 20,
            marginLeft: '10%',
            marginTop: 5,
            color:'white'
          },

          container1: {
            marginTop:5,
            marginLeft:20,
            marginRight:20,
            justifyContent: 'center',
         
        },
        listTitleText: {
          color: 'white',
          fontWeight:'normal',
          alignSelf:'flex-start',
          fontSize:20,
          fontWeight:'bold',
          marginBottom:8,
         },
    });