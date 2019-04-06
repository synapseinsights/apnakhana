# Apna Khana

iOS/Android App for food recommendations

## How to Run

0. Install [node](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/get-npm)
1. Install expo  
`npm install -g expo-cli`
2. Setup iOS Simulator  
  a. Install [Xcode](https://itunes.apple.com/app/xcode/id497799835)  
  b. Go to preferences > Components > choose and install an iOS Simulator
3. Setup Android Simulator
  a. Follow [this guide](https://docs.expo.io/versions/v32.0.0/workflow/android-studio-emulator/)
4. Install Watchman (if on macOS)  
`brew install watchman`
5. Clone this repo  
`https://github.com/synapseinsights/apnakhana`
6. Install `npm` packages  
`cd apnakhana`  
`npm install`
7. Run server  
`npm start`  
8. Use `localhost:19002` in browser to launch iOS or Android simulator  
9. Test on real mobile device by downloading Expo app on [App Store](https://itunes.apple.com/us/app/expo-client/id982107779?mt=8) or [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent), changing "Connection" on server to "Tunnel," and scanning QR code 

## Resources

[expo config reference](https://docs.expo.io/versions/latest/workflow/configuration/)

[reactive native map reference](https://github.com/react-native-community/react-native-maps/blob/master/docs/mapview.md)

[expo icons reference](https://expo.github.io/vector-icons/)