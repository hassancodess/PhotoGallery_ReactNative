import React, {useLayoutEffect, useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {getPhotosByAlbumID} from '../../database/PhotoDB';
import {useIsFocused} from '@react-navigation/native';
import PhotoContainer from '../../components/AlbumTabs/PhotoContainer';

const All = ({navigation, route}) => {
  const {album} = route.params;
  const [photos, setPhotos] = useState([]);
  const isFocused = useIsFocused();

  useLayoutEffect(() => {
    if (isFocused) {
      handleGetAlbumPhotos();
    }
  }, [isFocused]);

  const handleGetAlbumPhotos = async () => {
    if (!album.photos) {
      const results = await getPhotosByAlbumID(album.id);
      setPhotos(results);
    } else {
      setPhotos(album.photos);
    }
  };
  return (
    <View style={styles.container}>
      <PhotoContainer photos={photos} />
    </View>
  );
};

export default All;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
});
