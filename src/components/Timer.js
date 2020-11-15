/* @flow */
import React, { Component } from 'react';
import { AppState, AppStateStatus, Dimensions, StyleSheet, Text, View } from 'react-native';
import KeepAwake from 'react-native-keep-awake';
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
    timerState: 'STOPPED' | 'RUNNING',
    appState: AppStateStatus,
    appStateUpdated: number;
  };

  constructor(props: Props) {
    super(props);

    this.appInBackground = this.appInBackground.bind(this);
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    this.handleStartClick = this.handleStartClick.bind(this);
    this.handleStopClick = this.handleStopClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.noSecondsElapsed = this.noSecondsElapsed.bind(this);
    this.incrementerAtLastCleared = this.incrementerAtLastCleared.bind(this);

    this.state = {
      secondsElapsed: 0,
      lastClearedIncrementer: null,
      timerState: 'STOPPED',
      appState: AppState.currentState,
      appStateUpdated: Date.now()
    };
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  appInBackground(): boolean {
    return this.state.appState.match(/inactive|background/);
  }

  async handleAppStateChange(nextAppState): void {
    if (
      this.state.timerState === 'RUNNING' &&
      this.appInBackground() &&
      nextAppState === 'active'
    ) {
      this.setState(({ secondsElapsed, appStateUpdated }) =>
        ({ secondsElapsed: secondsElapsed + Math.ceil((Date.now() - appStateUpdated) / 1000) }));
    }
    this.setState({ appState: nextAppState, appStateUpdated: Date.now() });
  }

  getSeconds(): string {
    return (`0${this.state.secondsElapsed % 60}`).slice(-2);
  }

  getMinutes(): string {
    return Math.floor(this.state.secondsElapsed / 60).toString();
  }

  getPlaceholder(): string {
    return this.getMinutes().length > 1 ? '--:--' : '-:--';
  }

  handleStartClick(): void {
    if (this.state.timerState !== 'RUNNING') {
      KeepAwake.activate();
      this.setState({ timerState: 'RUNNING' });
      this.incrementer = setInterval(() => {
        this.setState({ secondsElapsed: this.state.secondsElapsed + 1 });
      }, 1000);
    }
  }

  handleStopClick(): void {
    if (this.state.timerState !== 'STOPPED') {
      KeepAwake.deactivate();
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
            <Text style={styles.value}>
              {!this.appInBackground() || this.state.timerState !== 'RUNNING' ?
                `${this.getMinutes()}:${this.getSeconds()}` : this.getPlaceholder()}
            </Text>
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
                longPress={false}
                disabled={this.appInBackground()}
              >
                {(this.noSecondsElapsed() || this.incrementerAtLastCleared()) ? 'start' : 'stop'}
              </BRButton>
              {(!this.noSecondsElapsed() && this.incrementerAtLastCleared()) && (
                <BRButton
                  color={backgroundColor}
                  backgroundColor={COLORS.CHARCOAL_LIGHT}
                  onPress={this.handleResetClick}
                  longPress={false}
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
