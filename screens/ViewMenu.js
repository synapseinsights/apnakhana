import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View, Alert, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, Image, PricingCard} from 'react-native';
import { Button, ThemeProvider, Card, Icon } from 'react-native-elements'
import { ExpoLinksView } from '@expo/samples';


export default class ViewMenu extends React.Component {
static navigationOptions = {
    title: 'View Menu',
    };
  render() {
        return (
      <View style = { styles.container }>
      <ScrollView>


      <Card
        title='Salt Hill Pub'
      >


      </Card>

      <TouchableWithoutFeedback 
            onPress={ () => {
                this.navigateToScreen('LocationConfim')()
        }}>
            <View><Text>Click Me</Text></View>
        </TouchableWithoutFeedback>
        <Text></Text>
        </ScrollView>

        </View>

        );
        }}

navigateToScreen = (route) => {
    const navigationAction = NavigationActions.navigate({
        routeName: route
    })
    this.props.navigation.dispatch(navigationAction)
}
const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 9 / 16);
const imageWidth = dimensions.width;
const styles = StyleSheet.create(
  {
      container:
      {
          flex: 1,
          backgroundColor: '#7BC8DA' // Set your own custom Color
      }
  });
