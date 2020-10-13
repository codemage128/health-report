import React from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { styles } from "../styles/styles";
import { connect } from "react-redux";
import { setSearchQuery } from "../actions/setSearchQuery";
import ModalSelector from "react-native-modal-selector";
import { withNavigation, NavigationScreenProp, NavigationState } from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  setSearchQuery: typeof setSearchQuery;
}

interface State {
  text: string;
  unit: string;
  time: string;
  timing: string;
}

class AddHistoryPageGlucoseProps extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      time: "Breakfast",
      timing: "Before meal",
      unit: this.props.navigation.state.params.unit
        ? this.props.navigation.state.params.unit
        : "-"
    };
  }

  setText(text) {
    this.setState({ text });
    let calculated;
    if (this.state.unit == "mg/dl") {
      calculated = text / 18;
      calculated = Math.round(calculated * 100) / 100;
      this.props.navigation.setParams({
        writtingText: calculated
      });
    } else {
      this.props.navigation.setParams({
        writtingText: text
      });
    }
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
    let index = 0;

    const data = [
      { key: index++, section: true, label: "Select time" },
      { key: index++, label: "Breakfast" },
      { key: index++, label: "Lunch" },
      { key: index++, label: "Dinner" },
      { key: index++, label: "Bedtime" }

      // etc...
      // Can also add additional custom keys which are passed to the onChange callback
    ];
    const data2 = [
      { key: index++, section: true, label: "Before/After Meal" },
      { key: index++, label: "Before meal" },
      { key: index++, label: "After meal" }

      // etc...
      // Can also add additional custom keys which are passed to the onChange callback
    ];
    const dataUnit = [
      { key: index++, section: true, label: "Select unit" },
      { key: index++, label: this.props.navigation.state.params.unit },
      { key: index++, label: "mg/dl" }
    ];

    return (
      <View>
        <Text style={styles.addPageGlucose}>
          {this.props.navigation.state.params.title}
        </Text>
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
        <ModalSelector
          data={dataUnit}
          initValue={this.props.navigation.state.params.unit}
          style={{
            width: "90%",
            alignSelf: "center",
            marginTop: 20
          }}
          onChange={option => {
            if (this.state.unit != option.label) {
              this.setState({ text: "", unit: option.label });
              this.props.navigation.setParams({
                writtingText: null
              });
            }
          }}
        />
        <Text style={styles.addPageGlucose}>Time</Text>
        <TouchableOpacity>
          <View style={styles.glucoseAddHistoryElements}>
            <View style={styles.center}>
              <ModalSelector
                data={data}
                initValue="Select time"
                style={{
                  width: "90%",
                  alignSelf: "center"
                }}
                onChange={option => {
                  if (option.label == "Bedtime") {
                    this.setState({ time: option.label, timing: option.label });
                    this.props.navigation.setParams({
                      time: option.label,
                      timing: option.label
                    });
                  } else {
                    this.setState({ time: option.label });
                    this.props.navigation.setParams({
                      time: option.label
                    });
                    if (this.state.timing == "Bedtime") {
                      this.setState({ timing: "Before meal" });
                    }
                  }
                }}
              />
            </View>
          </View>
        </TouchableOpacity>
        {this.state.timing != "Bedtime" && (
          <View>
            <Text style={styles.addPageGlucose}>Timing</Text>
            <TouchableOpacity>
              <View style={styles.glucoseAddHistoryElements}>
                <View style={styles.center}>
                  <ModalSelector
                    data={data2}
                    initValue="Select timing"
                    style={{
                      width: "90%",
                      alignSelf: "center"
                    }}
                    onChange={option => {
                      this.setState({ timing: option.label });
                      this.props.navigation.setParams({
                        timing: option.label
                      });
                    }}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
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
const AddHistoryPageGlucose = connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(AddHistoryPageGlucoseProps));

export default AddHistoryPageGlucose;
