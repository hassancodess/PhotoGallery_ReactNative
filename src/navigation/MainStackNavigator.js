import React from 'react';
// Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// Screens
import Splash from '../screens/Splash';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import HomeTabsNavigator from './HomeTabsNavigator';
// Navigtor
const {Navigator, Screen} = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
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
  );
};

export default MainStackNavigator;
