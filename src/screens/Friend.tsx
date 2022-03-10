import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';

import { FlatList, SafeAreaView, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { Portal, Provider, Title, Button, Modal } from 'react-native-paper';
import FriendDataService from '../api/authenticated/friend/FriendDataService';
import UserHeader from '../components/UserHeader';
import { useAuth } from '../context/AuthContext';
import checkNetwork from '../exceptions/CheckNetwork';
import { UserFriend } from '../types/Types';

function Friend() {
  const [friendList, setFriendList] = useState<[UserFriend] | undefined>(
    undefined
  );

  const [selectedFriendList, setSelectedFriendList] = useState<
    [UserFriend] | undefined
  >(undefined);

  const auth = useAuth();

  const [visible, setVisible] = React.useState(false);

  const showModal = (id: number) => {
    setVisible(true);

    FriendDataService.getFriendList(id)
      .then((response: any) => {
        setSelectedFriendList(response.data);
      })
      .catch((err) => {
        checkNetwork(err.message);

        showMessage({
          message: 'Error contact the helpdesk!',
          type: 'danger',
          duration: 3000,
        });
      });
  };

  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: 'white', padding: 20 };
  FriendDataService.setAuth(auth.authData);

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
    <Provider>
      <SafeAreaView>
        <Title>Friend List</Title>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            <FlatList
              data={selectedFriendList}
              renderItem={({ item }) => (
                <View style={{ flexDirection: 'row' }}>
                  <UserHeader
                    item={{
                      user_id: item.user_id,
                      first_name: item.user_givenname,
                      last_name: item.user_familyname,
                      email: item.user_email,
                    }}
                    authData={auth.authData}
                  />
                </View>
              )}
              keyExtractor={(item) => `${item.user_id}`}
            />
          </Modal>
        </Portal>
        <FlatList
          data={friendList}
          renderItem={({ item }) => (
            <View style={{ flexDirection: 'row' }}>
              <UserHeader
                item={{
                  user_id: item.user_id,
                  first_name: item.user_givenname,
                  last_name: item.user_familyname,
                  email: item.user_email,
                }}
                authData={auth.authData}
              />

              <Button onPress={() => showModal(item.user_id)}>
                Show Friend list
              </Button>
            </View>
          )}
          keyExtractor={(item) => `${item.user_id}`}
        />
      </SafeAreaView>
    </Provider>
  );
}

export default Friend;
