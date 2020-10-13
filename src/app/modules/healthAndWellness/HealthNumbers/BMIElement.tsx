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
  height: number;
  weight: number;
}

class HealthNumberItemProps extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      height: 0,
      weight: 0
    };
  }
  componentWillMount() {
    AsyncStorage.getItem(this.props.paramName).then(data => {
      if (data != null) {
        let parsed = JSON.parse(data);

        //  console.log("data", parsed[0].value);
        if (parsed.length > 0) {
          this.setState({ value: parsed[0].value });
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
  getHeight() {
    AsyncStorage.getItem("Height").then(data => {
      if (data != null) {
        let parsed = JSON.parse(data);

        //  console.log("data", parsed[0].value);
        if (parsed.length > 0) {
          this.setState({ height: parsed[0].value });
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

  getWeight() {
    AsyncStorage.getItem("Weight").then(data => {
      if (data != null) {
        let parsed = JSON.parse(data);

        //  console.log("data", parsed[0].value);
        if (parsed.length > 0) {
          this.setState({ weight: parsed[0].value });
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
      if (data != null) {
        let parsed = JSON.parse(data);
        //console.log("data", parsed[0].value);
        if (parsed.length > 0) {
          this.setState({ value: parsed[0].value });
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
            <Text
              style={[
                styles.AllItemsTitle,
                {
                  color:
                    (this.state.value < 18.4 || this.state.value >= 27.5) &&
                    this.state.value != 0 &&
                    this.state.value != null
                      ? "#C4005C"
                      : "#666666"
                }
              ]}
            >
              {this.props.title}
              {this.state.value < 18.4 &&
              this.state.value != "-" &&
              this.state.value != 0 &&
              this.state.value != null
                ? " (underweight)"
                : ""}
              {this.state.value >= 27.5 &&
              this.state.value != "-" &&
              this.state.value != 0 &&
              this.state.value != null
                ? " (overweight)"
                : ""}
            </Text>
            <View
              style={[
                styles.lineBottom,
                {
                  borderColor:
                    (this.state.value < 18.4 || this.state.value >= 27.5) &&
                    this.state.value != 0 &&
                    this.state.value != null
                      ? "#C4005C"
                      : "#16acb2"
                }
              ]}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              AsyncStorage.getItem(this.props.paramName).then(data => {
                if (data != null) {
                  let parsed = JSON.parse(data);
                  //console.log("data", parsed[0].value);
                  if (parsed.length > 0) {
                    this.setState({ value: parsed[0].value });
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
              this.props.navigation.navigate("DashboardPage", {
                title: this.props.title,
                unit: this.props.unit,
                paramName: this.props.paramName
              });
            }}
            style={styles.AllItemContainer}
          >
            <View
              style={[
                styles.elementsContainer,
                {
                  backgroundColor:
                    (this.state.value < 18.4 || this.state.value >= 27.5) &&
                    this.state.value != "-" &&
                    this.state.value != 0 &&
                    this.state.value != null
                      ? "#C4005C"
                      : "#008295"
                }
              ]}
            >
              <View style={styles.center}>
                {(this.state.value == 0 ||
                  this.state.value == "-" ||
                  this.state.value == null) && (
                  <Image
                    style={styles.addImage}
                    source={require("../images/health-numbers-icon-01.png")}
                  />
                )}
                {this.state.value != 0 &&
                  this.state.value != "-" &&
                  this.state.value != null && (
                    <Text style={styles.latestReading}>
                      {this.state.value != "-" && this.state.value != "-"
                        ? this.state.value
                        : ""}{" "}
                      <Text style={styles.latestUnitReading}>
                        {this.props.unit == "-" ? "" : this.props.unit}
                      </Text>
                    </Text>
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
