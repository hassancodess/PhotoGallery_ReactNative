import {StyleSheet, View, ScrollView} from 'react-native';
import React from 'react';
import AvatarCircle from '../UI/Avatar';

const AvatarList = ({photoType, photoName, items}) => {
  return (
    <ScrollView horizontal={true}>
      <View style={styles.avatarsContainer}>
        {items?.map((item, index) => {
          return (
            <AvatarCircle
              key={index}
              item={item}
              photoName={photoName}
              photoType={photoType}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

export default AvatarList;

const styles = StyleSheet.create({
  avatarsContainer: {
    flexDirection: 'row',
    gap: 5,
  },
});
