import React, {useState, useEffect, useLayoutEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {initialEventsSetup} from '../../database/helpers';
import AlbumsContainer from '../../components/HomeTabs/AlbumsContainer';
import PhotoContainer from '../../components/AlbumTabs/PhotoContainer';
import GlobalStyles from '../../utils/GlobalStyles';

const Events = () => {
  // Navigation
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute();
  const {album} = route.params;
  // console.log('pics', album.photos);
  // States
  const [albums, setAlbums] = useState([]);

  // Utilities
  const init = async () => {
    const albumsByEvents = await initialEventsSetup(album);
    setAlbums(albumsByEvents);
  };
  useLayoutEffect(() => {
    init();
  }, []);
  useEffect(() => {
    console.log('albums', albums);
  }, [albums]);

  return (
    <View style={styles.container}>
      {/* {albums.length === 1 && <PhotoContainer photos={albums[0].photos} />} */}
      {albums.length > 0 && <AlbumsContainer albums={albums} />}
      {albums?.length === 0 && (
        <Text style={styles.text}>No events found in this album</Text>
      )}
    </View>
  );
};

export default Events;

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
