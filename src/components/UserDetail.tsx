import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { UserDetail } from '../interfaces/Interfaces';

const styles = StyleSheet.create({
  baseText: {
    fontWeight: 'bold',
    textAlignVertical: 'center',
    textAlign: 'left',
    fontSize: 30,
  },
  innerText: {
    textAlignVertical: 'center',
    textAlign: 'left',
    fontSize: 30,
  },
});
export default function FormInput(userDetailProps: UserDetail) {
  const { first_name, last_name, email, friend_count } = userDetailProps;

  return (
    <View>
      <Text style={styles.baseText}>First Name:</Text>
      <Text style={styles.innerText}>{first_name}</Text>

      <Text style={styles.baseText}>Last Name:</Text>
      <Text style={styles.innerText}>{last_name}</Text>

      <Text style={styles.baseText}>Email:</Text>
      <Text style={styles.innerText}>{email}</Text>

      <Text style={styles.baseText}>Total Friends:</Text>
      <Text style={styles.innerText}>{friend_count}</Text>
    </View>
  );
}
