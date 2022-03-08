import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { Button, Title } from 'react-native-paper';
import FriendDataService from '../api/authenticated/friend/FriendDataService';
import FriendRequestItem from '../components/FriendRequestItem';
import { useAuth } from '../context/AuthContext';
import checkNetwork from '../exceptions/CheckNetwork';
import { User } from '../interfaces/Interfaces';

function FriendRequest() {
  const auth = useAuth();

  const [friendItems, setFriendItems] = useState<[User] | undefined>();

  const removeFriendItem = (index) => {
    const friendItemsCopy: [User] = [...friendItems];

    friendItemsCopy.splice(index, 1);

    setFriendItems(friendItemsCopy);
  };

  FriendDataService.setAuth(auth.authData);
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      FriendDataService.getFriendRequest()
        .then((response: any) => {
          // set data
          setFriendItems(response.data);
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
        setFriendItems(undefined);
      };
    }, [])
  );
  return (
    <SafeAreaView>
      <Title>Friend Requests</Title>
      <FlatList
        data={friendItems}
        renderItem={({ item, index }) => (
          <FriendRequestItem
            user={item}
            removeFriendItem={removeFriendItem}
            index={index}
            authData={auth.authData}
            key={item.user_id}
          />
        )}
        keyExtractor={(item) => `${item.user_id}`}
      />
    </SafeAreaView>
  );
}

export default FriendRequest;
