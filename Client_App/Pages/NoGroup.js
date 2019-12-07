import React, {Component} from 'react';
import {View, Text, Picker, TouchableOpacity} from 'react-native';
import * as GroupServices from '../Services/GroupServices';
import * as NavigationService from '../Services/NavigationService';

export default class NoGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      groupId: '',
    };
  }
  async componentDidMount() {
    const groups = await GroupServices.getDieticians();
    this.setState({groups: groups});
    console.log(groups);
  }
  render() {
    let serviceItems = this.state.groups.map((s, i) => {
      return <Picker.Item key={i} value={s.Id.toString()} label={s.Name} />;
    });
    const {navigation} = this.props;
    return (
      <View style={{backgroundColor: 'burlywood', flex: 1}}>
        {this.props.navigation.getParam('statusId', '') == 1 ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              margin: '5%',
            }}>
            <View style={{marginTop: '10%', marginBottom: '10%'}}>
              <Text>
                Welcome {navigation.getParam('firstname', '')}{' '}
                {navigation.getParam('lastname', '')}
              </Text>
            </View>
            <Text>
              Your request to join a group is still pending. When your request
              is accepted, please login and begin exploring recipes. If you have
              been rejected, login again and try to join another group.
            </Text>
          </View>
        ) : (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              margin: '5%',
            }}>
            <View style={{marginTop: '10%', marginBottom: '10%'}}>
              <Text>
                Welcome {navigation.getParam('firstname', '')}{' '}
                {navigation.getParam('lastname', '')}
              </Text>
            </View>
            <Text>
              Please select a group based on the dieticians below. Then press
              the submit button. When your request is accepted, please login and
              begin exploring recipes. If you have been rejected, login again
              and try to join another group.
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={{textAlignVertical: 'center'}}>Dietician: </Text>
              <Picker
                selectedValue={this.state.groupId}
                itemStyle={{backgroundColor: 'navajowhite'}}
                style={{height: 50, width: '60%'}}
                mode="dropdown"
                onValueChange={value => {
                  console.log(value);
                  this.setState({groupId: value});
                }}>
                {serviceItems}
              </Picker>
            </View>
            <TouchableOpacity
              style={{backgroundColor: 'tomato', borderWidth: 2}}
              onPress={this.submit}>
              <Text>Submit</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }

  submit = async () => {
    await GroupServices.requestGroup(
      this.props.navigation.getParam('id', ''),
      this.state.groupId,
    );
    this.handleNavigation('startPage', {})();
  };
  handleNavigation = (routeName, params) => () => {
    NavigationService.navigate(routeName, params);
  };
}
