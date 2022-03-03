import { RouteProp, useFocusEffect, useRoute } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';

import { SafeAreaView, Text } from 'react-native';
import PostDataService from '../api/authenticated/post/PostDataService';
import PostItem from '../components/PostItem';
import { useAuth } from '../context/AuthContext';
import checkNetwork from '../exceptions/CheckNetwork';
import { Post } from '../interfaces/Interfaces';
import { PostStackParams } from '../types/Types';

type PostUserScreenRouteProp = RouteProp<PostStackParams, 'User Post'>;

function PostUser() {
  const route = useRoute<PostUserScreenRouteProp>();

  const auth = useAuth();
  PostDataService.setAuth(auth.authData);

  const [post, setPost] = useState<Post>();

  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      PostDataService.show(route.params.user_id, route.params.post_id)
        .then((response: any) => {
          // set data

          console.log(response.data);

          setPost(response.data);
        })
        .catch((err) => {
          checkNetwork(err.message);
        });
      return () => {
        // setPosts(undefined);
      };
    }, [])
  );

  return (
    <SafeAreaView>
      <Text>
        Hi thee id is
        {route.params.post_id}
      </Text>

      {post && <PostItem item={post} authData={auth.authData} />}
    </SafeAreaView>
  );
}

export default PostUser;
