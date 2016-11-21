import React, { PropTypes } from 'react';
import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { COLORS } from '../constants';


const propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired
};

const BRPanel = props => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={[styles.container, { backgroundColor: props.backgroundColor }]}>
      <View style={styles.flex1}>
        <View style={styles.titleCont}>
          <Text style={styles.title}>{props.title}</Text>
        </View>
      </View>
      <View style={styles.flex3}>{props.children}</View>
    </View>
  </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  flex1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  flex3: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleCont: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.CHARCOAL
  },
  title: {
    fontSize: 20,
    color: COLORS.CHARCOAL,
    textAlign: 'center'
  }
});

BRPanel.propTypes = propTypes;

export default BRPanel;
