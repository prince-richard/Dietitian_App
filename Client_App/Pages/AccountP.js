import React, {Component} from 'react';
import {Container, Content} from 'native-base';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import * as NavigationService from '../Services/NavigationService';
import DietHeaderP from '../Components/DietHeaderP';

const styles = StyleSheet.create({
  view: {
    paddingTop: '5%',
    flexDirection: 'column',
    margin: '5%',
    marginLeft: '35%',
  },
  leftView: {marginLeft: '10%', width: '32.5%', marginRight: '2%'},
  rightView: {marginRight: '50%', width: '32.5%', marginLeft: '7.5%'},
  text: {},
  valuetext: {},
});

export default class AccountP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DieticianName: 'Girlene Coughin',
    };
  }

  render() {
    const {navigation} = this.props;
    return (
      <View>
        <DietHeaderP profileInfo={this.props.navigation.state.params} />
        <View
          style={{alignItems: 'center', marginTop: '10%', marginBottom: '10%'}}>
          <View>
            <Image
              source={require('../Images/defaultProfilePic.jpg')}
              style={{width: 200, height: 200, marginBottom: '5%'}}
            />
          </View>
          <Text style={styles.text}>
            First Name: {navigation.getParam('firstname', '')}
          </Text>
          <Text style={styles.text}>
            Last Name: {navigation.getParam('lastname', '')}
          </Text>
          <Text style={styles.text}>
            Email: {navigation.getParam('email', '')}
          </Text>
          <Text style={styles.text}>Dietitian: {this.state.DieticianName}</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            style={{borderWidth: 2, width: '15%', alignItems: 'center'}}>
            <Text>Leave</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  handleNavigation = (routeName, params) => () => {
    const {navigation} = this.props;
    NavigationService.navigation(routeName, params);
  };
}
