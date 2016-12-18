/* @flow */
import React, { Element } from 'react';
import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { COLORS } from '../constants';

type Props = {
  children?: Element<any>,
  title: string,
  backgroundColor: string
};

const BRPanel = (props: Props) => (
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
    borderBottomWidth: 1.5,
    borderBottomColor: COLORS.CHARCOAL
  },
  title: {
    fontFamily: 'RobotoMono-Regular',
    fontSize: 20,
    color: COLORS.CHARCOAL,
    textAlign: 'center'
  }
});

export default BRPanel;
