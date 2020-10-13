import React from "react";
import {
  AsyncStorage,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { styles } from "../styles/styles";
import { withNavigation, NavigationScreenProp, NavigationState } from "react-navigation";
const currentDate = new Date();
import { connect } from "react-redux";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  paramName: string;
  title: string;
  unit: string;
}

interface State {
  value;
  valueTwo;
}

class HealthNumberItemProps extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      valueTwo: ""
    };
  }
  componentWillMount() {
    AsyncStorage.getItem(this.props.paramName).then(data => {
      if (data) {
        let parsed = JSON.parse(data);

        if (parsed.length > 0) {
          var value = parsed.find(function(element) {
            return (
              element.textOption != "Bedtime" &&
              element.value != 0 &&
              element.value != "-"
            );
          });
          var valueTwo = parsed.find(function(element) {
            return element.valueTwo != 0 && element.valueTwo != "-";
          });
          this.setState({ value: value.value });
          let finalValue = valueTwo.valueTwo;

          this.setState({ valueTwo: valueTwo.valueTwo });
        } else {
          AsyncStorage.setItem(
            this.props.paramName,
            JSON.stringify([
              {
                createdAt: currentDate,
                value: "-"
              }
            ]),
            err => {}
          );
        }
      } else {
        AsyncStorage.setItem(
          this.props.paramName,
          JSON.stringify([
            {
              createdAt: currentDate,
              value: "-"
            }
          ]),
          err => {}
        );
      }
    });
  }
  componentWillReceiveProps(nextProps) {
    AsyncStorage.getItem(this.props.paramName).then(data => {
      if (data) {
        console.log("data:", data);
        let parsed = JSON.parse(data);

        if (parsed.length > 0) {
          var value = parsed.find(function(element) {
            return (
              element.textOption != "Bedtime" &&
              element.value != 0 &&
              element.value != "-"
            );
          });
          var valueTwo = parsed.find(function(element) {
            return element.valueTwo != 0 && element.valueTwo != "-";
          });
          let firstValue = value.value;
          if (firstValue) {
            this.setState({ value: firstValue });
          }
          let finalValue = valueTwo.valueTwo;
          if (finalValue) {
            this.setState({ valueTwo: finalValue });
          }
        } else {
          AsyncStorage.setItem(
            this.props.paramName,
            JSON.stringify([
              {
                createdAt: currentDate,
                value: "-"
              }
            ]),
            err => {}
          );
        }
      } else {
        AsyncStorage.setItem(
          this.props.paramName,
          JSON.stringify([
            {
              createdAt: currentDate,
              value: "-"
            }
          ]),
          err => {}
        );
      }
    });
  }

  render() {
    console.log("value1:", this.state.value);
    console.log("value2:", this.state.valueTwo);
    if (this.props.title == "-") {
      return (
        <View>
          <View style={{ flex: 1, paddingBottom: 15 }} />
          <TouchableOpacity style={styles.AllItemContainer}>
            <View style={styles.elementsContainerEmpty} />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View>
          <View style={{ flex: 1, paddingBottom: 15 }}>
            <Text style={styles.AllItemsTitle}>{this.props.title}</Text>
            <View style={styles.lineBottom} />
          </View>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("DashboardPage", {
                title: this.props.title,
                unit: this.props.unit,
                paramName: this.props.paramName
              });
            }}
            style={styles.AllItemContainer}
          >
            <View style={styles.elementsContainer}>
              <View style={styles.center}>
                {(this.state.value == "" || this.state.value == "-") &&
                  this.state.value == 0 && (
                    <Image
                      style={styles.addImage}
                      source={require("../images/health-numbers-icon-01.png")}
                    />
                  )}

                {this.state.value != "" &&
                  this.state.value != "-" &&
                  this.state.value != 0 && (
                    <View>
                      <Text style={styles.latestReading}>
                        {this.state.value}{" "}
                        <Text style={styles.latestUnitReading}>
                          {this.props.unit == "-" ? "" : this.props.unit}
                        </Text>
                      </Text>
                      <Text style={styles.latestReadingTitle}>
                        (Before Meal)
                      </Text>
                    </View>
                  )}
                {this.state.value != "" &&
                  this.state.value != "-" &&
                  this.state.valueTwo != undefined &&
                  this.state.valueTwo != null &&
                  this.state.valueTwo != 0 &&
                  this.state.valueTwo != "" &&
                  this.state.valueTwo != "-" && (
                    <View style={styles.unitBorder} />
                  )}
                {this.state.valueTwo != undefined &&
                  this.state.valueTwo != null &&
                  this.state.valueTwo != 0 &&
                  this.state.valueTwo != "" &&
                  this.state.valueTwo != "-" && (
                    <View>
                      <Text style={styles.latestReading}>
                        {this.state.valueTwo}{" "}
                        <Text style={styles.latestUnitReading}>
                          {this.props.unit == "-" ? "" : this.props.unit}
                        </Text>
                      </Text>
                      <Text style={styles.latestReadingTitle}>
                        (After Meal)
                      </Text>
                    </View>
                  )}
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  }
}
const mapStateToProps = state => ({
  nav: state.search
});
const HealthNumberItem = connect(
  mapStateToProps,
  null
)(withNavigation(HealthNumberItemProps));

export default HealthNumberItem;
