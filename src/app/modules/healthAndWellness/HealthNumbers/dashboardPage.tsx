import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";
import Chart from "./Chart";
import { styles } from "../styles/styles";
import { NavigationScreenProp, NavigationState } from "react-navigation";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

interface State {
}

export default class DashboardPage extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      text: ""
    };
  }
  saveDetails() {
    alert(this.props.navigation.state.params.writtingText);
  }

  componentDidMount() {
    this.props.navigation.setParams({ handleSave: this.saveDetails });
  }
  setText(text) {
    this.setState({ text });
    this.props.navigation.setParams({
      writtingText: text
    });
  }
  render() {
    return (
      <ScrollView>
        {this.props.navigation.state.params.paramName == "Bloodglucose" && (
          <Chart isBloodGlucose={true} navigation={this.props.navigation} />
        )}
        {this.props.navigation.state.params.paramName == "Bloodpressure" && (
          <Chart isBloodPressure={true} navigation={this.props.navigation} />
        )}
        {this.props.navigation.state.params.paramName != "Bloodglucose" &&
          this.props.navigation.state.params.paramName != "Bloodpressure" && (
            <Chart navigation={this.props.navigation} />
          )}
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("HistoryPage", {
              title: this.props.navigation.state.params.title,
              unit: this.props.navigation.state.params.unit,
              paramName: this.props.navigation.state.params.paramName
            })
          }
        >
          <View style={styles.dashboardElements}>
            <View style={styles.center}>
              <Text style={styles.dashboardElementLeft}>History</Text>
            </View>
            <View style={styles.center}>
              <Text style={styles.dashboardElementRight}>
                {"  "}
                <Image
                  source={require("../images/arrow.png")}
                  style={styles.arrow}
                />
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.dashboardElements}>
          <View style={styles.center}>
            <Text style={styles.dashboardElementLeft}>Display unit</Text>
          </View>
          <View style={styles.center}>
            <Text style={styles.dashboardElementRight}>
              {this.props.navigation.state.params.unit}
              {"  "}
              <Image
                source={require("../images/arrow.png")}
                style={styles.arrow}
              />
            </Text>
          </View>
        </View>
        {this.props.navigation.state.params.paramName == "Bloodglucose" && (
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("ComparisonGraph", {
                title: this.props.navigation.state.params.title,
                unit: this.props.navigation.state.params.unit,
                paramName: this.props.navigation.state.params.paramName
              })
            }
          >
            <View style={styles.dashboardElements}>
              <View style={styles.center}>
                <Text style={styles.dashboardElementLeft}>
                  Comparison Graph
                </Text>
              </View>
              <View style={styles.center}>
                <Text style={styles.dashboardElementRight}>
                  {"  "}
                  <Image
                    source={require("../images/arrow.png")}
                    style={styles.arrow}
                  />
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </ScrollView>
    );
  }
}
