import React, {useState} from 'react';
import {Button, Menu, Divider, Provider} from 'react-native-paper';
import {Pressable, View, TouchableOpacity} from 'react-native';
// Navigation
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const {Navigator, Screen} = createNativeStackNavigator();
// Screens
import Albums from '../screens/AlbumStack/Albums';
import Album from '../screens/AlbumStack/Album';
import Photo from '../screens/AlbumStack/Photo';
import EditPhotoDetails from '../screens/AlbumStack/EditPhotoDetails';
import ViewPhotoDetails from '../screens/AlbumStack/ViewPhotoDetails';
// colors
import colors from '../utils/colors';
// Icons
import Entypo from 'react-native-vector-icons/Entypo';

const AlbumStackNavigator = () => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  return (
    <Provider>
      <Navigator
        initialRouteName="Albums"
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTitleStyle: {
            color: colors.screen,
            fontSize: 18,
          },
          headerTintColor: 'white',
        }}>
        <Screen name="Albums" component={Albums} />
        <Screen name="Album" component={Album} options={{}} />
        <Screen
          name="Photo"
          component={Photo}
          options={{
            headerRight: () => (
              <>
                <Menu
                  visible={visible}
                  onDismiss={closeMenu}
                  // style={{position: 'absolute'}}
                  // anchor={
                  //   <Button onPress={() => console.log('Open')}>
                  //     <Entypo
                  //       name="dots-three-vertical"
                  //       size={24}
                  //       color={colors.screen}
                  //     />
                  //   </Button>
                  // }>
                  anchor={<Button onPress={openMenu}>Show menu</Button>}>
                  <Menu.Item onPress={() => {}} title="View Details" />
                  <Menu.Item onPress={() => {}} title="Edit Details" />
                  <Divider />
                  <Menu.Item onPress={() => {}} title="Delete" />
                </Menu>
              </>
            ),
          }}
        />
        <Screen
          name="ViewPhotoDetails"
          component={ViewPhotoDetails}
          options={{
            title: 'View Photo Details',
          }}
        />
        <Screen
          name="EditPhotoDetails"
          component={EditPhotoDetails}
          options={{
            title: 'Edit Photo Details',
          }}
        />
      </Navigator>
    </Provider>
  );
};

export default AlbumStackNavigator;
