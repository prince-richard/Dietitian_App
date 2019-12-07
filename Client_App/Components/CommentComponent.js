import React, {Component} from 'react';
import {View, Text} from 'react-native';
import StarRating from 'react-native-star-rating';
import moment from 'moment';

export default class CommentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {name, date, rating, comment} = this.props;
    console.log(date);
    return (
      <View style={{marginBottom: '4%', marginTop: '5%', marginLeft: '2%'}}>
        <Text>{name}</Text>
        <Text>{moment(date).fromNow()}</Text>
        <View style={{width: '10%'}}>
          <StarRating
            disabled={false}
            emptyStar={'ios-star-outline'}
            fullStar={'ios-star'}
            halfStar={'ios-star-half'}
            iconSet={'Ionicons'}
            maxStars={5}
            starSize={18}
            rating={rating}
            fullStarColor={'black'}
          />
        </View>
        <Text>Comment: </Text>
        <View
          style={{
            marginTop: '2%',
            backgroundColor: 'white',
            marginLeft: '10%',
            width: '80%',
          }}>
          <Text
            style={{
              padding: '2%',
            }}>
            {comment}
          </Text>
        </View>
      </View>
    );
  }
}
