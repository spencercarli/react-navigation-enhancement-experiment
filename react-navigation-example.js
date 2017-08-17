import React from 'react';
import {
  View,
  Button,
  TouchableOpacity,
  Text,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

/*
 * *******
 * SCREENS
 * *******
 */
const HomeScreen = ({ navigation }) => (
  <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
    <Button
      title="To About Screen"
      onPress={() => navigation.navigate('about')}
    />
  </View>
);
HomeScreen.navigationOptions = {
  headerTitle: 'Home',
};

const AboutScreen = ({ navigation }) => (
  <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
    <Button
      title="To Details Screen"
      onPress={() => navigation.navigate('details')}
    />
    <Button
      title="Replace with Home"
      onPress={() => navigation.dispatch(replace('home'))}
    />
    <Button
      title="Pop"
      onPress={() => navigation.dispatch(pop())}
    />
  </View>
);
AboutScreen.navigationOptions = {
  headerTitle: 'About',
};

const DetailsScreen = ({ navigation }) => (
  <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
    <Button
      title="Pop to Top"
      onPress={() => navigation.dispatch(popToTop('home'))}
    />
    <Button
      title="Pop"
      onPress={() => navigation.dispatch(pop())}
    />
    <Button
      title="Pop Two Screens"
      onPress={() => navigation.dispatch(pop(2))}
    />
  </View>
);
DetailsScreen.navigationOptions = {
  headerTitle: 'Details',
};

/*
 * *****************
 * ENHANCE NAVIGATOR
 * *****************
 */

 const POP_ACTION = 'Navigation/POP';
 const pop = (numberOfScreens = 1) => {
  return {
    type: POP_ACTION,
    numberOfScreens,
  };
 };

 const POP_TO_TOP_ACTION = 'Navigation/POP_TO_TOP';
 const popToTop = () => {
  return {
    type: POP_TO_TOP_ACTION,
  };
 };

 const REPLACE_ACTION = 'Navigation/REPLACE';
 const replace = (routeName, params) => {
  return {
    type: REPLACE_ACTION,
    routeName,
    params,
  };
 };

 const enhanceStackNavigator = (StackNav) => {
  const defaultGetStateForActon = StackNav.router.getStateForAction;

  StackNav.router.getStateForAction = (action, state) => {
    if (state && action.type === REPLACE_ACTION) {
      const routes = state.routes.slice(0, state.routes.length - 1);
      routes.push({
        ...action,
        type: undefined,
        key: state.routes[state.routes.length - 1].key,
      });
      return {
        ...state,
        routes,
        index: routes.length - 1,
      };
    }

    if (state && action.type === POP_TO_TOP_ACTION) {
      const routes = [state.routes[0]];
      return {
        ...state,
        routes,
        index: 0,
      };
    }

    if (state && action.type === POP_ACTION) {
      const length = state.routes.length;
      const numberOfScreens = action.numberOfScreens > length  - 1 ? length - 1 : action.numberOfScreens;
      const routes = state.routes.slice(0, length - numberOfScreens);
      return {
        ...state,
        routes,
        index: routes.length - 1,
      };
    }

    return defaultGetStateForActon(action, state);
  }

  return StackNav;
};

/*
 * *********
 * NAVIGATOR
 * *********
 */
const MyApp = StackNavigator({
  home: {
    screen: HomeScreen,
  },
  about: {
    screen: AboutScreen,
  },
  details: {
    screen: DetailsScreen,
  },
});

export default enhanceStackNavigator(MyApp);
