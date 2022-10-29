import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Navigator } from './navigations/Navigator';
// import { Provider } from 'react-redux'
// import { store } from './stores/store'

export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      {/* <Provider store={store}> */}
        <Navigator/>
      {/* </Provider> */}
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
