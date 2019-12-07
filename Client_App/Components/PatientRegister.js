import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

const styles = StyleSheet.create({
  mainview: {
    marginLeft: '5%',
    marginTop: '5%',
    marginRight: '5%',
    marginBottom: '5%',
    backgroundColor: 'navajowhite',
    borderRadius: 5,
    borderWidth: 0.5,
  },
  button: {
    borderWidth: 2,
  },
  text: {
    marginLeft: '5%',
    marginTop: '1%',
  },
});

export default class PatientRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      firstName,
      lastName,
      email,
      lastCommented,
      handleRequest,
      id,
      index,
    } = this.props;
    return (
      <View style={styles.mainview}>
        <Text style={styles.text}>First Name: {this.props.firstName}</Text>
        <Text style={styles.text}>Last Name: {this.props.lastName}</Text>
        <Text style={styles.text}>Email: {this.props.email}</Text>
        <View
          style={{
            flexDirection: 'column',
            marginLeft: '5%',
            marginTop: '1%',
            marginBottom: '5%',
            marginRight: '5%',
          }}>
          <View
            style={{
              marginTop: '3%',
              flexDirection: 'row-reverse',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                marginLeft: '5%',
                paddingLeft: '1%',
                paddingRight: '1%',
                borderWidth: 2,
                borderColor: 'red',
                backgroundColor: 'white',
              }}
              onPress={() => handleRequest(0, id, index)}>
              <Text>Reject</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginRight: '5%',
                borderWidth: 2,
                paddingLeft: '1%',
                paddingRight: '1%',
                borderColor: 'green',
                backgroundColor: 'white',
              }}
              onPress={() => handleRequest(2, id, index)}>
              <Text>Accept</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
