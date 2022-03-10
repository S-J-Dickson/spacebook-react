/* eslint-disable object-curly-newline */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import FriendDataService from '../api/authenticated/friend/FriendDataService';
import { RequestItemProp } from '../types/Types';
import UserHeader from './UserHeader';

export default function FriendRequestItem(props: RequestItemProp) {
  const { user, index, removeFriendItem, authData } = props;

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  });

  FriendDataService.setAuth(authData);

  const declineFriendRequest = () => {
    removeFriendItem(index);
    FriendDataService.declineFriendRequest(user.user_id);
  };

  const acceptFriendRequest = () => {
    removeFriendItem(index);
    FriendDataService.acceptFriendRequest(user.user_id);
  };

  return (
    <View style={styles.container}>
      <UserHeader item={user} authData={authData} />
      <Button onPress={() => declineFriendRequest()}> Decline </Button>
      <Button onPress={() => acceptFriendRequest()}> Accept </Button>
    </View>
  );
}
