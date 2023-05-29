import React, {useContext, useLayoutEffect, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {BASE_URI} from '../../utils/api';
import {addPeopleToDatabase, handlePersons} from '../../database/helpers';
import PhotoContext from '../../context/PhotoContext';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';

const Photo = ({}) => {
  const {photo, photoName, resetPersonStates, fetchPeopleAndEvents} =
    useContext(PhotoContext);
  const route = useRoute();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    // if (isFocused) {
    console.log('name', photoName);
    navigation.setOptions({
      title: photoName,
      // title: photoName,
    });
    // callAPI();
    init();
    // }
  }, []);

  const init = async () => {
    await handlePersons(photo);
    await fetchPeopleAndEvents();
    await resetPersonStates();
  };
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
  },
  photoCover: {
    width: '100%',
    height: '100%',
  },
});
