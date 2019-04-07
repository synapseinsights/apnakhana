import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import WhereAreYou from '../screens/WhereAreYou';
import LocationConfirm from '../screens/LocationConfirm';
import RestaurantSuggestionNew from '../screens/RestaurantSuggestionNew';
import ViewMenu from '../screens/ViewMenu';
import InteractiveMode from '../screens/InteractiveMode';
import SettingsScreen from '../screens/SettingsScreen';

// const HomeStack = createStackNavigator({
//   Home: HomeScreen,
// });

// HomeStack.navigationOptions = {
//   tabBarLabel: 'Home',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={
//         Platform.OS === 'ios'
//           ? `ios-information-circle${focused ? '' : '-outline'}`
//           : 'md-information-circle'
//       }
//     />
//   ),
// };

// const LocationConfirmStack = createStackNavigator({
//   Location: LocationConfirm,
// });
// LocationConfirmStack.navigationOptions = {
//   tabBarLabel: 'Quick Suggestions',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === 'ios' ? 'ios-paper' : 'md-paper'}
//     />
//   ),
// };


const RestaurantSuggestionStack = createStackNavigator({
  Suggestions: RestaurantSuggestionNew,
});
RestaurantSuggestionStack.navigationOptions = {
  tabBarLabel: 'Suggestions',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-paper' : 'md-paper'}
    />
  ),
};

const ViewMenuStack = createStackNavigator({
  Menu: ViewMenu,
});
ViewMenuStack.navigationOptions = {
  tabBarLabel: 'Menu',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-basket' : 'md-basket'}
    />
  ),
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
// const SettingsStack = createStackNavigator({
//   Settings: SettingsScreen,
// });

// SettingsStack.navigationOptions = {
//   tabBarLabel: 'Settings',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
//     />
//   ),
// };

export default createBottomTabNavigator({
  WhereAreYouStack,
  RestaurantSuggestionStack, 
  ViewMenuStack,
  InteractiveModeStack
});
