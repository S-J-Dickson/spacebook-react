import React, { useEffect, useState } from 'react';

import { SafeAreaView, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { Avatar, Text } from 'react-native-paper';
import UserDataService from '../api/authenticated/user/UserDataService';
import { useAuth } from '../context/AuthContext';

function UserUpdate() {
  const auth = useAuth();

  UserDataService.setAuth(auth.authData);
  return (
    <SafeAreaView>
      <Text>UPDATE USER</Text>
    </SafeAreaView>
  );
}

export default UserUpdate;
