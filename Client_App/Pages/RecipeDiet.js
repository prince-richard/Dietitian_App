import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Switch,
  YellowBox,
} from 'react-native';
import * as NavigationService from '../Services/NavigationService';
import StarRating from 'react-native-star-rating';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerviews: {
    flexDirection: 'row',
    marginRight: '5%',
  },
  mainview: {
    paddingTop: '5%',
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: '5%',
  },
  flatlists: {
    borderWidth: 1,
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: '5%',
  },
});
function Item({title}) {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
}

export default class RecipeDiet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Rating: 0,
      Feedback: '',
      groupValue: false,
      specialValue: false
    };
    console.log(props.navigation.getParam("recipeOfWeekId"))
    console.log(props.navigation);

  }
  //left
  toggleGroupSwitch = value => {
    console.log(value, typeof value);
    if (!value) this.toggleSpecialSwitch(value);
    this.setState({ groupValue: value });
  }

  //right
  toggleSpecialSwitch = specialValue => {
    console.log(specialValue, typeof specialValue);
    if (specialValue) this.toggleGroupSwitch(specialValue);
    this.setState({specialValue});
  }

  onStarRatingPress(rating) {
    this.setState({
      Rating: rating,
    });
  }

  render() {
    const {goBack} = this.props.navigation;
    const {navigation} = this.props;
    console.log(this.props.navigation.getParam("id") == this.props.navigation.getParam("recipeOfWeekId"));
    return (
      <KeyboardAwareScrollView persistentScrollbar={true}>
        <View
          style={styles.mainview}
          onMoveShouldSetResponderCapture={event => true}>
          <View style={{alignItems: 'center', marginBottom: '5%'}}>
            <Text>{navigation.getParam('name', '')}</Text>
          </View>
          <View style={styles.view}>
            <View style={styles.innerviews}>
              <Text>Calories: </Text>
              <Text>{navigation.getParam('calories', '')}</Text>
            </View>
            <View style={styles.innerviews}>
              <Text>Servings: </Text>
              <Text>{navigation.getParam('servings', '')}</Text>
            </View>
            <View style={styles.innerviews}>
              <Text>PrepTime: </Text>
              <Text>{navigation.getParam('prepTime', '')}</Text>
              <Text> minutes</Text>
            </View>
          </View>
          <View style={{width: '10%', marginBottom: '5%', marginTop: '5%', marginLeft: '38%'}}>
              <StarRating
                disabled={true}
                emptyStar={'ios-star-outline'}
                fullStar={'ios-star'}
                halfStar={'ios-star-half'}
                iconSet={'Ionicons'}
                maxStars={5}
                starSize={18}
                rating={navigation.getParam('rating', '')}
                fullStarColor={'black'}
              />
            </View>
          {this.props.navigation.getParam("id") != this.props.navigation.getParam("recipeOfWeekId")? <View style={styles.view}>
            <View style={styles.innerviews}>
              <Text>Recipe in Group: </Text>
              <Switch
                onValueChange={value => this.toggleGroupSwitch(value)}
                value={this.state.groupValue}
                trackColor = '#7fff00'
              />
            </View>
            <View style={styles.innerviews}>
              <Text>Recipe of the Week: </Text>
              <Switch
                onValueChange={value => this.toggleSpecialSwitch(value)}
                value={this.state.specialValue}
              />
            </View>
          </View> : <View style={styles.view}><Text>Current Recipe of the Week</Text></View>}
          <View style={{marginTop: '5%'}}>
            <View onMoveShouldSetResponderCapture={event => false}>
              <Text>Ingredients: </Text>
              <FlatList
                style={styles.flatlists}
                data={navigation.getParam('ingredients', '')}
                renderItem={({item}) => <Item title={item.Description} />}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
            <View onMoveShouldSetResponderCapture={event => false}>
              <Text>Steps: </Text>
              <FlatList
                style={styles.flatlists}
                data={navigation.getParam('steps', '')}
                renderItem={({item}) => <Item title={item.Description} />}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
            {this.props.navigation.getParam("id") != this.props.navigation.getParam("recipeOfWeekId")? <View style={{alignItems: 'center', marginTop: '5%'}}>
            <TouchableOpacity
              style={{borderWidth: 2, width: '20%', alignItems: 'center'}}
              onPress={() => goBack()}>
              <Text>Submit</Text>
            </TouchableOpacity>
          </View> : null}
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
