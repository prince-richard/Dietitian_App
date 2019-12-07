/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import AppContainer from './Components/navigator/mainNavigator';
import SpinnerLoader from './Components/SpinnerLoader';
import * as NavigationService from './Services/NavigationService';
import * as SpinnerService from './Services/SpinnerService';
import * as SignalHubService from './Services/SignalHubService';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  AsyncStorage,
} from 'react-native';
import {Root} from 'native-base';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillUnmount() {
    SignalHubService.disconnect();
  }

  render() {
    return (
      <Root>
        <AppContainer ref={c => NavigationService.setNavigator(c)} />
        <SpinnerLoader ref={c => SpinnerService.setSpinner(c)} />
      </Root>
    );
  }
}
