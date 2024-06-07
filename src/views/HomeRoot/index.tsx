/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {HomeRootStackList} from '../../utils/types/navigation.type';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {Pressable, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Home, Search} from '..';
import {backgroundSecondary} from '../../utils/styles/colors';

const BottomTab = createBottomTabNavigator<HomeRootStackList>();

const TabBarIcon = ({state, navigation}: BottomTabBarProps) => {
  const routes = state.routes;

  const choseIcon = (name: string) => {
    switch (name) {
      case 'Home':
        return <AntDesign name="home" size={22} color={'white'} />;
      case 'Search':
        return <AntDesign name="search1" size={22} color={'white'} />;
    }
  };

  return !['PlayVideo'].includes(routes[state.index].name) ? (
    <View
      style={{
        backgroundColor: backgroundSecondary,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
      }}>
      {routes?.map(route =>
        !['ContentSelected', 'PlayVideo'].includes(route.name) ? (
          <Pressable
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            style={{
              padding: 5,
              paddingHorizontal: 30,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {choseIcon(route.name)}
          </Pressable>
        ) : null,
      )}
      <Pressable
        onPress={() => {
          AsyncStorage.removeItem('token');
          navigation.navigate('Landing' as never);
        }}
        style={{
          padding: 5,
          paddingHorizontal: 30,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <AntDesign name="logout" size={22} color={'white'} />
      </Pressable>
    </View>
  ) : null;
};

const HomeRoot = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBar={props => <TabBarIcon {...props} />}
      screenOptions={() => ({
        headerShown: false,
        // tabBarIcon: (props) => <MyTabBarIcon {...props}/>,
        tabBarHideOnKeyboard: true,
      })}>
      <BottomTab.Screen name="Home" component={Home} />
      <BottomTab.Screen name="Search" component={Search} />
      {/* <BottomTab.Screen name="ContentSelected" component={ContentSelected} />
      <BottomTab.Screen name="SearchContent" component={SearchContent} />
      <BottomTab.Screen name="PlayVideo" component={PlayVideo} /> */}
    </BottomTab.Navigator>
  );
};

export default HomeRoot;
