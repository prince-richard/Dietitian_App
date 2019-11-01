import React, { Component } from 'react';
import { View, Text, Picker, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    texts: {
      fontSize: 20,
    },
    inputs: {
        width: '80%',
        borderWidth: 2,
        fontSize: 15,
    },
  });

export default class StandardDropdown extends Component {
  constructor(props) {
    super(props);
    this.options = this.props.options;
    this.state = {};
  }

  optionList = () =>{
    return( this.options.map( (x,i) => { 
          return( <Picker.Item label={x} key={i} value={x}  />)} ));
  }

  render() {
    const {parentText, name, value, onValueChange, selectedValue} = this.props;
    return (
      <View>
        <Text style={styles.texts}>{this.props.parentText}</Text>
        <Picker
            style={styles.inputs}
            selectedValue = {this.props.value}
            mode="dropdown"
            onValueChange={value => onValueChange(name, value)}>
            {this.optionList()}
        </Picker>
      </View>
    );
  }
}
