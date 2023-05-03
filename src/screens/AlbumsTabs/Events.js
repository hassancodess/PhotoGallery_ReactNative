import {StyleSheet, View} from 'react-native';
import React, {useState, useLayoutEffect, useMemo} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {handleEventsAlbums} from '../../database/utils';
import AlbumsContainer from '../../components/HomeTabs/AlbumsContainer';

const Events = ({navigation}) => {
  const isFocused = useIsFocused();
  const [albums, setAlbums] = useState([]);

  const InitialSetup = async () => {
    const res = await handleEventsAlbums();
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

export default Events;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
});
