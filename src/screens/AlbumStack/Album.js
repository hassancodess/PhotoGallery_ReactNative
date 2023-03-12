import {StyleSheet, View, FlatList, Pressable} from 'react-native';
import React, {useState, useEffect, useLayoutEffect, useContext} from 'react';
import FastImage from 'react-native-fast-image';
import Container from '../../components/UI/Container';
import {getImages} from '../../utils/CameraRoll';
import BottomBarContext from '../../context/BottomBarContext';

const Album = ({route, navigation}) => {
  const {item} = route.params;
  const {setIsHidden} = useContext(BottomBarContext);
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    const getAlbums = async () => {
      const response = await getImages();
      console.log('RESPONSE', response[0].group_name);
      setPhotos(response);
    };
    getAlbums();
  }, []);

  useLayoutEffect(() => {
    setIsHidden(true);
  }, []);

  const showItem = ({item}) => {
    return (
      <Pressable
        onPress={() => {
          const image = item.image;
          navigation.navigate('Photo', {item: image});
        }}>
        <View style={styles.imageContainer}>
          <FastImage
            style={styles.image}
            source={{uri: item.image.uri}}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
      </Pressable>
    );
  };
  return (
    <Container>
      <FlatList
        columnWrapperStyle={{justifyContent: 'space-between'}}
        data={photos}
        keyExtractor={(item, index) => index}
        renderItem={showItem}
        numColumns={4}
      />
    </Container>
  );
};

export default Album;

const styles = StyleSheet.create({
  imageContainer: {
    marginBottom: 20,
    // backgroundColor: 'green',
  },
  image: {
    flex: 1,
    width: 100,
    height: 120,
    borderRadius: 10,
  },
});
