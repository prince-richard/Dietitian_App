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
} from 'react-native';
import * as NavigationService from '../Services/NavigationService';
import DietHeaderD from '../Components/DietHeaderD';
import StarRating from 'react-native-star-rating';
import * as GroupServices from '../Services/GroupServices';

const styles = StyleSheet.create({
  mainview: {
    margin: '5%',
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
    marginBottom: '10%',
  },
  text: {
    marginBottom: '5%',
  },
  message: {
    borderWidth: 2,
    paddingLeft: '2%',
  },
});

export default class HomePageD extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DBInfo: {},
    };
  }
  async componentDidMount() {
    console.log(this.props.navigation.getParam('groupId', ''));
    const info = await GroupServices.getDietHomePage(
      this.props.navigation.getParam('groupId', ''),
    );
    this.setState({DBInfo: info});
    console.log(info);
  }
  render() {
    const {onChangeText, navigation} = this.props;
    const imagePath = this.state.PicFilePath;
    return (
      <View style={{paddingBottom: '5%'}}>
        <DietHeaderD profileInfo={this.props.navigation.state.params} />
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
          <View style={{marginTop: '15%'}}>
            <Text style={styles.text}>Weekly Message:</Text>
            <TextInput
              style={styles.text}
              style={styles.message}
              multiline
              value={this.state.DBInfo.WeeklyStatement}
              onChangeText={text => this.onChangeText(text)}
            />
            <TouchableOpacity
              style={{
                borderWidth: 2,
                marginTop: '5%',
                width: '30%',
                alignItems: 'center',
              }}>
              <Text>Post Message</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  setValue = (fieldName, value) => {
    this.setState({[fieldName]: value});
  };
  onChangeText = text => {
    this.setState({Message: text});
  };
  handleNavigation = (routeName, params) => () => {
    NavigationService.navigate(routeName, params);
  };
}
