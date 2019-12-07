import React, {Component} from 'react';
import {Input} from 'react-native-elements';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import * as Validation from '../validation';

const styles = StyleSheet.create({
  texts: {
    fontSize: 20,
  },
  inputs: {
    width: '80%',
    borderWidth: 2,
    fontSize: 15,
    backgroundColor: 'navajowhite',
  },
  loginViews: {
    flexDirection: 'column',
    marginBottom: '5%',
  },
});

export default class StandardTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      erroe: {},
      error: null,
    };
  }

  render() {
    const {error} = this.state;
    const {
      setValue,
      handleChangeText,
      secureText,
      value,
      parentText,
      name,
    } = this.props;
    return (
      <View style={styles.loginViews}>
        <Text style={styles.texts}>{this.props.parentText}</Text>
        <Input
          style={styles.inputs}
          onChangeText={value => this.handleChangeText(name, value)}
          onSubmitEditing={this.checkValidate}
          value={this.props.value}
          blurOnSubmit={true}
          onBlur={() => this.handleBlur()}
          secureTextEntry={this.props.secureText}
        />
        {error && (
          <View>
            <Text style={{color: 'red'}}>{error}</Text>
          </View>
        )}
      </View>
    );
  }

  handleChangeText(name, input) {
    const {onChangeText, setValue} = this.props;
    setValue(name, input);
    this.checkValidate(input);
  }
  handleBlur = () => {
    return this.checkValidate(this.props.value);
  };

  checkValidate = input => {
    if (!this.props.validate) return true;
    const {type, ...rest} = this.props.validate;
    if (!type || type.length <= 0) return true;
    let error = null;
    for (let i = 0; i < type.length; i++) {
      error = Validation[type[i]] && Validation[type[i]](input, rest);
    }
    if (error) {
      this.setState({error});
      return false;
    }
    this.setState({error});
    return true;
  };
}
