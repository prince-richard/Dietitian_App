import React, {Component} from 'react';
import {Container, Content} from 'native-base';
import {View, Text, TouchableOpacity} from 'react-native';
import * as NavigationService from '../Services/NavigationService';
import DietHeaderP from '../Components/DietHeaderP';

export default class MessagePageP extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {navigation} = this.props;
    return (
      <Container>
        <Content>
          <DietHeaderP profileInfo={this.props.navigation.state.params} />
          <Text>
            {navigation.getParam('firstname', '')}{' '}
            {navigation.getParam('lastname', '')}
          </Text>
          <Text>MessagePageP</Text>
        </Content>
      </Container>
    );
  }
  handleNavigation = (routeName, params) => () => {
    const {navigation} = this.props;
    NavigationService.navigation(routeName, params);
  };
}
