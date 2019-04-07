import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { Constants, Location, MapView, Permissions } from 'expo';
import { Button, Card, ThemeProvider } from 'react-native-elements'
import {firebase, db} from '../components/Firebase'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: null,
      restaurants: null,
      location: null,
      googleResults: null,
      nearestRestaurants: null,
      currentRestaurant: null
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
    }    
  }

  async componentDidMount() {
    // Get user's current mobile location, get our db restaurants, query google's map API to get restaurants in the vicinity of the user and filter the list based on the restaurants we actually have data on. Do this all before rendering anything to screen and show a loading circle otherwise
    await this._getLocationAsync();
    await this._getRestaurantsFromDB();
    await this._getGoogleList();
    await this._filterRestaurants();
  }

  _getLocationAsync = async () => {
    // Get mobile location
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location: location });
    this.state.location ? console.log("LOCATION SAVED") : console.log("NO LOCATION")
  };

  _getRestaurantsFromDB = async () => {
    // Get our db restaurants
    const snapshot = await db.ref('Restaurants').once('value')
    let restaurants = await Object.keys(snapshot.val());
    this.setState({
      restaurants: restaurants
    })
    this.state.restaurants ? console.log("RESTAURANTS SAVED") : console.log("NO RESTAURANTS")
  }

  _getGoogleList = async () => {
    // query google for restaurants in the vicinity of the user (1500 meters)
    try {
      let latitude = this.state.location.coords.latitude;
      let longitude = this.state.location.coords.longitude;
      latitude = "43.70429229096713"
      longitude = "-72.29490534567546"
      let results = await fetch("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+latitude+","+longitude+"&radius=1500&type=restaurant&key=AIzaSyD1qY1K3HccJkYAcOULn9NDMPts2plwlA0")
      let resultsJSON = await results.json()
      resultsJSON = resultsJSON.results
      let googleResults = []
      resultsJSON.forEach( (res) => {
        googleResults.push({ 'id': res.id, 'name': res.name })
      })
      // googleResults ? console.log(googleResults): console.log("NO FETCH")
      this.setState({
        googleResults: googleResults
      })
      this.state.googleResults ? console.log("GOOGLE SAVED") : console.log("NO GOOGLE")
    } catch(err) {
      console.log(err)
    }
  }

  _filterRestaurants = async () => {
      // filter google results by db restaurants
      let googleResults = this.state.googleResults
      let restaurants = this.state.restaurants
      let nearestRestaurants = [];
      googleResults.forEach( (res) => {
        if (restaurants.indexOf(res.name) !== -1){
          nearestRestaurants.push(res);
        } else {
        }
      }) 
      this.setState({
          nearestRestaurants: nearestRestaurants.slice(1),
          currentRestaurant: nearestRestaurants[0]
        })
      this.state.nearestRestaurants ? console.log("NEAREST FILTERED") : console.log("NO FILTER")
 
  }

  render() {
    if (this.state.nearestRestaurants) { 
      // Render the restaurants
      return (
        <View style={styles.container}>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>

        <Card title="Are you at:">
          <ThemeProvider theme={theme} key={this.state.currentRestaurant.id}>
                <Button
                  onPress = {() => this.props.navigation.navigate('Suggestions',{'name': this.state.currentRestaurant.name })}
                  title={this.state.currentRestaurant.name}
                  buttonStyle= {{ backgroundColor: "gray"}}
                  raised
                  key={this.state.currentRestaurant.id}
                />
            </ThemeProvider>
            </Card>
          <Text></Text>
          <Card title="Or Nearby:">
            {this.state.nearestRestaurants.map((res) => {
              return (
                <ThemeProvider theme={theme} key={res.id}>
                  <Button
                    onPress = {this._onPressButton}
                    title={res.name}
                    buttonStyle= {{ backgroundColor: "gray"}}
                    raised
                    key={res.id}
                  />
                  <Text></Text>
                </ThemeProvider>
              );
            })}
            </Card>
          </View>
          
        )
    } else {
      // show a loading screen
        return (
          <View style={[loadingstyles.container, loadingstyles.horizontal]}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )
      
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 25,
    // marginBottom: 150,
    flexDirection: 'column',
    // justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#79a6c4',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
});

const loadingstyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})

// Styling for specific react-native-elements components
const theme = {
  Button: {
    titleStyle: {
      color: 'white'
    }
  }
}