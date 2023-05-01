import React from 'react';
import {Dimensions} from 'react-native';
// Navigation
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
// Screens
import All from '../../screens/AlbumsTabs/All';
import People from '../../screens/AlbumsTabs/People';
import Location from '../../screens/AlbumsTabs/Location';
import Events from '../../screens/AlbumsTabs/Events';
import Date from '../../screens/AlbumsTabs/Date';
import Labels from '../../screens/AlbumsTabs/Labels';
// Styles
import GlobalStyles from '../../utils/GlobalStyles';
// Navigator
const {Navigator, Screen} = createMaterialTopTabNavigator();

const AlbumsTabsNavigator = () => {
  return (
    <Navigator
      initialRouteName="Date"
      screenOptions={{
        // lazy: true,
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
          maxWidth: '50%',
          // paddingHorizontal: 40,
          // justifyContent: 'center',
          // alignItems: 'center',
          alignSelf: 'center',
          marginLeft: 16,
          // left: '6.5%',
          // left: (Dimensions.get('window').width / 5 - width_of_indicator) / 2,
          height: 3,
          borderRadius: 10,
          // alignItems: 'center',
          // justifyContent: 'center',
          // flexDirection: 'row',
        },
      }}>
      <Screen name="Date" component={Date} />
      <Screen name="People" component={People} options={{lazy: true}} />
      <Screen name="Events" component={Events} options={{lazy: true}} />
      <Screen name="Location" component={Location} options={{lazy: true}} />
      <Screen name="Labels" component={Labels} />
      {/* <Screen name="All" component={All} /> */}
    </Navigator>
  );
};

export default AlbumsTabsNavigator;
