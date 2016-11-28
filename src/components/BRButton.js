/* @flow */
import React, { Element } from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';

let interval: number;

type Props = {
  children?: Element<any>,
  color: string,
  backgroundColor: string,
  onPress: () => void
};

const BRButton = (props: Props) => (
  <TouchableHighlight
    style={[styles.container, { backgroundColor: props.backgroundColor }]}
    underlayColor={props.backgroundColor}
    onPress={props.onPress}
    onPressIn={() => (interval = setInterval(props.onPress, 100))}
    onPressOut={() => interval && clearInterval(interval)}
  >
    <Text style={[styles.text, { color: props.color }]}>{props.children}</Text>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold'
  }
});

export default BRButton;
