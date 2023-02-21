import React from 'react';
// Navigation
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const {Navigator, Screen} = createBottomTabNavigator();
// Screens
import Albums from '../screens/HomeTabs/Albums';
import Search from '../screens/HomeTabs/Search';
import Camera from '../screens/HomeTabs/Camera';
import Map from '../screens/HomeTabs/Map';
import Sync from '../screens/HomeTabs/Sync';
// Icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// Colors
import colors from '../utils/colors';
// Theme
import {useTheme} from 'react-native-paper';

const HomeTabsNavigator = () => {
  const theme = useTheme();
  theme.colors.secondaryContainer = 'transperent';
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
        tabBarStyle: {
          backgroundColor: colors.primary,
          height: 60,
        },
        tabBarActiveTintColor: colors.screen,
        tabBarInactiveTintColor: colors.secondary,
      }}>
      <Screen
        name="Albums"
        component={Albums}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="folder-image"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="image-search-outline"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Screen
        name="Camera"
        component={Camera}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="camera" color={color} size={26} />
          ),
        }}
      />
      <Screen
        name="Map"
        component={Map}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="map-marker-outline"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Screen
        name="Sync"
        component={Sync}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="sync" color={color} size={26} />
          ),
        }}
      />
    </Navigator>
  );
};

export default HomeTabsNavigator;
