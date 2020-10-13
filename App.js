import React, { Component } from "react";
import { Platform, Text, View } from "react-native";
//import AppNavigator from "./src/app/modules/healthAndWellness/NavigationTab";
import { styles } from "./src/styles/styles";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Health & Wellness</Text>
        <AppNavigator />
      </View>
    );
  }
}
