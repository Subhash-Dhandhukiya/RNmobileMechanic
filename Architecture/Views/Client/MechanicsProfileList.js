import React, { Component } from "react";
import { StyleSheet, Text, View,TextInput,Button,Image,Alert,TouchableHighlight,
    StatusBar, SafeAreaView, TouchableOpacity,FlatList,TouchableWithoutFeedback,BackHandler, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/FontAwesome';
import { Checkbox } from "react-native-paper";
import CheckBox from 'react-native-check-box';
import { Card, CardItem, Left, Right } from 'react-native-paper';
import MechanicListViewModel from "../../ViewModels/MechanicListViewModel";
import { Rating, AirbnbRating } from 'react-native-ratings';
import QuatationViewModel from "../../ViewModels/QuotationViewModel";
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import Loader from "../Loader";
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import NotificationServices from "../../../NotificationServices";
import { firebase } from "@react-native-firebase/messaging";

var selectedId = "";
var notifyTokenArray = [];
var notifyToken = "";
// var selectDate = "";
export default class MechanicsProfileList extends Component
{
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.displayListOfMechanics();
  }
  componentWillMount = async () => {
    const { navigate } = this.props.navigation;
    const {selectedDate} = this.props.route.params;
    this.setState({selectDate : selectedDate });
    console.log('selected date : ',this.state.selectDate);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    this.getFCMToken();
     this.requestPermission();
     const unsubscribe = messaging().onMessage(async remoteMessage => {
       console.log('remoteMessage', JSON.stringify(remoteMessage));
       DisplayNotification(remoteMessage);
       // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
     });
     return unsubscribe;
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }
  handleCheckBox(){
    let utils = (this.state.mechanicList).map(item => {
      let check = true
      return ({ ...item, check });
      });
    
      console.log('Utils : ', utils)
      this.checkData(this.state.mechanicList)
    this.setState({
        checkBox1:true

      })
  }
   onClickNextListener(){
     this.props.navigation.navigate('App');
     }
  handleCheckBox = () => this.setState({ checkBox1: !this.state.checkBox1 })

  onClickCancelListener(){
    // this.props.navigation.navigate('Home');
    this.props.navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });
  }
   onClickSubmicQuoteListener(){ 
    this.setState({loading: true});
    if (this.state.selectedIDS.length == 0 && this.state.checkBox1 == false){
        this.setState({loading: false});
        alert('Please select any mechanic')
    }else if(this.state.checkBox1 == true){
      let arr = [];
      let ids = arr.push( selectedId.profile_id);
      console.log('selected mechanics : ',ids)
      let id = "True";
      let mechIds = "";
      QuatationViewModel.onAskQuotationToMechanicAPI(mechIds,id,this.state.selectDate).then(
        (response,error) => {
        //get callback here
        console.log('Ask quotation output',response)
        if (response.RESPONSE_CODE == 200){
          console.log('Success res :',response)
          let res = response.RESPONSE_DATA.tokens;
          console.log("Res for output : ",res);
          let tokenArray = res.map(({
            notification_token
          }) => notification_token);
          notifyTokenArray = tokenArray;
          console.log("Token Array : ",notifyTokenArray);
          let pushArray = [];
          for(var i=0;i<notifyTokenArray.length;i++)
          {
            if(notifyTokenArray[i].includes('\"')){
              var str = notifyTokenArray[i];
              var new_str = str.replace(/\"/g, '');
              console.log(new_str);
              pushArray.push({new_str});
            }else{
              pushArray.push(notifyTokenArray[i]);
            }
          }
          console.log('Push Array *** ', pushArray);
          let tokArray = pushArray.map(({
            new_str
          }) => new_str);
          console.log("Tok Array : ",tokArray);
          this.sendMultiNotification(tokArray);
          // this.props.navigation.navigate('Home')
          this.props.navigation.reset({
            index: 0,
            routes: [{name: 'Home'}],
          });
          this.setState({loading: false});
        }else{
          this.setState({loading: false});
          alert('Something went wrong, please try again');
        }
     });
    }else{
      let arr = [];
      let ids = arr.push( selectedId.profile_id);
      console.log('selected mechanics : ',ids)
      // let ids = arr.map(item => item).join(', ');
      // console.log('ids : ',ids)
      let id = "False";
      QuatationViewModel.onAskQuotationToMechanicAPI(this.state.selectedIDS,id,this.state.selectDate).then(
        (response,error) => {
        //get callback here
        console.log('Ask quotation output',response)
        if (response.RESPONSE_CODE == 200){
          console.log('Success res :',response)
          let res = response.RESPONSE_DATA.tokens;
          console.log("Res for output : ",res);
          let tokenArray = res.map(({
            notification_token
          }) => notification_token);
          notifyToken = tokenArray[0];
          console.log("Notification Token : ",notifyToken);
          this.sendNotification(notifyToken);
          this.setState({loading: false});
          // this.props.navigation.navigate('Home')
          this.props.navigation.reset({
            index: 0,
            routes: [{name: 'Home'}],
          });
        }else{
          this.setState({loading: false});
          alert('Something went wrong, please try again');
        }
     });
    }
   };
   actionOnRow(item) {
    console.log('Selected Item :',item);
    this.props.navigation.navigate('MechanicDetailProfile', { passData:item });
   }
   actionOnCheck(item) {
    console.log('Selected Item :',item);
    selectedId = item
    console.log('before comma selected mechanics : ',selectedId)

   }

   displayListOfMechanics(){
    MechanicListViewModel.MechanicListAPI().then(
      (response,error) => {
        //get callback here
        console.log('Display mechanic list output',response)
        if (response.RESPONSE_CODE == 200){
          console.log('Success res :',response)
          this.setState({mechanicList:response.RESPONSE_DATA})
          console.log('Offered services res :',response.RESPONSE_DATA[0].offered_services)
          console.log('Offered reviews res :',response.RESPONSE_DATA[0].reviews)
          // const communityData = response.RESPONSE_DATA;
          // const CommData = [];
          // const ServiceData = [];
          // const ReviewData = [];       
          //  communityData.forEach((communityData) => {
          
          //   let first_name = communityData.first_name;
          //   let last_name = communityData.last_name;
          //   let average_rating = communityData.average_rating;
          //   let background = communityData.background;
          //   let current_location = communityData.current_location;
          //   let profile_id = communityData.profile_id;
          //   let profile_image = communityData.profile_image;
          //   const offered_services = communityData.offered_services;
          //   const reviews = communityData.reviews;
          //   offered_services.forEach((offered_services) => {
          //     let average_price = offered_services.average_price;
          //     let service_id = offered_services.service_id;
          //     let service_name = offered_services.service_name;
          //     let current_location = offered_services.current_location;
          //     ServiceData.push({ service_id:service_id,
          //       average_price: average_price,service_name: service_name, current_location: current_location});
          //   });
          //   reviews.forEach((reviews) => {
          //     let client_pic = reviews.client_pic;
          //     let from_name = reviews.from_name;
          //     let job_done = reviews.job_done;
          //     let rating = reviews.rating;
          //     let review = reviews.review;
          //     let review_date = reviews.review_date;
          //     ReviewData.push({ client_pic:client_pic,
          //       from_name: from_name,job_done: job_done, 
          //       rating: rating, review: review, review_date: review_date});
          
          //   });
          //   console.log('ReviewData Array : ',ReviewData);
          //   console.log('ServiceData Array : ',ServiceData);
          //   CommData.push({first_name,last_name, profile_id:profile_id,
          //     average_rating: average_rating,background: background,ServiceData,ReviewData,
          //     current_location:current_location,profile_image:profile_image,check: false});
         
          // });
          // console.log('Community Array : ',CommData);
          // // let newArray = CommData;
          // // this.setState({
          // //     listData: newArray,
          // //   });

          // this.setState({
          //   mechanicList:CommData,
          //   avaliableData:false

          // })
          console.log('Updated mechlist : ',this.state.mechanicList)
          let utils = (this.state.mechanicList).map(item => {
            let check = false
            return ({ ...item, check });
            });
            console.log('Utils : ', utils)
        }else{
          this.setState({
            mechanicList:[],
            avaliableData:false

          })
        //  alert('Something went wrong, please try again');
        }
     });
   }
    selectedServices = (index) => {
    const elementsIndex = this.state.listData.findIndex(
      (element) => element.profile_id == index,
    );
    let newArray = [...this.state.mechanicList];
   
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
     mechanicList: newArray,
    });

  };
