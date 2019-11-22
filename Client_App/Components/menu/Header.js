import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> Header </Text>
        <TouchableOpacity></TouchableOpacity>
      </View>
    );
  }
}
