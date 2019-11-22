import React, {Component} from 'react';
import {Container, Content} from 'native-base';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import DietHeaderD from '../Components/DietHeaderD';
import RecipeInRecipeListD from '../Components/RecipeInRecipeListD';
import * as RecipeService from '../Services/RecipeService';
import * as NavigationService from '../Services/NavigationService';

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

export default class RecipeListD extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Recipes: [],
      recipeOfWeekId: null
    };
  }
  async componentDidMount() {
    const groupId = this.props.navigation.getParam('groupId', '');
    const [recipes, {Id: recipeOfWeekId}] = await Promise.all([
      RecipeService.getGroupRecipes(groupId),
      RecipeService.getRecipeOfTheWeek(groupId)
    ]);
    this.setState({Recipes: recipes, recipeOfWeekId: recipeOfWeekId});
    
    console.log(recipeOfWeekId);
  }
  render() {
    const {navigation} = this.props;
    console.log(this.props.Recipes);
    return (
      <View>
        <DietHeaderD profileInfo={this.props.navigation.state.params} />
        <View style={styles.mainview}>
          <View style={{flexDirection: 'row'}}>
            <Text>Recipe List: </Text>
          </View>
          <View style={styles.flatlistView}>
            <FlatList
              data={this.state.Recipes}
              renderItem={({item}) => (
                <RecipeInRecipeListD
                  recipeOfWeekId={this.state.recipeOfWeekId}
                  name={item.Name}
                  servings={item.Servings}
                  calories={item.Calories}
                  rating={item.Rating}
                  prepTime={item.PrepTime}
                  ingredients={item.Ingredients}
                  picFilePath={item.Url}
                  steps={item.Steps}
                  id={item.Id}
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

  handleNavigation = (routeName, params) => {
    console.log('headerD');
    NavigationService.navigate(routeName, params);
  };

  // // Item = ({
  // //   name,
  // //   prepTime,
  // //   calories,
  // //   servings,
  // //   rating,
  // //   ingredients,
  // //   picFilePath,
  // //   steps,
  // // }) => {
  // //   return (
  // //     <RecipeInRecipeListD
  // //       Name={name}
  // //       Servings={servings}
  // //       Calories={calories}
  // //       Rating={rating}
  // //       PrepTime={prepTime}
  // //       Ingredients={ingredients}
  // //       PicFilePath={picFilePath}
  // //       Steps={steps}
  // //     />
  // //   );
  // // };
}
