import React, { Component, PropTypes } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import BRPanel from './BRPanel';
import BRButton from './BRButton';
import { COLORS, TITLES } from '../constants';

const TIMER = {
  STOPPED: 'STOPPED',
  RUNNING: 'RUNNING'
};

const propTypes = {
  backgroundColor: PropTypes.string.isRequired
};

class Timer extends Component {
  constructor(props) {
    super(props);

    this.handleStartClick = this.handleStartClick.bind(this);
    this.handleStopClick = this.handleStopClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.noSecondsElapsed = this.noSecondsElapsed.bind(this);
    this.incrementerAtLastCleared = this.incrementerAtLastCleared.bind(this);

    this.state = {
      secondsElapsed: 0,
      lastClearedIncrementer: null,
      timerState: TIMER.STOPPED
    };
  }

  getSeconds() {
    return (`0${this.state.secondsElapsed % 60}`).slice(-2);
  }

  getMinutes() {
    return Math.floor(this.state.secondsElapsed / 60);
  }

  handleStartClick() {
    if (this.state.timerState !== TIMER.RUNNING) {
      this.setState({ timerState: TIMER.RUNNING });
      this.incrementer = setInterval(() => {
        this.setState({ secondsElapsed: this.state.secondsElapsed + 1 });
      }, 1000);
    }
  }

  handleStopClick() {
    if (this.state.timerState !== TIMER.STOPPED) {
      this.setState({ timerState: TIMER.STOPPED });
      clearInterval(this.incrementer);
      this.setState({ lastClearedIncrementer: this.incrementer });
    }
  }

  handleResetClick() {
    this.setState({ secondsElapsed: 0 });
  }

  noSecondsElapsed() {
    return this.state.secondsElapsed === 0;
  }

  incrementerAtLastCleared() {
    return this.incrementer === this.state.lastClearedIncrementer;
  }

  render() {
    const backgroundColor = (this.noSecondsElapsed() && this.state.timerState === TIMER.RUNNING) ?
      COLORS.GREEN : this.props.backgroundColor;

    return (
      <BRPanel title={TITLES.TIMER} backgroundColor={backgroundColor}>
        <View style={styles.container}>
          <View style={styles.row}>
            <Text style={styles.value}>{this.getMinutes()}:{this.getSeconds()}</Text>
          </View>
          <View style={styles.row} />
          <View style={styles.row}>
            <View style={styles.buttonsCont}>
              <BRButton
                color={backgroundColor}
                backgroundColor={COLORS.CHARCOAL_DARK}
                onPress={
                  (this.noSecondsElapsed() || this.incrementerAtLastCleared()) ?
                  this.handleStartClick : this.handleStopClick
                }
              >
                {(this.noSecondsElapsed() || this.incrementerAtLastCleared()) ? 'start' : 'stop'}
              </BRButton>
              {(!this.noSecondsElapsed() && this.incrementerAtLastCleared()) && (
                <BRButton
                  color={backgroundColor}
                  backgroundColor={COLORS.CHARCOAL_LIGHT}
                  onPress={this.handleResetClick}
                >
                  reset
                </BRButton>
              )}
            </View>
          </View>
        </View>
      </BRPanel>
    );
  }
}

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
  value: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.CHARCOAL,
    textAlign: 'center'
  },
  buttonsCont: {
    width: buttonsWidth,
    height: buttonsWidth / 4,
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

Timer.propTypes = propTypes;

export default Timer;
