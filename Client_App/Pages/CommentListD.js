import React, {Component} from 'react';
import {Container, Content, Accordion, Item} from 'native-base';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import * as NavigationService from '../Services/NavigationService';
import DietHeaderD from '../Components/DietHeaderD';
import CommentComponent from '../Components/CommentComponent';
import * as RecipeService from '../Services/RecipeService';
import Icon from 'react-native-vector-icons/AntDesign';

const styles = StyleSheet.create({
  mainview: {
    margin: '5%',
  },
});

export default class CommentListD extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isOpen: false,
    };
  }
  async componentDidMount() {
    const recipes = await RecipeService.getComments(
      this.props.navigation.getParam('groupId', ''),
    );
    this.setState({data: recipes});
    console.log(recipes);
  }
  render() {
    return (
      <View>
        <DietHeaderD profileInfo={this.props.navigation.state.params} />
        <View style={styles.mainView}>
          <Text>Comments for each Recipe: </Text>
          <Accordion
            style={{
              margin: '5%',
              marginTop: '3%',
              borderWidth: 1,
              padding: '5%',
            }}
            dataArray={this.state.data}
            renderContent={item => this.renderItem(item.Comments)}
            renderHeader={item =>
              this.renderHeader({
                name: item.Name,
                numOfComments: item.NumberOfComments,
              })
            }
            onAccordionOpen={() => this.setState({isOpen: true})}
            onAccordionClose={() => this.setState({isOpen: false})}
          />
        </View>
      </View>
    );
  }

  handleNavigation = (routeName, params) => () => {
    NavigationService.navigation(routeName, params);
  };

  renderItem = item => {
    return (
      <View style={{marginBottom: '1%', backgroundColor: 'tan'}}>
        <FlatList
          data={item}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={({item}) => (
            <CommentComponent
              name={item.FirstName + ' ' + item.LastName}
              rating={item.Rating}
              comment={item.Comment}
              date={item.Timestamp}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  };
  renderHeader = item => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginBottom: '1%',
          backgroundColor: 'grey',
          alignItems: 'flex-end',
        }}>
        <Text style={{marginLeft: '2%', paddingBottom: '2%'}}>{item.name}</Text>
        <Text style={{marginLeft: '2%', paddingBottom: '2%'}}>
          {item.numOfComments}
        </Text>
        {this.state.isOpen == false ? (
          <Icon name="down" size={30} />
        ) : (
          <Icon name="up" size={30} />
        )}
      </View>
    );
  };
  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: 'black',
        }}
      />
    );
  };
}
