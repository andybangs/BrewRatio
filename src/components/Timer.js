/* @flow */
import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import BRPanel from './BRPanel';
import BRButton from './BRButton';
import { COLORS } from '../constants';

type Props = {
  backgroundColor: string
};

class Timer extends Component {
  props: Props;

  state: {
    secondsElapsed: number,
    lastClearedIncrementer: number | null,
    timerState: 'STOPPED' | 'RUNNING';
  };

  incrementer: number;
  handleStartClick: () => void;
  handleStopClick: () => void;
  handleResetClick: () => void;
  noSecondsElapsed: () => boolean;
  incrementerAtLastCleared: () => boolean;

  constructor(props: Props) {
    super(props);

    this.handleStartClick = this.handleStartClick.bind(this);
    this.handleStopClick = this.handleStopClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.noSecondsElapsed = this.noSecondsElapsed.bind(this);
    this.incrementerAtLastCleared = this.incrementerAtLastCleared.bind(this);

    this.state = {
      secondsElapsed: 0,
      lastClearedIncrementer: null,
      timerState: 'STOPPED'
    };
  }

  getSeconds(): string {
    return (`0${this.state.secondsElapsed % 60}`).slice(-2);
  }

  getMinutes(): string {
    return Math.floor(this.state.secondsElapsed / 60).toString();
  }

  handleStartClick(): void {
    if (this.state.timerState !== 'RUNNING') {
      this.setState({ timerState: 'RUNNING' });
      this.incrementer = setInterval(() => {
        this.setState({ secondsElapsed: this.state.secondsElapsed + 1 });
      }, 1000);
    }
  }

  handleStopClick(): void {
    if (this.state.timerState !== 'STOPPED') {
      this.setState({ timerState: 'STOPPED' });
      if (this.incrementer) clearInterval(this.incrementer);
      this.setState({ lastClearedIncrementer: this.incrementer });
    }
  }

  handleResetClick(): void {
    this.setState({ secondsElapsed: 0 });
  }

  noSecondsElapsed(): boolean {
    return this.state.secondsElapsed === 0;
  }

  incrementerAtLastCleared(): boolean {
    return this.incrementer === this.state.lastClearedIncrementer;
  }

  render() {
    const backgroundColor = (this.noSecondsElapsed() && this.state.timerState === 'RUNNING') ?
      COLORS.GREEN : this.props.backgroundColor;

    return (
      <BRPanel title="TIMER" backgroundColor={backgroundColor}>
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
  value: {
    fontFamily: 'RobotoMono-Bold',
    fontSize: 48,
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

export default Timer;
