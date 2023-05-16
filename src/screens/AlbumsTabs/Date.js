//   const InitialSetup = async () => {
//     await new_HandleAlbums();
//   };
//   // const InitialSetup = async () => {
//   //   try {
//   //   } catch (error) {
//   //     console.log('error', error);
//   //   }
//   // };

//

//   return (
//     <View style={styles.container}>
//       <AlbumsContainer albums={albums} />
//     </View>
//   );
// };

// export default Date;

import React, {useState, useLayoutEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import AlbumsContainer from '../../components/HomeTabs/AlbumsContainer';
import {
  getDistinctDates,
  createAlbum,
  createTables,
  getPhotosByDate,
  new_HandleAlbums,
  new_createAlbum,
  new_addPhotosToDatabase,
  new_getAlbumsByDate,
} from '../../database/utils';
import {getAllImages} from '../../utils/fileSystem';

const Date = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [albums, setAlbums] = useState([]);

  useLayoutEffect(() => {
    if (isFocused) {
      InitialSetup();
    }
  }, [isFocused]);

  const InitialSetup = async () => {
    // creates all the necessary tables
    await createTables();
    // it creates Others Album
    await new_createAlbum();
    // adds all the photos to database
    await new_HandleAlbums();

    // DATE RELATED STUFF
    const res = await new_getAlbumsByDate();

    setAlbums(res);
  };

  return (
    <View style={styles.container}>
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
  albumContainer: {
    width: 100,
    marginBottom: 20,
    alignItems: 'center',
  },
  albumCover: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 8,
  },
  albumContainerText: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
  },
});
