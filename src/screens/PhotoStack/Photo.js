import React, {useLayoutEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, Pressable} from 'react-native';
import FastImage from 'react-native-fast-image';

const Photo = ({navigation, route}) => {
  const {photo} = route.params;

  useLayoutEffect(() => {
    const headerTitle = photo.image.uri.split('/').pop();
    // console.log('header Title', headerTitle);
    navigation.setOptions({
      title: headerTitle,
    });
  }, []);
  // console.log('Photo', photo);
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
