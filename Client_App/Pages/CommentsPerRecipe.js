import React, {Component} from 'react';
import {View, Text, FlatList} from 'react-native';
import CommentComponent from '../Components/CommentComponent';

export default class CommentsPerRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {navigation} = this.props;
    let comments = this.props.navigation.getParam('comments', '');
    return (
      <View style={{backgroundColor: 'burlywood', flex: 1}}>
        {comments.length == 0 ? (
          <Text>
            There are no comments for this recipe yet. Feel free to leave one
            yourself.
          </Text>
        ) : (
          <View stlye={{margin: '10%'}}>
            <FlatList
              ItemSeparatorComponent={this.FlatListItemSeparator}
              style={{backgroundColor: 'navajowhite', margin: '10%'}}
              data={comments}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <CommentComponent
                  name={item.FirstName + ' ' + item.LastName}
                  date={item.Date}
                  rating={item.Rating}
                  comment={item.Comment}
                />
              )}
            />
          </View>
        )}
      </View>
    );
  }
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
