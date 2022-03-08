/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { UserDetail as UserDetailInterface } from '../interfaces/Interfaces';

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
export default function UserDetail(userDetailProps: UserDetailInterface) {
  const { first_name, last_name, email } = userDetailProps;

  return (
    <View>
      <Text style={styles.baseText}>First Name:</Text>
      <Text style={styles.innerText}>{first_name}</Text>

      <Text style={styles.baseText}>Last Name:</Text>
      <Text style={styles.innerText}>{last_name}</Text>

      <Text style={styles.baseText}>Email:</Text>
      <Text style={styles.innerText}>{email}</Text>
    </View>
  );
}
