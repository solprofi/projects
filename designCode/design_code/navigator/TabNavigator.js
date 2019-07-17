import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Icon } from 'expo';
import HomeScreen from '../screens/HomeScreen';
import SectionScreen from '../screens/SectionScreen';
import CoursesScreen from '../screens/CoursesScreen';
import ProjectsScreen from '../screens/ProjectsScreen';

const COLOR_ACTIVE = '#4775f2';
const COLOR_INACTIVE = '#B8BECE';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Section: SectionScreen,
}, { mode: 'modal' });

HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  const { routeName } = navigation.state.routes[navigation.state.index];

  if (routeName === 'Section') {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused }) => (
      <Icon.Ionicons
        size={26}
        name="ios-home"
        color={focused ? COLOR_ACTIVE : COLOR_INACTIVE}
      />
    ),
  };
};

const CoursesStack = createStackNavigator({
  Coursed: CoursesScreen,
});

CoursesStack.navigationOptions = {
  tabBarLabel: 'Courses',
  tabBarIcon: ({ focused }) => (
    <Icon.Ionicons
      size={26}
      name="ios-albums"
      color={focused ? COLOR_ACTIVE : COLOR_INACTIVE}
    />
  ),
};


const ProjectsStack = createStackNavigator({
  Projects: ProjectsScreen,
});

ProjectsStack.navigationOptions = {
  tabBarLabel: 'Projects',
  tabBarIcon: ({ focused }) => (
    <Icon.Ionicons
      size={26}
      name="ios-folder"
      color={focused ? COLOR_ACTIVE : COLOR_INACTIVE}
    />
  ),
};


const TabNavigator = createBottomTabNavigator({
  HomeStack,
  CoursesStack,
  ProjectsStack,
});

export default TabNavigator;
