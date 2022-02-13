import React from 'react';

import {
 SafeAreaView, useColorScheme, Text, Button 
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useAuth } from '../context/AuthContext';

function HomeScreen() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const auth = useAuth();
  const logoutUser = () => {
    auth.signOut();
    console.log(auth);
    console.log('logout uiser');
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <Text> Home Screen yay</Text>
      <Button title="Logout" onPress={logoutUser} />
    </SafeAreaView>
  );
}

export default HomeScreen;
