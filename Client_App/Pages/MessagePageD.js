import React, {Component} from 'react';
import {Container, Content, Spinner} from 'native-base';
import {View} from 'react-native';
import * as NavigationService from '../Services/NavigationService';
import DietHeaderP from '../Components/DietHeaderP';
import {NavigationEvents} from 'react-navigation';
import * as AccountManagementService from '../Services/AccountManagementService';
import * as MessageService from '../Services/MessageService';
import * as SignalRService from '../Services/SignalHubService';
import * as GroupServices from '../Services/GroupServices';
import {GiftedChat, Day} from 'react-native-gifted-chat';

export default class MessagePageD extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      messages: [],
    };
  }
  async componentDidMount() {
    const patientId = this.props.navigation.getParam('recieverId', '');
    const messages = await MessageService.getAllMessages(patientId, 20);
    if (messages) await this.setState({messages});

    // define listener for new coming messages
    SignalRService.addListener('chatlistener', (sender, chat) => {
      let tempMessages = this.state.messages;
      let tempChat = MessageService.convertFromHub(chat);
      tempMessages.unshift(tempChat);
      this.setState({messages: tempMessages});
    });
  }
  removeListener = () => {
    SignalRService.removeListener('chatlistener');
  };
  render() {
    const {messages} = this.state;
    const {navigation} = this.props;
    const profileInfo = navigation.state.params;
    const user = {
      _id: this.props.navigation.getParam('senderId', ''),
    };
    return (
      <Container style={{backgroundColor: 'burlywood'}}>
        <NavigationEvents onWillBlur={this.removeListener} />
        <Content contentContainerStyle={{flex: 1}}>
          <View style={{flex: 1}}>
            <GiftedChat
              messages={messages}
              onSend={this.sendMessage}
              multiline={false}
              user={user}
            />
          </View>
        </Content>
      </Container>
    );
  }

  handleNavigation = (routeName, params) => () =>
    NavigationService.navigation(routeName, params);

  sendMessage = async message => {
    const profileInfo = this.props.navigation.state.params;
    const res = await MessageService.sendMessage(
      message,
      this.props.navigation.getParam('recieverId', ''),
      this.props.navigation.getParam('groupId', ''),
    );
  };
}
