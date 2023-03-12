import {Text, View, Image} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import Container from '../../components/UI/Container';

const Photo = ({route, navigation}) => {
  const {item} = route.params;
  console.log(item);
  return (
    // <Container>
    <View className="h-full w-full justify-center">
      <FastImage
        // style={styles.image}
        className="h-5/6 w-full"
        source={item.path}
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
    // </Container>
  );
};

export default Photo;
