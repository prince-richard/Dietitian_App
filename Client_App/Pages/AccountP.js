import React, {Component} from 'react';
import {Container, Content} from 'native-base';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import * as NavigationService from '../Services/NavigationService';
import DietHeaderP from '../Components/DietHeaderP';
import * as GroupServices from '../Services/GroupServices';

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
      DieticianName: {},
    };
  }
  async componentDidMount() {
    const DieticianName = await GroupServices.getDietician(
      this.props.navigation.getParam('groupId', ''),
    );
    this.setState({DieticianName: DieticianName});

    console.log(DieticianName);
  }
  render() {
    const {navigation} = this.props;
    return (
      <View style={{backgroundColor: 'burlywood', height: '100%'}}>
        <DietHeaderP profileInfo={this.props.navigation.state.params} />
        <View
          style={{alignItems: 'center', marginTop: '10%', marginBottom: '10%'}}>
          <View>
            <Image
              source={require('../Images//StartScreen.jpg')}
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
          <Text style={styles.text}>
            Dietitian: {this.state.DieticianName.FirstName}{' '}
            {this.state.DieticianName.LastName}
          </Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            onPress={this.leaveGroup}
            style={{
              borderWidth: 2,
              width: '15%',
              alignItems: 'center',
              backgroundColor: 'tomato',
            }}>
            <Text>Leave</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  handleNavigation = (routeName, params) => () => {
    NavigationService.navigate(routeName, params);
  };
  leaveGroup = async () => {
    const res = await GroupServices.leaveGroup(
      this.props.navigation.getParam('id', ''),
    );
    console.log(res);
    this.handleNavigation('startPage', {})();
  };
}
