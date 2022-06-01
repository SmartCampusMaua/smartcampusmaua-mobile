import React, { Component } from 'react';
import { Alert } from 'react-native';
import CameraScreen from './CameraScreen';
import CheckingScreen from './CheckingScreen';



type BarcodeScreenExampleProps = {
    value: any;
}

type BarcodeScreenExampleState = {
    example: any | undefined;
    value: any;
}

export default class BarcodeScreenExample extends Component<BarcodeScreenExampleProps, BarcodeScreenExampleState> {
  constructor(props: any) {
    super(props);
    this.state = {
      example: undefined,
      value: undefined,
    };
  }

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
    if (this.state.example) {
      const Screen = this.state.example;
      return <Screen value={this.state.value} />;
    }
    return (
      <CameraScreen
            actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
            onBottomButtonPressed={(event) => this.onBottomButtonPressed(event)}
            flashImages={{
              on: require('../../assets/images/CameraIcons/flashOn.png'),
              off: require('../../assets/images/CameraIcons/flashOff.png'),
              auto: require('../../assets/images/CameraIcons/flashAuto.png'),
            }}
            scanBarcode
            showFrame
            laserColor="red"
            frameColor="white"
            onReadCode={(event) => {
                this.setState({ example: CheckingScreen, value: event.nativeEvent.codeStringValue });
            } }
            hideControls cameraRatioOverlay={undefined} captureButtonImage={undefined} captureButtonImageStyle={undefined} cameraFlipImage={undefined} cameraFlipImageStyle={undefined} torchOnImage={undefined} torchOffImage={undefined} torchImageStyle={undefined}      />
    );
  }
}