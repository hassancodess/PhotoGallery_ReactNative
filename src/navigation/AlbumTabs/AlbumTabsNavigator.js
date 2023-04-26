import React from 'react';
import {Dimensions} from 'react-native';
// Navigation
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
const {Navigator, Screen} = createMaterialTopTabNavigator();
// Screens
import Date from '../../screens/AlbumTabs/Date';
import People from '../../screens/AlbumTabs/People.js';
import Events from '../../screens/AlbumTabs/Events';
import Location from '../../screens/AlbumTabs/Location';
import All from '../../screens/AlbumTabs/All';

// Styles
import GlobalStyles from '../../utils/GlobalStyles';

const AlbumTabsNavigator = () => {
  return (
    <Navigator
      screenOptions={{
        tabBarLabelStyle: {fontSize: 12, fontWeight: '600'},
        // tabBarContentContainerStyle: {
        //   backgroundColor: GlobalStyles.colors.screen,
        // },
        // tabBarItemStyle: {width: 50},
        tabBarStyle: {
          width: '100%',
          elevation: 0,
          marginTop: 5,
          alignSelf: 'center',
          backgroundColor: 'transparent',
          borderRadius: 3,
        },
        tabBarIndicatorStyle: {
          backgroundColor: GlobalStyles.colors.primary,
          height: 3,
          borderRadius: 10,
        },
      }}
      initialRouteName="All">
      <Screen name="All" component={All} />
      <Screen name="Date" component={Date} />
      <Screen name="People" component={People} />
      <Screen name="Events" component={Events} />
      <Screen name="Location" component={Location} />
    </Navigator>
  );
};

export default AlbumTabsNavigator;
