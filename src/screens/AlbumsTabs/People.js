import {StyleSheet, View} from 'react-native';
import React, {useState, useLayoutEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import AlbumsContainer from '../../components/HomeTabs/AlbumsContainer';
import {handlePeopleAlbums} from '../../database/helpers';

const People = ({navigation}) => {
  const isFocused = useIsFocused();
  const [albums, setAlbums] = useState([]);

  const InitialSetup = async () => {
    const res = await handlePeopleAlbums();
    console.log('people albums', res);
    setAlbums(res);
  };

  useLayoutEffect(() => {
    if (isFocused) {
      InitialSetup();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <AlbumsContainer albums={albums} />
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
