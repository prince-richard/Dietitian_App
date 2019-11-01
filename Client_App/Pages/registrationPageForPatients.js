import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Alert,
  Picker,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as NavigationService from '../Services/NavigationService';
import * as AccountManagmentSevice from '../Services/AccountManagementService';
import StandardTextInput from '../Components/StandardTextInput';

const styles = StyleSheet.create({
  texts: {
    fontSize: 20,
  },
  inputs: {
    width: '80%',
    borderWidth: 2,
    fontSize: 15,
  },
  loginViews: {
    flexDirection: 'column',
    marginBottom: '5%',
  },
  mainView: {
    flexDirection: 'column',
    marginTop: '10%',
    marginLeft: '10%',
    marginBottom: '10%',
  },
  login: {
    borderRadius: 2,
    borderWidth: 2,
  },
  view: {
    paddingTop: '10%',
    flexDirection: 'column',
    alignItems: 'center',
  },
});
export default class RegistrationPageForPatients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FirstName: '',
      LastName: '',
      Email: '',
      Dietician: '',
      Password: '',
      ReType: '',
      About: '',
    };
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <View style={styles.mainView}>
            <StandardTextInput
              parentText="FirstName:"
              name="FirstName"
              onChangeText={this.setValue}
            />
            <StandardTextInput
              parentText="LastName:"
              name="LastName"
              onChangeText={this.setValue}
            />
            <StandardTextInput
              parentText="Email:"
              name="Email"
              onChangeText={this.setValue}
            />

            <View style={styles.loginViews}>
              <Text style={styles.texts}>Dietician: </Text>
              <Picker
                style={styles.inputs}
                selectedValue={this.state.Dietician}
                mode="dropdown"
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({Dietician: itemValue})
                }>
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="c++" value="c++" />
              </Picker>
            </View>

            <StandardTextInput
              parentText="Password:"
              name="Password"
              onChangeText={this.setValue}
            />
            <StandardTextInput
              parentText="Retype Password:"
              name="Retype"
              onChangeText={this.setValue}
            />
          </View>
        </ScrollView>
        {/* <View style={styles.view}> */}
        <View>
          <TouchableOpacity
            onPress={() => this.validateFields(this.state)}
            style={styles.login}>
            <Text style={styles.text}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  setValue = (fieldName, value) => {
    this.setState({[fieldName]: value});
  };
  handleNavigation = (routeName, params) => () => {
    NavigationService.navigate(routeName, params);
  };
  validateFields = state => {
    if (state.Password != state.Retype) {
      Alert.alert('Passwords do not match');
    }
    if (state.FirstName.length == 0) {
      Alert.alert('Firstname not filled in.');
    }
    if (state.LastName.length == 0) {
      Alert.alert('Lastname not filled in.');
    }
    if (state.Email.length == 0) {
      Alert.alert('Not valid email');
    }
  };

  async componentDidMount() {}
}
