import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View, Alert, TouchableHighlight, TouchableOpacity, Image, PricingCard} from 'react-native';
import { Button, ThemeProvider, Card, Icon, Tile } from 'react-native-elements'
import { ExpoLinksView } from '@expo/samples';


export default class RestaurantSuggestion extends React.Component {

  render() {
      return (
      <View style = { styles.container }>
      <ScrollView>


      <Card>
        <Text style={{textAlign: 'center',fontWeight:'bold', fontSize:20}}>Your Recommendations:</Text>
      </Card>

      <View style = {{flex:1}}>
      <Card>
        <TouchableOpacity style={{justifyContent: 'center',alignItems: 'center'}}>
          <Image source={require('../images/pic1.png')} style={{width:imageWidth/1.5, height:imageWidth/1.5}}/>
          <Text style={{textAlign:'center', fontWeight:'bold'}}>Mac and Cheese</Text>
        </TouchableOpacity>
      </Card>
      </View>

      <Card>
        <TouchableOpacity style={{justifyContent: 'center',alignItems: 'center',}}>
          <Image source={require('../images/pic2.png')} style={{width:imageWidth/1.5, height:imageWidth/1.5}}/>
          <Text style={{textAlign:'center', fontWeight:'bold'}}>Fish and Chips</Text>
        </TouchableOpacity>
      </Card>

      <Card>
      <TouchableOpacity style={{justifyContent: 'center',alignItems: 'center',}}>
        <Image source={require('../images/pic3.png')} style={{width:imageWidth/1.5, height:imageWidth/1.5}}/>
        <Text style={{textAlign:'center', fontWeight:'bold'}}>Nachos</Text>
      </TouchableOpacity>
      </Card>

      <Card>
      <TouchableOpacity style={{justifyContent: 'center',alignItems: 'center',}}>
        <Image source={require('../images/pic4.png')} style={{width:imageWidth/1.5, height:imageWidth/1.5}}/>
        <Text style={{textAlign:'center', fontWeight:'bold'}}>Butternut Squash Risotto</Text>
      </TouchableOpacity>
      </Card>
      

        <Card title="Explore:">
        <Button
          title="See Full Menu"
          buttonStyle= {{ backgroundColor: "gray"}}
          onPress={() => this.props.navigation.navigate('Menu')}
        />
        <Text></Text>

        <Button
          title="Add a Menu"
          buttonStyle= {{ backgroundColor: "gray"}}

        />

        </Card>
        <Text></Text>
        <Text></Text>
        </ScrollView>

        </View>

        );
        }}
    

const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 9 / 16);
const imageWidth = dimensions.width;
const styles = StyleSheet.create(
  {
      container:
      {
          flex: 1,
          flexDirection: 'row',
          backgroundColor: '#7BC8DA' // Set your own custom Color
      }
  });
