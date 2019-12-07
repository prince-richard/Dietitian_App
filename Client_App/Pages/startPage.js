import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Animated,
  Keyboard,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as NavigationService from '../Services/NavigationService';
import * as AccountManagmentSevice from '../Services/AccountManagementService';
import * as SignalRService from '../Services/SignalHubService';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Container, Content} from 'native-base';

const styles = StyleSheet.create({
  texts: {
    fontSize: 20,
    textAlignVertical: 'center',
  },
  inputs: {
    width: '50%',
    backgroundColor: 'white',
    borderWidth: 1,
    paddingBottom: 0,
    paddingTop: 0,
  },
  loginViews: {
    flexDirection: 'row',
    marginBottom: '2%',
  },
  mainView: {
    backgroundColor: 'burlywood',
    alignItems: 'center',
    flex: 1,
  },
  login: {
    borderRadius: 2,
    borderWidth: 2,
    padding: 5,
    backgroundColor: 'tomato',
  },
  view: {
    paddingTop: '10%',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
export default class StartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: '',
      Password: '',
    };
    this.AnimatedValue = new Animated.Value(300);
  }
  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide,
    );
  }
  keyboardDidHide = () => {
    Animated.timing(this.AnimatedValue, {toValue: 300, duration: 500}).start();
  };
  keyboardDidShow = () => {
    Animated.timing(this.AnimatedValue, {toValue: 150, duration: 500}).start();
  };
  render() {
    console.log(this.AnimatedValue);
    // let height = this.AnimatedValue.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: [100, 200],
    // });
    return (
      <Container>
        <Content contentContainerStyle={{flex: 1}}>
          <View style={styles.mainView}>
            <Animated.View
              style={{
                height: this.AnimatedValue,
                marginTop: '15%',
                marginBottom: '5%',
              }}>
              <Image
                source={require('../Images/StartScreen.jpg')}
                style={{
                  width: undefined,
                  height: '100%',
                  aspectRatio: 1,
                  marginBottom: '10%',
                }}
              />
            </Animated.View>
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
              <View style={{marginRight: '5%'}}>
                <TouchableOpacity onPress={this.login} style={styles.login}>
                  <Text style={styles.text}>Login</Text>
                </TouchableOpacity>
              </View>
              <View style={{marginLeft: '5%'}}>
                <TouchableOpacity
                  style={styles.login}
                  onPress={this.handleNavigation(
                    'RegistrationPageForPatients',
                    {},
                  )}>
                  <Text>Register</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Content>
      </Container>
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
      console.log(result);
      console.log('User: ', AccountManagmentSevice.user);
      SignalRService.connect(AccountManagmentSevice.user.token);
      if (result.roles.indexOf('User') >= 0 && result.statusId == 2) {
        this.handleNavigation('HomePageP', result)();
      } else if (result.statusId == 4) {
        console.log(result);

        this.handleNavigation('HomePageD', result)();
      } else {
        this.handleNavigation('NoGroup', result)();
      }
    }
  };
}
