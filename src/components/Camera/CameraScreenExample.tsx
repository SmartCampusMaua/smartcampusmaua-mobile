import React, { Component } from 'react';
import { Alert } from 'react-native';
import CameraScreen from './CameraScreen';

import flashOn from "../../assets/images/CameraIcons/flashOn.png";
import flashOff from "../../assets/images/CameraIcons/flashOff.png";
import flashAuto from "../../assets/images/CameraIcons/flashAuto.png";
import cameraFlipIcon from "../../assets/images/CameraIcons/cameraFlipIcon.png";
import cameraButton from "../../assets/images/CameraIcons/cameraButton.png";
import torchOn from "../../assets/images/CameraIcons/torchOn.png";
import torchOff from "../../assets/images/CameraIcons/torchOff.png";


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
                on: flashOn,
                off: flashOff,
                auto: flashAuto
            }}
            cameraFlipImage={cameraFlipIcon}
            captureButtonImage={cameraButton}
            torchOnImage={torchOn}
            torchOffImage={torchOff}
            showCapturedImageCount cameraRatioOverlay={undefined} captureButtonImageStyle={undefined} cameraFlipImageStyle={undefined} hideControls={undefined} showFrame={undefined} scanBarcode={undefined} laserColor={undefined} frameColor={undefined} torchImageStyle={undefined} onReadCode={function (event: any): void {
                throw new Error('Function not implemented.');
            } }      />
    );
  }
}