//    checkData(size)
//    { 
   
//     if(size!=0)
//     {
//       return (<View>
//       <FlatList
//       data={this.state.mechanicList}
//       renderItem={({ item}) => 
//           {
//             return(
//             <TouchableWithoutFeedback onPress={ () => this.actionOnRow(item)}>
//             <SafeAreaView style={styles.listContainer}>
//             <View style={styles.listContainer}>
//               <Card>
//               <View style={{flexDirection: 'row',marginBottom:10, marginTop:5,
//                alignContent:'center',justifyContent:'center' }}>
//                   <CheckBox style={{flexDirection:'row', alignItems: 'center',
//                    marginLeft:10,marginRight:10}}
                       
//                         checkedCheckBoxColor="#6495ED"
//                         size="lg"
//                         uncheckedCheckBoxColor="#A9A9A9"
//                         onClick={() => this.selectedServices(item.profile_id)}
//                         isChecked={item.check}
//                   /> 
//                   <View style={styles.detailsContainer}>
//                   <Image source={{ uri:"https://image.shutterstock.com/image-photo/athletic-shirtless-young-sports-man-260nw-695401201.jpg" }} style={styles.profileImg} />
//                   <View style={styles.detailsViewContainer}>
//                   <View  style={{flexDirection: 'row'}}>
//                   <Text style={styles.nameStyle} >
//                         {item.first_name + " " + item.last_name}
//                   </Text>
//                   <Text style={styles.rateStyle} >
//                         {"$" + (item.ServiceData).reduce((a,v) =>  a = a + v.average_price , 0 ) + "/hr"}
//                   </Text>
//                   </View>
//                   <View style={{marginLeft:2,width:'100%', flexDirection:'row', justifyContent: 'flex-start', }}>
//                    <AirbnbRating
//                         ratingCount={5}
//                         size={20}
//                         showRating={false}
//                         isDisabled={true}
//                         selectedColor="#0f75f1"
//                         defaultRating={item.average_rating}
//                         style={{ paddingVertical: 5}}
//                   />
//                   </View>
//                   <Text style={styles.ratingStyle} >
//                         {(item.ServiceData).map(serItems => serItems.service_name).join(', ')}
//                   </Text>
//                   </View>
//                   </View>
                  
