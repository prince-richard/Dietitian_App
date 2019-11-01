/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react';
import AppContainer from './Components/navigator/mainNavigator';
import * as NavigationService from './Services/NavigationService'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  AsyncStorage
} from 'react-native';
import {Root} from 'native-base'
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
    this.state = {
    };
  }

  /*componentDidMount() {
    const user = await AsyncStorage.getItem("username");
    if (user) 
    //skip navigation page and go to homePage
  }*/

  render() {
    return (
      <Root><AppContainer ref={c => NavigationService.setNavigator(c)}/></Root>
    );
  }
}

