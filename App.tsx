import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  TextInput,
  useColorScheme,
  View,
  Button,
} from 'react-native';

import { Colors, Header } from 'react-native/Libraries/NewAppScreen';

const loginUser = () => {
  console.log('logged in the user');
  // TODO: Create request
};

const registerUser = () => {
  console.log('regiser the user');
};

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
      >
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}
        >
          <TextInput placeholder="TESTTST" />

          <TextInput placeholder="password" keyboardType="visible-password" />

          <Button title="Login" onPress={loginUser} />

          <Button title="Register" onPress={registerUser} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
