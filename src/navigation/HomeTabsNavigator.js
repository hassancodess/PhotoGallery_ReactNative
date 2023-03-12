import React, {useContext} from 'react';
import {
  Alert,
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  Pressable,
  LogBox,
} from 'react-native';
import BottomBarContext from '../context/BottomBarContext';

import Ionicons from 'react-native-vector-icons/Ionicons';
import GlobalStyles from '../utils/GlobalStyles';
import AlbumsStackNavigator from '../navigation/AlbumStackNavigator';
import Map from '../screens/HomeTabs/Map';
import Search from '../screens/HomeTabs/Search';
import Sync from '../screens/HomeTabs/Sync';
import {CurvedBottomBar} from 'react-native-curved-bottom-bar';

LogBox.ignoreAllLogs();

const HomeTabsNavigator = ({navigation}) => {
  const {isHidden, setIsHidden} = useContext(BottomBarContext);

  const _renderIcon = (routeName, selectedTab) => {
    let icon = '';

    switch (routeName) {
      case 'AlbumsStack':
        icon = 'images-outline';
        break;
      case 'Search':
        icon = 'search-outline';
        break;
      case 'Map':
        icon = 'location-outline';
        break;
      case 'Sync':
        icon = 'settings-outline';
        break;
    }

    return (
      <Ionicons
        name={icon}
        size={25}
        color={
          routeName === selectedTab
            ? GlobalStyles.colors.white
            : GlobalStyles.colors.secondary
        }
      />
    );
  };
  const renderTabBar = ({routeName, selectedTab, navigate}) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={styles.tabbarItem}>
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };
  const renderCircle = ({selectedTab, navigate}) => (
    <Animated.View>
      <Pressable
        style={styles.btnCircleUp}
        onPress={() => Alert.alert('Click Action')}>
        <Ionicons
          name={'camera'}
          color={GlobalStyles.colors.primary}
          size={25}
        />
      </Pressable>
    </Animated.View>
  );

  return (
    <CurvedBottomBar.Navigator
      type="UP"
      style={[styles.bottomBar, {display: isHidden ? 'none' : 'flex'}]}
      shadowStyle={styles.shawdow}
      height={55}
      circleWidth={50}
      bgColor={GlobalStyles.colors.primary}
      initialRouteName="Albums"
      borderTopLeftRight
      renderCircle={renderCircle}
      tabBar={renderTabBar}
      screenOptions={{
        headerShown: false,
      }}>
      <CurvedBottomBar.Screen
        name="AlbumsStack"
        position="LEFT"
        component={AlbumsStackNavigator}
      />
      <CurvedBottomBar.Screen
        name="Search"
        component={Search}
        position="LEFT"
        // options={}
      />
      <CurvedBottomBar.Screen name="Map" component={Map} position="RIGHT" />
      <CurvedBottomBar.Screen name="Sync" component={Sync} position="RIGHT" />
    </CurvedBottomBar.Navigator>
  );
};
export default HomeTabsNavigator;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  shawdow: {
    shadowColor: '#DDDDDD',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomBar: {},
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8E8E8',
    bottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  imgCircle: {
    width: 30,
    height: 30,
    tintColor: 'gray',
  },
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 30,
    height: 30,
  },
});
