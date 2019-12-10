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
import * as GroupServices from '../Services/GroupServices';
import * as NavigationService from '../Services/NavigationService';
import * as AccountManagmentSevice from '../Services/AccountManagementService';
import StandardTextInput from '../Components/StandardTextInput';
import {password} from '../validation';

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
    backgroundColor: 'tomato',
    alignItems: 'center',
    width: '18%',
  },
  view: {
    paddingTop: '10%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  warningText: {
    color: 'red',
  },
});
export default class RegistrationPageForPatients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      FirstName: '',
      LastName: '',
      Email: '',
      Dietician: '',
      Phone: '',
      Password: '',
      ReType: '',
      About: '',
      pwdGood: false,
      emailGood: false,
      firstNameGood: false,
      lastNameGood: false,
      groupId: 0,
    };
  }
  async componentDidMount() {
    const groups = await GroupServices.getDieticians();
    this.setState({groups: groups});
    console.log(groups);
  }
  inputFields = {};
  render() {
    let serviceItems = this.state.groups.map((s, i) => {
      return <Picker.Item key={i} value={s.Id.toString()} label={s.Name} />;
    });
    const {FirstName, Phone, LastName, Email, Password, ReType} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: 'burlywood'}}>
        <ScrollView style={{flex: 1}}>
          <View style={styles.mainView}>
            <StandardTextInput
              ref={c => (this.inputFields.FirstName = c)}
              value={FirstName}
              parentText="First Name:"
              name="FirstName"
              setValue={this.setValue}
              validate={{type: ['required']}}
            />
            <StandardTextInput
              ref={c => (this.inputFields.LastName = c)}
              value={LastName}
              parentText="Last Name:"
              name="LastName"
              setValue={this.setValue}
              validate={{type: ['required']}}
            />
            <StandardTextInput
              ref={c => (this.inputFields.Email = c)}
              value={Email}
              parentText="Email:"
              name="Email"
              setValue={this.setValue}
              validate={{type: ['required', 'email']}}
            />
            <StandardTextInput
              ref={c => (this.inputFields.Phone = c)}
              value={Phone}
              parentText="Phone Number:"
              name="Phone"
              setValue={this.setValue}
              validate={{type: ['phone']}}
            />

            <View style={{flexDirection: 'row', marginBottom: '5%'}}>
              <Text style={{fontSize: 20, textAlignVertical: 'center'}}>
                Dietician:{' '}
              </Text>
              <Picker
                selectedValue={this.state.groupId}
                itemStyle={{backgroundColor: 'navajowhite', fontSize: 20}}
                style={{height: 50, width: '60%', fontSize: 20}}
                mode="dropdown"
                onValueChange={value => {
                  console.log(value);
                  this.setState({groupId: value});
                }}>
                {serviceItems}
              </Picker>
            </View>
            <StandardTextInput
              ref={c => (this.inputFields.password = c)}
              value={Password}
              parentText="Password:"
              name="Password"
              setValue={this.setValue}
              validate={{type: ['required', 'password']}}
              secureText={true}
            />
            <StandardTextInput
              ref={c => (this.inputFields.ReType = c)}
              value={ReType}
              parentText="Retype Password:"
              name="ReType"
              setValue={this.setValue}
              validate={{
                type: ['required', 'refEqual'],
                params: {target: Password, targetName: 'Password'},
              }}
              secureText={true}
            />
          </View>
          <View style={{alignItems: 'center', marginBottom: '5%'}}>
            <TouchableOpacity
              onPress={() => this.validateFields(this.state)}
              style={styles.login}>
              <Text style={styles.text}>Register</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  setValue = (fieldName, value) => {
    //this.setState({[fieldName]: value});
    const inputState = {};
    inputState[fieldName] = value;
    this.setState(inputState);
  };
  handleNavigation = (routeName, params) => () => {
    NavigationService.navigate(routeName, params);
  };
  validateFields = state => {
    const enable = this.handleValidateAll();
    // if (this.state.Password != this.state.ReType) enable = false;
    if (!enable) return;
    //navigate to whatever is next
  };
  handleValidateAll = async () => {
    // let pwdReg = /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[\d]){1,})(?=(.*[!@#\$%\^&]){1,})(?!.*[^a-zA-Z0-9!@#\$%\^&]).{8,}$/;
    // let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // if (state.Password != state.Retype && !pwdReg.test(state.Password)) {
    //   state.pwdGood = false;
    // }
    // else{state.pwdGood = true;}
    // if (state.FirstName.length == 0) {
    //   state.firstNameGood = false;
    // }
    // else{state.firstNameGood = true;}
    // if (state.LastName.length == 0) {
    //   state.LastNameGood = false;
    // }
    // else{state.LastNameGood = true;}
    // if (state.Email.length == 0 && !emailReg.test(state.Email)) {
    //   state.emailGood = false;
    // }
    // else{state.emailGood = true;}

    // validation using the validation.js file
    let isValidate = true;
    for (let key in this.inputFields) {
      let result = this.inputFields[key].handleBlur();
      console.log('VALIDATION', isValidate);
      isValidate = result && isValidate;
    }
    console.log('VALIDATION', isValidate);
    if (isValidate) {
      var result = await this.createUser();
      console.log('RESULT', result);
      if (result) this.handleNavigation('startPage', {})();
    }
  };
  createUser = async () => {
    const res = await AccountManagmentSevice.createPatient(
      this.state.FirstName,
      this.state.LastName,
      this.state.PhoneNumber,
      this.state.Email,
      this.state.Password,
      this.state.groupId,
    );
    console.log(res);
    return res;
  };
}
