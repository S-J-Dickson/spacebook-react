import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingStack from './SettingStack';
import HomeScreen from '../screens/Home';
import FriendRequestScreen from '../screens/FriendRequest';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Friend Request" component={FriendRequestScreen} />
      <Tab.Screen
        name="Settings"
        component={SettingStack}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
