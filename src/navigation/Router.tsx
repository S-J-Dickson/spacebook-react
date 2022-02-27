import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthStack from './AuthStack';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';
import BottomTab from './BottomTab';

export function Router() {
  const { authData, loading } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {authData ? <BottomTab /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default Router;
