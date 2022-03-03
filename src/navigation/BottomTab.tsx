import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingStack from './SettingStack';
import FriendStack from './FriendTopTab';

import HomeScreen from '../screens/Home';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="Friend Management"
        options={{ headerShown: false }}
        component={FriendStack}
      />
      <Tab.Screen
        name="Settings"
        component={SettingStack}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
