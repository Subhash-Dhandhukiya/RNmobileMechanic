const sendSingleDeviceNotification = data => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append(
      'Authorization',
      'key=AAAATJKOnaw:APA91bH8U-raGuGbfyXp5_GonBljSPEgrZPFBaSfgPiwpiPi_BE9XyG5kb1OZ9CoDSP6aIs8DkIrCWbPvGlt-mOfKlUUsgpnetl8IW9KjNzIi11YYNbOJZ0i00yZhv6-VYjC4hAsz8l3',
    );
  
    var raw = JSON.stringify({
      data: {},
      notification: {
        body: data.body,
        title: data.title,
      },
      to: data.token,
    });
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
  
    fetch('https://fcm.googleapis.com/fcm/send', requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };
  
  const sendMultiDeviceNotification = data => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append(
      'Authorization',
      'key=AAAATJKOnaw:APA91bH8U-raGuGbfyXp5_GonBljSPEgrZPFBaSfgPiwpiPi_BE9XyG5kb1OZ9CoDSP6aIs8DkIrCWbPvGlt-mOfKlUUsgpnetl8IW9KjNzIi11YYNbOJZ0i00yZhv6-VYjC4hAsz8l3',
    );
  
    var raw = JSON.stringify({
      data: {},
      notification: {
        body: data.body,
        title: data.title,
      },
      registration_ids: data.token,
    });
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
  
    fetch('https://fcm.googleapis.com/fcm/send', requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };
  
  export default {
    sendSingleDeviceNotification,
    sendMultiDeviceNotification,
  };