import React, {Component} from 'react';
import {View, Text, Dimensions, ActivityIndicator} from 'react-native';
import {Spinner} from 'native-base';

export default class SpinnerLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  render() {
    const {show} = this.state;
    return show ? (
      <View
        style={{
          backgroundColor: 'rgba(0,0,0,0.2)',
          position: 'absolute',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
        }}>
        <View>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </View>
    ) : (
      <View></View>
    );
  }

  showSpinner = () => {
    this.setState({show: true});
  };

  hideSpinner = () => {
    this.setState({show: false});
  };
}
