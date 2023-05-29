// import {ActivityIndicator, StyleSheet, View} from 'react-native';
// import React, {useState, useEffect, useRef} from 'react';
// import {captureImage, chooseFile} from '../../utils/imagePicker';
// import {Button, Text} from 'react-native-paper';
// import {handleCaptureImage} from '../../database/helpers';

import React, {useEffect, useState, useRef} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {
  Camera as CameraVision,
  useCameraDevices,
} from 'react-native-vision-camera';
import {handleCaptureImageVisionCamera} from '../../database/helpers';

const Camera = () => {
  const navigation = useNavigation();
  const vision = useRef(null);
  const devices = useCameraDevices();
  const device = devices.back;

  const [photo, setPhoto] = useState();
  const [showCamera, setShowCamera] = useState(true);
  const [imageSource, setImageSource] = useState('');

  useEffect(() => {
    getPermission();
  }, []);

  async function getPermission() {
    const newCameraPermission = await CameraVision.requestCameraPermission();
    console.log('Vision Camera Permission', newCameraPermission);
  }
  const capturePhoto = async () => {
    if (vision.current !== null) {
      const photo = await vision.current.takePhoto({
        qualityPrioritization: 'quality',
        enableAutoStabilization: true,
      });
      setImageSource(photo.path);
      setShowCamera(false);
      setPhoto(photo);
    }
  };
  const savePhoto = async () => {
    setShowCamera(true);
    await handleCaptureImageVisionCamera(photo);
    navigation.navigate('AlbumsStack');
  };

  if (device == null) {
    return <Text>Camera not available</Text>;
  }

  return (
    <View style={styles.container}>
      {showCamera ? (
        <>
          <CameraVision
            ref={vision}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={showCamera}
            photo={true}
            // fps={240}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.camButton}
              onPress={() => capturePhoto()}
            />
          </View>
        </>
      ) : (
        <>
          {imageSource !== '' ? (
            <Image
              style={styles.image}
              source={{
                uri: `file://'${imageSource}`,
              }}
            />
          ) : null}

          <View style={styles.backButton}>
            <TouchableOpacity
              style={{
                backgroundColor: 'rgba(0,0,0,0.2)',
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                borderWidth: 2,
                borderColor: '#fff',
                width: 100,
              }}
              onPress={() => setShowCamera(true)}>
              <Text style={{color: 'white', fontWeight: '500'}}>Back</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.buttons}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#77c3ec',
                  padding: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: 'white',
                }}
                onPress={savePhoto}>
                <Text style={{color: 'white', fontWeight: '500'}}>
                  Save Photo
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default Camera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'gray',
  },
  backButton: {
    backgroundColor: 'rgba(0,0,0,0.0)',
    position: 'absolute',
    justifyContent: 'center',
    width: '100%',
    top: 0,
    padding: 20,
  },
  buttonContainer: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    bottom: 0,
    padding: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
  camButton: {
    height: 80,
    width: 80,
    borderRadius: 40,
    //ADD backgroundColor COLOR GREY
    backgroundColor: '#B2BEB5',

    alignSelf: 'center',
    borderWidth: 4,
    borderColor: 'white',
  },
  image: {
    width: '100%',
    height: '100%',
    aspectRatio: 9 / 16,
  },
});
