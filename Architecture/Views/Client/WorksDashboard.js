import React, { Component } from "react";
import { StyleSheet, Text, View,TextInput,Button,Image,Alert,TouchableHighlight,
    StatusBar, SafeAreaView, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/FontAwesome';
 

export default class WorksDashboard extends Component
 {
    render() {
     
        return (
          <>
          <StatusBar barStyle="dark-content" />
          {/* <SafeAreaView> */}
          <View style={styles.container}>
    
            <Text style={styles.profileTitle}>WorksDashboard</Text>
            </View>
            </>
        );
 }
}
 const styles = StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: '#FFFFFF',
      alignItems: 'center',
      justifyContent: 'flex-end',
      marginBottom:0,
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

});