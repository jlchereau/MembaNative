/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

// TODO add loading indicator https://www.instamobile.io/react-native-tutorials/react-native-webview/
//  and/or a splashscreen

/**
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
*/

import React from 'react';
import {Platform, SafeAreaView, Text, View} from 'react-native';
// import StaticServer from 'react-native-static-server';
import WebView from 'react-native-webview';
// import RNFS from 'react-native-fs';

function createMessageFunction(data) {
  return `(function() {
    window.dispatchEvent(new MessageEvent('message', {data: ${JSON.stringify(
      data,
    )}}));
  })()`;
}

/***************************************************
 * From Local Http Server
 ***************************************************/

/*
function getPath() {
  return Platform.OS === 'android'
    ? RNFS.DocumentDirectoryPath
    : RNFS.MainBundlePath;
}

async function moveAndroidFiles() {
  // TODO Consider unzipAssets from https://github.com/mockingbot/react-native-zip-archive
  if (Platform.OS === 'android') {
    await RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/build`);
    const files = [
      'index.html',
      'build/index.css',
      'build/index.js',
      'build/jquery-3.5.1.min.js'
      'build/localforage.min.js'
    ];
    await files.forEach(async (file) => {
      await RNFS.copyFileAssets(file, `${RNFS.DocumentDirectoryPath}/${file}`);
    });
  }
}

class App extends React.Component {
  state = {
    url: null,
  };
  async componentDidMount() {
    moveAndroidFiles();
    let path = getPath();
    this.server = new StaticServer(8080, path);
    this.server.start().then((url) => {
      this.setState({url});
    });
  }

  componentWillUnmount() {
    if (this.server && this.server.isRunning()) {
      this.server.stop();
    }
  }

  render() {
    if (!this.state.url) {
      return (
        <SafeAreaView>
          <Text>Hello World</Text>
        </SafeAreaView>
      );
    }
    return (
      <SafeAreaView>
        <Text>{this.state.url}</Text>
        <View style={{height: '100%', width: '100%'}}>
          <WebView
            style={{flex: 1, marginBottom: 20}}
            originWhitelist={['*']}
            source={{uri: this.state.url}}
            javaScriptEnabled={true}
            domStorageEnabled={true}
          />
        </View>
      </SafeAreaView>
    );
  }
}
 */

/***************************************************
 * From File System
 ***************************************************/

const uri =
  Platform.OS === 'android'
    ? 'file:///android_asset/index.html'
    : './www/index.html';

class App extends React.Component {
  render() {
    return (
      <SafeAreaView>
        <Text
          onPress={(event) => {
            // TODO https://github.com/react-native-community/react-native-webview/issues/809#issuecomment-547695298
            this.webref.postMessage('From React');
            // this.webref.injectJavaScript(
            // 'window.open("https://www.w3schools.com");'
            // 'window.open("https://www.w3schools.com", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400");',
            //   '$("#text").html("Message from React");',
            // );
          }}>
          {uri}
        </Text>
        <View style={{height: '100%', width: '100%'}}>
          <WebView
            // ref={(r) => (this.webref = r)}
            ref={(r) => {
              this.webref = r;
              r.postMessage = (message) => {
                r.injectJavaScript(createMessageFunction(message));
              };
            }}
            style={{flex: 1, marginBottom: 20}}
            // useWebKit={true} // https://github.com/react-native-webview/react-native-webview/issues/731
            originWhitelist={['*']}
            source={{uri}}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            // allowingReadAccessToURL ?
            allowFileAccess={true}
            allowUniversalAccessFromFileURLs={true}
            onMessage={(event) => {
              alert(event.nativeEvent.data);
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default App;
