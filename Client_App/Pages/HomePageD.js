import React, {Component} from 'react';
import {Container, Content} from 'native-base';
import {View, Text, TouchableOpacity, StyleSheet, Image, TextInput} from 'react-native';
import * as NavigationService from '../Services/NavigationService';
import DietHeaderD from '../Components/DietHeaderD';
import StarRating from 'react-native-star-rating';
import StandardTextInput from '../Components/StandardTextInput';

const styles = StyleSheet.create({
  mainview: {
    margin: '5%',
  },
  centerview: {
    flexDirection: 'row',
  },
  rightview: {
    width: '50%',
  },
  leftview: {
    width: '50%',
  },
  topView: {
    marginBottom: '10%',
  },
  text: {
    marginBottom: '5%',
  },
  message: {
    borderWidth: 2,
    paddingLeft: '2%',
  },
});

export default class HomePageD extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DieticianName: 'Girlene Coughin',
      PatientCount: 3,
      JoinRequestCount: 1,
      RecipeCount: 7,
      PrepTime: 30,
      Name: 'Steamed Carrots',
      Calories: 150,
      Servings: 6,
      PicFilePath:
        'https://www.thespruceeats.com/thmb/EqZorXp-y4Fd2jKFmJBrn9Hn9Yw=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/carrots-with-butter-and-seasonings-3052473-hero-01-5c40fb71c9e77c00017175a0.jpg',
      Rating: 2,
      Message:
        'Eat plenty of vegetables. They are good for you and prevent cancer.',
      Ingredients: [
        '5 medium carrots',
        '1 cup of water',
        '1 teaspoon salt',
        '1 tablespoon granulated sugar',
        '2 tablespoons butter',
        'Optional: parsley or chives (chopped)',
      ],
      Steps: [
        'Gather ingredients',
        'Scrub carrots and peal them. Cut off and discard the stem. Slice carrots thinly on diagonal.',
        'Put carrots in medium saucepan. Add water, salt, and sugar.',
        'Place the pan over medium-high heat and bring to a boil',
        'Reduce the heat to medium low, cover the pan, and cook for about 20 minutes until carrots are tender.',
        'Drain carrots and add the butter and chopped parsely if desired.',
      ],
    };
  }

  render() {
    const {onChangeText, navigation} = this.props;
    const imagePath = this.state.PicFilePath;
    return (
      <Container>
        <Content>
          <DietHeaderD />
          <View style={styles.mainview}>
            <View style={styles.topView}>
              <Text style={styles.text}>
                Welcome Dr. {this.state.DieticianName}
              </Text>
              <Text style={styles.text}>
                Number of Patients: {this.state.PatientCount}
              </Text>
              <Text style={styles.text}>
                Number of Join Requests: {this.state.JoinRequestCount}
              </Text>
              <Text style={styles.text}>
                Number of Recipes: {this.state.RecipeCount}
              </Text>
              <Text style={styles.text}>Recipe of the week:</Text>
            </View>
            <View style={styles.centerview}>
              <View style={styles.leftview}>
                <TouchableOpacity
                  onPress={this.handleNavigation('RecipeD', this.state)}>
                  <Image
                    source={{uri: this.state.PicFilePath}}
                    style={{width: '100%', height: undefined, aspectRatio: 1, marginBottom: '5%'}}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.rightview}>
                <Text style={styles.text}>{this.state.Name}</Text>
                <Text style={styles.text}>Calories: {this.state.Calories}</Text>
                <Text style={styles.text}>
                  Time to Cook: {this.state.PrepTime} minutes
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
                    rating={this.state.Rating}
                    fullStarColor={'black'}
                  />
                </View>
              </View>
            </View>
            <View style={{marginTop: '15%'}}>
              <Text style={styles.text}>Weekly Message:</Text>
              <TextInput
                style={styles.text}
                style={styles.message}
                multiline
                value = {this.state.Message}
                onChangeText={text => this.onChangeText(text)}
              />
              <TouchableOpacity style={{borderWidth: 2, marginTop: '5%', width: '30%', alignItems: 'center'}}>
                <Text>Post Message</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Content>
      </Container>
    );
  }

  setValue = (fieldName, value) => {
    this.setState({[fieldName]: value});
  };
  onChangeText = (text) => {
    this.setState({Message: text});
  };
  handleNavigation = (routeName, params) => () => {
    const {navigation} = this.props;
    NavigationService.navigation(routeName, params);
  };
  //onChangeText(text)
}
