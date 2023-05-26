import React, {useLayoutEffect, useState} from 'react';
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

const Photo = ({navigation, route}) => {
  const {photo} = route.params;
  const photoName = photo.path.split('/').pop();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: photoName,
    });
    // callAPI();
    init();
  }, []);

  const init = async () => {
    await handlePersons(photo);
  };
  const callAPI = async () => {
    try {
      const photoType = photo.title.split('.').pop();
      // console.log('photo type', photoType, 'file://'+photo.path, photo.title);
      console.log('started');
      const formdata = new FormData();
      formdata.append('file', {
        uri: 'file://' + photo.path,
        name: photo.title,
        type: `image/${photoType}`,
      });
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
      };

      const response = await fetch(`${BASE_URI}/saveImage`, requestOptions);

      const data = await response.json();
      console.log('data', data);

      const dataPeople = [];
      if (typeof data !== 'string') {
        for (const key in data) {
          const data = {
            id: `uuid-${Math.floor(Math.random() * 100) + 1}`,
            name: key,
          };
          dataPeople.push(data);
        }
      }
      // console.log('Data People', dataPeople);
      // await addPeopleToDatabase(dataPeople, photo.id);
    } catch (error) {
      console.log('Error', error);
    }
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
