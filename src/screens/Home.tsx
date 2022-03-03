import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';

import {
  SafeAreaView,
  useColorScheme,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { Button, Title } from 'react-native-paper';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useAuth } from '../context/AuthContext';
import { PostStackParams } from '../types/Types';

type PostScreenProp = StackNavigationProp<PostStackParams>;
function HomeScreen() {
  const navigation = useNavigation<PostScreenProp>();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  });

  return (
    <SafeAreaView>
      <Title> Welcome to Spacebook</Title>

      <View style={styles.container}>
        <Text> Whats on your mind?</Text>
        <Button
          icon="post-outline"
          mode="outlined"
          onPress={() => navigation.navigate('Post')}
        >
          Post
        </Button>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
