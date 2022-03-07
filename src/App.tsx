import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Router } from './navigation/Router';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <PaperProvider>
        <Router />
      </PaperProvider>
    </AuthProvider>
  );
}

export default App;
