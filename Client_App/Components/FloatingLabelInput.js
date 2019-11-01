import React, {Component} from 'react';
import {Input, Item, Label, Icon} from 'native-base';
import {Text, View, StyleSheet, Alert} from 'react-native';
import {COLOR_PRIMARY_DARK, COLOR_INPUT_BACKGROUND} from '../style';
import * as Validation from '../validation';

export default class FloatingLabelInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      error: null,
    };
  }
  render() {
    const {error} = this.state;
    const {
      placeholder,
      inputValue,
      handleSetValue,
      name,
      boxStyle,
      editable,
      onFocus,
      suffix,
      ...rest
    } = this.props;
    return (
      <View style={[boxStyle, style.outContainer]}>
        <View style={style.container}>
          <Item floatingLabel style={style.item}>
            <Label style={this.fontStyle()}>{placeholder}</Label>
            <Input
              getRef={c => (this._inputBox = c)}
              style={this.inputStyle()}
              value={`${inputValue}`}
              blurOnSubmit={true}
              onSubmitEditing={this.handleSubmitEdit}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              onChangeText={this.handleChangeText}
              {...rest}
            />
          </Item>
          {suffix ? <Text style={style.suffixText}>{suffix}</Text> : null}
        </View>
        {error && (
          <View style={style.errorBar}>
            <Icon name="close-circle" style={style.errorIcon} />
            <Text style={style.errorText}>{error}</Text>
          </View>
        )}
      </View>
    );
  }

  handleSubmitEdit = () => {
    this.setState({active: false});
  };

  handleFocus = () => {
    const {onFocus} = this.props;
    onFocus && onFocus();
    this.setState({active: true});
  };

  handleChangeText = input => {
    const {handleSetValue, name} = this.props;
    handleSetValue(input, name);
    this.checkValidate(input);
  };

  handleBlur = () => {
    const {inputValue} = this.props;
    let isValidate = this.checkValidate(inputValue);
    this.setState({active: false});
    return isValidate;
  };

  checkValidate(inputValue) {
    // check whether validation need to be excuted
    if (!this.props.validate) return true;
    let {type, ...rest} = this.props.validate;
    // make sure there is a validation type
    if (!type || type.length <= 0) return;
    // excute all validation functions
    let error = null;
    for (let i = 0; i < type.length; i++) {
      const check =
        Validation[type[i]] && Validation[type[i]](inputValue, rest);
      // once get the first err, break the loop and return the only error
      if (check !== null) {
        error = check;
        break;
      }
    }
    this.setState({error: error});
    // return false if invalidate
    if (error) return false;
    return true;
  }

  // style functions
  fontStyle() {
    const {active} = this.state;
    const {inputValue} = this.props;
    if (active) return style.labelActive;
    if (inputValue === '') return style.labelEmptyInput;
    return style.labelBlur;
  }
  inputStyle() {
    const {editable} = this.props;
    if (editable !== false) return style.inputEditable;
    return style.inputNotEditable;
  }
}

const style = StyleSheet.create({
  errorText: {
    color: 'red',
    fontSize: 10,
  },
  errorIcon: {
    color: 'red',
    fontSize: 10,
    marginRight: 5,
  },
  errorBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -5,
  },
  suffixText: {
    position: 'absolute',
    right: 0,
    padding: 5,
    color: COLOR_PRIMARY_DARK,
    fontWeight: '700',
  },
  inputEditable: {
    color: COLOR_PRIMARY_DARK,
    width: '100%',
    fontSize: 16,
    marginTop: -2,
    height: 32,
    paddingTop: 0,
    paddingRight: 0,
    paddingLeft: 0,
    paddingBottom: 2,
    borderBottomColor: COLOR_PRIMARY_DARK,
    borderBottomWidth: 0.2,
    backgroundColor: COLOR_INPUT_BACKGROUND,
  },
  inputNotEditable: {
    color: COLOR_PRIMARY_DARK,
    width: '100%',
    fontSize: 16,
    marginTop: -2,
    height: 32,
    paddingTop: 0,
    paddingRight: 0,
    paddingLeft: 0,
    paddingBottom: 2,
    borderBottomColor: COLOR_PRIMARY_DARK,
    borderBottomWidth: 0.2,
    backgroundColor: 'transparent',
  },
  outContainer: {
    flexGrow: 1,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  item: {
    borderBottomColor: 'transparent',
    marginBottom: 12,
    marginTop: 12,
    width: '100%',
  },
  labelActive: {
    color: COLOR_PRIMARY_DARK,
    fontSize: 10,
    paddingTop: 0,
  },
  labelEmptyInput: {
    color: 'rgba(0,45,137, 0.75)',
    fontSize: 14,
    paddingTop: 0,
    fontWeight: '300',
    transform: [{translateY: -5}],
  },
  labelBlur: {
    color: COLOR_PRIMARY_DARK,
    fontSize: 10,
    paddingTop: 0,
    fontWeight: '300',
    transform: [{translateY: 0}],
  },
});
