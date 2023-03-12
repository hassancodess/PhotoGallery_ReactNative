import React from 'react';
import {Button} from 'react-native';
// Navigation
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const {Navigator, Screen} = createNativeStackNavigator();
// Screens
import Albums from '../screens/AlbumStack/Albums';
import Album from '../screens/AlbumStack/Album';
import Photo from '../screens/AlbumStack/Photo';
// colors
import colors from '../utils/colors';
// Icons
import Entypo from 'react-native-vector-icons/Entypo';

const MainStackNavigator = () => {
  return (
    <Navigator
      initialRouteName="Albums"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTitleStyle: {
          color: colors.screen,
        },
        headerTintColor: 'white',
      }}>
      <Screen name="Albums" component={Albums} />
      <Screen name="Album" component={Album} />
      <Screen
        name="Photo"
        component={Photo}
        options={{
          headerRight: () => (
            <Entypo
              name="dots-three-vertical"
              size={24}
              color={colors.screen}
            />
          ),
        }}
      />
    </Navigator>
  );
};

export default MainStackNavigator;
