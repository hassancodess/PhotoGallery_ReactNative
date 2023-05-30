import React, {useState, useEffect, useLayoutEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {initialEventsSetup} from '../../database/helpers';
import AlbumsContainer from '../../components/HomeTabs/AlbumsContainer';
import PhotoContainer from '../../components/AlbumTabs/PhotoContainer';
import {getCity} from '../../utils/geocoder';
import GlobalStyles from '../../utils/GlobalStyles';

const Location = () => {
  // Navigation
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute();
  const {album} = route.params;

  // States
  const [albums, setAlbums] = useState([]);

  // Utilities
  const init = async () => {
    const albumsByLocation = await initialLocationSetup(album);
    console.log('Length of Location Albums', albumsByLocation.length);
    setAlbums(albumsByLocation);
  };
  const initialLocationSetup = async album => {
    const locationAlbums = [];
    const filteredPhotos = album.photos.filter(p => p.lat != 'null');
    // console.log('filtered Photos', filteredPhotos);
    for (const photo of filteredPhotos) {
      // console.log(photo.lat, photo.lng);
      const cityName = await getCity(photo.lat, photo.lng);
      // console.log(cityName);
      const isFound = locationAlbums.find(obj => obj.title === cityName);
      // console.log('isFound', isFound);
      if (isFound) {
        isFound.photos.push(photo);
      } else {
        const album = {
          id: Math.floor(Math.random() * 100),
          title: cityName,
          cover_photo: photo.path,
          photos: [photo],
        };
        locationAlbums.push(album);
      }
    }
    return locationAlbums;
  };
  useLayoutEffect(() => {
    init();
  }, []);
  return (
    <View style={styles.container}>
      {/* {albums?.length === 1 && <PhotoContainer photos={albums[0].photos} />} */}
      {albums?.length > 0 && <AlbumsContainer albums={albums} />}
      {albums?.length === 0 && (
        <Text style={styles.text}>No location albums found</Text>
      )}
    </View>
  );
};

export default Location;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  text: {
    color: GlobalStyles.colors.dark,
  },
});
