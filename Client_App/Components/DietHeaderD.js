import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Header} from 'native-base';
import * as NavigationService from '../Services/NavigationService';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    alignItems: 'center',
  },
  button: {
    borderWidth: 2,
    marginLeft: '5%',
    marginRight: '5%',
  },
});

export default class DietHeaderD extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Header style={styles.header}>
        <TouchableOpacity
          style={styles.button}
          onPress={this.handleNavigation('HomePageD', {})}>
          <Icon name="home" size={30} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={this.handleNavigation('RegisterListD', {})}>
          <Icon name="group" size={30} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={this.handleNavigation('CommentListD', {})}>
          <Icon2 name="message-text" size={30} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={this.handleNavigation('PatientList', {})}>
          <Icon3 name="group-add" size={30} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={this.handleNavigation('RecipeListD', {})}>
          <Icon2 name="food" size={30} />
        </TouchableOpacity>
      </Header>
    );
  }
  handleNavigation = (routeName, params) => () => {
    NavigationService.navigate(routeName, params);
  };
}
