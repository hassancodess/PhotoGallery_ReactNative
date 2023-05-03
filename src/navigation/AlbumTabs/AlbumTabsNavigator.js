import React from 'react';
// Navigation
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
const {Navigator, Screen} = createMaterialTopTabNavigator();
import {useRoute} from '@react-navigation/native';

// Screens
import Date from '../../screens/AlbumTabs/Date';
import People from '../../screens/AlbumTabs/People.js';
import Events from '../../screens/AlbumTabs/Events';
import Location from '../../screens/AlbumTabs/Location';
import All from '../../screens/AlbumTabs/All';

// Styles
import GlobalStyles from '../../utils/GlobalStyles';

const AlbumTabsNavigator = () => {
  const route = useRoute();
  const {album} = route.params;
  return (
    <Navigator
      screenOptions={{
        lazy: true,
        tabBarLabelStyle: {fontSize: 12, fontWeight: '600'},
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
      <Screen name="All" component={All} initialParams={{album}} />
      <Screen name="Date" component={Date} initialParams={{album}} />
      <Screen name="People" component={People} initialParams={{album}} />
      <Screen name="Events" component={Events} initialParams={{album}} />
      <Screen name="Location" component={Location} initialParams={{album}} />
    </Navigator>
  );
};

export default AlbumTabsNavigator;
