import React, {Component} from 'react';
import {Container, Content} from 'native-base';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import * as NavigationService from '../Services/NavigationService';
import DietHeaderP from '../Components/DietHeaderP';
import RecipeInRecipeList from '../Components/RecipeInRecipeList';
import * as RecipeService from '../Services/RecipeService';

const styles = StyleSheet.create({
  flatlistView: {
    borderWidth: 1,
    height: '84%',
    marginBottom: '5%',
    marginTop: '10%',
  },
  mainview: {
    margin: '5%',
  },
});

function Item({
  name,
  prepTime,
  calories,
  servings,
  rating,
  ingredients,
  picFilePath,
  steps,
}) {
  return (
    <RecipeInRecipeList
      Name={name}
      Servings={servings}
      Calories={calories}
      Rating={rating}
      PrepTime={prepTime}
      Ingredients={ingredients}
      PicFilePath={picFilePath}
      Steps={steps}
    />
  );
}

export default class RecipeListP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Recipes: [],
    };
  }
  async componentDidMount() {
    const recipes = await RecipeService.getGroupRecipes(
      this.props.navigation.getParam('groupId', ''),
    );
    this.setState({Recipes: recipes});
    console.log(recipes);
  }
  // fetchData = async () => {
  //   const recipes = await RecipeService.getGroupRecipes(
  //     this.props.navigation.getParam('groupId', ''),
  //   );
  //   this.setState({Recipes: recipeOfWeek});
  // };
  render() {
    const {navigation} = this.props;
    return (
      <View>
        {/* <NavigationEvents onDidFocus={this.fetchData}/> */}
        <DietHeaderP profileInfo={this.props.navigation.state.params} />
        <View style={styles.mainview}>
          <Text>Recipe List: </Text>
          <View style={styles.flatlistView}>
            <FlatList
              data={this.state.Recipes}
              renderItem={({item}) => (
                <Item
                  name={item.Name}
                  prepTime={item.PrepTime}
                  calories={item.Calories}
                  rating={item.Rating}
                  servings={item.Servings}
                  picFilePath={item.Url}
                  steps={item.Steps}
                  ingredients={item.Ingredients}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={true}
            />
          </View>
        </View>
      </View>
    );
  }
  handleNavigation = (routeName, params) => () => {
    const {navigation} = this.props;
    NavigationService.navigation(routeName, params);
  };
}
