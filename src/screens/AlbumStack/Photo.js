import {Text, View, Image, Pressable} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import Container from '../../components/UI/Container';
import Exif from 'react-native-exif';
import {useEffect} from 'react';

const Photo = ({route, navigation}) => {
  const {item} = route.params;

  // useEffect(() => {
  const handleExif = () => {
    // Exif.getExif(item.path)
    //   .then(msg => console.warn('OK: ' + JSON.stringify(msg)))
    //   .catch(msg => console.warn('ERROR: ' + msg));
  };
  // }, []);

  console.log(item);
  return (
    // <Container>
    <Pressable onPress={handleExif}>
      <View className="h-full w-full justify-center">
        <FastImage
          // style={styles.image}
          className="h-5/6 w-full"
          source={item.path}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
    </Pressable>
    // </Container>
  );
};

export default Photo;
