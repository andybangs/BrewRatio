import React from 'react';
import { KeyboardAvoidingView, StatusBar, StyleSheet, View } from 'react-native';
import Variable from './components/Variable';
import Timer from './components/Timer';
import { COLORS, TITLES, UNITS } from './constants';

export default () => (
  <KeyboardAvoidingView behavior="padding" style={styles.container}>
    <StatusBar hidden />
    <View style={styles.row}>
      <Variable
        title={TITLES.COFFEE}
        value={20}
        unit={UNITS.GRAMS}
        backgroundColor={COLORS.BROWN}
      />
      <Variable
        title={TITLES.WATER}
        value={320}
        unit={UNITS.GRAMS}
        backgroundColor={COLORS.BLUE}
      />
    </View>
    <View style={styles.row}>
      <Variable
        title={TITLES.RATIO}
        value={16}
        backgroundColor={COLORS.GRAY}
      />
      <Timer backgroundColor={COLORS.WHITE} />
    </View>
  </KeyboardAvoidingView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch'
  },
  row: {
    flex: 1,
    flexDirection: 'row'
  }
});
