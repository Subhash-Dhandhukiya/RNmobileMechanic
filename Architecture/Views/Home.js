import React, { Component } from "react";
import { StyleSheet, Text, View,TextInput,Button,Image,Alert,TouchableHighlight,
    StatusBar, SafeAreaView, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/FontAwesome';
import VehicleNeeds from "./Client/VehicleNeeds";
import CalenderScreen from "./Client/CalenderScreen";
import Favourite from "./Client/Favourites";
import Profile from "./Client/Profile";
import scheduled from './Client/Scheduled';
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import ProfileViewModel from "../ViewModels/ProfileViewModel";
import GetQuotation from "./Mechanic/GetQuotation";
import ClientQuotations from "./Client/ClientQuotations";
import RNRestart from 'react-native-restart';

var userId = '';
var userType = '';
var userEmail = '';
export default class Home extends Component
 {
   
  constructor(props) {
    super(props);
   this.getUserName();
  }
  state = {
    userType : '',
    userName : '',
    userEmail : '',
    userProile : '',
    firstName : '',
    lastName : '',
    userPhone : '',
    logData : ''
  }

  getUserName = async () => {
    this.setState({userName : await AsyncStorage.getItem('userName')});
    this.setState({userEmail : await AsyncStorage.getItem('userEmail')});
    this.setState({userProile : await AsyncStorage.getItem('userProile')});
    this.setState({userType : await AsyncStorage.getItem('userType')});
    this.setState({firstName : await AsyncStorage.getItem('userFrstName')});
    this.setState({lastName : await AsyncStorage.getItem('userLastName')});
    this.setState({userPhone : await AsyncStorage.getItem('userPhone')});
    this.setState({logData : await AsyncStorage.getItem('loggedIn')});

    console.log('userType : ',this.state.userType)
  }

  async componentWillMount(){
    // RNRestart.Restart();
    console.log("Refreshed");
  }

    render(){
     
        const Tab = createMaterialBottomTabNavigator();
        MaterialCommunityIcons.loadFont();
        return (
            <Tab.Navigator
              initialRouteName="Home"
              activeColor="#e91e63"
              barStyle={{ backgroundColor: '#a9a9a9' }}
            >
              { this.state.userType == "4" ?
              <Tab.Screen
                name="Vehicle Details"
                component={VehicleNeeds}
                options={{
                  tabBarLabel: 'VehicleNeeds',
                  tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="home" color={color} size={21} />
                  ),
                }}
              />
              : 
              <Tab.Screen
                name="Get Quotation"
                component={GetQuotation}
                options={{
                  tabBarLabel: 'Get Quotation',
                  tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="home" color={color} size={21} />
                  ),
                }}
            />
              }
             {this.state.userType == "4" ? 
              <Tab.Screen
              name="Client Quotation"
              component={ClientQuotations}
              options={{
                tabBarLabel: 'Client Quotation',
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="bell" color={color} size={21} />
                ),
              }}
            /> :
            <Tab.Screen
            name="Vehicles"
            component={scheduled}
            options={{
              tabBarLabel: 'Vehicles',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="bell" color={color} size={21} />
              ),
            }}
            />
             }
              <Tab.Screen
                name="Work Details"
                component={scheduled}
                options={{
                  tabBarLabel: 'Work Details',
                  tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="car" color={color} size={21} />
                  ),
                }}
              />
              {/* <Tab.Screen
                name="Favourites"
                component={Favourite}
                options={{
                  tabBarLabel: 'Favourites',
                  tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="heart-o" color={color} size={21} />
                  ),
                }}
              /> */}
              <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                  tabBarLabel: 'Profile',
                  tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="bullhorn" color={color} size={21} />
                  ),
                }}
              />
            </Tab.Navigator>
          );
    }       
    }

