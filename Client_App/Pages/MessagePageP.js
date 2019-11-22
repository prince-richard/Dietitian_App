import React, {Component} from 'react';
import {Container, Content, Spinner} from 'native-base';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import * as NavigationService from '../Services/NavigationService';
import DietHeaderP from '../Components/DietHeaderP';
import * as RecipeService from '../Services/RecipeService';

export default class MessagePageP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
    };
  }
  async componentDidMount() {
    const recipe = await RecipeService.getRecipe(1);
    const recipeOfWeek = await RecipeService.getGroupRecipes(
      this.props.navigation.getParam('groupId', ''),
    );
    //this.setState({recipes: recipeOfWeek});

    console.log('week', recipeOfWeek);
  }
  render() {
    const {recipe} = this.state;
    const {navigation} = this.props;
    return (
      <Container>
        <Content>
          <DietHeaderP profileInfo={this.props.navigation.state.params} />
          {/* {recipe.PicFilePath ? (
            <Image
              source={{uri: this.state.recipe.PicFilePath}}
              style={{
                width: '100%',
                height: undefined,
                aspectRatio: 1,
                marginBottom: '5%',
              }}
            />
          ) : (
            <Spinner />
          )} */}

          {/* <Text>{this.state.recipe.Name}</Text> */}
        </Content>
      </Container>
    );
  }
  handleNavigation = (routeName, params) => () => {
    const {navigation} = this.props;
    NavigationService.navigation(routeName, params);
  };
}
