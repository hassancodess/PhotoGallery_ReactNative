import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import AvatarCircle from '../UI/Avatar';
const AvatarList = ({people, photoType, photoName}) => {
  return (
    <View style={styles.avatarsContainer}>
      <ScrollView horizontal={true}>
        {people?.map((person, index) => {
          return (
            <AvatarCircle
              key={index}
              personName={person.name}
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
