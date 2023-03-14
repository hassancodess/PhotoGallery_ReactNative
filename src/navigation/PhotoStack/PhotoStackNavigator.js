import React from 'react';
// Navigation
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// Screens
import Photo from '../../screens/PhotoStack/Photo';
import ViewDetails from '../../screens/PhotoStack/ViewDetails';
import EditDetails from '../../screens/PhotoStack/EditDetails';
// Styles
import GlobalStyles from '../../utils/GlobalStyles';
// Navigator
const {Navigator, Screen} = createNativeStackNavigator();

const PhotoStackNavigator = () => {
  return (
    <Navigator
      initialRouteName="Photo"
      screenOptions={{
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary,
        },
        headerTintColor: GlobalStyles.colors.screen,
      }}>
      <Screen name="Photo" component={Photo} />
      <Screen name="ViewDetails" component={ViewDetails} />
      <Screen name="EditDetails" component={EditDetails} />
    </Navigator>
  );
};

export default PhotoStackNavigator;
