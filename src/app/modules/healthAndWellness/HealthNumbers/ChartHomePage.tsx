import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { styles } from "../styles/styles";
import Chart from "./Chart";

export default class ChartHomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Chart />
        <TouchableOpacity style={{ ...styles.chartContainer, marginTop: 20 }}>
          <Text style={styles.chartContainerText}>History</Text>
          <Text style={styles.chartContainerText}>Icon</Text>
        </TouchableOpacity>
        <View style={{ ...styles.chartContainer, borderTopWidth: 0 }}>
          <Text style={styles.chartContainerText}>Display unit</Text>
          <Text style={styles.chartContainerText}>should be props</Text>
        </View>
        <TouchableOpacity
          style={{ ...styles.chartContainer, borderTopWidth: 0 }}
        >
          <Text style={styles.chartContainerText}>Comparison Graph</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
