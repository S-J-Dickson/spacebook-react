import React, { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import { launchImageLibrary } from 'react-native-image-picker';
import { Avatar, Button } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import UserDataService from '../api/authenticated/user/UserDataService';
import { useAuth } from '../context/AuthContext';
import checkNetwork from '../exceptions/CheckNetwork';
import { Photo as PhotoType } from '../types/Types';

function PhotoScreen() {
  const [photo, setPhoto] = useState<PhotoType | undefined>(undefined);

  const auth = useAuth();
  UserDataService.setAuth(auth.authData);

  const options = {
    title: 'Load Photo',
    saveToPhotos: true,
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
    includeBase64: true,
  };

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      UserDataService.getUserPhoto(auth.authData?.id)
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
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        setPhoto([]);
      };
    }, [])
  );
  const uploadImage = async (): Promise<void> => {
    const blob = await (await fetch(photo?.uri)).blob();

    UserDataService.postPhoto(auth.authData?.id, blob, photo?.type)
      .then((response: any) => {
        // set data
        showMessage({
          message: 'Sucessfully saved photo.',
          type: 'success',
          duration: 3000,
        });
      })
      .catch((err) => {
        checkNetwork(err.message);

        if (err.response?.status === 400) {
          showMessage({
            message: 'Incorrect file type!',
            type: 'danger',
            duration: 3000,
          });
        }
      });
  };

  const showImagePicker = (): void => {
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log(
          'ImagePicker Error: ',
          response.errorCode + response.errorMessage
        );
      } else {
        const base64 = `data:${response.assets[0].type};base64,${response.assets[0].base64}`;

        const photoGallery: PhotoType = {
          base64,
          uri: response.assets[0].uri,
          type: response.assets[0].type,
        };

        setPhoto(photoGallery);
      }
    });
  };

  return (
    <SafeAreaView>
      {photo && <Avatar.Image size={250} source={{ uri: photo.base64 }} />}
      <Button onPress={showImagePicker}> Select Photo</Button>
      <Button onPress={uploadImage}> Save Photo</Button>
    </SafeAreaView>
  );
}

export default PhotoScreen;
