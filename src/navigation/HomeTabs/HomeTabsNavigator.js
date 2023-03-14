import React from 'react';
// Navigation
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// Screens
import AlbumsStackNavigator from '../AlbumsStack/AlbumsStackNavigator';
import Map from '../../screens/HomeTabs/Map';
import Settings from '../../screens/HomeTabs/Settings';
import Search from '../../screens/HomeTabs/Search';
import Camera from '../../screens/HomeTabs/Camera';
// Navigator
const {Navigator, Screen} = createBottomTabNavigator();

const HomeTabsNavigator = () => {
  return (
    <Navigator
      initialRouteName="AlbumsStack"
      screenOptions={{headerShown: false}}>
      <Screen
        name="AlbumsStack"
        component={AlbumsStackNavigator}
        options={({route}) => ({
          title: 'Albums',
          tabBarStyle: (route => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? '';
            // console.log('RouteName', routeName);
            if (routeName === 'Album' || routeName === 'PhotoStack') {
              return {display: 'none'};
            }
            return;
          })(route),
        })}
      />
      <Screen name="Search" component={Search} />
      <Screen name="Camera" component={Camera} />
      <Screen name="Map" component={Map} />
      <Screen name="Settings" component={Settings} />
    </Navigator>
  );
};

export default HomeTabsNavigator;
