import React from 'react';
// Navigation
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// Screens
import Album from '../../screens/AlbumsStack/Album';
import AlbumsTabsNavigator from '../AlbumsTabs/AlbumsTabsNavigator';
import PhotoStackNavigator from '../PhotoStack/PhotoStackNavigator';
import GlobalStyles from '../../utils/GlobalStyles';
// Navigator
const {Navigator, Screen} = createNativeStackNavigator();

const AlbumsStackNavigator = () => {
  return (
    <Navigator
      initialRouteName="AlbumsTabs"
      screenOptions={{
        // headerShown: false
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary,
        },
        headerTintColor: GlobalStyles.colors.screen,
      }}>
      <Screen
        name="AlbumsTabs"
        component={AlbumsTabsNavigator}
        options={{title: 'Albums'}}
      />
      <Screen name="Album" component={Album} />
      <Screen name="PhotoStack" component={PhotoStackNavigator} />
    </Navigator>
  );
};

export default AlbumsStackNavigator;
