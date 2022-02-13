/* eslint-disable react/function-component-definition */
import React, {
 createContext, useState, useContext, useEffect 
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import UserDataService from '../api/UserDataService';
import { UserLogin } from '../interfaces/Interfaces';

// Create the Auth Context with the data type specified
// and a empty object
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [authData, setAuthData] = useState<AuthData>();

  // the AuthContext start with loading equals true
  // and stay like this, until the data be load from Async Storage
  const [loading, setLoading] = useState(true);

  async function loadStorageData(): Promise<void> {
    try {
      // Try get the data from Async Storage
      const authDataSerialized = await AsyncStorage.getItem('@AuthData');
      if (authDataSerialized) {
        // If there are data, it's converted to an Object and the state is updated.
        const data: AuthData = JSON.parse(authDataSerialized);
        setAuthData(data);
      }
    } catch (error) {
      console.log('show error');
    } finally {
      // loading finished
      setLoading(false);
    }
  }

  useEffect(() => {
    // Every time the App is opened, this provider is rendered
    // and call de loadStorage function.
    loadStorageData();
  }, []);

  const signIn = async () => {
    // Set the data in the context, so the App can be notified
    // and send the user to the AuthStack
    // Persist the data in the Async Storage
    // to be recovered in the next user session.
    UserDataService.login('sd@mmu.ac.uk', 'hello123')
      .then((response: any) => {
        const authDataResponse: AuthData = {
          id: response.data.id,
          token: response.data.token,
        };

        setAuthData(authDataResponse);

        AsyncStorage.setItem('@AuthData', JSON.stringify(authDataResponse));

        console.log(authData);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const signOut = async () => {
    // Remove data from context, so the App can be notified
    // and send the user to the AuthStack

    UserDataService.logout(authData);
    setAuthData(undefined);

    // Remove the data from Async Storage
    // to NOT be recoverede in next session.
    await AsyncStorage.removeItem('@AuthData');
  };

  return (
    // This component will be used to encapsulate the whole App,
    // so all components will have access to the Context
    <AuthContext.Provider
      value={{
        authData,
        loading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// A simple hooks to facilitate the access to the AuthContext
// and permit components to subscribe to AuthContext updates
function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthContext, AuthProvider, useAuth };
