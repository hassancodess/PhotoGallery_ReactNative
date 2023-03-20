import React, {useLayoutEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, Pressable} from 'react-native';
import FastImage from 'react-native-fast-image';
import MediaMeta from 'react-native-media-meta';
import Exif from 'react-native-exif';
import {
  addPhoto,
  fetchPhotos,
  addAlbum,
  addAlbumPhoto,
} from '../../database/PhotoDB';

const Photo = ({navigation, route}) => {
  const {photo} = route.params;
  const photoName = photo.image.uri.split('/').pop();
  const [photos, setPhotos] = useState();
  const [photoMetaData, setPhotoMetaData] = useState();
  console.log('Photo', photo);

  const InitialSetup = async () => {
    try {
      const photoDetail = {
        title: photoName,
        lat: null,
        lng: null,
        path: photo.image.uri,
        date_taken: new Date(photo.timestamp * 1000).toLocaleString(),
        last_date_modified: new Date(photo.modified * 1000).toLocaleString(),
      };
      await addPhoto(photoDetail);
      await addAlbum('Others');
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: photoName,
    });
    // InitialSetup();
  }, []);
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
