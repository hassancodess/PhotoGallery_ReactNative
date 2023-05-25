import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useState, useEffect, useLayoutEffect} from 'react';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import PhotoContainer from '../../components/AlbumTabs/PhotoContainer';
import {extractDate, getUniqueDates} from '../../utils/date';
import AlbumsContainer from '../../components/HomeTabs/AlbumsContainer';
const Date = () => {
  // Navigation
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute();
  const {album} = route.params;

  // States
  const [photos, setPhotos] = useState([]);
  const [albums, setAlbums] = useState([]);

  // Utilities
  const init = async () => {
    const dates = [];
    // for (const photo of album.photos) {
    // const d = extractDate(photo.date_taken);
    // console.log('photo', photo.d);
    // dates.push(d);
    // }
    const results = [];
    album.photos.forEach(photo => {
      const photoDate = extractDate(photo.date_taken);
      const existingDateObj = results.find(item => {
        const itemDate = extractDate(item.date);
        return itemDate === photoDate;
      });
      if (existingDateObj) {
        existingDateObj.photos.push(photo);
      } else {
        const id = Math.floor(Math.random() * 1000);
        // cover_photo: photos[0].path,
        // title: date,
        // photos,
        results.push({
          id,
          date: photoDate,
          title: photoDate,
          cover_photo: photo.path,
          photos: [photo],
        });
      }
    });
    console.log('res', results);
    setAlbums(results);
    // console.log('results', results);
    // get unique dates
    // const res = getUniqueDates(dates);

    // console.log('dates', res);
  };

  useLayoutEffect(() => {
    if (isFocused) {
      init();
      // setPhotos(album.photos);
      // const res = getDistinctDatesFromPhotos(album.photos);
      // console.log('res', res);
      // const albums = generateAlbums(res, album.photos);
      // console.log('albums', album);
    }
  }, [isFocused]);
  useEffect(() => {
    // if (isFocused) {
    // init();
    // setPhotos(album.photos);
    // const res = getDistinctDatesFromPhotos(album.photos);
    // console.log('res', res);
    // const albums = generateAlbums(res, album.photos);
    console.log('albums', albums[0]);
    // }
  }, [albums]);

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
      {albums.length === 1 && <PhotoContainer photos={albums[0].photos} />}
      {albums.length > 1 && <AlbumsContainer albums={albums} />}
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
