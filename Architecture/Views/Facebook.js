import React, { useEffect, useState, useContext } from 'react';
import * as Facebook from 'expo-facebook';
// import { FB_APP_ID } from '../config/constants';

var  FB_APP_ID = "452014346416751";
const initSocialLogin = async () => {
  try {
    await Facebook.initializeAsync(FB_APP_ID);
  } catch (e) {
    console.log(e);
  }
};


useEffect(() => {
  initSocialLogin();
}, []);


export const fbLogin = async () => {
  try {
    const { token, type } = await Facebook.logInWithReadPermissionsAsync(
      FB_APP_ID,
      {
        permissions: ['public_profile'],
      }
    );

    // GET USER DATA FROM FB API
    const response = await fetch(
      `https://graph.facebook.com/me?access_token=${token}`
    );
    const user = await response.json();

    // GET PROFILE IMAGE DATA FROM FB API
    // NOTE THAT I SET THE IMAGE WIDTH TO 500 WHICH IS OPTIONAL
    const pictureResponse = await fetch(
      `https://graph.facebook.com/v8.0/${user.id}/picture?width=500&redirect=false&access_token=${token}`
    );
    const pictureOBject = await pictureResponse.json();
    const userObject = {
      ...user,
      photoUrl: pictureOBject.data.url,
    };

    return { type, token, user: userObject };
  } catch (e) {
    return { error: e };
  }
};

const handleFBLoginPress = async () => {
    const { type, token, user, error } = await fbLogin();

    if (type && token) {
      if (type === 'success') {
        // DISPATCH TOKEN AND USER DATA
        // TO HANDLE NAVIGATION TO HOME AND DISPLAY USER INFO
        dispatch({ type: 'FB_LOGIN', token, user });
      }
    } else if (error) {
      console.log('The login attempt was cancelled');
    }
  };
