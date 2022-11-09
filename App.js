import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Navigator } from './navigations/Navigator';
import { RootSiblingParent } from 'react-native-root-siblings';

// import { Provider } from 'react-redux'
// import { store } from './stores/store'

export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <RootSiblingParent>
      {/* <Provider store={store}> */}
        <Navigator/>
      {/* </Provider> */}
      </RootSiblingParent>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
