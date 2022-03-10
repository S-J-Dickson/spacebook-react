import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default function Loading() {
  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      justifyContent: 'center',
    },
  });
  return (
    <View style={styles.wrapper}>
      <ActivityIndicator color="#000" animating size="small" />
    </View>
  );
}
