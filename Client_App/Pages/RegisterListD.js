import React, {Component} from 'react';
import {Container, Content} from 'native-base';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import * as NavigationService from '../Services/NavigationService';
import DietHeaderD from '../Components/DietHeaderD';
import RecipeInRecipeList from '../Components/RecipeInRecipeList';
import PatientRegister from '../Components/PatientRegister';
import * as GroupServices from '../Services/GroupServices';

const styles = StyleSheet.create({
  flatlist: {
    height: '90%',
    marginBottom: '5%',
    borderBottomWidth: 2,
    borderTopWidth: 2,
  },
  mainview: {
    margin: '5%',
    borderWidth: 2,
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
  async componentDidMount() {
    const patients = await GroupServices.getRequests(
      this.props.navigation.getParam('groupId', ''),
    );
    this.setState({Patients: patients});
    this.originalPatients = patients;
    console.log(patients);
  }
  render() {
    console.log(this.state.Patients);
    return (
      <View>
        <DietHeaderD profileInfo={this.props.navigation.state.params} />
        <View style={styles.mainview}>
          <Text style={styles.text}>Registration List:</Text>
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
}
