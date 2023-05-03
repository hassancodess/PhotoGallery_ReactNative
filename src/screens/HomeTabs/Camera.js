import {View} from 'react-native';
import React, {useEffect} from 'react';
import {captureImage, chooseFile} from '../../utils/imagePicker';
import {useIsFocused} from '@react-navigation/native';

const Camera = ({navigation}) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      captureImage('photo');
      // chooseFile('photo');
      navigation.navigate('AlbumsStack');
    }
  }, [isFocused]);
  // TODOS
  // 1 - Save Image to SQLITE

  return <View></View>;
};

export default Camera;
