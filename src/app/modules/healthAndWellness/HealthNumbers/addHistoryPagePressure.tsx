import React from "react";
import {
  Text,
  View,
  TextInput,
} from "react-native";
import { styles } from "../styles/styles";
import { connect } from "react-redux";
import { setSearchQuery } from "../actions/setSearchQuery";
import { withNavigation, NavigationScreenProp, NavigationState } from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  setSearchQuery: typeof setSearchQuery;
}

interface State {
  text: string;
  text2: string;
  time: string;
  timing: string;
}

class AddHistoryPagePressureProps extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      text2: "",
      time: "",
      timing: ""
    };
  }

  setText(text) {
    this.setState({ text });
    this.props.navigation.setParams({
      writtingText: text
    });
  }
  setText2(text2) {
    this.setState({ text2 });
    this.props.navigation.setParams({
      writtingText2: text2
    });
  }
  componentDidMount() {
    this.setSearchQuery(this.props.navigation.state.params.paramName);
    this.props.navigation.setParams({
      time: this.state.time
    });
    this.props.navigation.setParams({
      timing: this.state.timing
    });
  }
  setSearchQuery = searchQuery => {
    this.props.setSearchQuery(searchQuery);
  };
  componentWillMount() {
    this.setSearchQuery("");
  }
  componentWillUnmount() {
    this.setSearchQuery("update");
  }
  render() {
    return (
      <View>
        <Text style={styles.addPageGlucose}>Systolic blood pressure</Text>
        <TextInput
          style={{
            height: 40,
            borderColor: "lightgrey",
            borderBottomWidth: 1,
            width: "90%",
            alignSelf: "center"
          }}
          onChangeText={text => {
            this.setText(text);
          }}
          autoFocus={true}
          keyboardType={"phone-pad"}
          value={this.state.text}
        />
        <Text style={styles.unit}>
          {this.props.navigation.state.params.unit}
        </Text>
        <Text style={styles.addPageGlucose}>Diastolic blood pressure</Text>
        <TextInput
          style={{
            height: 40,
            borderColor: "lightgrey",
            borderBottomWidth: 1,
            width: "90%",
            alignSelf: "center"
          }}
          onChangeText={text2 => {
            this.setText2(text2);
          }}
          keyboardType={"phone-pad"}
          value={this.state.text2}
        />
        <Text style={styles.unit}>
          {this.props.navigation.state.params.unit}
        </Text>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  nav: state.search
});
const mapDispatchToProps = dispatch => {
  return {
    dispatch,

    setSearchQuery: searchQuery => dispatch(setSearchQuery(searchQuery))
  };
};
const AddHistoryPagePressure = connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(AddHistoryPagePressureProps));

export default AddHistoryPagePressure;
