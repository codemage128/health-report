import React from "react";
import { View, Image, FlatList } from "react-native";
import { styles } from "../styles/styles";

import { NavigationScreenProp, NavigationState } from "react-navigation";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  imageSource: any;
}

interface State {
    imageSource: any;
}

export default class HealthReportsAll extends React.Component<Props, State> {
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, alignItems: "center" }}>
        <Image 
                source={require("../images/Health.png")}
               /> 
        {/* <Image 
                source={this.props.imageSource}
               />      */}
        </View>
      </View>
    );
  }
}
