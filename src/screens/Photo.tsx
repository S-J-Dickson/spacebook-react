import React from 'react';

import {
 Button, SafeAreaView, Text, useColorScheme 
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

function Photo() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <Text>Photo upload</Text>
      <Button title="Upload Photo" />
    </SafeAreaView>
  );
}

export default Photo;
