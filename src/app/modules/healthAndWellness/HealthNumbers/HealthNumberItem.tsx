import React from "react";
import {
  Text,
  Image,
  TouchableOpacity
} from "react-native";
import { styles } from "../styles/styles";
import { withNavigation, NavigationScreenProp, NavigationState } from "react-navigation";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  title: string;
  elements;
  imageSource;
}

interface State {
}

class HealthNumberItem extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  render() {
    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate("HealthNumbersAllElements", {
            title: this.props.title,
            elements: this.props.elements
          })
        }
        style={styles.healthItemContainer}
      >
        <Image
          style={styles.healthItemsImage}
          source={this.props.imageSource}
        />
        <Text style={styles.healthItemsTitle}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}
export default withNavigation(HealthNumberItem);
