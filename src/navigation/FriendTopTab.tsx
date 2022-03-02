/* eslint-disable import/no-cycle */
import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FriendRequestScreen from '../screens/FriendRequest';
import SearchScreen from '../screens/Search';

const Tab = createMaterialTopTabNavigator();

export default function FriendStack() {
  return (
    <Tab.Navigator initialRouteName="Setting">
      <Tab.Screen name="Friend Requests" component={FriendRequestScreen} />
      <Tab.Screen name="Search For Friends" component={SearchScreen} />
    </Tab.Navigator>
  );
}
