import {View} from 'react-native';
import React, {useEffect} from 'react';
import {captureImage, chooseFile} from '../../utils/imagePicker';
import {useIsFocused} from '@react-navigation/native';

const Camera = ({navigation}) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    // captureImage('photo');
    chooseFile('photo');
    navigation.navigate('AlbumsStack');
  }, [isFocused]);
  return <View></View>;
};

export default Camera;
