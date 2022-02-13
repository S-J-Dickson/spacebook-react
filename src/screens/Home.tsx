import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';

import { SafeAreaView, useColorScheme, Text } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { RootStackParams } from '../navigation/StackNavigation';

type HomeScreenProp = StackNavigationProp<RootStackParams, 'Home'>;

function HomeScreen() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const navigation = useNavigation<HomeScreenProp>();
  return (
    <SafeAreaView style={backgroundStyle}>
      <Text> Home Screen yay</Text>
    </SafeAreaView>
  );
}

export default HomeScreen;
