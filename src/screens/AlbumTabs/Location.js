import React, {useState, useEffect, useLayoutEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {initialEventsSetup} from '../../database/helpers';
import AlbumsContainer from '../../components/HomeTabs/AlbumsContainer';
import PhotoContainer from '../../components/AlbumTabs/PhotoContainer';
import {getCity} from '../../utils/geocoder';

const Location = () => {
  // Navigation
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute();
  const {album} = route.params;
  console.log('album', album);

  // States
  const [albums, setAlbums] = useState([]);

  // Utilities
  const init = async () => {
    const albumsByLocation = await initialLocationSetup(album);
    // const albumsByEvents = await initialEventsSetup(album);
    setAlbums(albumsByLocation);
  };
  const initialLocationSetup = async album => {
    // console.log('asd');
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
  };
  useLayoutEffect(() => {
    init();
  }, []);
  return (
    <View style={styles.container}>
      {albums?.length === 1 && <PhotoContainer photos={albums[0].photos} />}
      {albums?.length > 1 && <AlbumsContainer albums={albums} />}
      {albums?.length === 0 && (
        <Text>No albums Found or Turn ON your location</Text>
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
});
