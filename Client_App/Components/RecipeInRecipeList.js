import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import StarRating from 'react-native-star-rating';
import * as NavigationService from '../Services/NavigationService';

const styles = StyleSheet.create({
  mainview: {
    margin: '5%',
  },
  centerview: {
    flexDirection: 'row',
  },
  rightview: {
    width: '50%',
    marginLeft: '5%',
  },
  leftview: {
    width: '50%',
  },
  text: {
    marginBottom: '5%',
  },
});

export default class RecipeInRecipeList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      Name,
      Calories,
      Servings,
      PrepTime,
      PicFilePath,
      Rating,
      Steps,
      Ingredients,
    } = this.props;
    return (
      <View style={styles.mainview}>
        <View style={styles.centerview}>
          <View style={styles.leftview}>
            <TouchableOpacity
              onPress={this.handleNavigation('RecipeP', this.props)}>
              <Image
                source={{uri: this.props.PicFilePath}}
                style={{width: 170, height: 170, marginBottom: '5%'}}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.rightview}>
            <Text style={styles.text}>{this.props.Name}</Text>
            <Text style={styles.text}>Calories: {this.props.Calories}</Text>
            <Text style={styles.text}>
              Time to Cook: {this.props.PrepTime} minutes
            </Text>
            <Text style={styles.text}>Servings: {this.state.Servings}</Text>
            <View style={{width: '10%'}}>
              <StarRating
                disabled={false}
                emptyStar={'ios-star-outline'}
                fullStar={'ios-star'}
                halfStar={'ios-star-half'}
                iconSet={'Ionicons'}
                maxStars={5}
                starSize={18}
                rating={this.props.Rating}
                fullStarColor={'black'}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
  handleNavigation = (routeName, params) => () => {
    NavigationService.navigate(routeName, params);
  };
}
