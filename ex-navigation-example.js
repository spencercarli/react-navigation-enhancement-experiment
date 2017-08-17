import React from 'react';
import {
  View,
  Button,
  TouchableOpacity,
  Text,
} from 'react-native';

import {
  createRouter,
  NavigationProvider,
  StackNavigation,
} from '@expo/ex-navigation';

const HomeScreen = ({ navigator }) => (
  <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
    <Button
      title="To About Screen"
      onPress={() => navigator.push(Router.getRoute('about'))}
    />
  </View>
);
HomeScreen.route = {
  navigationBar: {
    title: 'Home',
  }
};

const AboutScreen = ({ navigator }) => (
  <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
    <Button
      title="To Details Screen"
      onPress={() => navigator.push(Router.getRoute('details'))}
    />
    <Button
      title="Replace with Home"
      onPress={() => navigator.replace(Router.getRoute('home'))}
    />
    <Button
      title="Pop"
      onPress={() => navigator.pop()}
    />
  </View>
);
AboutScreen.route = {
  navigationBar: {
    title: 'About',
  }
};

const DetailsScreen = ({ navigator }) => (
  <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
    <Button
      title="Pop to Top"
      onPress={() => navigator.popToTop()}
    />
    <Button
      title="Pop"
      onPress={() => navigator.pop()}
    />
    <Button
      title="Pop Two Screens"
      onPress={() => navigator.pop(2)}
    />
  </View>
);
DetailsScreen.route = {
  navigationBar: {
    title: 'Details',
  }
};

const Router = createRouter(() => ({
  home: () => HomeScreen,
  about: () => AboutScreen,
  details: () => DetailsScreen,
}));

class App extends React.Component {
  render() {
    return (
      <NavigationProvider router={Router}>
        <StackNavigation initialRoute={Router.getRoute('home')} />
      </NavigationProvider>
    );
  }
}

export default App;
