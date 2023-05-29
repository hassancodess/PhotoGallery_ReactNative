import React, {useContext} from 'react';
// Navigation
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// Screens
import Album from '../../screens/AlbumsStack/Album';
import AlbumsTabsNavigator from '../AlbumsTabs/AlbumsTabsNavigator';
import PhotoStackNavigator from '../PhotoStack/PhotoStackNavigator';
import GlobalStyles from '../../utils/GlobalStyles';
import AlbumTabsNavigator from '../AlbumTabs/AlbumTabsNavigator';
import PhotoContext from '../../context/PhotoContext';
// Navigator
const {Navigator, Screen} = createNativeStackNavigator();

const AlbumsStackNavigator = () => {
  const {albumName} = useContext(PhotoContext);
  return (
    <Navigator
      initialRouteName="AlbumsTabs"
      screenOptions={{
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary,
        },
        headerTintColor: GlobalStyles.colors.screen,
      }}>
      <Screen
        name="AlbumsTabs"
        component={AlbumsTabsNavigator}
        options={{
          title: 'Albums',
        }}
      />
      <Screen
        name="Album"
        component={Album}
        options={{
          navigationBarHidden: true,
          tabBarVisible: false,
        }}
      />
      <Screen
        name="AlbumTabs"
        component={AlbumTabsNavigator}
        options={{
          navigationBarHidden: true,
          tabBarVisible: false,
          title: albumName,
        }}
      />
      <Screen
        name="PhotoStack"
        component={PhotoStackNavigator}
        options={{headerShown: false}}
      />
    </Navigator>
  );
};

export default AlbumsStackNavigator;
