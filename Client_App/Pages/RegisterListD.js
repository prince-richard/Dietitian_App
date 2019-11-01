import React, {Component} from 'react';
import {Container, Content} from 'native-base';
import {View, Text, TouchableOpacity} from 'react-native';
import * as NavigationService from '../Services/NavigationService';
import DietHeaderD from '../Components/DietHeaderD';
import RecipeInRecipeList from '../Components/RecipeInRecipeList';

export default class RegisterListD extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        <Content>
          <DietHeaderD />
          <RecipeInRecipeList />
        </Content>
      </Container>
    );
  }

  handleNavigation = (routeName, params) => () => {
    const {navigation} = this.props;
    NavigationService.navigation(routeName, params);
  };
}
