import React, { PropTypes } from 'react';
import { StyleSheet, Text, TouchableHighlight } from 'react-native';

const propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

let interval;

const BRButton = props => (
  <TouchableHighlight
    style={[styles.container, { backgroundColor: props.backgroundColor }]}
    underlayColor={props.backgroundColor}
    onPress={props.onPress}
    onPressIn={() => (interval = setInterval(props.onPress, 100))}
    onPressOut={() => clearInterval(interval)}
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

BRButton.propTypes = propTypes;

export default BRButton;
