import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default () => (
  <View style={styles.container}>
    <StatusBar hidden />
    <Text style={styles.welcome}>brew ratio</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 32,
    color: '#000',
    textAlign: 'center',
    margin: 10
  }
});
