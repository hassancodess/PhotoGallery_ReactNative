import React from 'react';
import {Text, View, Pressable} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../utils/colors';

const Sync = () => {
  return (
    <View className="p-3 flex-1 items-center justify-center gap-y-16">
      <AntDesign name="sync" size={150} color={colors.primary} />
      <Pressable className="rounded-full bg-purple-500">
        <Text className="px-8 py-2 text-base text-white font-medium">
          Sync Now
        </Text>
      </Pressable>
    </View>
  );
};

export default Sync;
