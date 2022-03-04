import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingStack from './SettingStack';
import FriendStack from './FriendTopTab';
import PostStack from './PostStack';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        options={{ headerShown: false }}
        component={PostStack}
      />
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
