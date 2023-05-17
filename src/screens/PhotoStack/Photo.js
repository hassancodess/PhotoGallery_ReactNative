import React, {useLayoutEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, Pressable} from 'react-native';
import FastImage from 'react-native-fast-image';

const Photo = ({navigation, route}) => {
  const {photo} = route.params;
  const photoName = photo.path.split('/').pop();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: photoName,
    });
  }, []);

  return (
    <View style={styles.container}>
      <FastImage
        style={styles.photoCover}
        source={{
          uri: 'file://' + photo.path,
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
    paddingVertical: 5,
  },
  photoCover: {
    width: '100%',
    height: '100%',
  },
});
