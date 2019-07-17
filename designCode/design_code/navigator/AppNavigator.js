import { createAppContainer, createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import SectionScreen from '../screens/SectionScreen';
import TabNavigator from './TabNavigator';

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
  Section: SectionScreen,
}, { mode: 'modal' });

export default createAppContainer(TabNavigator);
