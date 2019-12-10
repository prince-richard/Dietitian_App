import React, {Component} from 'react';
import {Container, Content} from 'native-base';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import * as NavigationService from '../Services/NavigationService';
import DietHeaderP from '../Components/DietHeaderP';
import RecipeInRecipeList from '../Components/RecipeInRecipeList';
import * as RecipeService from '../Services/RecipeService';
import * as SpinnerService from '../Services/SpinnerService';
const styles = StyleSheet.create({
  flatlistView: {
    marginBottom: '7%',
    marginTop: '10%',
  },
  mainview: {
    margin: '5%',
  },
});

export default class RecipeListP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Recipes: [],
    };
  }
  async componentDidMount() {
    SpinnerService.showSpinner();
    const recipes = await RecipeService.getGroupRecipes(
      this.props.navigation.getParam('groupId', ''),
    );
    this.setState({Recipes: recipes});
    console.log(recipes);
    SpinnerService.hideSpinner();
  }
  // //  fetchData = async () => {
  // //    const recipes = await RecipeService.getGroupRecipes(
  // //      this.props.navigation.getParam('groupId', ''),
  // //    );
  // //    this.setState({Recipes: recipeOfWeek});
  // //  };
  render() {
    const {navigation} = this.props;
    return (
      <View style={{backgroundColor: 'burlywood', flex: 1}}>
        {/* <NavigationEvents onDidFocus={this.fetchData}/> */}
        <DietHeaderP profileInfo={this.props.navigation.state.params} />
        <View style={styles.mainview}>
          <View style={{marginLeft: '5%'}}>
            <Text>Recipes: </Text>
          </View>
          <View style={styles.flatlistView}>
            <FlatList
              data={this.state.Recipes}
              ItemSeparatorComponent={this.FlatListItemSeparator}
              renderItem={({item}) => (
                <RecipeInRecipeList
                  Name={item.Name}
                  PrepTime={item.PrepTime}
                  Calories={item.Calories}
                  Rating={item.Rating}
                  Servings={item.Servings}
                  PicFilePath={item.Url}
                  Steps={item.Steps}
                  Ingredients={item.Ingredients}
                  Comments={item.Comments}
                  Id={item.Id}
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
