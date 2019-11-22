import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as NavigationService from '../Services/NavigationService';
import * as AccountManagmentSevice from '../Services/AccountManagementService';

const styles = StyleSheet.create({
  texts: {
    fontSize: 20,
  },
  inputs: {
    width: '50%',
  },
  loginViews: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainView: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20%',
    flex: 1,
  },
  login: {
    borderRadius: 2,
    borderWidth: 2,
    padding: 5,
    marginBottom: '5%',
  },
  view: {
    paddingTop: '10%',
    flexDirection: 'column',
    alignItems: 'center',
  },
});
export default class StartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: 'bcp25@njit.edu',
      Password: 'Test123!',
    };
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.mainView} behavior="padding" enabled>
        <View>
          <Image
            source={require('../Images/defaultProfilePic.jpg')}
            style={{width: 200, height: 200, marginBottom: '5%'}}
          />
        </View>
        <View style={styles.loginViews}>
          <Text style={styles.texts}>Email: </Text>
          <TextInput
            style={styles.inputs}
            placeholder="Email"
            onChangeText={Username => this.setState({Username})}
            value={this.state.Username}
          />
        </View>
        <View style={styles.loginViews}>
          <Text style={styles.texts}>Password: </Text>
          <TextInput
            style={styles.inputs}
            placeholder="Password"
            onChangeText={Password => this.setState({Password})}
            value={this.state.Password}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.view}>
          <TouchableOpacity onPress={this.login} style={styles.login}>
            <Text style={styles.text}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.handleNavigation('RegistrationPageForPatients', {})}>
            <Text>Register</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
  handleNavigation = (routeName, params) => () => {
    NavigationService.navigate(routeName, params);
  };

  login = async () => {
    const result = await AccountManagmentSevice.login(
      this.state.Username,
      this.state.Password,
    );
    if (result) {
      //check to see which role they are
      if (result.roles.indexOf('User') >= 0) {
        console.log('p');
        this.handleNavigation('HomePageP', result)();
      } else {
        console.log(result);

        this.handleNavigation('HomePageD', result)();
      }
    }
  };
}
