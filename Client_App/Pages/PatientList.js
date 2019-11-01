import React, {Component} from 'react';
import {Container, Content} from 'native-base';
import {View, Text, TouchableOpacity} from 'react-native';
import * as NavigationService from '../Services/NavigationService';
import DietHeaderD from '../Components/DietHeaderD';

export default class PatientList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        <Content>
          <DietHeaderD />
          <Text>PatientList</Text>
        </Content>
      </Container>
    );
  }

  handleNavigation = (routeName, params) => () => {
    const {navigation} = this.props;
    NavigationService.navigation(routeName, params);
  };
}
