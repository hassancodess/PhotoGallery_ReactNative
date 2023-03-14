import React from 'react';
// Navigation
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

// Screens
import All from '../../screens/AlbumsTabs/All';
import People from '../../screens/AlbumsTabs/People';
import Location from '../../screens/AlbumsTabs/Location';
import Events from '../../screens/AlbumsTabs/Events';
import GlobalStyles from '../../utils/GlobalStyles';
// Navigator
const {Navigator, Screen} = createMaterialTopTabNavigator();

const AlbumsTabsNavigator = () => {
  return (
    <Navigator
      screenOptions={{
        tabBarLabelStyle: {fontSize: 12, fontWeight: '600'},
        // tabBarContentContainerStyle: {
        //   backgroundColor: GlobalStyles.colors.screen,
        // },
        // tabBarItemStyle: {width: 50},
        tabBarStyle: {
          width: '80%',
          elevation: 0,
          marginTop: 5,
          alignSelf: 'center',
          backgroundColor: GlobalStyles.colors.screen,
          borderRadius: 3,
        },
        tabBarIndicatorStyle: {
          backgroundColor: GlobalStyles.colors.primary,
          maxWidth: '40%',
          // alignSelf: 'center',
          left: '7.5%',
          height: 3,
          borderRadius: 10,
          // alignItems: 'center',
          // justifyContent: 'center',
          // flexDirection: 'row',
        },
      }}>
      <Screen name="All" component={All} />
      <Screen name="People" component={People} />
      <Screen name="Location" component={Location} />
      <Screen name="Events" component={Events} />
    </Navigator>
  );
};

export default AlbumsTabsNavigator;
