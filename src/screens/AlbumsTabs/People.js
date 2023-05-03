import {StyleSheet, View} from 'react-native';
import React, {useState, useLayoutEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {handlePeopleAlbums} from '../../database/utils';
import AlbumsContainer from '../../components/HomeTabs/AlbumsContainer';

const People = ({navigation}) => {
  const isFocused = useIsFocused();
  const [albums, setAlbums] = useState([]);

  const InitialSetup = async () => {
    const res = await handlePeopleAlbums();
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
