import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Header} from 'native-base';
import * as NavigationService from '../Services/NavigationService';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'burlywood',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    borderWidth: 2,
    margin: 2,
    // marginLeft: '5%',
    // marginRight: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '16%',
  },
  text: {
    fontSize: 9,
    textAlign: 'center',
  },
});

export default class DietHeaderP extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {profileInfo} = this.props;
    return (
      <Header style={styles.header}>
        <TouchableOpacity
          style={styles.button}
          onPress={this.handleNavigation('HomePageP', profileInfo)}>
          <Icon name="home" size={30} />
          <Text style={styles.text}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={this.handleNavigation('RecipeListP', profileInfo)}>
          <Icon2 name="food" size={30} />
          <Text style={styles.text}>Recipes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={this.handleNavigation('MessagePageP', profileInfo)}>
          <Icon2 name="message-text" size={30} />
          <Text style={styles.text}>Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={this.handleNavigation('AccountP', profileInfo)}>
          <Icon3 name="person" size={30} />
          <Text style={styles.text}>Profile</Text>
        </TouchableOpacity>
      </Header>
    );
  }
  handleNavigation = (routeName, params) => () => {
    NavigationService.navigate(routeName, params);
  };
}
