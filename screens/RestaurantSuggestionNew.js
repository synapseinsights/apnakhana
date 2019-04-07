import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Button, Card } from 'react-native-elements'
import db from '../components/Firebase'

export default class RestaurantSuggestionNew extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLocation: this.props.navigation.getParam('name', null)
        }
    };

    async componentDidMount() {
        this.setState({
            currentLocation: this.props.navigation.getParam('name', null)
        })
        // await this._getRestaurantsFromDB();

    }
    componentWillReceiveProps() {
        let newlocation = this.props.navigation.getParam('name', null)
        console.log(newlocation)
        if (newlocation) {
            console.log("LOCATION CHANGE: " + newlocation)
            this.setState({
                currentLocation: newlocation
            })
        }
    }

    render() {
        if (this.state.currentLocation) {
            return (
                <View style={styles.container}>
                    <ScrollView>
                        <Card>
                            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Your Recommendations:</Text>
                        </Card>

                        <View style={{ flex: 1 }}>
                            <Card>
                                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={require('../images/pic1.png')} style={{ width: imageWidth / 1.5, height: imageWidth / 1.5 }} />
                                    <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Mac and Cheese</Text>
                                </TouchableOpacity>
                            </Card>
                        </View>

                        <Card>
                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', }}>
                                <Image source={require('../images/pic2.png')} style={{ width: imageWidth / 1.5, height: imageWidth / 1.5 }} />
                                <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Fish and Chips</Text>
                            </TouchableOpacity>
                        </Card>

                        <Card>
                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', }}>
                                <Image source={require('../images/pic3.png')} style={{ width: imageWidth / 1.5, height: imageWidth / 1.5 }} />
                                <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Nachos</Text>
                            </TouchableOpacity>
                        </Card>

                        <Card>
                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', }}>
                                <Image source={require('../images/pic4.png')} style={{ width: imageWidth / 1.5, height: imageWidth / 1.5 }} />
                                <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Butternut Squash Risotto</Text>
                            </TouchableOpacity>
                        </Card>
                        <Card title="Explore:">
                            <Button
                                title="See Full Menu"
                                buttonStyle={{ backgroundColor: "gray" }}
                                onPress={() => this.props.navigation.push('Menu')}
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
        } else {
            return (
                <View style={nolocationstyle.container}>
                    <Card title="Please confirm your location for suggestions" />
                </View>
            )

        }
    }
}


const dimensions = Dimensions.get('window');
const imageWidth = dimensions.width;
const nolocationstyle = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 150,
        marginBottom: 150,
    }
})
const styles = StyleSheet.create(
    {
        container:
        {
            flex: 1,
            backgroundColor: '#FF9300' // Set your own custom Color
        }
    });
