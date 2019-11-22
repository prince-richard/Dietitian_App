import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

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
          <Text>Accept of Reject Patient: </Text>
          <View style={{flexDirection: 'row-reverse'}}>
            <TouchableOpacity
              style={{marginLeft: '3%'}}
              onPress={() => handleRequest(0, id, index)}>
              <Icon name="cross" color="red" size={25} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginRight: '3%'}}
              onPress={() => handleRequest(2, id, index)}>
              <Icon name="check" color="green" size={25} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
