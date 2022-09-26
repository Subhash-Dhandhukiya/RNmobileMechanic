import { View, Text,Image, Alert } from 'react-native';
import React, { Component, useEffect, useState } from "react";
import  {crashlytics, firebase } from "@react-native-firebase/crashlytics";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NotifyServices from './NotifyServices';

// const [userCounts, setUserCounts] = useState(null);

const logCrashlytics = async () => {
  crashlytics().log("Dummy Details Added");
  await Promise.all([
    crashlytics().setUserId("101"),
    crashlytics().setAttribute("credits", String(50)),
    crashlytics().setAttributes({
      email: "rajkumar.garikapati@bainslabs.com",
      username: "Rajkumar Garikapati",
    }),
  ]);
};

const logCrash = async (user) => {
  crashlytics().crash();
};

const logError = async (user) => {
  crashlytics().log("Updating user count.");
  try {
    if (users) {
      // An empty array is truthy, but not actually true.
      // Therefore the array was never initialised.
      setUserCounts(userCounts.push(users.length));
    }
  } catch (error) {
    crashlytics().recordError(error);
    console.log(error);
  }
};

componentWillMount = async () => {
  logCrashlytics();
  logCrash();
  logError();
  crashlytics().log("App mounted.");
  await firebase.crashlytics().setCrashlyticsCollectionEnabled(true);
 }

 componentWillUnmount = async () =>{

}

export default class SplashScreen extends Component
 {
  constructor(props) {
    super(props);
    state = {
      registerToken : "",
     }
    this.notif = new NotifyServices(
     this.onRegister.bind(this),
    //  this.onNotif.bind(this),
   );
  }
  performTimeConsumingTask = async() => {
    return new Promise((resolve) =>
      setTimeout(
        () => { resolve('result') },
        2000
      )
    )
  }
  async componentWillMount() {
    // Preload data from an external API
    // Preload data using AsyncStorage
    const data = await this.performTimeConsumingTask();
    if (data !== null) {
      
      if (await AsyncStorage.getItem("StayLogIn") == "true"){
        this.props.navigation.reset({
            index: 0,
            routes: [{name: 'Home'}],
          });
      }else{
        this.props.navigation.reset({
            index: 0,
            routes: [{name: 'App'}],
          });
      }
      // this.props.navigation.reset({
      //   index: 0,
      //   routes: [{name: 'App'}],
      // });
      //this.props.navigation.navigate('App');
    }
  }
  onRegister = async (token) => {
    this.setState({registerToken: token.token, fcmRegistered: true});
    // alert(token.token);
    await AsyncStorage.setItem('pushNotificationToken',JSON.stringify(token.token));
  }

  onNotif(notif) {
    Alert.alert(notif.title, notif.message);
  }

  handlePerm(perms) {
    Alert.alert('Permissions', JSON.stringify(perms));
  }
  render() {
  //   firebase.initializeApp({
  //     apiKey: 'AIzaSyANrgIfG60XxbC89GrvY4kdYmOV1S5vXQs',
  //     projectId: 'mechanic-a3aac',
  //  });
    return (
      <View style={styles.viewStyles}>
      <Image
          style={{width:250, height : 200,justifyContent:'center',alignSelf:'center'}}
          source={require('./Architecture/assets/logo1.png')}
        />
      </View>
    );
  }
}
const styles = {
  viewStyles: {
    flex: 1,
    width:'100%',
    justifyContent: 'center',
    backgroundColor: '#002458',
    
  },
  textStyles: {
    color: '#aabab7',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign:'center',
    position: 'absolute',
    marginRight:20,
    marginLeft:20,
    marginBottom:20,
     bottom:0
    
  }
}
