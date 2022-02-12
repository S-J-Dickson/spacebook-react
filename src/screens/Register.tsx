import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';

import {
  SafeAreaView,
  useColorScheme,
  Text,
  TextInput,
  Button,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { RootStackParams } from '../navigation/AppNavigation';

type PhotoScreenProp = StackNavigationProp<RootStackParams, 'Photo'>;

function RegisterScreen() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const navigation = useNavigation<PhotoScreenProp>();
  return (
    <SafeAreaView style={backgroundStyle}>
      <Text>Register User</Text>

      <TextInput placeholder="First Name" />
      <TextInput placeholder="Last Name" />
      <TextInput placeholder="Email" />
      <TextInput placeholder="Password" keyboardType="visible-password" />
      <TextInput placeholder="password again" keyboardType="visible-password" />

      <Button
        title="Create Account"
        onPress={() => navigation.navigate('Photo')}
      />
    </SafeAreaView>
  );
}

export default RegisterScreen;
