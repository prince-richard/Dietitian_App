import React, {Component} from 'react';
import {Container, Content} from 'native-base';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import * as NavigationService from '../Services/NavigationService';
import DietHeaderP from '../Components/DietHeaderP';

const styles = StyleSheet.create({
  view: {
    paddingTop: '5%',
    flexDirection: 'row',
    margin: '5%',
    alignItems: 'center',
  },
  text: {
    marginBottom: '20%',
  },
  valuetext: {
    borderWidth: 2,
  },
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
      <Container>
        <Content>
          <DietHeaderP profileInfo={this.props.navigation.state.params} />
          <View style={{alignItems: 'center'}}>
            <View style={styles.view}>
              <View style={{marginRight: '10%'}}>
                <Text style={styles.text}>First Name:</Text>
                <Text style={styles.text}>Last Name:</Text>
                <Text style={styles.text}>Email:</Text>
                <Text style={styles.text}>Dietitian:</Text>
              </View>
              <View style={{marginLeft: '10%'}}>
                <Text style={styles.valuetext}>
                  {navigation.getParam('firstname', '')}
                </Text>
                <Text style={styles.valuetext}>
                  {navigation.getParam('lastname', '')}
                </Text>
                <Text style={styles.valuetext}>
                  {navigation.getParam('email', '')}
                </Text>
                <Text style={styles.valuetext}>{this.state.DieticianName}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={{borderWidth: 2, width: '12%', alignItems: 'center'}}>
              <Text>Leave</Text>
            </TouchableOpacity>
          </View>
        </Content>
      </Container>
    );
  }
  handleNavigation = (routeName, params) => () => {
    const {navigation} = this.props;
    NavigationService.navigation(routeName, params);
  };
}
