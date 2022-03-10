/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable react-hooks/exhaustive-deps */

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';

import { SafeAreaView } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { Button, Text } from 'react-native-paper';
import UserDataService from '../api/authenticated/user/UserDataService';
import UserDetail from '../components/UserDetail';
import { UserDetail as UserDetailInterface } from '../interfaces/Interfaces';

import { useAuth } from '../context/AuthContext';
import checkNetwork from '../exceptions/CheckNetwork';
import { UserUpdateScreenProp } from '../types/Types';

function Setting() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();

  const auth = useAuth();

  UserDataService.setAuth(auth.authData);

  const navigation = useNavigation<UserUpdateScreenProp>();

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      UserDataService.getUser(auth.authData?.id)
        .then((response: any) => {
          // set data
          setData(response.data);

          const user: UserDetailInterface = {
            first_name: response.data.first_name,
            last_name: response.data.last_name,
            email: response.data.email,
            friend_count: response.data.friend_count,
          };

          auth.user = user;
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
        })
        .finally(() => setLoading(false));

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        setData([]);
      };
    }, [])
  );

  const logoutUser = () => {
    auth.signOut();
  };

  return (
    <SafeAreaView>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <UserDetail
          first_name={data.first_name}
          last_name={data.last_name}
          email={data.email}
        />
      )}

      <Button
        mode="outlined"
        onPress={() => navigation.navigate('Update Details')}
      >
        Edit User Details
      </Button>

      <Button mode="outlined" onPress={() => navigation.navigate('Photo')}>
        Add Photo
      </Button>

      <Button onPress={logoutUser}>Logout</Button>
    </SafeAreaView>
  );
}

export default Setting;
