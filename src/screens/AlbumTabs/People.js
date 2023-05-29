import React, {useState, useEffect, useLayoutEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {initialEventsSetup, initialPeopleSetup} from '../../database/helpers';
import AlbumsContainer from '../../components/HomeTabs/AlbumsContainer';
import PhotoContainer from '../../components/AlbumTabs/PhotoContainer';

const People = () => {
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
    const albumsByPeople = await initialPeopleSetup(album);
    setAlbums(albumsByPeople);
  };
  useLayoutEffect(() => {
    init();
  }, []);

  return (
    <View style={styles.container}>
      {/* {albums.length === 1 && <PhotoContainer photos={albums[0].photos} />} */}
      <AlbumsContainer albums={albums} />
      {albums?.length === 0 && (
        <Text style={styles.text}>No people found in this album</Text>
      )}
    </View>
  );
};

export default People;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
});
