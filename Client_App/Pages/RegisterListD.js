import React, {Component} from 'react';
import {Container, Content} from 'native-base';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import * as NavigationService from '../Services/NavigationService';
import DietHeaderD from '../Components/DietHeaderD';
import RecipeInRecipeList from '../Components/RecipeInRecipeList';
import PatientRegister from '../Components/PatientRegister';
import * as GroupServices from '../Services/GroupServices';
import {NavigationEvents} from 'react-navigation';

const styles = StyleSheet.create({
  flatlist: {
    marginTop: '5%',
    height: '85%',
  },
  mainview: {
    margin: '5%',
  },
  text: {marginBottom: '5%'},
});
export default class RegisterListD extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Patients: [],
    };
  }
  originalPatients = [];
  fetchData = async () => {
    const patients = await GroupServices.getRequests(
      this.props.navigation.getParam('groupId', ''),
    );
    this.setState({Patients: patients});
    this.originalPatients = patients;
    console.log(patients);
  };

  render() {
    console.log(this.state.Patients);
    return (
      <View style={{backgroundColor: 'burlywood'}}>
        <NavigationEvents onWillFocus={this.fetchData} />
        <DietHeaderD profileInfo={this.props.navigation.state.params} />
        <View style={styles.mainview}>
          <View style={{marginLeft: '5%'}}>
            <Text style={styles.text}>Registration List:</Text>
          </View>
          <FlatList
            style={styles.flatlist}
            data={this.state.Patients}
            renderItem={({item, index}) => (
              <PatientRegister
                firstName={item.FirstName}
                id={item.Id}
                lastName={item.LastName}
                email={item.Email}
                handleRequest={this.handleRequest}
                index={index}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={true}
          />
        </View>
      </View>
    );
  }
  handleRequest = async (statusId, id, index) => {
    let {Patients} = this.state;
    Patients.splice(index, 1);
    await this.setState({Patients});
    const res = await GroupServices.updateRequestStatus(statusId, id);
    console.log(res);
    if (!res) {
      const oIndex = this.originalPatients.findIndex(x => x.Id == id);
      Patients.splice(index, 0, this.originalPatients[oIndex]);
      this.setState({Patients});
    } else {
      this.originalPatients = Patients;
    }
  };
  handleNavigation = (routeName, params) => () => {
    const {navigation} = this.props;
    NavigationService.navigation(routeName, params);
  };
  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          marginLeft: '10%',
          marginRight: '10%',
          backgroundColor: 'black',
        }}
      />
    );
  };
}
