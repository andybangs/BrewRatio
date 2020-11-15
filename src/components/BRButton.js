/* @flow */
import React, { Element } from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';

let interval: number;

type Props = {
  children?: Element<any>,
  color: string,
  backgroundColor: string,
  longPress: bool,
  onPress: () => void,
  disabled?: bool
};

const BRButton = (props: Props) => (
  <TouchableHighlight
    style={[styles.container, { backgroundColor: props.backgroundColor }]}
    underlayColor={props.backgroundColor}
    onPress={props.onPress}
    onPressIn={() => props.longPress && (interval = setInterval(props.onPress, 100))}
    onPressOut={() => props.longPress && interval && clearInterval(interval)}
    disabled={typeof props.disabled !== 'undefined' ? props.disabled : false}
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
    fontFamily: 'RobotoMono-Bold',
    fontSize: 22
  }
});

export default BRButton;
