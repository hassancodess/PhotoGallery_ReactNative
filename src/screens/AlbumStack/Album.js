import {StyleSheet, View, FlatList, Image, Pressable} from 'react-native';
import React, {useEffect} from 'react';
import FastImage from 'react-native-fast-image';
import Container from '../../components/UI/Container';

const Album = ({route, navigation}) => {
  const {item} = route.params;
  const showItem = ({item}) => {
    return (
      <Pressable
        onPress={() => {
          navigation.navigate('Photo', {item});
        }}>
        <View style={styles.imageContainer}>
          <FastImage
            style={styles.image}
            source={item.path}
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
        data={item.photos}
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
