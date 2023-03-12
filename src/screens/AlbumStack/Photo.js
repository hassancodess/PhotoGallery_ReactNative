import {Text, View, Image} from 'react-native';
import React from 'react';

const Photo = ({route, navigation}) => {
  const {item} = route.params;
  console.log(item);
  return (
    <View className="flex-1 h-1/2 bg-green-300">
      <Image
        source={item.path}
        resizeMode="contain"
        style={{width: '100%', height: '100%', borderRadius: 2}}
      />
    </View>
  );
};

export default Photo;