//             </View>
//             </Card>
//             </View>
//           </SafeAreaView>
//           </TouchableWithoutFeedback>)
//           }
            
//         }
//         />
// <View style={{flexDirection:"row",justifyContent:'center', marginTop:25, marginBottom:15, marginRight:20,marginLeft:20,}}>
// <CheckBox style={{width:'2%',alignSelf:'flex-start'}}
// style={{width:'10%',alignSelf:'center'}}
// checkedCheckBoxColor="#6495ED"
// uncheckedCheckBoxColor="#A9A9A9"
// onClick={()=> this.handleCheckBox()}
// isChecked={this.state.checkBox1}
// />
// <Text style={styles.privacyPolicyText}>Allow any mechanic to provide a quote</Text>
// </View> 
// <TouchableOpacity style={[styles.buttonContainer, styles.connectButton]} onPress={() => this.onClickNextListener()} >
//   <Text style={styles.connectText}>Submit Quote Request</Text>
// </TouchableOpacity></View> )
//     }
//     else{
//       return(<View style={styles.noDataView}>
//   {/* <Image
//           style={{alignSelf:'center', marginTop:10, width:'95%', height : 200, borderRadius: 15}}
//           source={require('./Architecture/assets/mechanic.png')}
//           // source={{uri:imageUri}}
//         /> */}
//        <Text style={styles.noDataText}>No mechnic found for selected services.</Text></View>)
//     }
    
