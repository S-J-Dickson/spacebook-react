/* eslint-disable import/no-cycle */
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import PhotoScreen from '../screens/Photo';
import HomeScreen from '../screens/Home';

const Stack = createNativeStackNavigator();

// TODO:: https://reactnavigation.org/docs/auth-flow/
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Photo" component={PhotoScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
