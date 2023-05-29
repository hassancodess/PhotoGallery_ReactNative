import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useState, useEffect, useLayoutEffect} from 'react';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import PhotoContainer from '../../components/AlbumTabs/PhotoContainer';
import {extractDate, getFormattedDate, getUniqueDates} from '../../utils/date';
import AlbumsContainer from '../../components/HomeTabs/AlbumsContainer';
const Date = () => {
  // Navigation
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute();
  const {album} = route.params;

  // States
  const [albums, setAlbums] = useState([]);

  // Utilities
  const init = async () => {
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
        results.push({
          id,
          date: photoDate,
          title: getFormattedDate(photoDate),
          cover_photo: photo.path,
          photos: [photo],
        });
      }
    });
    // console.log('res', results);
    setAlbums(results);
  };

  useLayoutEffect(() => {
    if (isFocused) {
      init();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      {/* {albums.length === 1 && <PhotoContainer photos={albums[0].photos} />} */}
      {/* {albums.length > 1 && <AlbumsContainer albums={albums} />} */}
      <AlbumsContainer albums={albums} />
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
