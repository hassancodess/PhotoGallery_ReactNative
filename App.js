import React from 'react';
// Navigation
import MainStackNavigator from './src/navigation/MainStack/MainStackNavigator';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <>
      <MainStackNavigator />
      <Toast />
    </>
  );
};

export default App;
