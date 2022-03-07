import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Router } from './navigation/Router';
import { AuthProvider } from './context/AuthContext';

class App extends React.Component {
  componentDidMount() {
    // Initialize BackgroundFetch ONLY ONCE when component mounts.
    console.log('test');
  }

  render() {
    return (
      <AuthProvider>
        <PaperProvider>
          <Router />
        </PaperProvider>
      </AuthProvider>
    );
  }
}

export default App;
