import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import { Constants, Location, MapView, Permissions } from 'expo';
import { Button, ThemeProvider } from 'react-native-elements'
import db from '../components/Firebase'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: null,
      restaurants: null,
      location: null,
      googleResults: null,
      nearestRestaurants: null,
      }

    this._getLocationAsync = this._getLocationAsync.bind(this)
    this._getRestaurantsFromDB = this._getRestaurantsFromDB.bind(this)
    this._getGoogleList = this._getGoogleList.bind(this)
    this._filterRestaurants = this._filterRestaurants.bind(this)
    };

  async componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      await this._getLocationAsync();
      await this._getRestaurantsFromDB();
      await this._getGoogleList();
      await this._filterRestaurants();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location: location });
  };

  _getRestaurantsFromDB = () => {
    db.ref('Restaurants').once('value')
    .then((snapshot) => {
      let restaurants = Object.keys(snapshot.val());
      this.setState({
        restaurants: restaurants
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }

  _getGoogleList = async () => {
    try {
      let latitude = this.state.location.coords.latitude;
      let longitude = this.state.location.coords.longitude;
      latitude = "43.70429229096713"
      longitude = "-72.29490534567546"
      let results = await fetch("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+latitude+","+longitude+"&radius=1500&type=restaurant&key=AIzaSyD1qY1K3HccJkYAcOULn9NDMPts2plwlA0")
      let resultsJSON = await results.json()
      resultsJSON = await resultsJSON.results
      let googleResults = []
      resultsJSON.forEach( (res) => {
        googleResults.push({ 'id': res.id, 'name': res.name })
      })
      this.setState({
        googleResults: googleResults
      })
    } catch(err) {
      console.log(err)
    }
  }

  _filterRestaurants = async () => {
    try {
      // filter by db restaurants
      let nearestRestaurants = [];
      this.state.googleResults.forEach( (res) => {
        if (this.state.restaurants.indexOf(res.name) !== -1){
          nearestRestaurants.push(res);
        }
      }) 
      this.setState({
          nearestRestaurants: nearestRestaurants
        })
    } catch(err) {
      console.log(err)
    }
  }

  render() {
    if (this.state.nearestRestaurants) { 
      console.log(this.state.nearestRestaurants)
      return (
        <View style={styles.container}>
          {this.state.nearestRestaurants.map((res) => {
            return (
              <ThemeProvider theme={theme}>
                <Button
                  onPress = {this._onPressButton}
                  title={res.name}
                  buttonStyle= {{ backgroundColor: "#56ad47"}}
                  raised
                  key={res.id}
                />
              </ThemeProvider>
            );
          })}
          </View>
        )
    } else {
      console.log(this.state)
      return null
    }
  }
}

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
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
});

// Styling for specific react-native-elements components
const theme = {
  Button: {
    titleStyle: {
      color: 'white'
    }
  }
}