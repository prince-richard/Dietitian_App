import React, {Component} from 'react';
import {Container, Content} from 'native-base';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import * as NavigationService from '../Services/NavigationService';
import DietHeaderP from '../Components/DietHeaderP';
import RecipeInRecipeList from '../Components/RecipeInRecipeList';

const styles = StyleSheet.create({
  flatlistView: {
    borderWidth: 1,
    height: '85%',
    marginBottom: '5%',
    marginTop: '10%',
  },
  mainview: {
    margin: '5%',
  },
});

function Item({
  name,
  prepTime,
  calories,
  servings,
  rating,
  ingredients,
  picFilePath,
  steps,
}) {
  return (
    <RecipeInRecipeList
      Name={name}
      Servings={servings}
      Calories={calories}
      Rating={rating}
      PrepTime={prepTime}
      Ingredients={ingredients}
      PicFilePath={picFilePath}
      Steps={steps}
    />
  );
}

export default class RecipeListP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Recipes: [
        {
          Name: 'Steamed Carrots',
          PrepTime: 30,
          Calories: 150,
          Servings: 6,
          PicFilePath:
            'https://www.thespruceeats.com/thmb/EqZorXp-y4Fd2jKFmJBrn9Hn9Yw=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/carrots-with-butter-and-seasonings-3052473-hero-01-5c40fb71c9e77c00017175a0.jpg',
          Rating: 2,
          Ingredients: [
            '5 medium carrots',
            '1 cup of water',
            '1 teaspoon salt',
            '1 tablespoon granulated sugar',
            '2 tablespoons butter',
            'Optional: parsley or chives (chopped)',
          ],
          Steps: [
            'Gather ingredients',
            'Scrub carrots and peal them. Cut off and discard the stem. Slice carrots thinly on diagonal.',
            'Put carrots in medium saucepan. Add water, salt, and sugar.',
            'Place the pan over medium-high heat and bring to a boil',
            'Reduce the heat to medium low, cover the pan, and cook for about 20 minutes until carrots are tender.',
            'Drain carrots and add the butter and chopped parsely if desired.',
          ],
        },
        {
          Name: 'Banana Bread',
          PrepTime: 80,
          Calories: 229,
          Servings: 12,
          PicFilePath:
            'https://images.media-allrecipes.com/userphotos/720x405/4565477.jpg',
          Rating: 4.5,
          Ingredients: [
            '2 cups all-purpose flour',
            '1 teaspoon of baking soda',
            '1/4 teaspoon salt',
            '1/2 cup butter',
            '3/4 cup of brown sugar',
            '2 eggs, beaten',
            '2 1/3 cups mashed overripe bananas',
          ],
          Steps: [
            'Preheat over to 350 degrees F (175 degrees C)',
            'Lightly grease 9x5 inch loaf pan',
            'In a large bowl, combine flour, baking soda, and salt. In another bowl, cream together butter and brown sugar.',
            'Stir in eggs and eggs and mashed bananas until well blended. Stir banana mixture into flour mixture. stir just to moisten. Pour into loaf pan',
            'Bake for 60-65 minutes, until a toothpick inserted comes out clean. Then let bread cool for 10 minutes on a wire rack.',
          ],
        },
        {
          Name: 'Chicken Stir-Fry',
          PrepTime: 30,
          Calories: 250,
          Servings: 4,
          PicFilePath:
            'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2014/4/28/0/FO1A06_Chicken-Stir-Fry_s4x3.jpg.rend.hgtvcom.826.620.suffix/1402859718330.jpeg',
          Rating: 4,
          Ingredients: [
            '2 tablesppons dark sesame oil, divided',
            '2 garlic cloves, finely minced',
            '2 pounds chicken breasts, skinless and boneless',
            '1 head broccoli, stems removed',
            '1 dozen mushrooms, sliced',
            '3 carrots, peeled and julienned',
            '1/4 pound green beans, diced',
            '1 head bok choy, chopped',
            '2-3 tablespoons teriyaki sauce',
          ],
          Steps: [
            'Heat 1 tablespoon in a saute pan over medium head. Add garlic and stir. Place chicken in the pan and brown for 4 minutes on each side, slice into strips and set aside.',
            'Heat remaining tablespoon of oil in a wok over high head. Add vegetables and teriyaki sauce. Stirfry quickly until vegetables start to soften, combine chicken and cook for 2-3 minutes.',
          ],
        },
        {
          Name: 'Pasta Caprese',
          PrepTime: 45,
          Calories: 350,
          Servings: 8,
          PicFilePath:
            'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2010/7/21/3/FNM_090110-Sunny-VP-Lunch-004_s4x3.jpg.rend.hgtvcom.826.620.suffix/1382539437411.jpeg',
          Rating: 5,
          Ingredients: [
            '1/3 cup of extra-virgin olive oil',
            '1/4 cup fresh lemon juice',
            '1 shallot, minced',
            '1 small clove garlic, minced',
            'Kosher salt and freshly ground pepper',
            '1 teaspoon of sugar (optional)',
            '2 pounds mixed heirloom tomatoes, cored, seeded and cut in 1/2 inch pieces',
            '1 pound of pasta',
            '12 ounces fresh mozzarella, cut into 1/2 inch pieces',
            '1/2 cup chopped fresh basil',
            '1/2 teaspoon grated lemon zest',
          ],
          Steps: [
            'Whisk the olive oil, lemon juice, shallot, and garlic in a large bowl and and season with salt, pepper, and sugar(optional). Add tomatoes and toss. Marinate for 15 minutes',
            'Bring large pot of salted water to a boil. Add pasta and cook to direction on label. Drain and run cold water on pasta.',
            'Add pasta and mozzarella to tomatoe mixture. Stir in basil and season with salt, pepper, and lemon zest.',
          ],
        },
      ],
    };
  }

  render() {
    const {navigation} = this.props;
    return (
      <View>
        <DietHeaderP profileInfo={this.props.navigation.state.params} />
        <View style={styles.mainview}>
          <Text>Recipe List: </Text>
          <View style={styles.flatlistView}>
            <FlatList
              data={this.state.Recipes}
              renderItem={({item}) => (
                <Item
                  name={item.Name}
                  prepTime={item.PrepTime}
                  calories={item.Calories}
                  rating={item.Rating}
                  servings={item.Servings}
                  picFilePath={item.PicFilePath}
                  steps={item.Steps}
                  ingredients={item.Ingredients}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={true}
            />
          </View>
        </View>
      </View>
    );
  }
  handleNavigation = (routeName, params) => () => {
    const {navigation} = this.props;
    NavigationService.navigation(routeName, params);
  };
}
