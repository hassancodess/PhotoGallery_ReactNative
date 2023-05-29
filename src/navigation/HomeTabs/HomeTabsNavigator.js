import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
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
// Context
import {PhotoContextProvider} from '../../context/PhotoContext';
// Icons
import Icon from 'react-native-vector-icons/FontAwesome';
import GlobalStyles from '../../utils/GlobalStyles';

const icons = {
  AlbumsStack: 'photo',
  Search: 'search',
  Camera: 'camera',
  Map: 'map-marker',
  Settings: 'cog',
};

const HomeTabsNavigator = () => {
  return (
    // <PhotoContextProvider>
    <Navigator
      initialRouteName="AlbumsStack"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({color, size}) => {
          return (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                gap: 6,
              }}>
              <Icon name={icons[route.name]} size={size} color={color} />
              <Text style={{color: GlobalStyles.colors.white, fontSize: 12}}>
                {route.name === 'AlbumsStack' ? 'Albums' : route.name}
              </Text>
            </View>
          );
        },
        tabBarActiveTintColor: GlobalStyles.colors.white,
        tabBarActiveBackgroundColor: GlobalStyles.colors.primaryActive,

        tabBarInactiveBackgroundColor: GlobalStyles.colors.primary,
        tabBarInactiveTintColor: GlobalStyles.colors.screen,
      })}>
      <Screen
        name="AlbumsStack"
        component={AlbumsStackNavigator}
        options={({route}) => ({
          // lazy: true,
          title: 'Albums',
          tabBarStyle: (route => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? '';
            if (routeName === 'Album' || routeName === 'PhotoStack') {
              return {display: 'none'};
            }
            return styles.tabBar;
          })(route),
        })}
      />
      <Screen
        name="Search"
        component={Search}
        options={{
          tabBarStyle: styles.tabBar,
        }}
      />
      <Screen
        name="Camera"
        component={Camera}
        options={{
          tabBarStyle: styles.tabBar,
        }}
      />
      <Screen
        name="Map"
        component={Map}
        options={{
          tabBarStyle: styles.tabBar,
        }}
      />
      <Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarStyle: styles.tabBar,
        }}
      />
    </Navigator>
    // </PhotoContextProvider>
  );
};

export default HomeTabsNavigator;

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
  },
});
