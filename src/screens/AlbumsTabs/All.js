import {StyleSheet, Text, View} from 'react-native';
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

  return (
    <View style={styles.container}>
      <Text>All</Text>
    </View>
  );
};

export default All;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: GlobalStyles.colors.primary,
  },
});
