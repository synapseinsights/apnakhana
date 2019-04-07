import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View, Alert, TouchableHighlight, TouchableOpacity, Image, PricingCard } from 'react-native';
import { Button, ThemeProvider, Card, Icon } from 'react-native-elements'


export default class RestaurantSuggestion extends React.Component {

  render() {
    console.log(this.props.navigation.getParam('name','nothing'))
    return (
      <View style={styles.container}>
        <ScrollView>
          <Card
            title='Salt Hill Pub'
          >
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image source={require('../images/pic1.png')} />
              <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Nachos</Text>
              <Text></Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', }}>
              <Image source={require('../images/pic2.png')} />
              <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Fish and Chips</Text>
              <Text></Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', }}>
              <Image source={require('../images/pic3.png')} />
              <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Burger</Text>
              <Text></Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', }}>
              <Image source={require('../images/pic4.png')} />
              <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Mac and Cheese</Text>
              <Text></Text>
            </TouchableOpacity>

          </Card>


          <Card title="Explore:">
            <Button
              title="See Full Menu"
              buttonStyle={{ backgroundColor: "gray" }}
              onPress={() => this.props.navigation.navigate('Menu')}
            />
            <Text></Text>

            <Button
              title="Add a Menu"
              buttonStyle={{ backgroundColor: "gray" }}

            />

          </Card>
          <Text></Text>
          <Text></Text>
        </ScrollView>

      </View>

    );
  }
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
