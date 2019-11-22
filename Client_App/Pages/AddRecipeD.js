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
  descriptions: {
    fontSize: 15,
  },
  normalInputs: {
    borderWidth: 1,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 0,
    paddingTop: 0,
    fontSize: 15,
  },
});
function Item({title}) {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
}

export default class AddRecipeD extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Rating: 0,
      Feedback: '',
    };
  }

  onStarRatingPress(rating) {
    this.setState({
      Rating: rating,
    });
  }

  render() {
    const {goBack} = this.props.navigation;
    const {navigation} = this.props;
    return (
      <KeyboardAwareScrollView
        style={styles.mainview}
        persistentScrollbar={true}>
        <View style={styles.view}>
          <Text style={styles.descriptions}>Recipe Name:</Text>
          <TextInput style={styles.normalInputs} />
        </View>
        <Text>Insert an image:</Text>
        <View style={styles.view}>
          <Text style={styles.descriptions}>Calories:</Text>
          <TextInput style={styles.normalInputs} keyboardType={'numeric'} />
        </View>
        <View style={styles.view}>
          <Text style={styles.descriptions}>Prep Time:</Text>
          <TextInput style={styles.normalInputs} keyboardType={'numeric'} />
        </View>
        <View style={styles.view}>
          <Text style={styles.descriptions}>Servings:</Text>
          <TextInput style={styles.normalInputs} keyboardType={'numeric'} />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
