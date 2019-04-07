import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import WhereAreYou from '../screens/WhereAreYou';
import LocationConfirm from '../screens/LocationConfirm';
import RestaurantSuggestion from '../screens/RestaurantSuggestion';
import ViewMenu from '../screens/ViewMenu';
import InteractiveMode from '../screens/InteractiveMode';
import SettingsScreen from '../screens/SettingsScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const LocationConfirmStack = createStackNavigator({
  Location: LocationConfirm,
});
LocationConfirmStack.navigationOptions = {
  tabBarLabel: 'Quick Suggestions',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-paper' : 'md-paper'}
    />
  ),
};


const RestaurantSuggestionStack = createStackNavigator({
  Suggestions: RestaurantSuggestion,
});
RestaurantSuggestionStack.navigationOptions = {
};

const ViewMenuStack = createStackNavigator({
  Menu: ViewMenu,
});
ViewMenu.navigationOptions = {
};

const WhereAreYouStack = createStackNavigator({
  Links: WhereAreYou,
});

WhereAreYouStack.navigationOptions = {
  tabBarLabel: 'Locate',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-locate' : 'md-locate'}
    />
  ),
};

const InteractiveModeStack = createStackNavigator({
  Links: InteractiveMode,
});

InteractiveModeStack.navigationOptions = {
  tabBarLabel: 'Interactive Mode',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-aperture' : 'md-aperture'}
    />
  ),
};
const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  LocationConfirmStack,
  ViewMenuStack, 
  RestaurantSuggestionStack, 
  WhereAreYouStack,
  InteractiveModeStack
});
