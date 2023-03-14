import React from 'react';
// Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {Menu, MenuProvider} from 'react-native-popup-menu';

// Screens
import Splash from '../screens/Splash';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import HomeTabsNavigator from './HomeTabsNavigator';
import {BottomBarContextProvider} from '../context/BottomBarContext';
// Navigtor
const {Navigator, Screen} = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <BottomBarContextProvider>
      <NavigationContainer>
        <Navigator
          initialRouteName="HomeTabs"
          screenOptions={{headerShown: false}}>
          <Screen name="Login" component={Login} />
          <Screen name="SignUp" component={SignUp} />
          <Screen name="Splash" component={Splash} />
          <Screen name="HomeTabs" component={HomeTabsNavigator} />
        </Navigator>
      </NavigationContainer>
    </BottomBarContextProvider>
  );
};

export default MainStackNavigator;
