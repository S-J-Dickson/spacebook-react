import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import BackgroundFetch from 'react-native-background-fetch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Router } from './navigation/Router';
import { AuthProvider } from './context/AuthContext';
import { DraftPost } from './interfaces/Interfaces';
import PostDataService from './api/authenticated/post/PostDataService';
import checkNetwork from './exceptions/CheckNetwork';
import { AuthData } from './types/Types';

class App extends React.Component {
  componentDidMount() {
    // Initialize BackgroundFetch ONLY ONCE when component mounts.
    this.initBackgroundFetch();
  }

  addEvent = async (taskId) => {
    const postsFromStorage = await AsyncStorage.getItem('@Posts');
    const data = JSON.parse(postsFromStorage);
    const date = Date.now();
    const authDataSerialized = await AsyncStorage.getItem('@AuthData');

    console.log(data);

    if (authDataSerialized) {
      const authData: AuthData = JSON.parse(authDataSerialized);
      if (data) {
        const scheduledPosts = data.filter(
          (x: DraftPost) => x.is_scheduled === true
        );

        scheduledPosts.map((post: DraftPost) => {
          const postDate = Date.parse(post.time_to_post);

          if (date > postDate) {
            console.log('Send post request');

            PostDataService.setAuth(authData);
            PostDataService.store(authData?.id, post)
              .then(async () => {
                const updatedPosts = data.filter(
                  (x: DraftPost) => x.draft_id !== post.draft_id
                );
                AsyncStorage.setItem('@Posts', JSON.stringify(updatedPosts));
              })
              .catch((err) => {
                checkNetwork(err.message);
              });
          }
        });
      }
    }
  };

  async initBackgroundFetch() {
    // BackgroundFetch event handler.
    const onEvent = async (taskId) => {
      console.log('[BackgroundFetch] task: ', taskId);
      // Do your background work...
      await this.addEvent(taskId);
      // IMPORTANT:  You must signal to the OS that your task is complete.
      BackgroundFetch.finish(taskId);
    };

    // Timeout callback is executed when your Task has exceeded its allowed running-time.
    // You must stop what you're doing immediately BackgroundFetch.finish(taskId)
    const onTimeout = async (taskId) => {
      console.warn('[BackgroundFetch] TIMEOUT task: ', taskId);
      BackgroundFetch.finish(taskId);
    };

    // Initialize BackgroundFetch only once when component mounts.
    const status = await BackgroundFetch.configure(
      { minimumFetchInterval: 15 },
      onEvent,
      onTimeout
    );

    console.log('[BackgroundFetch] configure status: ', status);
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
