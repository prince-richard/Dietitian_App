import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  mainview: {
    margin: '5%',
    borderWidth: 2,
  },
  button: {
    borderWidth: 2,
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
    const {id, firstName, lastName, email, lastCommented} = this.props;
    return (
      <View style={styles.mainview}>
        <Text style={styles.text}>First Name: {this.props.firstName}</Text>
        <Text style={styles.text}>Last Name: {this.props.lastName}</Text>
        <Text style={styles.text}>Email: {this.props.email}</Text>
        <Text style={styles.text}>
          Last commented: {this.props.lastCommented}
        </Text>
        <View
          style={{
            alignItems: 'center',
            marginTop: '5%',
            marginBottom: '5%',
            marginRight: '5%',
          }}>
          <TouchableOpacity style={styles.button}>
            <Text>Messages</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
