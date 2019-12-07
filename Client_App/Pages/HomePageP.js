import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import * as NavigationService from '../Services/NavigationService';
import DietHeaderP from '../Components/DietHeaderP';
import StarRating from 'react-native-star-rating';
import {Container, Content, Spinner} from 'native-base';
import * as RecipeService from '../Services/RecipeService';
import {NavigationEvents} from 'react-navigation';

const styles = StyleSheet.create({
  mainview: {
    margin: '5%',
  },
  centerview: {
    flexDirection: 'row',
  },
  rightview: {
    width: '49%',
    marginLeft: '1%',
  },
  leftview: {
    width: '49%',
    marginRight: '1%',
  },
  topView: {
    marginBottom: '5%',
  },
  text: {
    marginBottom: '5%',
  },
  message: {
    borderWidth: 2,
    paddingLeft: '2%',
  },
});

export default class HomePageP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Recipe: {
        Id: 0,
        PrepTime: 0,
        Name: '',
        Calories: 0,
        Servings: 0,
        PicFilePath: '',
        Rating: 0,
        Ingredients: [],
        Steps: [],
        DietFName: 'This',
        DietLName: 'this',
        WeeklyStatement: '',
      },
      userId: this.props.navigation.getParam('id', ''),
    };
  }
  fetchData = async () => {
    const recipeOfWeek = await RecipeService.getRecipeOfTheWeek(
      this.props.navigation.getParam('groupId', ''),
    );
    this.setState({Recipe: recipeOfWeek});

    console.log(recipeOfWeek);
  };

  render() {
    const {navigation} = this.props;
    const imagePath = this.state.PicFilePath;
    return (
      <Container style={{backgroundColor: 'burlywood'}}>
        <NavigationEvents onWillFocus={this.fetchData} />
        <Content>
          <DietHeaderP profileInfo={this.props.navigation.state.params} />
          <View style={styles.mainview}>
            <View style={styles.topView}>
              <Text style={styles.text}>
                Welcome {navigation.getParam('firstname', '')}{' '}
                {navigation.getParam('lastname', '')}
              </Text>
              <Text style={styles.text}>
                Dietician: Dr. {this.state.Recipe.DietFName}{' '}
                {this.state.Recipe.DietLName}
              </Text>
              <Text style={styles.text}>Recipe of the week:</Text>
            </View>
            <View style={styles.centerview}>
              <View style={styles.leftview}>
                <TouchableOpacity
                  onPress={this.handleNavigation('RecipeP', this.state.Recipe)}>
                  {this.state.Recipe.PicFilePath ? (
                    <Image
                      source={{uri: this.state.Recipe.PicFilePath}}
                      style={{
                        width: '100%',
                        height: undefined,
                        aspectRatio: 1,
                        marginBottom: '5%',
                      }}
                    />
                  ) : (
                    <Spinner />
                  )}
                </TouchableOpacity>
              </View>
              <View style={styles.rightview}>
                <Text style={styles.text}>{this.state.Recipe.Name}</Text>
                <Text style={styles.text}>
                  Calories: {this.state.Recipe.Calories}
                </Text>
                <Text style={styles.text}>
                  Time to Cook: {this.state.Recipe.PrepTime} minutes
                </Text>
                <Text style={styles.text}>
                  Servings: {this.state.Recipe.Servings}
                </Text>
                <View style={{width: '10%'}}>
                  <StarRating
                    disabled={false}
                    emptyStar={'ios-star-outline'}
                    fullStar={'ios-star'}
                    halfStar={'ios-star-half'}
                    iconSet={'Ionicons'}
                    maxStars={5}
                    starSize={18}
                    rating={this.state.Recipe.Rating}
                    fullStarColor={'black'}
                  />
                </View>
              </View>
            </View>
            <View style={{marginTop: '5%'}}>
              <Text style={styles.text}>Weekly Message:</Text>
              <View style={{backgroundColor: 'navajowhite'}}>
                <Text style={styles.text} style={styles.message}>
                  {this.state.Recipe.WeeklyStatement}
                </Text>
              </View>
            </View>
          </View>
        </Content>
      </Container>
    );
  }

  handleNavigation = (routeName, params) => () => {
    NavigationService.navigate(routeName, params);
  };
}
