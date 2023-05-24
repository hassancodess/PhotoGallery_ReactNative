import {StyleSheet, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {captureImage, chooseFile} from '../../utils/imagePicker';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Button, Text} from 'react-native-paper';
import {handleCaptureImage} from '../../database/helpers';
const Camera = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [image, setImage] = useState({});

  const init = async () => {
    await handleCaptureImage();
  };
  useEffect(() => {
    if (isFocused) {
      init();
      navigation.navigate('AlbumsStack');
    }
  }, [isFocused]);

  return <View style={styles.container}></View>;
};

export default Camera;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
