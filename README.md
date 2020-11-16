# Memba Native

> A React Native prototype to wrap an HTML Hybrid App and replace now defunct Phonegap

## Building the app

### Create the project in WebStorm

File -> New -> Project... + React Native
Name the project "Memba Native"
Launches the following command:

```
"C:\Program Files\nodejs\node.exe" "C:\Program Files\nodejs\node_modules\npm\bin\npx-cli.js" --ignore-existing --package react-native-cli react-native init MembaNative
```

### Add dependencies

Follow the instructions at https://spin.atomicobject.com/2019/08/28/static-http-server-react-native/

```
yarn add react-native-fs
yarn add react-native-static-server
yarn add react-native-webview
// react-native link react-native-fs
// react-native link react-native-static-server
// react-native link react-native-webview
cd ios && pod install && cd..
```

### Add web files

Put your web assets (html, js, css) in `./www`.
Possibly build from `./src` using webpack

### Add App.js

See App.js for code

### Copy assets in android

Modify `./android/app/build.gradle` as follows:

```
android {
    // This copies the content of www into android_asset
    sourceSets { main { assets.srcDirs = ['www', '../../www'] } }
}
```

### Issues

The key issue is whether react-native-static-server could be avoided. Read https://github.com/react-native-webview/react-native-webview/issues/135 

### TODO

Test on iOS
