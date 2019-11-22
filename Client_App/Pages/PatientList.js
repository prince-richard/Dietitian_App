import React, {Component} from 'react';
import {Container, Content} from 'native-base';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import * as NavigationService from '../Services/NavigationService';
import DietHeaderD from '../Components/DietHeaderD';
import PatientInList from '../Components/PatientInList';
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

function Item({firstName, lastName, email, lastCommented}) {
  return (
    <PatientInList
      firstName={firstName}
      lastName={lastName}
      email={email}
      lastCommented={lastCommented}
    />
  );
}

export default class PatientList extends Component {
  constructor(props) {
    super(props);
    this.originPList = [];
    this.state = {
      Patients: [],
    };
  }
  async componentDidMount() {
    console.log(this.props.navigation.getParam('groupId', ''));
    const patients = await GroupServices.getGroupPatients(
      this.props.navigation.getParam('groupId', ''),
    );
    this.setState({Patients: patients});
    console.log(patients);
  }

  render() {
    return (
      <View style={{marginBottom: '5%'}}>
        <DietHeaderD profileInfo={this.props.navigation.state.params} />
        <View style={styles.mainview}>
          <Text style={styles.text}>Patient List:</Text>
          <FlatList
            style={styles.flatlist}
            data={this.state.Patients}
            renderItem={({item}) => (
              <Item
                id={item.Id}
                firstName={item.FirstName}
                lastName={item.LastName}
                email={item.Email}
                lastCommented={item.TimeSinceLastPost}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={true}
          />
        </View>
      </View>
    );
  }

  handleNavigation = (routeName, params) => () => {
    const {navigation} = this.props;
    NavigationService.navigation(routeName, params);
  };
}
