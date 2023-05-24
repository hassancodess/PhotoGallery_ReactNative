//npm install react-native-image-picker --save
//Permission in Android
//Project → android → app → src → debug → AndroidManifest.xml
//<uses-permission android:name="android.permission.CAMERA"/>
//<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
import React, {useState} from 'react';
import {PermissionsAndroid, ToastAndroid} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {showToast} from './toast';
import {err} from 'react-native-svg/lib/typescript/xml';

const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs camera permission',
        },
      );
      // If CAMERA Permission is granted
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  } else return true;
};

const requestExternalWritePermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'External Storage Write Permission',
          message: 'App needs write permission',
        },
      );
      // If WRITE_EXTERNAL_STORAGE Permission is granted
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      alert('Write permission err', err);
    }
    return false;
  } else {
    return true;
  }
};

export const captureImage = async () => {
  let options = {
    mediaType: 'photo',
    quality: 1,
    includeExtra: true,
  };
  let isCameraPermitted = await requestCameraPermission();
  let isStoragePermitted = await requestExternalWritePermission();
  if (isCameraPermitted && isStoragePermitted) {
    console.log('Capture Image if block');
    const imageData = await launchCamera(options, response => {
      if (response.didCancel) {
        showToast('User cancelled camera picker', 'error');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        showToast('Camera not available on device', 'error');
        return;
      } else if (response.errorCode == 'permission') {
        showToast('Permission not satisfied', 'error');
        return;
      } else if (response.errorCode == 'others') {
        showToast('response.errorMessage', 'error');
        return;
      }
      return response;
    });
    return imageData.assets[0];
  }
};

// export const captureImage = async () => {
//   let options = {
//     mediaType: 'photo',
//     quality: 1,
//     includeExtra: true,
//   };
//   let isCameraPermitted = await requestCameraPermission();
//   let isStoragePermitted = await requestExternalWritePermission();
//   if (isCameraPermitted && isStoragePermitted) {
//     await launchCamera(options, async response => {
//       if (response.didCancel) {
//         ToastAndroid.show('User cancelled camera picker', ToastAndroid.SHORT);
//         return;
//       } else if (response.errorCode == 'camera_unavailable') {
//         ToastAndroid.show('Camera not available on device', ToastAndroid.SHORT);
//         return;
//       } else if (response.errorCode == 'permission') {
//         ToastAndroid.show('Permission not satisfied', ToastAndroid.SHORT);
//         return;
//       } else if (response.errorCode == 'others') {
//         ToastAndroid.show(response.errorMessage, ToastAndroid.SHORT);
//         return;
//       }
//       // console.log('uri -> ', response.assets[0].uri);
//       // console.log('width -> ', response.assets[0].width);
//       // console.log('height -> ', response.height);
//       // console.log('fileSize -> ', response.assets[0].fileSize);
//       // console.log('type -> ', response.assets[0].type);
//       // console.log('fileName -> ', response.assets[0].fileName);
//       // console.log(response);
//       // setImageData({
//       //   uri: response.assets[0].uri,
//       //   name: response.assets[0].fileName,
//       //   type: response.assets[0].type,
//       // });
//       // const imageData = {
//       //   uri: response.assets[0].uri,
//       //   name: response.assets[0].fileName,
//       //   type: response.assets[0].type,
//       // };
//       const data = await response.assets;
//       return data;
//     });
//   }
// };

export const chooseFile = type => {
  let options = {
    mediaType: type,
    maxWidth: 300,
    maxHeight: 550,
    quality: 1,
  };
  launchImageLibrary(options, response => {
    if (response.didCancel) {
      ToastAndroid.show('User cancelled camera picker', ToastAndroid.SHORT);
      return;
    } else if (response.errorCode == 'camera_unavailable') {
      ToastAndroid.show('Camera not available on device', ToastAndroid.SHORT);
      return;
    } else if (response.errorCode == 'permission') {
      ToastAndroid.show('Permission not satisfied', ToastAndroid.SHORT);
      return;
    } else if (response.errorCode == 'others') {
      ToastAndroid.show(response.errorMessage, ToastAndroid.SHORT);
      return;
    }
    //   console.log('Response again.. = ', response);
    console.log('uri -> ', response.assets[0].uri);
    //   console.log('width -> ', response.assets[0].width);
    //   console.log('height -> ', response.assets[0].height);
    //   console.log('fileSize -> ', response.assets[0].fileSize);
    //   console.log('type -> ', response.assets[0].type);
    //   console.log('fileName -> ', response.assets[0].fileName);
    const imageData = {
      uri: response.assets[0].uri,
      name: response.assets[0].fileName,
      type: response.assets[0].type,
    };
    return imageData;
  });
};
