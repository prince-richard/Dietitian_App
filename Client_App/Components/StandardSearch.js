import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';

export default class StandardSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
        loading: false,
        data: [],
        error: null,
        search: '',
    };
    this.arrayholder = ['Test1', 'Test2','Test3'];
  }

  updateSearch = search => {
    this.setState({ search });
  };

  searchFilterFunction = text => {
      const newData = this.arrayholder.filter(item => {
          const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
          //const itemData = '${item.name.title.toUpperCase()}${item.name.first.toUpperCase()}${item.name.last.toUpperCase()}';
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
      });
      this.setState({ data: newData });
  }

  render() {
    const {name, text, onChangeText, selectedValue} = this.props;
    const { search } = this.state;
    return (
        <View>
            <SearchBar
            placeholder = 'Type Here ...'
            lightTheme
            round
            //onChangeText={text => this.searchFilterFunction(text)}
            onChangeText={this.updateSearch}
            autoCorrect={false}
            value={ search }
            />
            {/* <FlatList
                data={this.state.dataSource}
                ItemSeparatorComponent={this.ListViewItemSeparator}
                //Item Separator View
                renderItem={({ item }) => (
                // Single Comes here which will be repeatative for the FlatListItems
                <Text style={styles.textStyle}>{item.title}</Text>
                )}
                enableEmptySections={true}
                style={{ marginTop: 10 }}
                keyExtractor={(item, index) => index.toString()}
            /> */}
       </View>
    );
  }
}

