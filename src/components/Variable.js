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
import { COLORS, UNITS } from '../constants';

const propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  unit: PropTypes.string,
  backgroundColor: PropTypes.string.isRequired
};

const Variable = (props) => {
  const { title, value, unit, backgroundColor } = props;

  return (
    <BRPanel title={title} backgroundColor={backgroundColor}>
      <View style={styles.container}>
        <View style={styles.row}>
          <TextInput
            keyboardType="numeric"
            style={styles.input}
            underlineColorAndroid={backgroundColor}
            selectionColor={Platform.OS === 'ios' ? COLORS.CHARCOAL : COLORS.CHARCOAL_25}
            value={value.toString()}
            onChangeText={() => {}}
            blurOnSubmit
          />
        </View>
        <View style={styles.row}>
          <TouchableHighlight
            underlayColor={backgroundColor}
            onPress={() => {}}
          >
            <Text style={styles.unit}>
              {unit && (unit === UNITS.GRAMS ? 'grams' : 'ounces')}
            </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.row}>
          <View style={styles.buttonsCont}>
            <BRButton
              color={backgroundColor}
              backgroundColor={COLORS.CHARCOAL_DARK}
              onPress={() => {}}
            >
              –
            </BRButton>
            <BRButton
              color={backgroundColor}
              backgroundColor={COLORS.CHARCOAL_LIGHT}
              onPress={() => {}}
            >
              +
            </BRButton>
          </View>
        </View>
      </View>
    </BRPanel>
  );
};

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
    width: buttonsWidth / 1.5
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
