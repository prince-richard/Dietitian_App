import React, {Component} from 'react';
import {View, Text} from 'react-native';

export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {messageBody, timeStamp} = this.props;
    return (
      <View>
        <Text>{this.props.messageBody}</Text>
        <Text>{this.props.timeStamp}</Text>
      </View>
    );
  }
}
