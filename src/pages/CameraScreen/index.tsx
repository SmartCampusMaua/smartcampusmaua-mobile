import { Camera, CameraType } from 'react-native-camera-kit';
import React, { Component } from 'react';

    export default class CameraExample extends Component {
        camera: any;

    render() {
    return (
        <Camera
            ref={(ref: any) => (this.camera = ref)}
            style={{ flex: 1 }}
            cameraType={CameraType.Front} // front/back(default)
        />
    )
    }
}