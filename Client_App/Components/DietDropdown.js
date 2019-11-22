import React, {Component} from 'react';
import {View, Text, Alert, TouchableOpacity} from 'react-native';
import {Icon, Toast} from 'native-base';
import {Dropdown} from 'react-native-material-dropdown';
import {styles, COLOR_PRIMARY_DARK, COLOR_INPUT_BACKGROUND} from '../style';
import * as Validation from '../validation';

export default class MediDropDown extends Component {
  state = {
    error: null,
  };

  render() {
    const {error} = this.state;
    const {
      editable,
      data,
      value,
      handleSetValue,
      dataField,
      validateValue,
      name,
      boxStyle,
      ...rest
    } = this.props;
    return (
      <View style={[boxStyle]}>
        <TouchableOpacity
          onPress={this.handlePress}
          style={{
            backgroundColor:
              editable === false ? 'transparent' : COLOR_INPUT_BACKGROUND,
            position: 'absolute',
            transform: [{translateX: 2}, {translateY: 20}],
            zIndex: data.length > 0 ? -88 : 88,
            height: 30,
            width: '99%',
          }}
        />
        <Dropdown
          editable={editable === false ? false : true}
          ref={c => (this.dropdown = c)}
          onChangeText={(value, index, data) => {
            handleSetValue(value, index, data, dataField, name);
            if (validateValue) this.handleBlur();
          }}
          data={data}
          value={value}
          {...rest}
        />
        {error === null ? null : (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: -9,
              position: 'absolute',
              bottom: -5,
            }}>
            <Icon
              name="close-circle"
              style={{
                color: 'red',
                fontSize: 10,
                marginRight: 5,
              }}
            />
            <Text style={{color: 'red', fontSize: 10}}>{error}</Text>
          </View>
        )}
      </View>
    );
  }

  handlePress = () => {
    const {emptyMsg} = this.props;
    Toast.show({
      textStyle: {marginTop: 25},
      text: emptyMsg,
      position: 'top',
      duration: 3000,
    });
  };

  handleBlur = () => {
    const {validateValue} = this.props;
    let isValidate = this.checkValidate(validateValue);
    return isValidate;
  };

  checkValidate(inputValue) {
    if (!this.props.validate) return true;
    let {type, ...rest} = this.props.validate;
    if (!type || type.length <= 0) return;
    let error = null;
    for (let i = 0; i < type.length; i++) {
      const check =
        Validation[type[i]] && Validation[type[i]](inputValue, rest);
      if (check !== null) {
        error = check;
        break;
      }
    }
    this.setState({error: error});
    if (error) return false;
    return true;
  }
}
