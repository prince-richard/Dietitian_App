import React, {Component} from 'react';
import {Container, Content} from 'native-base';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import * as NavigationService from '../Services/NavigationService';
import DietHeaderD from '../Components/DietHeaderD';
import PatientInList from '../Components/PatientInList';
import * as GroupServices from '../Services/GroupServices';
import {NavigationEvents} from 'react-navigation';

const styles = StyleSheet.create({
  flatlist: {
    height: '90%',
  },
  mainview: {
    margin: '5%',
  },
  text: {marginBottom: '5%'},
});

export default class PatientList extends Component {
  constructor(props) {
    super(props);
    this.originPList = [];
    this.state = {
      Patients: [],
    };
  }
  fetchData = async () => {
    const patients = await GroupServices.getGroupPatients(
      this.props.navigation.getParam('groupId', ''),
    );
    this.setState({Patients: patients});
  };

  render() {
    const senderId = this.props.navigation.getParam('id', '');
    const groupId = this.props.navigation.getParam('groupId', '');
    console.log(
      'patientList, render',
      this.props.navigation.state.params,
      senderId,
      groupId,
    );
    return (
      <View style={{marginBottom: '5%', backgroundColor: 'burlywood'}}>
        <NavigationEvents onWillFocus={this.fetchData} />
        <DietHeaderD profileInfo={this.props.navigation.state.params} />
        <View style={{marginLeft: '10%', marginTop: '5%'}}>
          <Text style={styles.text}>Patients:</Text>
        </View>
        <View style={styles.mainview}>
          <FlatList
            style={styles.flatlist}
            data={this.state.Patients}
            renderItem={({item}) => (
              <PatientInList
                senderId={senderId}
                recieverId={item.Id}
                groupId={groupId}
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
