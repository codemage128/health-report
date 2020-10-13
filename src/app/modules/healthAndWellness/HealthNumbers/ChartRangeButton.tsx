import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { styles } from "../styles/styles";

interface Props {
  activeText: string;
  text: string;
  onPressHandler: () => void;
}

interface State {
}

export default class ChartRangeButton extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          style={styles.chartButton}
          onPress={this.props.onPressHandler}
        >
          <Text
            style={
              this.props.activeText === this.props.text
                ? styles.chartCategoryActive
                : styles.chartCategoryInactive
            }
          >
            {this.props.text}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
