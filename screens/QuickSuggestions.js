import React from 'react';
import { ScrollView, StyleSheet, Text, View, Alert } from 'react-native';
import { Button, ThemeProvider } from 'react-native-elements'
import db from '../components/Firebase'

export default class QuickSuggestions extends React.Component {
  static navigationOptions = {
    title: 'Quick Suggestions',
  };

  render() {
    return (
      <View style={styles.container}>
        <ThemeProvider theme={theme}>
          <Button
            onPress = {this.getRestaurantsFromDB}
            title="Restaurant We Think"
            buttonStyle= {{ backgroundColor: "#56ad47"}}
            raised
          />
          </ThemeProvider>
          <Button
            onPress = {this._onPressButton}
            title="hi"
            raised
          />
          <Button
            onPress = {this._onPressButton}
            title="Other Restaurant 2"
            raised
          />
            <Button
            onPress = {this._onPressButton}
            title="Other Restaurant 3"
            raised
          />
      </View>
    );
  }
  _onPressButton() {
    Alert.alert("You pressed the button!")
  }
  getRestaurantsFromDB = () => {
    db.ref('Restaurants').once('value')
    .then((snapshot) => {
      let restaurants = Object.keys(snapshot.val());
      this.setState({
        restaurants: restaurants
      })
      console.log(this.state.restaurants);
    })
    .catch((err) => {
      console.log(err)
    })
  }

}


// Styling for specific react-native-elements components
const theme = {
  Button: {
    titleStyle: {
      color: 'white'
    }
  }
}

// Overall styling for for the page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 150,
    marginBottom: 150,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
