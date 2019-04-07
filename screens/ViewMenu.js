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


      <Card title="Murphy's on the Green">
    <Text style={{textAlign: 'center',fontWeight:'bold', fontSize:20}}>Starters</Text><Text></Text>
    <Text>Sautéed P.E.I Mussels • 16</Text><Text></Text>
    <Text>Brined Chicken Wings • 14</Text><Text></Text>
    <Text>Nachos half • 9 / full • 16</Text><Text></Text>
    <Text>Local Cheese Plate • 15</Text><Text></Text>
    <Text>Rhode Island Crispy Calamari • 13</Text><Text></Text>
    <Text>Chefs Daily Grill Bread • 13</Text><Text></Text>
    <Text>Hummus & Crudité Board ∙ 12</Text><Text></Text>
    <Text style={{textAlign: 'center',fontWeight:'bold', fontSize:20}}>Soups and Salads</Text><Text></Text>
    <Text>Soup of the Day • 7</Text><Text></Text>
    <Text>Farmhouse Chili • 7</Text><Text></Text>
    <Text>Roasted Beet Salad ∙ 11</Text><Text></Text>
    <Text>Caesar Salad ∙ 9</Text><Text></Text>
    <Text>Crispy Oyster Salad ∙15</Text><Text></Text>
    <Text>House Salad ∙ 7</Text><Text></Text>
    <Text style={{textAlign: 'center',fontWeight:'bold', fontSize:20}}>Lunch Entrees</Text><Text></Text>
    <Text>Two VT Fresh Eggs • 10</Text><Text></Text>
    <Text>Murphy Breakfast Sammy • 12</Text><Text></Text>
    <Text>Murphy’s French Toast • 14</Text><Text></Text>
    <Text>Murphy’s Mac ‘n Cheese • 14</Text><Text></Text>
    <Text>House Smoked Chicken Enchiladas • 17</Text><Text></Text>
    <Text>Fish ‘n Chips • 16</Text><Text></Text>
    <Text style={{textAlign: 'center',fontWeight:'bold', fontSize:20}}>Sandwiches</Text><Text></Text>
    <Text>8 oz Certified Angus Sirloin Burger • 14</Text><Text></Text>
    <Text>The 8 oz “Murph” Burger • 16</Text><Text></Text>
    <Text>Black Bean Burger • 14</Text><Text></Text>
    <Text>Spicy Chicken Sandwich • 14</Text><Text></Text>
    <Text>Murphy’s B.L.T. • 14</Text><Text></Text>
    <Text>House Smoked Pulled Pork Sammy • 13</Text><Text></Text>
    <Text style={{textAlign: 'center',fontWeight:'bold', fontSize:20}}>Sides</Text><Text></Text>
    <Text>with sandwiches or a la carte</Text><Text></Text>
    <Text>Fresh Greens • 5</Text><Text></Text>
    <Text>Vegetable du Jour • 5</Text><Text></Text>
    <Text>House Slaw • 5</Text><Text></Text>
    <Text>Murphy’s Mac ’n Cheese • 7</Text><Text></Text>
    <Text>Sweet Potato Wedges • 5</Text><Text></Text>
    <Text>Hand Cut Fries • 5</Text><Text></Text>
    <Text></Text><Text></Text>
        

      </Card>

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
          backgroundColor: '#FF9300' // Set your own custom Color
      }
  });
