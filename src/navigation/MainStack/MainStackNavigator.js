import React from 'react';
// Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Screens
import Login from '../../screens/MainStack/Login';
import SignUp from '../../screens/MainStack/SignUp';
import Splash from '../../screens/MainStack/Splash';
import HomeTabsNavigator from '../HomeTabs/HomeTabsNavigator';
import {PhotoContextProvider} from '../../context/PhotoContext';

// Navigator
const {Navigator, Screen} = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <PhotoContextProvider>
      <NavigationContainer>
        <Navigator
          initialRouteName="HomeTabs"
          screenOptions={{headerShown: false}}>
          <Screen name="Splash" component={Splash} />
          <Screen name="Login" component={Login} />
          <Screen name="SignUp" component={SignUp} />
          <Screen name="HomeTabs" component={HomeTabsNavigator} />
        </Navigator>
      </NavigationContainer>
    </PhotoContextProvider>
  );
};

export default MainStackNavigator;
