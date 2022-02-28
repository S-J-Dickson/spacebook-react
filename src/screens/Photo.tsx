import React, { useState } from 'react';
import { SafeAreaView, Button } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import { launchImageLibrary } from 'react-native-image-picker';
import { Avatar } from 'react-native-paper';
import { decode as atob, encode as btoa } from 'base-64';
import UserDataService from '../api/authenticated/user/UserDataService';
import { useAuth } from '../context/AuthContext';
import checkNetwork from '../exceptions/CheckNetwork';

type Photo = {
  base64: string;
  uri: string;
  type: string;
  path: string;
};

function PhotoScreen() {
  const [photo, setPhoto] = useState<Photo | undefined>(undefined);

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

  const uploadImage = async (): Promise<void> => {
    const blob = await (await fetch(photo?.uri)).blob();
    console.log(blob);
    console.log(photo.uri);

    UserDataService.postPhoto(auth.authData?.id, blob, photo?.type)
      .then((response: any) => {
        // set data
        console.log('its working');
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

        const photoGallery: Photo = {
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
      {photo && <Avatar.Image size={250} source={{ uri: photo.uri }} />}

      <Button title="Select Photo" onPress={showImagePicker} />
      <Button title="Save Photo" onPress={uploadImage} />
    </SafeAreaView>
  );
}

export default PhotoScreen;
