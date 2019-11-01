import react from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomePageP from '../../Pages/HomePageP';
import HomePageD from '../../Pages/HomePageD';
import MessagePageP from '../../Pages/MessagePageP';
import MessagePageD from '../../Pages/MessagePageD';
import StartPage from '../../Pages/startPage';
import RegistrationPageForPatients from '../../Pages/registrationPageForPatients';
import PatientList from '../../Pages/PatientList';
import RecipeP from '../../Pages/RecipeP';
import RecipeListP from '../../Pages/RecipeListP';
import AccountP from '../../Pages/AccountP';
import RegisterListD from '../../Pages/RegisterListD';
import CommentListD from '../../Pages/CommentListD';
import AddRecipe from '../../Pages/AddRecipeD';
import RecipeD from '../../Pages/RecipeD';
import RecipeListD from '../../Pages/RecipeListD';

const appNavigator = createStackNavigator(
  {
    HomePageP: {
      screen: HomePageP,
      navigationOptions: {
        header: null,
      },
    },
    HomePageD: {
      screen: HomePageD,
      navigationOptions: {
        header: null,
      },
    },
    AddRecipe: {
      screen: AddRecipe,
      navigationOptions: {
        header: null,
      },
    },
    RecipeD: {
      screen: RecipeD,
      navigationOptions: {
        header: null,
      },
    },
    CommentListD: {
      screen: CommentListD,
      navigationOptions: {
        header: null,
      },
    },
    RecipeP: {
      screen: RecipeP,
      navigationOptions: {
        header: null,
      },
    },
    RecipeListP: {
      screen: RecipeListP,
      navigationOptions: {
        header: null,
      },
    },
    RecipeListD: {
      screen: RecipeListD,
      navigationOptions: {
        header: null,
      },
    },
    AccountP: {
      screen: AccountP,
      navigationOptions: {
        header: null,
      },
    },
    PatientList: {
      screen: PatientList,
      navigationOptions: {
        header: null,
      },
    },
    MessagePageP: {
      screen: MessagePageP,
      navigationOptions: {
        header: null,
      },
    },
    MessagePageD: {
      screen: MessagePageD,
      navigationOptions: {
        header: null,
      },
    },
    RegisterListD: {
      screen: RegisterListD,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    navigationOptions: {
      header: null,
    },
  },
);

const loginStack = createStackNavigator(
  {
    startPage: {
      screen: StartPage,
      navigationOptions: {
        header: null,
      },
    },
    RegistrationPageForPatients: {
      screen: RegistrationPageForPatients,
    },
  },
  {
    initialRouteName: 'startPage',
    navigationOptions: {
      header: null,
    },
  },
);

appNavigator2 = createSwitchNavigator(
  {
    LoginStack: loginStack,
    MainStack: appNavigator,
  },
  {initialRouteName: 'LoginStack'},
);
export default AppContainer = createAppContainer(appNavigator2);
