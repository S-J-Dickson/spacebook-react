/* eslint-disable import/no-cycle */
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserUpdateScreen from '../screens/UserUpdate';
import SettingScreen from '../screens/Setting';
import PhotoScreen from '../screens/Photo';

const Stack = createNativeStackNavigator();

export default function SettingStack() {
  return (
    <Stack.Navigator initialRouteName="Setting">
      <Stack.Screen name="Profile" component={SettingScreen} />
      <Stack.Screen name="Update Details" component={UserUpdateScreen} />
      <Stack.Screen name="Photo" component={PhotoScreen} />
    </Stack.Navigator>
  );
}
