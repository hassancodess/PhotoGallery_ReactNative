import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
const Camera = () => {
  const [imageData, setImageData] = useState();
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      captureImage();
    }
  }, [isFocused]);
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

  const captureImage = async () => {
    let options = {
      mediaType: 'photo',
      maxWidth: 800,
      maxHeight: 500,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      console.log('Capture Image if block');
      launchCamera(options, response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        console.log('uri -> ', response.assets[0].uri);
        console.log('width -> ', response.assets[0].width);
        console.log('height -> ', response.height);
        console.log('fileSize -> ', response.assets[0].fileSize);
        console.log('type -> ', response.assets[0].type);
        console.log('fileName -> ', response.assets[0].fileName);
        setImageData({
          uri: response.assets[0].uri,
          name: response.assets[0].fileName,
          type: response.assets[0].type,
        });
      });
    }
  };

  return (
    <View>
      <Text>Camera</Text>
    </View>
  );
};

export default Camera;

const styles = StyleSheet.create({});
