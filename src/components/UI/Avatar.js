import React, {useContext} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Avatar} from 'react-native-paper';
import {BASE_URI} from '../../utils/api';
import PhotoContext from '../../context/PhotoContext';

const AvatarCircle = ({item}) => {
  const {
    setPerson,
    setIsPersonTextDisabled,
    photoName,
    photoType,
    setPersonStates,
  } = useContext(PhotoContext);
  const photoURL = `${BASE_URI}/faces/${photoName}/${item.name}.${photoType}`;
  const handleEditPerson = () => {
    const p = {
      id: item.id,
      name: item.name,
    };
    setPersonStates(p);
  };
  return (
    <Pressable onLongPress={handleEditPerson}>
      <View style={styles.avatarContainer}>
        <Avatar.Image
          size={80}
          source={{
            uri: photoURL,
          }}
        />
        <Text style={styles.avatarText}>{item.name}</Text>
      </View>
    </Pressable>
  );
};

export default AvatarCircle;

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: 'center',
    gap: 4,
    width: 80,
    // backgroundColor: 'red',
    overflow: 'hidden',
  },
  avatarText: {
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
    width: '80%',
    textAlign: 'center',
    // backgroundColor: 'yellow',
  },
});
