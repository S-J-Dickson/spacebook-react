import React from 'react';

import {
 SafeAreaView, useColorScheme, Text, Button 
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

function PhotoScreen() {
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

export default PhotoScreen;
