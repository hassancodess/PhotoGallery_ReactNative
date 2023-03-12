import {Text, View, Image, Pressable} from 'react-native';
import React, {useState, useEffect, useLayoutEffect} from 'react';
import FastImage from 'react-native-fast-image';
import Exif from 'react-native-exif';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../utils/colors';
import {Button, Menu, Divider, Provider} from 'react-native-paper';

const Photo = ({route, navigation}) => {
  const {item} = route.params;
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const toggleMenu = () => setVisible(!visible);

  const renderHeaderRight = () => {
    return (
      <Ionicons name="ellipsis-vertical" size={24} color={colors.screen} />
    );
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: renderHeaderRight,
    });
  }, []);

  // Read Exif Data
  const showExifData = () => {
    Exif.getExif(item.uri)
      .then(msg => console.warn('OK: ' + JSON.stringify(msg)))
      .catch(msg => console.warn('ERROR: ' + msg));
  };
  return (
    <Pressable onPress={showExifData}>
      <View className="h-full w-full justify-center">
        <FastImage
          className="h-5/6 w-full"
          source={{uri: item.uri}}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
    </Pressable>
  );
};

export default Photo;
