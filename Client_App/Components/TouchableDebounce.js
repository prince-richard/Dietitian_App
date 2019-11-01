import React, {PureComponent} from 'react';
import {TouchableOpacity} from 'react-native';
import _ from 'lodash';

//PureComponent handles shouldComponentUpdate for you.
export default class TouchableDebounce extends PureComponent {
  render() {
    return (
      <TouchableOpacity {...this.props} onPress={this.handlePress()}>
        {this.props.children}
      </TouchableOpacity>
    );
  }
  handlePress = () => {
    const {onPress} = this.props;
    return _.debounce(onPress, 300, {leading: true, trailing: false});
  };
}
