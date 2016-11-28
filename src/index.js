/* @flow */
import React from 'react';
import { observer } from 'mobx-react/native';
import { KeyboardAvoidingView, StatusBar, StyleSheet, View } from 'react-native';
import Variable from './components/Variable';
import Timer from './components/Timer';
import AppStore from './AppStore';
import { COLORS } from './constants';

const App = observer(({ store }: { store: AppStore }) => (
  <KeyboardAvoidingView behavior="padding" style={styles.container}>
    <StatusBar hidden />
    <View style={styles.row}>
      <Variable
        title="COFFEE"
        value={store.coffeeDisplay}
        displayInOz={store.displayCoffeeInOz}
        incHandler={() => store.incCoffee()}
        decHandler={() => store.decCoffee()}
        changeHandler={(val: string) => store.inputCoffee(val)}
        submitHandler={(val: string) => store.trimCoffeeDecimal(val)}
        toggleUnit={() => store.toggleCoffeeUnit()}
        backgroundColor={COLORS.BROWN}
      />
      <Variable
        title="WATER"
        value={store.waterDisplay}
        displayInOz={store.displayWaterInOz}
        incHandler={() => store.incWater()}
        decHandler={() => store.decWater()}
        changeHandler={(val: string) => store.inputWater(val)}
        submitHandler={(val: string) => store.trimWaterDecimal(val)}
        toggleUnit={() => store.toggleWaterUnit()}
        backgroundColor={COLORS.BLUE}
      />
    </View>
    <View style={styles.row}>
      <Variable
        title="RATIO"
        value={store.ratio}
        incHandler={() => store.incRatio()}
        decHandler={() => store.decRatio()}
        changeHandler={(val: string) => store.inputRatio(val)}
        submitHandler={(val: string) => store.trimRatioDecimal(val)}
        backgroundColor={COLORS.GRAY}
      />
      <Timer backgroundColor={COLORS.WHITE} />
    </View>
  </KeyboardAvoidingView>
));

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

export default () => <App store={new AppStore()} />;
