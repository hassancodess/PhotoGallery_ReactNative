import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Avatar} from 'react-native-paper';
import {BASE_URI} from '../../utils/api';

const AvatarCircle = ({photoName, photoType, person}) => {
  const photoURL = `${BASE_URI}/faces/${photoName}/${person.oldName}.${photoType}`;
  // console.log('photourl ', photoName, photoType, personName);
  console.log('photourl ', photoURL);
  return (
    <View style={styles.avatarContainer}>
      <Avatar.Image
        size={80}
        source={{
          uri: photoURL,
        }}
      />
      <Text style={styles.avatarText}>{person.newName}</Text>
    </View>
  );
};

export default AvatarCircle;

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center',
    gap: 4,
  },
  avatarText: {
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
    width: '75%',
    textAlign: 'center',
  },
});
