/* @flow */
import React from 'react';
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';
import BRPanel from './BRPanel';
import BRButton from './BRButton';
import { TITLES, COLORS } from '../constants';

type Props = {
  title: string,
  value: string,
  displayInOz?: boolean,
  incHandler: () => void,
  decHandler: () => void,
  changeHandler: (val: string) => void,
  submitHandler: (val: string) => void,
  toggleUnit?: () => void,
  backgroundColor: string
};

const Variable = (props: Props) => (
  <BRPanel title={props.title} backgroundColor={props.backgroundColor}>
    <View style={styles.container}>
      <View style={styles.row}>
        <TextInput
          keyboardType="numeric"
          style={styles.input}
          underlineColorAndroid={props.backgroundColor}
          selectionColor={Platform.OS === 'ios' ? COLORS.CHARCOAL : COLORS.CHARCOAL_25}
          value={props.title === TITLES.RATIO ? `1:${props.value}` : props.value}
          onChangeText={props.changeHandler}
          onSubmitEditing={() => props.submitHandler && props.submitHandler(props.value)}
          onBlur={() => props.submitHandler && props.submitHandler(props.value)}
          blurOnSubmit
        />
      </View>
      <View style={styles.row}>
        <TouchableHighlight
          underlayColor={props.backgroundColor}
          onPress={props.toggleUnit}
        >
          <Text style={styles.unit}>
            {typeof props.displayInOz === 'boolean' && (props.displayInOz ? 'ounces' : 'grams')}
          </Text>
        </TouchableHighlight>
      </View>
      <View style={styles.row}>
        <View style={styles.buttonsCont}>
          <BRButton
            color={props.backgroundColor}
            backgroundColor={COLORS.CHARCOAL_DARK}
            onPress={props.decHandler}
            longPress
          >
            –
          </BRButton>
          <BRButton
            color={props.backgroundColor}
            backgroundColor={COLORS.CHARCOAL_LIGHT}
            onPress={props.incHandler}
            longPress
          >
            +
          </BRButton>
        </View>
      </View>
    </View>
  </BRPanel>
);

const { width } = Dimensions.get('window');
const buttonsWidth = (width / 2) - 12;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  row: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    fontFamily: 'RobotoMono-Bold',
    fontSize: 48,
    color: COLORS.CHARCOAL,
    textAlign: 'center',
    height: 80,
    width: buttonsWidth
  },
  unit: {
    fontFamily: 'RobotoMono-Regular',
    fontSize: 18,
    color: COLORS.CHARCOAL,
    textAlign: 'center'
  },
  buttonsCont: {
    width: buttonsWidth,
    height: buttonsWidth / 4,
    flexDirection: 'row'
  }
});

export default Variable;
