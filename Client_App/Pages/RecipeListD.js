import React, {Component} from 'react';
import {Container, Content} from 'native-base';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import DietHeaderD from '../Components/DietHeaderD';
import RecipeInRecipeListD from '../Components/RecipeInRecipeListD';
import * as RecipeService from '../Services/RecipeService';
import * as NavigationService from '../Services/NavigationService';
import {NavigationEvents} from 'react-navigation';
import * as SpinnerService from '../Services/SpinnerService';

const styles = StyleSheet.create({
  flatlistView: {
    marginBottom: '5%',
    marginTop: '5%',
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
      recipeOfWeekId: null,
    };
  }
  fetchData = async () => {
    SpinnerService.showSpinner();
    const groupId = this.props.navigation.getParam('groupId', '');
    const [recipes, {Id: recipeOfWeekId}] = await Promise.all([
      RecipeService.getAllRecipes(groupId),
      RecipeService.getRecipeOfTheWeek(groupId),
    ]);
    console.log(('Im here', recipes));
    this.setState({Recipes: recipes, recipeOfWeekId: recipeOfWeekId});

    console.log(recipeOfWeekId);
    SpinnerService.hideSpinner();
  };

  render() {
    const {navigation} = this.props;
    console.log(this.props.Recipes);
    return (
      <View style={{backgroundColor: 'burlywood', flex: 1}}>
        <NavigationEvents onWillFocus={this.fetchData} />
        <DietHeaderD profileInfo={this.props.navigation.state.params} />
        <View style={styles.mainview}>
          <View style={{flexDirection: 'row'}}>
            <Text>Recipes: </Text>
          </View>
          <View style={styles.flatlistView}>
            <FlatList
              ItemSeparatorComponent={this.FlatListItemSeparator}
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
                  groupFlag={item.IsGroup}
                  specialFlag={item.IsSpecial}
                  groupId={this.props.navigation.getParam('groupId', '')}
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
    NavigationService.navigate(routeName, params);
  };
  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '95%',
          marginLeft: '2.5%',
          marginRight: '2.5%',
          backgroundColor: 'black',
        }}
      />
    );
  };
}
