import React from "react";
import {
  Text,
  View,
  TextInput
} from "react-native";
import { styles } from "../styles/styles";
import { connect } from "react-redux";
import { setSearchQuery } from "../actions/setSearchQuery";
import PropTypes from "prop-types";
import ModalSelector from "react-native-modal-selector";
import { withNavigation, NavigationScreenProp, NavigationState } from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  setSearchQuery: typeof setSearchQuery;
}

interface State {
  text: string;
  unit: string;
}

class AddHistoryPageProps extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      unit: this.props.navigation.state.params.unit
        ? this.props.navigation.state.params.unit
        : "-"
    };
  }
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.setSearchQuery(this.props.navigation.state.params.paramName);
  }
  setText(text) {
    this.setState({ text });
    let calculated;
    if (
      this.state.unit == "lbs" &&
      this.props.navigation.state.params.unit == "kg"
    ) {
      calculated = text * (1 / 2.20462);
      calculated = Math.round(calculated * 100) / 100;
      this.props.navigation.setParams({
        writtingText: calculated
      });
    } else if (
      this.state.unit == "cm" &&
      this.props.navigation.state.params.unit == "in"
    ) {
      calculated = text / 2.54;
      calculated = Math.round(calculated * 100) / 100;
      this.props.navigation.setParams({
        writtingText: calculated
      });
    } else if (
      this.state.unit == "mg/dl" &&
      this.props.navigation.state.params.unit == "mmol/L"
    ) {
      if (this.props.navigation.state.params.paramName == "Triglyceride") {
        calculated = text / 88.57;
        calculated = Math.round(calculated * 100) / 100;
        this.props.navigation.setParams({
          writtingText: calculated
        });
      } else if (this.props.navigation.state.params.paramName == "Uricacid") {
        calculated = text / 16.811;
        calculated = Math.round(calculated * 100) / 100;
        this.props.navigation.setParams({
          writtingText: calculated
        });
      } else {
        calculated = text / 38.67;
        calculated = Math.round(calculated * 100) / 100;
        this.props.navigation.setParams({
          writtingText: calculated
        });
      }
    } else {
      this.props.navigation.setParams({
        writtingText: text
      });
    }
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
    let data;

    data = [
      { key: index++, section: true, label: "Select unit" },
      { key: index++, label: this.props.navigation.state.params.unit },
      { key: index++, label: this.props.navigation.state.params.unit2 }
    ];

    return (
      <View>
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
        {this.props.navigation.state.params.unit2 == "-" && (
          <Text style={styles.unit}>
            {this.props.navigation.state.params.unit}
          </Text>
        )}
        {this.props.navigation.state.params.unit2 != "-" && (
          <ModalSelector
            data={data}
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
const AddHistoryPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(withNavigation(AddHistoryPageProps));

export default AddHistoryPage;
