# smartcampusmaua-app

The `smartcampusmaua-app` is developed using the React Native `0.68+` framework for both `Android / IOS` native App platform using TypeScript.

## Prerequirements

Please make sure the necessary Tools to develop Apps with React Native framework at https://github.com/smartcampusmaua/smartcampusmaua-tools/tree/main/ReactNative

## Quick Start

1. Make sure Nodejs, NPM and Yarn are correctly installed:

```bash
node -v
----
v16.15.0
----
```

```bash
npm -v
----
8.5.5
----
```

```bash
yarn -v
----
1.22.18
----
```



2. Make sure Android `adb` is correctly installed for connect the Nodejs to the device (physically or emulated). If the device is emulated, be sure you have started the emulator device:

```bash
adb devices
----
List of devices attached
RQ8N80DJYQD     device
----
```



3. Clone this repository:

```bash
git clone https://github.com/smartcampusmaua/smartcampus-app.git
```



4. Go to this repository:

```bash
cd smartcampusmaua-app
```



5. Install the Dependencies:

```bash
yarn 
```



6. Start the Project:

```bash 
yarn start
```

7. Init the App into the Android device
```bash
yarn react-native run-android
```


