import React from 'react';
import {
  View,
  Button,
  TouchableOpacity,
  Text,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { push, pop, popToTop, replace, enhanceStackNavigator } from './react-navigation-enhancer';

/*
 * *******
 * SCREENS
 * *******
 */
const HomeScreen = ({ navigation }) => (
  <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
    <Button
      title="To About Screen"
      onPress={() => navigation.dispatch(push('about'))}
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
      onPress={() => navigation.dispatch(push('details'))}
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
