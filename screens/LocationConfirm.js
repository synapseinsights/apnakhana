import React from 'react';
import { ScrollView, StyleSheet, Text, View, Alert, TouchableHighlight} from 'react-native';
import { Button, ThemeProvider, Card, Icon } from 'react-native-elements'
import { ExpoLinksView } from '@expo/samples';
import {createStackNavigator, createAppContainer} from 'react-navigation';



export default class LocationConfirm extends React.Component {

  render() {
        return (
        <View style = { styles.container }>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
        <Card title="Are you at:">
        <Button
            onPress={() => this.props.navigation.navigate('Suggestions')}
            title="Salt Hill Pub"
            buttonStyle= {{ backgroundColor: "gray"}}
            raised
          />

        </Card>
        <Text></Text>
        <Text></Text>

        <Card title="Or Nearby:">
           <Button
            onPress = {this._onPressButton}
            title="Tuk Tuk Thai"
            buttonStyle= {{ backgroundColor: "gray"}}
            raised
          />

          <Text></Text>
          <Text></Text>

          <Button
            onPress = {this._onPressButton}
            title="Molly's Restauraunt"
            buttonStyle= {{ backgroundColor: "gray"}}
            raised
          />
          <Text></Text>
          <Text></Text>

          <Button
            onPress = {this._onPressButton}
            title="Other..."
            buttonStyle= {{ backgroundColor: "gray"}}
            raised
          />

        </Card>
        <Text></Text>
        <Text></Text>
        </View>

        );
        }}

const AppNavigator = createStackNavigator({
  Location: {
    screen: LocationConfirm
  }
});
    
const styles = StyleSheet.create(
  {
      container:
      {
          flex: 1,
          backgroundColor: '#7BC8DA' // Set your own custom Color
      }
  });
