import React, {Component} from 'react';
import {View, Text} from 'react-native';

export default class StandardDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {selectedValue, value, parentText, name} = this.props;
    return (
      <View>
        <Text>{this.props.parentText}</Text>
        <Picker></Picker>
      </View>
    );
  }
}
