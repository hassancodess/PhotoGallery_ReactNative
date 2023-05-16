import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useState, useEffect, useLayoutEffect} from 'react';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import PhotoContainer from '../../components/AlbumTabs/PhotoContainer';
const Date = () => {
  // Navigation Hooks
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute();
  // Route Params
  const {album} = route.params;
  // States
  const [photos, setPhotos] = useState();
  //
  useLayoutEffect(() => {
    if (isFocused) {
      // setPhotos(album.photos);
      // const res = getDistinctDatesFromPhotos(album.photos);
      // console.log('res', res);
      // const albums = generateAlbums(res, album.photos);
      // console.log('albums', albums);
    }
  }, [isFocused]);

  const generateAlbums = (dates, photos) => {
    const albums = [];
    dates.forEach((item, index) => {
      const photoDate = item.date_taken.split(',')[0];
    });
  };

  const getDistinctDatesFromPhotos = photos => {
    const uniqueDates = photos.reduce((accumulator, currentValue) => {
      // Extract the date portion from the photo object
      const photoDate = currentValue.date_taken.split(',')[0];
      // If the date is not already in the accumulator array, add it
      if (!accumulator.includes(photoDate)) {
        accumulator.push(photoDate);
      }
      // Return the updated accumulator array
      return accumulator;
    }, []);
    return uniqueDates;
  };

  return (
    <View style={styles.container}>
      {/* <PhotoContainer photos={photos} /> */}
    </View>
  );
};

export default Date;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
});
