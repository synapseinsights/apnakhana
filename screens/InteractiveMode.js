import React from 'react';
import { Text, View, TouchableOpacity, Dimensions, Image, StyleSheet, Alert, FlatList, ActivityIndicator  } from 'react-native';
import { Card } from 'react-native-elements'
import IconButton from '../components/IconButton';

import { Camera, Permissions, FileSystem } from 'expo';
import {firebase, db} from '../components/Firebase'
import uuid from "uuid";

export default class CameraExample extends React.Component {
  static navigationOptions = { header: null };
  state = {
    is_camera_visible: true,
    is_photo_visible: false,
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    progress_photos: [],
    googleResponse: null,
    uploading: false,
    image: null,
    menus: null,
    processingImage: false,
    chosen_menu: null
  };

  constructor(props) {
    super(props);
    this.document_dir = FileSystem.documentDirectory;
    this.filename_prefix = 'increment_photo_';
    this._getRestaurantsFromDB = this._getRestaurantsFromDB.bind(this);
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });

    this.props.navigation.setParams({
      'openCamera': this.openCamera
    });
    await this._getRestaurantsFromDB();
  }

  openCamera = () => {
    this.setState({
      is_camera_visible: true
    });
  }
  closeCamera = () => {
  this.setState({
    is_photo_visible: true,
    is_camera_visible: false,
    hasCameraPermission: false,
    image: null,
    uploading: false,
    chosen_menu: null
  });
  }
  closePhoto = () => {
  this.setState({
    is_photo_visible: false
  });
  }
  // Submit image to google vision api
  submitToGoogle = async () => {
      try {
        this.setState({ uploading: true });
        let { image } = this.state;
        console.log(image);
        let body = JSON.stringify({
          requests: [
            {
              features: [
                { type: "TEXT_DETECTION", maxResults: 5 }
              ],
              image: {
                source: {
                  imageUri: image
                }
              },
              imageContext: {
                languageHints: ["en"]
              }
            }
          ]
        });
        let response = await fetch(
          "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyA3gVCTwsZe2jRYUa9YFjLSxIcQ4HY8uQc",
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            method: "POST",
            body: body
          }
        );
        let responseJsonOrig = await response.json();
        responseJson = responseJsonOrig.responses
        Alert.alert(
          'Image Processing Success!',
          'Click to see recommendations based on the menu you uploaded',
        );
        let googleResults = [];
        responseJson.forEach( (res)=> {
          let res2 = res.textAnnotations
          res2.forEach ((res3)=> {
            googleResults.push(res3.description);
          })

        });
        console.log("googleResults",googleResults);
        this.setState({
          googleResponse: responseJsonOrig,
          uploading: false
        });

        let currentRestaurant = "Murphy's On the Green"
        this._compareMenuItemFromDB(googleResults);
        } catch (error) {
        console.log(error);
        }
    };

    _compareMenuItemFromDB = async(googleResults) => {
      var googleResults = googleResults.map(v => v.toLowerCase());

      // compare with db
      console.log("fetched menu",this.state.menus);
      // REQUIRES ECMASCRIPT 2015+
      var s, myStringArray = this.state.menus;
      var c = 0;
      var chosen_menu = '';
      for (s of myStringArray) {
        // ... do something with s ...
        let menu_descriptors = s.split(/[ ,]+/).map(v => v.toLowerCase());;
        const intersection = googleResults.filter(element => menu_descriptors.includes(element));
        if (intersection.length > c) {
          c = intersection.length;
          chosen_menu = s;
        }
      }
      console.log("This is your chosen menu!",chosen_menu)
      this.setState({
        chosen_menu: chosen_menu,
        processingImage: false
      })
      this.hasCameraPermission = false
      // Render Recommended Items
      // this.state.chosen_menu = s;
      // _renderOCRresult();
    }
    // _renderOCRresult = async() => {
    //   const { chosen_menu } = this.state;

    // }

    _getRestaurantsFromDB = async () => {
      // Grab menus from DB on Murphys
      const snapshot = await db.ref('RestaurantMenus').child("Murphy's On the Green").once('value')
      let menu = await Object.keys(snapshot.val());
      console.log(menu)
      this.setState({
        menus: menu
      })
      this.state.restaurants ? console.log("RESTAURANTS SAVED") : console.log("NO RESTAURANTS")
    }

  takePicture = async () =>  {
      console.log("PHOTO BUTTON PRESSED")
      if(this.camera){
        console.log("BUTTON PRESSED AND IN CAMERA")
        let data = await this.camera.takePictureAsync()
        this.setState({
          processingImage: true
        })
        console.log('Submitting to GOOGLE...',data.uri);
        let uploadUrl = await uploadImageAsync(data.uri);
        this.setState({ image: uploadUrl });
        console.log("uploadURL",uploadUrl)
        await this.submitToGoogle();
        console.log('Submitted');
      }
    };

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      if (this.state.processingImage && !this.state.chosen_menu){
        return (
          // spinny wheel
          <View style={[loadingstyles.container, loadingstyles.horizontal]}>
          {/* <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Processing Photo...</Text> */}
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
        )
      } else if (this.state.chosen_menu) {
          return (
            <View style={styles.wrapper}>
            <Text></Text>
            <Text></Text>
             <Card>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>How about trying:</Text>
            </Card>
            <View style={{ flex: 1 }}>
                <Card>
                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../images/calamari.jpg')} style={{width: imageWidth / 1.5, height: imageWidth / 1.5, display: this.state.chosen_menu === "Crispy Rhode Island Calamari" ? 'flex' : 'none'}} />
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>{this.state.chosen_menu}</Text>
                        <Text>Your Match: 82% </Text>
                        <Text>Overall likes: 103 </Text>
                    </TouchableOpacity>
                </Card>
              </View>
            </View>
          )
      } else {
        return (
          <View style={{ flex: 1 }}>
          {this.state.googleResponse && (
            <FlatList
              data={this.state.googleResponse.responses[0].textAnnotations}
              extraData={this.state}
              keyExtractor={this._keyExtractor}
              renderItem={({ item }) => <Text>Item: {item.description}</Text>}
            />
            )}
            <Camera style={{ flex: 1 }} type={this.state.type} ref={ref => { this.camera = ref; }}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={{
                    flex: 0.1,
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    this.setState({
                      type: this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                    });
                  }}>
                  <Text
                    style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                    {' '}Flip{' '}
                  </Text>
                </TouchableOpacity>
                <View style={styles.lower_buttons_container}>
                  <IconButton is_transparent={true} icon="photo-camera"
                    styles={styles.camera_photo_button}
                    onPress={this.takePicture} />
                </View>
              </View>
            </Camera>
          </View>
        );
      }
    }
  }


}

async function uploadImageAsync(uri) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function(e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const ref = firebase
    .storage()
    .ref()
    .child(uuid.v4());
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();

  return await snapshot.ref.getDownloadURL();
}

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
const dimensions = Dimensions.get('window');
const imageWidth = dimensions.width;
const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  modal: {
    marginTop: 22,
    flex: 1
  },
  camera_body: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'column'
  },
  upper_buttons_container: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  lower_buttons_container: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'flex-end'
  },
  camera_button: {
    padding: 10
  },
  camera_close_button: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start'
  },
  camera_flip_button: {
    alignSelf: 'flex-start',
    alignItems: 'flex-end'
  },
  camera_photo_button: {
    alignSelf: 'center',
    alignItems: 'center',
    paddingBottom: 10
  },
  list_item: {
    flex: 1,
    padding: 10
  },
  image_container: {
    alignItems: 'center'
  },
  image: {
    width: 130,
    height: 130,
  },
  image_text: {
    marginTop: 10,
    fontSize: 12
  },
  close_button: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 10
  },
  photo_label: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 5
  },
  photo_label_text: {
    color: '#FFF'
  }
});
