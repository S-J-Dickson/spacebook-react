/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { Avatar, Text } from 'react-native-paper';
import UserDataService from '../api/authenticated/user/UserDataService';
import { Photo as PhotoType, UserHeaderProp } from '../types/Types';

export default function UserHeader(props: UserHeaderProp) {
  const { item, authData } = props;

  const [photo, setPhoto] = useState<PhotoType | undefined>(undefined);

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      flex: 1,
    },
    post: {
      backgroundColor: '#c4e0ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      flex: 1,
    },
    holder: {
      flex: 1,
    },
  });

  UserDataService.setAuth(authData);

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      UserDataService.getUserPhoto(item.user_id)
        .then((res) => {
          const { status } = res.info();

          if (status === 200) {
            // the conversion is done in native code
            const base64Str = res.base64();
            // the following conversions are done in js, it's SYNC
            const mediaType = res.info().headers['Content-Type'];

            const serverBase64 = `data:${mediaType};base64,${base64Str}`;

            const photoFromServer: PhotoType = {
              base64: serverBase64,
              uri: '',
              type: '',
            };

            setPhoto(photoFromServer);
          } else {
            showMessage({
              message: 'Error please report this issue to the helpdesk.',
              type: 'danger',
              duration: 3000,
            });
          }
        })
        // Something went wrong:
        .catch((errorMessage) => {
          showMessage({
            message: errorMessage,
            type: 'danger',
            duration: 3000,
          });
        });

      return () => {
        setPhoto(undefined);
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      {photo && <Avatar.Image size={24} source={{ uri: photo.base64 }} />}
      <Text> </Text>
      <Text>{item.first_name}</Text>
      <Text> </Text>
      <Text>{item.last_name}</Text>
      <Text> </Text>
      <Text>{item.email}</Text>
    </View>
  );
}
