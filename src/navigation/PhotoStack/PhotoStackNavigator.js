import React, {useState, useContext} from 'react';
import {View} from 'react-native';
// Navigation
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// Screens
import Photo from '../../screens/PhotoStack/Photo';
import ViewDetails from '../../screens/PhotoStack/ViewDetails';
import EditDetails from '../../screens/PhotoStack/EditDetails';
// Components & Icons
import {Button, Menu, Divider, Provider} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
// Styles
import GlobalStyles from '../../utils/GlobalStyles';
// Navigator
const {Navigator, Screen} = createNativeStackNavigator();
// Context
import PhotoContext from '../../context/PhotoContext';

const PhotoStackNavigator = ({navigation, route}) => {
  const {photo} = route.params;
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const {photoName} = useContext(PhotoContext);

  const renderHeaderRight = () => (
    <View
      style={{
        // paddingTop: 50,
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
      <Menu
        style={{
          marginTop: 20,
          borderWidth: 2,
          borderRadius: 5,
          borderColor: GlobalStyles.colors.primary,
        }}
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Entypo
            name="dots-three-vertical"
            size={22}
            color={GlobalStyles.colors.screen}
            onPress={openMenu}
          />
        }>
        <Menu.Item
          onPress={() => {
            navigation.navigate('ViewDetails', {});
            closeMenu();
          }}
          title="View Details"
        />
        <Menu.Item
          onPress={() => {
            navigation.navigate('EditDetails');
            closeMenu();
          }}
          title="Edit Details"
        />
        {/* <Menu.Item
          onPress={() => {
            // navigation.navigate('EditDetails');
            closeMenu();
          }}
          title="Make it Cover Photo"
        /> */}
        <Divider />
        {/* <Menu.Item onPress={() => {}} title="Delete" /> */}
      </Menu>
    </View>
  );
  return (
    <Provider>
      <Navigator
        initialRouteName="Photo"
        screenOptions={{
          headerStyle: {
            backgroundColor: GlobalStyles.colors.primary,
          },
          headerTintColor: GlobalStyles.colors.screen,
          // header,
          // headerBackTitleVisible: false,
        }}>
        <Screen
          name="Photo"
          component={Photo}
          initialParams={{photo}}
          options={{
            headerRight: renderHeaderRight,
            title: photoName,
          }}
        />
        <Screen
          name="ViewDetails"
          component={ViewDetails}
          initialParams={{photo}}
          options={{title: 'Details'}}
        />
        <Screen
          name="EditDetails"
          component={EditDetails}
          initialParams={{photo}}
          options={{title: 'Edit Details'}}
        />
      </Navigator>
    </Provider>
  );
};

export default PhotoStackNavigator;
