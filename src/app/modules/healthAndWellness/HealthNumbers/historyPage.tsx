import React from "react";
import {
  AsyncStorage,
  Text,
  View,
  FlatList,
} from "react-native";
import { styles } from "../styles/styles";
import { format } from "date-fns";
import { NavigationScreenProp, NavigationState } from "react-navigation";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

interface State {
  array;
}

export default class HistoryPage extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      array: []
    };
  }

  componentDidMount() {
    AsyncStorage.getItem(this.props.navigation.state.params.paramName).then(
      data => {
        if (data != null) {
          let parsed = JSON.parse(data);
          //console.log("data", parsed[0].y);
          if (parsed.length > 0) {
            this.setState({ array: parsed });
          }
        }
      }
    );
  }

  render() {
    return (
      <View>
        <FlatList
          keyExtractor={(item: HealthNumberItemRecord, index) => item.key}
          data={this.state.array}
          renderItem={({ item }) => (
            <View>
              {item.value != "-" && (
                <View style={styles.dashboardElements}>
                  <View style={styles.center}>
                    {this.props.navigation.state.params.paramName !=
                      "Bloodpressure" && (
                      <Text style={styles.dashboardElementLeft}>
                        {item.value ? item.value : ""}
                        {item.valueTwo ? item.valueTwo : ""}{" "}
                        {this.props.navigation.state.params.unit != "-"
                          ? this.props.navigation.state.params.unit
                          : ""}{" "}
                        {item.textOption ? item.textOption : ""}
                      </Text>
                    )}
                    {this.props.navigation.state.params.paramName ==
                      "Bloodpressure" && (
                      <Text style={styles.dashboardElementLeft}>
                        {item.value ? item.value : ""}/
                        {item.valueTwo ? item.valueTwo : ""}{" "}
                        {this.props.navigation.state.params.unit != "-"
                          ? this.props.navigation.state.params.unit
                          : ""}{" "}
                        {item.textOption ? item.textOption : ""}
                      </Text>
                    )}
                  </View>
                  <View style={styles.center}>
                    <Text style={styles.dashboardElementRight}>
                      {format(item.createdAt, "DD MMM  YYYY")}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          )}
        />
      </View>
    );
  }
}
