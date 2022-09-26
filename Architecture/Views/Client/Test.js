import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import {  Facebook } from 'expo-facebook';

export default class Test extends Component {
  _handleFacebookLogin = async () => {
    // try {
      const data = await Facebook.logInWithReadPermissionsAsync(
        '452014346416751', // Replace with your own app id in standalone app
        { permissions: ['public_profile'] }
      );
      console.log('data', data);
      switch (data.type) {
        case 'success': {
          // Get the user's name using Facebook's Graph API
          const response = await fetch(`https://graph.facebook.com/me?fields=id,name,email&access_token=${data.token}`);
          const profile = await response.json();
          console.log('response', response);
          console.log('profile', profile);
          Alert.alert(
            'Logged in!',
            `Hi ${profile.name}!`,
          );
          break;
        }
        case 'cancel': {
          Alert.alert(
            'Cancelled!',
            'Login was cancelled!',
          );
          break;
        }
        default: {
          console.log('data', data);
          Alert.alert(
            'Oops!',
            'Login failed!',
          );
        }
      }
    // } catch (e) {
    //   console.log('data', data);
    //   Alert.alert(
    //     'Oops!',
    //     'Login failed!',
    //   );
    // }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Change code in the editor and watch it change on your phone!
          Save to get a shareable url. You get a new url each time you save.
        </Text>
        <Button
          title="Login with Facebook"
          onPress={this._handleFacebookLogin}
        />
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:10,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
