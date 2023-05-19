import {StyleSheet, Text, View, ScrollView, Pressable} from 'react-native';
import React, {useState} from 'react';
import AvatarCircle from '../UI/Avatar';
import {
  Portal,
  TextInput,
  Chip,
  Button,
  PaperProvider,
  Menu,
  Divider,
} from 'react-native-paper';

const AvatarList = ({photoType, photoName, items}) => {
  return (
    <View style={styles.avatarsContainer}>
      <ScrollView horizontal={true}>
        {items?.map((item, index) => {
          console.log('item', item);
          return (
            <AvatarCircle
              key={index}
              personName={item.name}
              photoName={photoName}
              photoType={photoType}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default AvatarList;

const styles = StyleSheet.create({
  avatarsContainer: {
    flexDirection: 'row',
    gap: 5,
    // backgroundColor: 'red',
  },
});
