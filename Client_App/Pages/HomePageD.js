import React, {Component} from 'react';
import {Container, Content} from 'native-base';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import * as NavigationService from '../Services/NavigationService';
import DietHeaderD from '../Components/DietHeaderD';
import StarRating from 'react-native-star-rating';
import * as GroupServices from '../Services/GroupServices';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {NavigationEvents} from 'react-navigation';

const styles = StyleSheet.create({
  mainview: {
    marginLeft: '5%',
    marginTop: '5%',
    marginRight: '5%',
  },
  centerview: {
    flexDirection: 'row',
  },
  rightview: {
    width: '48%',
    marginLeft: '1%',
  },
  leftview: {
    width: '48%',
    marginRight: '1%',
  },
  topView: {
    marginBottom: '2%',
  },
  text: {
    marginBottom: '5%',
  },
  message: {
    borderWidth: 2,
    paddingLeft: '2%',
    backgroundColor: 'white',
  },
});

export default class HomePageD extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DBInfo: {},
    };
  }
  fetchData = async () => {
    console.log(this.props.navigation.getParam('groupId', ''));
    const info = await GroupServices.getDietHomePage(
      this.props.navigation.getParam('groupId', ''),
    );
    this.setState({DBInfo: info});
    console.log(info);
  };
  render() {
    return (
      <Container>
        <NavigationEvents onWillFocus={this.fetchData} />
        <DietHeaderD profileInfo={this.props.navigation.state.params} />
        <Content>
          <KeyboardAwareScrollView style={{backgroundColor: 'burlywood'}}>
            <ScrollView style={styles.mainview}>
              <View style={styles.topView}>
                <Text style={styles.text}>
                  Welcome Dr. {this.state.DBInfo.DietFName}{' '}
                  {this.state.DBInfo.DietLName}
                </Text>
                <Text style={styles.text}>
                  Number of Patients: {this.state.DBInfo.PatientCount}
                </Text>
                <Text style={styles.text}>
                  Number of Join Requests: {this.state.DBInfo.RequestCount}
                </Text>
                <Text style={styles.text}>
                  Number of Recipes: {this.state.DBInfo.RecipeCount}
                </Text>
                <Text style={styles.text}>Recipe of the week:</Text>
              </View>
              <View style={styles.centerview}>
                <View style={styles.leftview}>
                  <Image
                    source={{uri: this.state.DBInfo.PicFilePath}}
                    style={{
                      width: '100%',
                      height: undefined,
                      aspectRatio: 1,
                      marginBottom: '5%',
                    }}
                  />
                </View>
                <View style={styles.rightview}>
                  <Text style={styles.text}>{this.state.DBInfo.Name}</Text>
                  <Text style={styles.text}>
                    Calories: {this.state.DBInfo.Calories}
                  </Text>
                  <Text style={styles.text}>
                    Time to Cook: {this.state.DBInfo.PrepTime} minutes
                  </Text>
                  <Text style={styles.text}>
                    Servings: {this.state.DBInfo.Servings}
                  </Text>
                  <View style={{width: '10%'}}>
                    <StarRating
                      disabled={false}
                      emptyStar={'ios-star-outline'}
                      fullStar={'ios-star'}
                      halfStar={'ios-star-half'}
                      iconSet={'Ionicons'}
                      maxStars={5}
                      starSize={18}
                      rating={this.state.DBInfo.Rating}
                      fullStarColor={'black'}
                    />
                  </View>
                </View>
              </View>
              <View style={{marginTop: '5%'}}>
                <Text style={styles.text}>Weekly Message:</Text>
                <TextInput
                  style={{
                    marginBottom: '5%',
                    paddingBottom: '5%',
                    maxHeight: 60,
                  }}
                  style={styles.message}
                  multiline
                  placeholder="Weekly Statement"
                  value={this.state.DBInfo.WeeklyStatement}
                  onChangeText={text => this.setValue('WeeklyStatement', text)}
                />
                <TouchableOpacity
                  onPress={this.updateWeeklyStatement}
                  style={{
                    backgroundColor: 'tomato',
                    borderWidth: 2,
                    marginTop: '5%',
                    marginBottom: '15%',
                    width: '30%',
                    alignItems: 'center',
                  }}>
                  <Text>Post Message</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAwareScrollView>
        </Content>
      </Container>
    );
  }

  setValue = (fieldName, value) => {
    let DBInfo = {...this.state.DBInfo};
    DBInfo[fieldName] = value;
    this.setState({DBInfo});
  };
  updateWeeklyStatement = async () => {
    const res = await GroupServices.updateWeeklyStatement(
      this.props.navigation.getParam('groupId', ''),
      this.state.DBInfo.WeeklyStatement,
    );
    console.log(res);
  };
  handleNavigation = (routeName, params) => () => {
    NavigationService.navigate(routeName, params);
  };
}
