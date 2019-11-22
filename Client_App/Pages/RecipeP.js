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

export default class RecipeP extends Component {
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
      <KeyboardAwareScrollView persistentScrollbar={true}>
        <View
          style={styles.mainview}
          onMoveShouldSetResponderCapture={event => true}>
          <View style={{alignItems: 'center', marginBottom: '5%'}}>
            <Text>{navigation.getParam('Name', '')}</Text>
          </View>
          <View style={styles.view}>
            <View style={styles.innerviews}>
              <Text>Calories: </Text>
              <Text>{navigation.getParam('Calories', '')}</Text>
            </View>
            <View style={styles.innerviews}>
              <Text>Servings: </Text>
              <Text>{navigation.getParam('Servings', '')}</Text>
            </View>
            <View style={styles.innerviews}>
              <Text>PrepTime: </Text>
              <Text>{navigation.getParam('PrepTime', '')}</Text>
            </View>
          </View>
          <View style={{marginTop: '5%'}}>
            <View onMoveShouldSetResponderCapture={event => false}>
              <Text>Ingredients: </Text>
              <FlatList
                style={styles.flatlists}
                data={navigation.getParam('Ingredients', '')}
                renderItem={({item}) => <Item title={item.Description} />}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
            <View onMoveShouldSetResponderCapture={event => false}>
              <Text>Steps: </Text>
              <FlatList
                style={styles.flatlists}
                data={navigation.getParam('Steps', '')}
                renderItem={({item}) => <Item title={item.Description} />}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
            <Text>Review: </Text>
            <View style={{width: '10%', marginBottom: '5%'}}>
              <StarRating
                disabled={false}
                emptyStar={'ios-star-outline'}
                fullStar={'ios-star'}
                halfStar={'ios-star-half'}
                iconSet={'Ionicons'}
                maxStars={5}
                starSize={18}
                rating={this.state.Rating}
                selectedStar={rating => this.onStarRatingPress(rating)}
                fullStarColor={'black'}
              />
            </View>
            <Text>Feedback: </Text>
            <TextInput
              multiline={true}
              numberOfLines={4}
              maxHeight="20%"
              onChangeText={Feedback => this.setState({Feedback})}
              value={this.state.Feedback}
              style={{borderWidth: 1, paddingLeft: 5, textAlignVertical: 'top'}}
            />
          </View>
          <View style={{alignItems: 'center', marginTop: '5%'}}>
            <TouchableOpacity
              style={{borderWidth: 2, width: '20%', alignItems: 'center'}}
              onPress={() => goBack()}>
              <Text>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
