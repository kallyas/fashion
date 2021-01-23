import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React, { Component } from "react";
import OneSignal from "react-native-onesignal";
import { NavigationContainer } from "@react-navigation/native";

import { APP_ID } from "src/src/config/onesignal";
import "src/src/config-i18n";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { SafeAreaProvider } from "react-native-safe-area-context";
import AppRouter from "src/AppRouter";

import NavigationService from "src/utils/navigation";

import configureStore from "src/config-store";
import { getDemoSelector } from "src/modules/common/selectors";
import { tokenSelector } from "src/modules/auth/selectors";
import demoConfig from "src/utils/demo";
import globalConfig from "src/utils/global";

const { store, persistor } = configureStore();

// type Props = {};

class App extends Component {
  componentDidMount() {
    OneSignal.init(APP_ID);

    OneSignal.addEventListener("received", this.onReceived);
    OneSignal.addEventListener("opened", this.onOpened);
    OneSignal.addEventListener("ids", this.onIds);

    store.subscribe(() => {
      const state = store.getState();
      demoConfig.setData(getDemoSelector(state).toJS());
      globalConfig.setToken(tokenSelector(state));
    });
  }

  componentWillUnmount() {
    OneSignal.removeEventListener("received", this.onReceived);
    OneSignal.removeEventListener("opened", this.onOpened);
    OneSignal.removeEventListener("ids", this.onIds);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log("Message: ", openResult.notification.payload.body);
    console.log("Data: ", openResult.notification.payload.additionalData);
    console.log("isActive: ", openResult.notification.isAppInFocus);
    console.log("openResult: ", openResult);
  }

  onIds(device) {
    console.log("Device info: ", device);
  }

  render() {
    return (
      <NavigationContainer
        ref={(navigationRef) =>
          NavigationService.setTopLevelNavigator(navigationRef)
        }
      >
        <SafeAreaProvider>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <AppRouter />
            </PersistGate>
          </Provider>
        </SafeAreaProvider>
      </NavigationContainer>
    );
  }
}

export default App;