//    }
   ratingCompleted(rating) {
    console.log("Rating is: " + rating)
  }

  getFCMToken = () => {
    messaging()
      .getToken()
      .then(token => {
        console.log('token=>>>', token);
      });
  };

   requestPermission = async () => {
    const authStatus = await messaging().requestPermission();
  };

  async DisplayNotification(remoteMessage) {
    // Create a channel
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,
      android: {
        channelId,
        smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
      },
    });
  }

  async localDisplayNotification() {
    // Create a channel
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    notifee.displayNotification({
      title:
        '<p style="color: #4caf50;"><b>Styled HTMLTitle</span></p></b></p> &#128576;',
      subtitle: '&#129395;',
      body: 'The <p style="text-decoration: line-through">body can</p> also be <p style="color: #ffffff; background-color: #9c27b0"><i>styled too</i></p> &#127881;!',
      android: {
        channelId,
        color: '#4caf50',
        actions: [
          {
            title: '<b>Dance</b> &#128111;',
            pressAction: {id: 'dance'},
          },
          {
            title: '<p style="color: #f44336;"><b>Cry</b> &#128557;</p>',
            pressAction: {id: 'cry'},
          },
        ],
      },
    });
  }

   sendNotification = async (notifyToken) => {
    console.log("********************************",notifyToken)
    var str = notifyToken;
    var new_str = str.replace(/"/g, '');
    console.log(new_str);
    let notificationData = {
      title: 'RFQ Generated Successfully',
      body: 'Quotation raised successfully',
      token : new_str,
      // token:
      //   'fZaxTqqqSHaPsBMJG4ne2v:APA91bGIh3c4HmOTLadgwug5NjG7GIeiXM3bcH_fQco2jlp0oZAi69DR29XPeJA-oaENUU866v5bkx3xa0yAOM3QfVX6qHMUAImBzAwTZmyPfsIKKaSMd9wQ3eC4kPuo9kk0tgwM0Coj',
    };
    await NotificationServices.sendSingleDeviceNotification(notificationData);
  };

   sendMultiNotification = async (pushNotifyTokenArr) => {
    let notificationData = {
      title: 'RFQ Generated Successfully',
      body: 'Quotation raised successfully',
      token : pushNotifyTokenArr,
    //   token: [
    //     'ergZd17WQQqGY_bqpdsNsC:APA91bFp37eoaQbBuqwFp0INuolLujRqx_uPaZtYAKsexNYBTqlzej2YZFrBkh-Kbd4bbsBd4OYZp_Hbzul2TR_j9W7OPM7dBPw8m5Z3MExC9IiUIhCQ06eXKc0Fqsv8Dpzp9j2wR0Tc',
    //     'fMsRIXrkQhyaiCIDpYIdJI:APA91bHVDJQAXOTzxn3xbTXdE9EoIvJejghJoUUz_yhR7d0X5DgcaFOLrsvAsngiUzuTG8VNc2toqcY5jCjtrwPCm5286lXuLxeoCQZYkHSC3J80c_fgypSuvbZI0VSPMmjORGkrDfYl'
    //   ],
    };
    await NotificationServices.sendMultiDeviceNotification(notificationData);
  };

  state=
  { selectedIDS:"",
    avaliableData:false,
    selectedIndex: 0,
    checkBox1:false,
    checkBox:false,
    mechanicList:[],
    selectedMechanicIDs:[],
    selectedMechanicList:[],
    mechiDS:[],
    selectDate:'',
    loading:false,
  }
   render() {
    

     let check1=this.state.checkBox1;
     let check2=this.state.checkBox2;
     const selectedServices = (index) => {
       const elementsIndex = this.state.mechanicList.findIndex(
         (element) => element.profile_id == index,
       );
       let newArray = [...this.state.mechanicList];
       const checkValue=newArray[elementsIndex].check;
       if(checkValue)
       {
         newArray[elementsIndex] = {
           ...newArray[elementsIndex],
           check: false,
         };

         if(this.state.selectedMechanicIDs.length!=0)
        {
          for(var i=0;i< this.state.selectedMechanicIDs.length;i++)
          {
            if(this.state.selectedMechanicIDs[i]==newArray[elementsIndex].profile_id)
            {
              this.state.selectedMechanicIDs.splice(i, 1);
  
            }
            console.log( this.state.selectedMechanicIDs[i]+"<><> "+newArray[elementsIndex].profile_id);
          
          }
       
        }
         let arr = this.state.selectedMechanicList.splice(index, 1);
         this.actionOnCheck(arr);
       }
       else{
         newArray[elementsIndex] = {
           ...newArray[elementsIndex],
           check: true,
         };
         this.state.selectedMechanicIDs.push( newArray[elementsIndex].profile_id);
         this.actionOnCheck(newArray);
       }
       this.state.selectedIDS = this.state.selectedMechanicIDs.map(item => item).join(', ');
       //Adding Items To Array.
       //Adding Items To Array.
       
       console.log( 'Selected ids : ',this.state.selectedIDS);
       this.setState({
        mechanicList: newArray,
       });
     };

 
       return (
         <>
         <Loader loading={this.state.loading} />
         <StatusBar barStyle="dark-content" />
         <SafeAreaView style={styles.maincontainer}>
         {this.state.mechanicList.length == 0 ? 
         <ScrollView>
          <TouchableOpacity style={styles.navBarBackButton} onPress={() => this.handleBackButtonClick()}>
          <Icon name="chevron-left" color='gray' size={30}/>
         </TouchableOpacity>
         <View style={styles.viewStyles}>
        <Text style={styles.noView}> No mechanic list found.</Text>
        </View> 
        </ScrollView> : <ScrollView>
         <TouchableOpacity style={styles.navBarBackButton} onPress={() => this.handleBackButtonClick()}>
            <Icon name="chevron-left" color='gray' size={30}/>
          </TouchableOpacity>
         <View style={styles.container}>
         <Text style={styles.titleText}>Choose mechanics to provide a quote</Text>
         {/* <FlatList
    data={this.state.listData}
    renderItem={({ item}) => 
    {return(
      <TouchableWithoutFeedback onPress={ () => this.actionOnRow(item)}>
      <View style={{flexDirection: 'row',marginBottom:10, marginTop:5, }}>
      <CheckBox style={{alignSelf:'flex-start'}}
        style={{width:'10%',alignSelf:'center'}}
        checkedCheckBoxColor="#6495ED"
        size="lg"
        uncheckedCheckBoxColor="#A9A9A9"
        onClick={() => selectedServices(item.profile_id)}
        isChecked={item.check}
        /> 
      {this.renderFileUri(item.profile_image)}
    
<View style={{flexDirection:"column",width:"100%" , marginLeft:5,}}>
<View style={{flexDirection:"row", marginBottom:10,}}>
<Text style={{ color: 'black',
          fontWeight:'bold',
          fontSize:12,
          flex:0.5,
        
        }}>{item.first_name}</Text>
<Text style={{ color: 'black',
          fontWeight:'bold',
          fontSize:12,
          marginLeft:10,
          flex:0.5,
          
       
        }}>{item.average_price}</Text>
</View>
<Text style={{color: 'black',
          fontWeight:'bold',
          fontSize:12,
          marginBottom:20,justifyContent:'space-between'}}>{item.background}</Text>
</View>
                  </View>
                   </TouchableWithoutFeedback>)
                }}
                /> */}

          <FlatList
              data={this.state.mechanicList}
              renderItem={({ item}) => 
                  {return(
                    <TouchableWithoutFeedback onPress={ () => this.actionOnRow(item)}>
                    <SafeAreaView style={styles.listContainer}>
                    <View style={styles.listContainer}>
                      <Card>
                      <View style={{flexDirection: 'row',marginBottom:10, marginTop:5,
                       alignContent:'center',justifyContent:'center',backgroundColor:'clear' }}>
                          <CheckBox style={{flexDirection:'row', alignItems: 'center',
                           marginLeft:10,marginRight:10}}
                                checkedCheckBoxColor="#6495ED"
                                size="lg"
                                uncheckedCheckBoxColor="#A9A9A9"
                                onClick={() => selectedServices(item.profile_id)}
                                isChecked={item.check}
                          /> 
                          <View style={styles.detailsContainer}>
                            {
                              item.profile_image == "" ? 
                              <Image style={styles.profileImg} 
                              source={{ uri:"https://image.shutterstock.com/image-photo/athletic-shirtless-young-sports-man-260nw-695401201.jpg" }}  
                              /> : 
                              <Image style={styles.profileImg} 
                              source={{ uri: item.profile_image }}  
                              />
                            }
                          <View style={styles.detailsViewContainer}>
                          <View  style={{flexDirection: 'row'}}>
                          <Text style={styles.nameStyle} >
                                {item.first_name + " " + item.last_name}
                          </Text>
                          <Text style={styles.rateStyle} >
                                {"$" + (item.offered_services).reduce((a,v) =>  a = a + v.average_price , 0 ) + "/hr"}
                          </Text>
                          </View>
                          <View style={{marginLeft:2,width:'100%', flexDirection:'row', justifyContent: 'flex-start', }}>
                           <AirbnbRating
                                ratingCount={5}
                                size={20}
                                showRating={false}
                                isDisabled={true}
                                selectedColor="#0f75f1"
                                defaultRating={item.average_rating}
                                style={{ paddingVertical: 5}}
                          />
                          </View>
                          <Text style={styles.ratingStyle} >
                                {(item.offered_services).map(serItems => serItems.service_name).join(', ')}
                          </Text>
                          {
                            item.self_description == "" ? <View></View> : <View>
                            <Text style={styles.ratingStyle} >
                            {item.self_description}
                             </Text>
                            </View> 
                          }
                          </View>
                          </View>
                    </View>
                    </Card>
                    </View>
                  </SafeAreaView>
                  </TouchableWithoutFeedback>)
                }}
                />

    <View style={{flexDirection:"row",justifyContent:'center', marginTop:25, marginBottom:15, marginRight:20,marginLeft:20,}}>
       <CheckBox style={{width:'2%',alignSelf:'flex-start'}}
       style={{width:'10%',alignSelf:'center'}}
       checkedCheckBoxColor="#6495ED"
       uncheckedCheckBoxColor="#A9A9A9"
       onClick={()=> this.handleCheckBox()}
       isChecked={this.state.checkBox1}
       />
    <Text style={styles.privacyPolicyText}>Allow any mechanic to provide a quote</Text>
    </View> 
       <TouchableOpacity style={[styles.buttonContainer, styles.connectButton]} onPress={() => this.onClickSubmicQuoteListener()} >
          <Text style={styles.connectText}>Submit Quote Request</Text>
       </TouchableOpacity> 
       <TouchableOpacity style={[styles.buttonContainer, styles.connectButton]} 
                   onPress={() => this.onClickCancelListener()} >
          <Text style={styles.connectText}>Cancel</Text>
      </TouchableOpacity> 
    </View>  
    </ScrollView> }
         
    </SafeAreaView>
           </>
       );
}
}
const styles = StyleSheet.create({
  viewStyles: {

    backgroundColor: "clear",//'#ecf0f1',
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
    backgroundColor: '#ecf0f1',
    
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
   container: {
     marginTop:10,
     marginLeft:5,
     marginRight:5,
     justifyContent: 'center',
    justifyContent: 'center',
     
    
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
         borderRadius:3,
         marginLeft:20,
         marginRight:20,
         height:45,
         marginTop:20,
         marginBottom:15,
         justifyContent:'space-evenly',
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
       backgroundColor:'#FDD248',
     },
     connectText: {
      color: 'black',
      fontWeight:'bold',
      fontSize:20,
     },
    titleText: {
     alignItems: 'center',
     alignSelf:'center',
       color: 'white',
       fontWeight:'bold',
       fontSize:28,
       marginBottom:20,
      },
      noDataView:{
       backgroundColor:"#EBEBEB",
        height: 400,
        padding:20,
        alignContent:"center",
        justifyContent:"center"
      },

      noDataText: {
        justifyContent:"center",
          textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 0,


    
         },
      listText: {
         color: 'black',
         fontWeight:'bold',
         fontSize:12,
         marginBottom:20,
        },
        navBarBackButton: {
          justifyContent: 'flex-start',
          marginLeft:10,
          marginTop:10,
          height:35,
        },
        listContainer: {
          flex: 1,
          justifyContent: 'center',
          padding: 10,
          backgroundColor: "clear",//'#ecf0f1',
          borderRadius:8,
        },
        detailsContainer:{
          flex: 1,
          marginLeft:5,
          flexDirection:'row',
          alignItems: 'center', //Centered vertically
          flex:1,
        },
        detailsViewContainer:{
          flex: 1,
          padding:8,
         justifyContent: 'center',
          flexDirection:'column',
        
        },
        nameContainer:{
    
          marginRight: 5,
          padding:5,
          width:'100%',
          flexDirection:'row',
          justifyContent: 'center',
        },
        nameStyle:{
          fontWeight: "bold",
          fontSize: 15,
          textTransform:'capitalize',
          justifyContent: 'center',
          width:'70%',
      
        },
        rateStyle:{
          flex: 1,
          fontSize: 15,
          justifyContent: 'center',
          textAlign:'right'
      
        },
        ratingStyle:{
          flex: 1,
          fontSize: 14,
          marginTop:8,
          justifyContent: 'center',
      
        },
        profileImg: {
          height: 80,
          width: 80,
          borderRadius: 40,
        },
        privacyPolicyText:{
          // marginTop:20,
          justifyContent: 'center',
          alignItems: 'center',
          color: "white",//'#2F4F4F',
          textAlign:'center',
          flexDirection: 'row'
          },
   });
