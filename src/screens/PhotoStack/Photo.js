import React, {useLayoutEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, Pressable} from 'react-native';
import FastImage from 'react-native-fast-image';
import MediaMeta from 'react-native-media-meta';

const Photo = ({navigation, route}) => {
  const {photo} = route.params;
  const [photoMetaData, setPhotoMetaData] = useState();
  console.log('Photo', photo.image.uri);

  useLayoutEffect(() => {
    const headerTitle = photo.image.uri.split('/').pop();
    // console.log('header Title', headerTitle);
    navigation.setOptions({
      title: headerTitle,
    });
  }, []);
  // console.log('Photo', photo);
  const handleViewMetaData = () => {
    MediaMeta.get(photo.image.uri)
      .then(metadata => console.log('meta', metadata))
      .catch(err => console.error('err', err));
  };
  handleViewMetaData();
  return (
    <View style={styles.container}>
      <FastImage
        style={styles.photoCover}
        source={{
          uri: photo.image.uri,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
  );
};

export default Photo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 5,
    paddingVertical: 5,
  },
  photoCover: {
    width: '100%',
    height: '100%',
  },
});
