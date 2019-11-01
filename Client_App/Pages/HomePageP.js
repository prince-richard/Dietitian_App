import React, {Component} from 'react';
import {Container, Content} from 'native-base';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import * as NavigationService from '../Services/NavigationService';
import DietHeaderP from '../Components/DietHeaderP';
import StarRating from 'react-native-star-rating';

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

export default class HomePageP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DieticianName: 'Girlene Coughin',
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
    const {navigation} = this.props;
    const imagePath = this.state.PicFilePath;
    return (
      <Container>
        <Content>
          <DietHeaderP profileInfo={this.props.navigation.state.params} />
          <View style={styles.mainview}>
            <View style={styles.topView}>
              <Text style={styles.text}>
                Welcome {navigation.getParam('firstname', '')}{' '}
                {navigation.getParam('lastname', '')}
              </Text>
              <Text style={styles.text}>
                Dietician: Dr. {this.state.DieticianName}
              </Text>
              <Text style={styles.text}>Recipe of the week:</Text>
            </View>
            <View style={styles.centerview}>
              <View style={styles.leftview}>
                <TouchableOpacity
                  onPress={this.handleNavigation('RecipeP', this.state)}>
                  <Image
                    source={{uri: this.state.PicFilePath}}
                    style={{width: 170, height: 170, marginBottom: '5%'}}
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
              <Text style={styles.text} style={styles.message}>
                {this.state.Message}
              </Text>
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
