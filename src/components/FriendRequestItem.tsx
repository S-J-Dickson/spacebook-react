import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { User } from '../interfaces/Interfaces';

export default function FriendRequestItem(props: User) {
  const { user_id, first_name, last_name, email } = props;

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  });

  // const style = { flexDirection: 'row', flexWrap: 'wrap' };

  return (
    <View style={styles.container}>
      {/* Image here */}
      <Text> {first_name} </Text>
      <Text> {last_name} </Text>
      <Button> Decline </Button>
      <Button> Accept </Button>
    </View>
  );
}
