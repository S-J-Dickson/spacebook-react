import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import FriendDataService from '../api/authenticated/friend/FriendDataService';
import FriendRequestItem from '../components/FriendRequestItem';
import { useAuth } from '../context/AuthContext';
import checkNetwork from '../exceptions/CheckNetwork';
import { User } from '../interfaces/Interfaces';

function FriendRequest() {
  const auth = useAuth();

  const [friendItems, setFriendItems] = useState<[User] | undefined>();

  FriendDataService.setAuth(auth.authData);
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      FriendDataService.getFriendRequest()
        .then((response: any) => {
          // set data
          setFriendItems(response.data);

          console.log(response.data);

          console.log(auth.authData?.id);
        })
        .catch((err) => {
          checkNetwork(err.message);

          if (err.response?.status === 400) {
            showMessage({
              message: 'Wrong email or password!',
              type: 'danger',
              duration: 3000,
            });
          }
        });

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        // setData([]);
      };
    }, [])
  );
  return (
    <SafeAreaView>
      <Text>Friends are here</Text>

      {friendItems &&
        friendItems?.map((user) => {
          console.log(user.user_id);
          return (
            <FriendRequestItem
              user_id={user.user_id}
              first_name={user.first_name}
              last_name={user.last_name}
              email={user.email}
            />
          );
        })}
    </SafeAreaView>
  );
}

export default FriendRequest;
