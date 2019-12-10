import React, {Component} from 'react';
import {Container, Content, Accordion, Item} from 'native-base';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import * as NavigationService from '../Services/NavigationService';
import DietHeaderD from '../Components/DietHeaderD';
import CommentComponent from '../Components/CommentComponent';
import * as RecipeService from '../Services/RecipeService';
import Icon from 'react-native-vector-icons/AntDesign';
import {NavigationEvents} from 'react-navigation';

const styles = StyleSheet.create({
  mainview: {
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '5%',
  },
});

export default class CommentListD extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isOpen: false,
      currentItemIndex: null,
    };
  }
  fetchData = async () => {
    const recipes = await RecipeService.getComments(
      this.props.navigation.getParam('groupId', ''),
    );
    this.setState({data: recipes});
    console.log(recipes);
  };
  render() {
    return (
      <Container>
        <Content style={{backgroundColor: 'burlywood', flex: 1}}>
          <NavigationEvents onWillFocus={this.fetchData} />
          <DietHeaderD profileInfo={this.props.navigation.state.params} />
          <View style={styles.mainView}>
            <View style={{marginLeft: '10%', marginTop: '5%'}}>
              <Text>Comments per Recipe: </Text>
            </View>
            <Accordion
              style={{
                marginLeft: '5%',
                marginRight: '5%',
                padding: '5%',
              }}
              icon={() => <Icon name="down" size={30} />}
              dataArray={this.state.data}
              renderContent={item => this.renderItem(item.Comments)}
              renderHeader={(item, isOpen) =>
                this.renderHeader({
                  name: item.Name,
                  numOfComments: item.NumberOfComments,
                  isOpen: isOpen,
                })
              }
              onAccordionOpen={(item, index) => this.openItem(index)}
              onAccordionClose={(item, index) => this.openItem(index)}
            />
          </View>
        </Content>
      </Container>
    );
  }

  handleNavigation = (routeName, params) => () => {
    NavigationService.navigation(routeName, params);
  };

  renderItem = item => {
    return (
      <View style={{marginBottom: '1%', backgroundColor: 'navajowhite'}}>
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
    console.log(this.state.currentItemIndex, item.isOpen);
    return (
      <View
        style={{
          flexDirection: 'row',
          marginBottom: '1%',
          backgroundColor: 'tomato',
          alignItems: 'flex-end',
        }}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={{marginLeft: '2%', paddingBottom: '2%'}}>
            {item.name}
          </Text>
          <Text style={{marginLeft: '2%', paddingBottom: '2%'}}>
            {item.numOfComments}
          </Text>
        </View>
        {!item.isOpen ? (
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
  openItem = id => {
    if (id != this.state.currentItemIndex) {
      this.setState({currentItemIndex: id});
    } else {
      this.setState({currentItemIndex: null});
    }
  };
}
