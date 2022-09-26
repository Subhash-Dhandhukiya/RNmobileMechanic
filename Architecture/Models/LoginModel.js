import React, { Component } from "react";

// class LoginModel {
//   constructor() {
//       userId : String;
//       userType : String;
//       profileId : String;
//       userEmail : String;
//       userStatus : String;
//   }
//   }

  export default class LoginModel extends Component {
    userId;
    userType;
    profileId;
    userEmail;
    userStatus;

    constructor(userId = "" , userType = "" , profileId = "" , userEmail = "" , userStatus = "" ) {
      this.userId = userId;
      this.userType = userType;
      this.profileId = profileId;
      this.userEmail = userEmail;
      this.userStatus = userStatus;
    }
  }