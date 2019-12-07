import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import StarRating from 'react-native-star-rating';
import * as NavigationService from '../Services/NavigationService';
import Icon from 'react-native-vector-icons/Entypo';

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

export default class RecipeInRecipeListD extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      name,
      calories,
      servings,
      prepTime,
      picFilePath,
      rating,
      steps,
      ingredients,
      id,
      groupId,
      groupFlag,
      specialFlag,
    } = this.props;
    return (
      <View style={styles.mainview}>
        <View style={styles.centerview}>
          <View style={styles.leftview}>
            <TouchableOpacity
              onPress={this.handleNavigation('RecipeDiet', this.props)}>
              <Image
                source={{uri: this.props.picFilePath}}
                style={{
                  width: '100%',
                  height: undefined,
                  aspectRatio: 1,
                  marginBottom: '5%',
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.rightview}>
            <Text style={styles.text}>{this.props.name}</Text>
            <Text style={styles.text}>Calories: {this.props.calories}</Text>
            <Text style={styles.text}>
              Time to Cook: {this.props.prepTime} mins
            </Text>
            <Text style={styles.text}>Servings: {this.state.servings}</Text>
            <View style={{width: '10%'}}>
              <StarRating
                disabled={false}
                emptyStar={'ios-star-outline'}
                fullStar={'ios-star'}
                halfStar={'ios-star-half'}
                iconSet={'Ionicons'}
                maxStars={5}
                starSize={18}
                rating={this.props.rating}
                fullStarColor={'black'}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center',
            marginBottom: '5%',
          }}>
          <Text style={{}}>In Group:</Text>
          {groupFlag ? (
            <Icon name="check" size={25} />
          ) : (
            <Icon name="cross" size={25} />
          )}
          <Text style={{}}>Recipe of the Week:</Text>
          {specialFlag ? (
            <Icon name="check" size={25} />
          ) : (
            <Icon name="cross" size={25} />
          )}
        </View>
      </View>
    );
  }
  handleNavigation = (routeName, params) => () => {
    NavigationService.navigate(routeName, params);
  };
}
