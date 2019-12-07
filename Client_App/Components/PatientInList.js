import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import * as NavigationService from '../Services/NavigationService';
import moment from 'moment';

const styles = StyleSheet.create({
  mainview: {
    margin: '5%',
    borderWidth: 1,
    borderRadius: 2,
    backgroundColor: 'white',
  },
  button: {
    borderWidth: 2,
    backgroundColor: 'tomato',
  },
  text: {
    marginLeft: '5%',
  },
});

export default class PatientInList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      senderId,
      recieverId,
      firstName,
      lastName,
      email,
      lastCommented,
      groupId,
    } = this.props;
    console.log(recieverId);
    console.log(senderId);
    console.log(lastCommented);
    console.log(moment(lastCommented).isValid());
    //12/5/2019 12:00:00 AM
    return (
      <View style={styles.mainview}>
        <Text style={styles.text}>First Name: {this.props.firstName}</Text>
        <Text style={styles.text}>Last Name: {this.props.lastName}</Text>
        <Text style={styles.text}>Email: {this.props.email}</Text>
        {moment(this.props.lastCommented).isValid() ? (
          <Text style={styles.text}>
            {/* //"YYYY-MM-DDT" */}
            Last commented:{' '}
            {moment(this.props.lastCommented, 'M/D/YYYY h:mm:ss A').fromNow()}
          </Text>
        ) : (
          <Text style={styles.text}>
            Last commented: {this.props.lastCommented}
          </Text>
        )}
        <View
          style={{
            alignItems: 'center',
            marginTop: '5%',
            marginBottom: '5%',
            marginRight: '5%',
          }}>
          <TouchableOpacity
            onPress={this.handleNavigation('MessagePageD', {
              senderId: senderId,
              recieverId: recieverId,
              groupId: groupId,
            })}
            style={styles.button}>
            <Text>Messages</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  handleNavigation = (routeName, params) => () => {
    NavigationService.navigate(routeName, params);
  };
}
