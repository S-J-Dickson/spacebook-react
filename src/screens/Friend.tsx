import { isTSEntityName } from '@babel/types';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';

import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { Title } from 'react-native-paper';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import FriendDataService from '../api/authenticated/friend/FriendDataService';
import UserHeader from '../components/UserHeader';
import { useAuth } from '../context/AuthContext';
import checkNetwork from '../exceptions/CheckNetwork';

type UserFriend = {
  user_email: string;
  user_familyname: string;
  user_givenname: string;
  user_id: number;
};

function Friend() {
  const [friendList, setFriendList] = useState<[UserFriend] | undefined>(
    undefined
  );

  const auth = useAuth();

  FriendDataService.setAuth(auth.authData);

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  });

  useFocusEffect(
    useCallback(() => {
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
          // <View style={styles.container}>
          //   <Text>{item.user_givenname}</Text>
          //   <Text> </Text>
          //   <Text>{item.user_familyname}</Text>
          //   <Text> </Text>
          //   <Text>{item.user_email}</Text>
          // </View>
          <UserHeader
            item={{
              user_id: item.user_id,
              first_name: item.user_givenname,
              last_name: item.user_familyname,
              email: item.user_email,
            }}
            authData={auth.authData}
          />
        )}
        keyExtractor={(item) => `${item.user_id}`}
      />
    </SafeAreaView>
  );
}

export default Friend;
