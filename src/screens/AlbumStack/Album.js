import {StyleSheet, View, FlatList, Image, Pressable} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
const Album = ({route, navigation}) => {
  const {item} = route.params;
  const showItem = ({item}) => {
    console.log(item);
    return (
      <Pressable onPress={() => navigation.navigate('Photo', {item})}>
        <View className="flex-col items-center w-24 h-28 ">
          <View className="w-full h-28 overflow-hidden rounded-2xl">
            {/* <Image
              source={item.path}
              resizeMode="contain"
              style={{width: '100%', height: '100%', borderRadius: 2}}
            /> */}
            <FastImage
              style={{width: '100%', height: '100%', borderRadius: 2}}
              source={item.path}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
        </View>
      </Pressable>
    );
  };
  return (
    <View className="p-3 flex-1 bg-slate-100">
      <FlatList
        columnWrapperStyle={{justifyContent: 'space-between'}}
        data={item.photos}
        keyExtractor={(item, index) => index}
        renderItem={showItem}
        numColumns={4}
      />
    </View>
  );
};

export default Album;

const styles = StyleSheet.create({});
