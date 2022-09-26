import React, { Component } from "react";
import { StyleSheet, Text, View,TextInput,Button,Image,Alert,TouchableHighlight,
    StatusBar, SafeAreaView, TouchableOpacity,FlatList,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/FontAwesome';
import { Checkbox } from "react-native-paper";
import CheckBox from 'react-native-check-box';
import VehicleViewModel from "../../ViewModels/VehicleViewModel";
import { ScrollView } from "react-native-gesture-handler";
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import Loader from "../Loader";

export default class VehicleNeeds extends Component
{

   
 constructor(props) {
   super(props);
   this.getAvailableServices();
 }

 state=
 {
   checkBox1:false,
   checkBox2:false,
   checkBox3:false,
   checkBox4:false,
   mechanic:false,
   selectedIDS:"",
   needs:"",
   selectedServiceData:[],
   listData:  [],
   loading:false,
}
 

renderFileUri( image)
{ 
 var uri = '';
 uri = image;
 // if (  this.state.userProfile == ''){
 //     uri = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLIbLTGKz4waJGU2vkbhQkRavjf2OdeY7Eo4l8yFnggdF3fX1bUF4FEUP13o34ioSCm-M&usqp=CAU';
 // }else{
 //   uri = this.state.userProfile;
 // }
 console.log('profileData : ', uri)

 if(!uri.includes(".jpg")||!uri.includes(".jpeg") ||!uri.includes(".png"))
 {
   return<Image
   source={{uri:"https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?b=1&k=20&m=1300845620&s=170667a&w=0&h=JbOeyFgAc6-3jmptv6mzXpGcAd_8xqkQa_oUK2viFr8="}}
   style={{width: 50, height: 50,borderRadius: 50/ 2,  marginLeft:10,} } 
 />
 }
 else{
   return<Image
   source={{uri:uri}}
   style={{width: 50, height: 50,borderRadius: 50/ 2,  marginLeft:10,} } 
 />
 }
 
}
checkService(name,image,check,serviceid)
{ 

console.log('service selected : ', check)

if(check==true)
{
   return( 
       <View style={styles.cardSelectedContainer}>
      <View style={{flexDirection: 'row',justifyContent: 'center', //Centered horizontally
      alignItems: 'center', //Centered vertically
      flex:1}}>
            {this.renderFileUri(image)}
            <Text style={{ color: '#0D2C55',
          //  textTransform:'uppercase',
         fontWeight:'bold',
         fontSize:18,
         marginLeft:10,
        //Centered horizontally
      alignItems: 'center', //Centered vertically
      flex:1,
         }}>{name}</Text>
   
   <TouchableOpacity
               style={styles.radioCircle}
             >
               {check === true && <View style={styles.selectedRb} />}
             </TouchableOpacity>
                           </View>
   </View>)
}
else{
   return( 
       <View style={styles.cardContainer}>
      <View style={{flexDirection: 'row',justifyContent: 'center', //Centered horizontally
      alignItems: 'center', //Centered vertically
      flex:1}}>
            {this.renderFileUri(image)}
            <Text style={{color: '#8698B1',
              // textTransform:'uppercase',
         fontWeight:'bold',
         fontSize:18,
         marginLeft:10,
        //Centered horizontally
      alignItems: 'center', //Centered vertically
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
   onClickNextListener = async () =>
   {
      if(this.state.selectedIDS == ""){
          alert('Please select atleast one service');
      }else{
        await AsyncStorage.setItem('selectedServiceIds', this.state.selectedIDS);
        this.props.navigation.navigate("VehicleNeedAdd",{ passServices : this.state.selectedIDS });
      }     
   };
    
    onClickNextListener()
    {
        this.props.navigation.navigate("VehicleNeedAdd",{ passServices : this.state.selectedIDS });    
    };

   getAvailableServices(){
    this.setState({loading: true});
     VehicleViewModel.AvailableServicesAPI().then(
       (response,error) => {
         console.log('res : ',response)
         if (response.RESPONSE_CODE == 200){
          this.setState({loading : false,
            listData:response.RESPONSE_DATA
          })
          console.log('Updated mechlist : ',this.state.listData)
          let utils = (this.state.listData).map(item => {
            let check = false
            return ({ ...item, check });
            });
            console.log('Utils : ', utils)
         }else{
          this.setState({loading: false});
          alert('Something went wrong, please try again');
         }
      }
     );
   }

   servicesSelection(){
     VehicleViewModel.onClientSelectServicesToShareAPI (this.state.selectedIDS,"").then(
       (response,error) => {
       //get callback here
       console.log('Output',response)
       if (response.RESPONSE_CODE == 200){
         this.props.navigation.navigate('VehicleNeedAdd');
       }else{
         alert('Something went wrong, please try again');
       }
    });
   }

   render() {
    let check1=this.state.checkBox1;
    let check2=this.state.checkBox2;
    const selectedServices = (index) => {
      const elementsIndex = this.state.listData.findIndex(
        (element) => element.service_id == index,
      );
      let newArray = [...this.state.listData];
     
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
            if(this.state.selectedServiceData[i]==newArray[elementsIndex].service_id)
            {
              this.state.selectedServiceData.splice(i, 1);
  
            }
            console.log( this.state.selectedServiceData[i]+"<><> "+newArray[elementsIndex].service_id);
          
          }
       
        }
        }
      else{
        newArray[elementsIndex] = {
          ...newArray[elementsIndex],
          check: true,
        };
        this.state.selectedServiceData.push( newArray[elementsIndex].service_id);
       
      }
      this.state.selectedIDS = this.state.selectedServiceData.map(item => item).join(', ');
      //Adding Items To Array.
      //Adding Items To Array.
      
      console.log( 'Selected serviceIds : ',this.state.selectedIDS);
      this.setState({
        listData: newArray,
      });
  
    };


    return (
      <>
      <StatusBar barStyle="dark-content" />
      <Loader loading={this.state.loading} />
      {/* {this.state.listData.length == 0 ? <View style={styles.viewStyles}>
      <View style={styles.headContainer}>
      <Text style={styles.titleText}>My Vehicle Needs</Text>
      </View>
    
      <Text style={styles.noView}> No service list found.</Text>
    
      </View>:  */}
       <ScrollView>
      <SafeAreaView>
      <View style={styles.headContainer}>
      <Text style={styles.titleText}>My Vehicle Needs</Text>
      </View>
      <View style={styles.inputContainer}>
<TextInput style={styles.inputs}
   placeholderTextColor = '#A9A9A9'
   keyboardType="default"
   underlineColorAndroid='transparent'
   placeholder="Type what you need"
    onChangeText={(needs) => this.setState({needs})}
   value = {this.state.needs}
   />
</View>
      <View style={styles.container}>
     {
       this.state.listData.length > 0 ? 
      <FlatList
 data={this.state.listData}
 renderItem={({ item}) => {
 return(
 <TouchableOpacity
            style={styles.cardContainer2}
            onPress={()=> selectedServices(item.service_id)}>
            {this.checkService(item.service_name,item.service_image,item.check,item.service_id)}
          </TouchableOpacity>)
            }}
            /> : <Text style={{ color: '#0D2C55',
           fontWeight:'bold',
           fontSize:24,
           marginTop:75,
           alignItems: 'center',
           alignSelf:'center',
           flex:1,
           }}>
              Loading ...
            </Text>
          }
      {
        this.state.listData.length > 0 ? <TouchableOpacity style={[styles.buttonContainer, styles.connectButton]}  onPress={() => this.onClickNextListener()} >
        <Text style={styles.connectText}>Next</Text>
        </TouchableOpacity> : <View></View>
      }   
</View>
</SafeAreaView>    
</ScrollView>
{/* } */}
      
    
        </>
    );
}
}
const styles = StyleSheet.create({
  viewStyles: {

    textAlign: 'center',
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
    color:'#2F4F4F',
    fontWeight:"bold",
    fontSize:25,
  },
  container: {
    marginLeft:20,
    marginRight:20,
    justifyContent: 'center',
   
  },
  headContainer: {
      height:150,
      backgroundColor:'#002456',
      justifyContent: 'center',
     
    },
    cardContainer2: {
      padding: 5,
      height: 65,
      //Centered horizontally
      alignItems: 'center', //Centered vertically
      flex:1,
      marginTop: 10,
       borderRadius: 20,
      flexDirection: 'row',
     
    },
    cardContainer: {
      padding: 5,
      height: 65,
      //Centered horizontally
      alignItems: 'center', //Centered vertically
      flex:1,
      marginTop: 10,
      backgroundColor: '#E4E8F1',
      borderRadius: 20,
      flexDirection: 'row',
     
    },
    cardSelectedContainer: {
      // padding: 5,
      height: 65,
      //Centered horizontally
      alignItems: 'center', //Centered vertically
      flex:1,
      // marginTop: 10,
      backgroundColor: '#FDD14C',
      borderRadius: 20,
      flexDirection: 'row',
     
    },
    inputs:{
      height:50,
      marginLeft:16,
      fontSize:18,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  radioCircle: {
    height: 30,
    width: 30,
    borderRadius:360
,    borderWidth: 2,
    alignSelf:'center',
    marginRight:8,
    marginTop:7,
    borderColor: '#002456',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRb: {
    width: 15,
    height: 15,
    borderRadius: 100,
    backgroundColor: '#002456',
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
        borderRadius:360,
        marginLeft:20,
        marginRight:20,
        height:55,
        marginTop:-22,
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
      borderRadius:360,
    },
    connectButton: {
      backgroundColor:'#002456',
    },
    connectText: {
     color: 'white',
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
  });