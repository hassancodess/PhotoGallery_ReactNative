import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getImagesInGroups} from '../../utils/CameraRoll';
import GlobalStyles from '../../utils/GlobalStyles';

const All = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    handleGetImages();
  }, []);

  const handleGetImages = async () => {
    const response = await getImagesInGroups();
    setPhotos(response);
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.albumContainer}>
        <Text>ABC</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {photos.map((group, index) => {
        console.log('GROUP LENGTH', group);
        return (
          <FlatList
            key={index}
            data={group}
            keyExtractor={(item, index) => index}
            renderItem={renderItem}
            style={{backgroundColor: 'red', marginVertical: 10}}
            numColumns={3}
          />
        );
      })}
    </View>
  );
};

export default All;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
    // backgroundColor: GlobalStyles.colors.primary,
  },
  albumContainer: {
    backgroundColor: 'green',
  },
});
