import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  texts: {
    fontSize: 20,
  },
  inputs: {
    width: '80%',
    borderWidth: 2,
    fontSize: 15,
  },
  loginViews: {
    flexDirection: 'column',
    marginBottom: '5%',
  },
});

export default class StandardTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {onChangeText, value, parentText, name} = this.props;
    return (
      <View style={styles.loginViews}>
        <Text style={styles.texts}>{this.props.parentText}</Text>
        <TextInput
          style={styles.inputs}
          onChangeText={value => onChangeText(name, value)}
          value={this.props.value}
        />
      </View>
    );
  }
}
