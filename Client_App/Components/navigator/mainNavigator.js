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
import RecipeDiet from '../../Pages/RecipeDiet';
import RecipeListD from '../../Pages/RecipeListD';
import NoGroup from '../../Pages/NoGroup';
import CommentsPerRecipe from '../../Pages/CommentsPerRecipe';

const appNavigator = createStackNavigator(
  {
    HomePageD: {
      screen: HomePageD,
      navigationOptions: {
        header: null,
      },
    },
    RecipeDiet: {
      screen: RecipeDiet,
      navigationOptions: {
        headerStyle: {
          backgroundColor: 'burlywood',
        },
      },
    },
    CommentListD: {
      screen: CommentListD,
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
    PatientList: {
      screen: PatientList,
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

const patientStack = createStackNavigator({
  HomePageP: {
    screen: HomePageP,
    navigationOptions: {
      header: null,
    },
  },
  RecipeP: {
    screen: RecipeP,
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'burlywood',
      },
    },
  },
  CommentsPerRecipe: {
    screen: CommentsPerRecipe,
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'burlywood',
      },
    },
  },
  RecipeListP: {
    screen: RecipeListP,
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
  AccountP: {
    screen: AccountP,
    navigationOptions: {
      header: null,
    },
  },
});

const loginStack = createStackNavigator(
  {
    startPage: {
      screen: StartPage,
      navigationOptions: {
        header: null,
      },
    },
    NoGroup: {
      screen: NoGroup,
      navigationOptions: {
        headerStyle: {
          backgroundColor: 'burlywood',
        },
      },
    },
    RegistrationPageForPatients: {
      screen: RegistrationPageForPatients,
      navigationOptions: {
        headerStyle: {
          backgroundColor: 'burlywood',
        },
      },
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
    PatientStack: patientStack,
  },
  {initialRouteName: 'LoginStack'},
);
export default AppContainer = createAppContainer(appNavigator2);
