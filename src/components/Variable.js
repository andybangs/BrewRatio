import React, { PropTypes } from 'react';
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
import { COLORS } from '../constants';

const propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  displayInOz: PropTypes.bool,
  incHandler: PropTypes.func.isRequired,
  decHandler: PropTypes.func.isRequired,
  changeHandler: PropTypes.func.isRequired,
  submitHandler: PropTypes.func, //eslint-disable-line
  toggleUnit: PropTypes.func,
  backgroundColor: PropTypes.string.isRequired
};

const Variable = props => (
  <BRPanel title={props.title} backgroundColor={props.backgroundColor}>
    <View style={styles.container}>
      <View style={styles.row}>
        <TextInput
          ref={c => (this.textInput = c)}
          keyboardType="numeric"
          style={styles.input}
          underlineColorAndroid={props.backgroundColor}
          selectionColor={Platform.OS === 'ios' ? COLORS.CHARCOAL : COLORS.CHARCOAL_25}
          value={props.value}
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
          >
            –
          </BRButton>
          <BRButton
            color={props.backgroundColor}
            backgroundColor={COLORS.CHARCOAL_LIGHT}
            onPress={props.incHandler}
          >
            +
          </BRButton>
        </View>
      </View>
    </View>
  </BRPanel>
);

const { width } = Dimensions.get('window');
const buttonsWidth = (width / 2) - 20;

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
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.CHARCOAL,
    textAlign: 'center',
    height: 80,
    width: buttonsWidth
  },
  unit: {
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

Variable.propTypes = propTypes;

export default Variable;
