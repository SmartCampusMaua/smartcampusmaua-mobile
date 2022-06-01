import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import BarcodeScreen from './BarcodeScreenExample';

type CheckinScreenProps = {
    value: any;
}

type CheckScreenState = {
    example: any | undefined;
    value: any;
}

export default class CheckingScreen extends Component<CheckinScreenProps, CheckScreenState> {
  constructor(props: any) {
    super(props);
    this.state = {
      example: undefined,
      value: null
    };
  }

  render() {
    if (this.state.example) {
      const CheckingScreen = this.state.example;
      const value = this.state.value;
      return <CheckingScreen value={value} />;
    }
    return (
      <View style={styles.container}>
        <Text style={styles.valueText}>{this.props.value}</Text>
        <TouchableOpacity onPress={() => this.setState({ example: BarcodeScreen })}>
          <Text style={styles.buttonText}>Back button</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  valueText: {
    marginBottom: 20,
    fontSize: 40,
  },
  buttonText: {
    color: 'blue',
    marginBottom: 20,
    fontSize: 20,
  },
});