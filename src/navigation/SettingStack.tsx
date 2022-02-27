/* eslint-disable import/no-cycle */
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserUpdateScreen from '../screens/UserUpdate';
import SettingScreen from '../screens/Setting';

const Stack = createNativeStackNavigator();

export default function SettingStack() {
  return (
    <Stack.Navigator initialRouteName="Setting">
      <Stack.Screen name="Settings" component={SettingScreen} />
      <Stack.Screen name="Update Details" component={UserUpdateScreen} />
    </Stack.Navigator>
  );
}
