import React from "react";
import { ScrollView, Text, View } from "react-native";
import { styles } from "../styles/styles";
import Chart from "./Chart";
import { NavigationScreenProp, NavigationState } from "react-navigation";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

interface State {
}

export default class ComparisonGraph extends React.Component<Props, State> {
  render() {
    return (
      <ScrollView>
        <Chart
          isBloodGlucoseComparisonGraph={true}
          navigation={this.props.navigation}
        />
        <View style={styles.comparisonContainer}>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                height: 20,
                width: 20,
                borderRadius: 20,
                backgroundColor: "#008295",
                marginRight: 10
              }}
            />
            <Text style={{ color: "#008295" }}>Before Meal</Text>
          </View>
          <View style={{ flexDirection: "row", paddingTop: 10 }}>
            <View
              style={{
                height: 20,
                width: 20,
                borderRadius: 20,
                backgroundColor: "#C4005C",
                marginRight: 10
              }}
            />
            <Text style={{ color: "#C4005C" }}>After Meal</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}
