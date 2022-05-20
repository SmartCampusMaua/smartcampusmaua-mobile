import React, { Component } from 'react';
import { Alert } from 'react-native';
import CameraScreen from './CameraScreen';

export default class CameraScreenExample extends Component {
  onBottomButtonPressed(event: any) {
    const captureImages = JSON.stringify(event.captureImages);
    Alert.alert(
      `"${event.type}" Button Pressed`,
      `${captureImages}`,
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: false },
    );
  }

  render() {
    return (
      <CameraScreen
            actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
            onBottomButtonPressed={(event) => this.onBottomButtonPressed(event)}
            flashImages={{
                on: require('./images/flashOn.png'),
                off: require('./images/flashOff.png'),
                auto: require('./images/flashAuto.png'),
            }}
            cameraFlipImage={require('./images/cameraFlipIcon.png')}
            captureButtonImage={require('./images/cameraButton.png')}
            torchOnImage={require('./images/torchOn.png')}
            torchOffImage={require('./images/torchOff.png')}
            showCapturedImageCount cameraRatioOverlay={undefined} captureButtonImageStyle={undefined} cameraFlipImageStyle={undefined} hideControls={undefined} showFrame={undefined} scanBarcode={undefined} laserColor={undefined} frameColor={undefined} torchImageStyle={undefined} onReadCode={function (event: any): void {
                throw new Error('Function not implemented.');
            } }      />
    );
  }
}