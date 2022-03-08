import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';

import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { Button, Searchbar, Title } from 'react-native-paper';
import FriendDataService from '../api/authenticated/friend/FriendDataService';
import UserHeader from '../components/UserHeader';
import { useAuth } from '../context/AuthContext';
import checkNetwork from '../exceptions/CheckNetwork';
import { User } from '../interfaces/Interfaces';

function Search() {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [friendList, setFriendList] = useState<[User] | undefined>(undefined);

  const [searchResults, setSearchResults] = useState(undefined);

  const auth = useAuth();

  FriendDataService.setAuth(auth.authData);
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  });

  /**
   * @see https://stackoverflow.com/questions/65873141/how-to-remove-objects-from-an-array-which-match-another-array-of-ids
   * @param query
   */
  const onChangeSearch = (query: string) => {
    setSearchQuery(query);

    FriendDataService.searchFriend(query)
      .then((response: any) => {
        setSearchResults(response.data);
        if (friendList) {
          const userIds = friendList.flatMap((friend) => friend.user_id);
          const filterFriendList = response.data.filter(
            ({ user_id }) => !userIds.includes(user_id)
          );
          setSearchResults(filterFriendList);

          console.log(filterFriendList);
        }
      })
      .catch((err) => {
        checkNetwork(err.message);

        showMessage({
          message: err.message,
          type: 'danger',
          duration: 3000,
        });
      });
  };

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
        setSearchQuery('');
        setFriendList(undefined);
        setSearchResults(undefined);
      };
    }, [])
  );
  const removeFriendItem = (user_id: number) => {
    const searchResultUpdated = searchResults.filter(
      (result) => result.user_id !== user_id
    );

    setSearchResults(searchResultUpdated);
  };

  const addFriend = (user_id: number) => {
    removeFriendItem(user_id);
    FriendDataService.sendFriendRequest(user_id);
  };

  return (
    <SafeAreaView>
      <Title>Search For Friends</Title>

      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />

      <FlatList
        data={searchResults}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <UserHeader
              item={{
                user_id: item.user_id,
                first_name: item.user_givenname,
                last_name: item.user_familyname,
                email: item.user_email,
              }}
              authData={auth.authData}
            />
            <Button onPress={() => addFriend(item.user_id)}>Add Friend</Button>
          </View>
        )}
        keyExtractor={(item) => `${item.user_id}`}
      />
    </SafeAreaView>
  );
}

export default Search;
