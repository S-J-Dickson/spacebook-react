import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';

import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { Title } from 'react-native-paper';
import FriendDataService from '../api/authenticated/friend/FriendDataService';
import { useAuth } from '../context/AuthContext';
import checkNetwork from '../exceptions/CheckNetwork';
import { User } from '../interfaces/Interfaces';

function Friend() {
  const [friendList, setFriendList] = useState<[User] | undefined>(undefined);

  const auth = useAuth();

  FriendDataService.setAuth(auth.authData);

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  });

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      FriendDataService.getFriendList(auth.authData?.id)
        .then((response: any) => {
          setFriendList(response.data);
        })
        .catch((err) => {
          checkNetwork(err.message);

          showMessage({
            message: 'Error contact the helpdesk!',
            type: 'danger',
            duration: 3000,
          });
        });

      return () => {
        setFriendList(undefined);
      };
    }, [])
  );
  return (
    <SafeAreaView>
      <Title>Friend List</Title>

      <FlatList
        data={friendList}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <Text>{item.user_givenname}</Text>
            <Text> </Text>
            <Text>{item.user_familyname}</Text>
            <Text> </Text>
            <Text>{item.user_email}</Text>
          </View>
        )}
        keyExtractor={(item) => `${item.user_id}`}
      />
    </SafeAreaView>
  );
}

export default Friend;
