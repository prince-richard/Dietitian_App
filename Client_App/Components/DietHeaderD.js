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

export default class DietHeaderD extends Component {
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
          onPress={this.handleNavigation('HomePageD', profileInfo)}>
          <Icon name="home" size={30} />
          <Text style={styles.text}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={this.handleNavigation('RegisterListD', profileInfo)}>
          <Icon3 name="group-add" size={30} />
          <Text style={styles.text}>Registration</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={this.handleNavigation('CommentListD', profileInfo)}>
          <Icon2 name="message-text" size={30} />
          <Text style={styles.text}>Comments</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={this.handleNavigation('PatientList', profileInfo)}>
          <Icon name="group" size={30} />
          <Text style={styles.text}>Patients</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={this.handleNavigation('RecipeListD', profileInfo)}>
          <Icon2 name="food" size={30} />
          <Text style={styles.text}>Recipes</Text>
        </TouchableOpacity>
      </Header>
    );
  }
  handleNavigation = (routeName, params) => () => {
    console.log('headerD');
    NavigationService.navigate(routeName, params);
  };
}
