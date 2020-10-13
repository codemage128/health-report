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
  Feet;
  Inch;
}

class AddHistoryPageProps extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      Feet: "",
      Inch: "",
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

    this.props.navigation.setParams({
      writtingText: text
    });
  }
  setTextFeet(text) {
    this.setState({ Feet: text });
    let calculated;

    if (this.state.Inch != "") {
      calculated = text * 30.48 + this.state.Inch * 2.54;
      calculated = Math.round(calculated * 100) / 100;
      this.props.navigation.setParams({
        writtingText: calculated
      });
    } else {
      calculated = text * 30.48;
      calculated = Math.round(calculated * 100) / 100;
      this.props.navigation.setParams({
        writtingText: calculated
      });
    }
  }
  setTextInch(text) {
    this.setState({ Inch: text });
    let calculated;
    if (this.state.Feet != "") {
      calculated = this.state.Feet * 30.48 + text * 2.54;
      calculated = Math.round(calculated * 100) / 100;
      this.props.navigation.setParams({
        writtingText: calculated
      });
    } else {
      calculated = text * 2.54;
      calculated = Math.round(calculated * 100) / 100;
      this.props.navigation.setParams({
        writtingText: calculated
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
      { key: index++, label: "cm" },
      { key: index++, label: "ft & in" }
    ];

    return (
      <View>
        {this.state.unit == "cm" && (
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
        )}
        <View style={{ flexDirection: "row", paddingLeft: 20 }}>
          {this.state.unit != "cm" && (
            <View style={{ flexDirection: "row" }}>
              <TextInput
                style={{
                  height: 40,
                  borderColor: "lightgrey",
                  borderBottomWidth: 1,
                  width: "40%",
                  alignSelf: "center"
                }}
                onChangeText={text => {
                  this.setTextFeet(text);
                }}
                autoFocus={true}
                keyboardType={"phone-pad"}
                value={this.state.Feet}
              />
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignSelf: "center"
                }}
              >
                <Text>ft</Text>
              </View>
            </View>
          )}
          {this.state.unit != "cm" && (
            <View style={{ flexDirection: "row" }}>
              <TextInput
                style={{
                  height: 40,
                  borderColor: "lightgrey",
                  borderBottomWidth: 1,
                  width: "40%",
                  alignSelf: "center"
                }}
                onChangeText={text => {
                  this.setTextInch(text);
                }}
                keyboardType={"phone-pad"}
                value={this.state.Inch}
              />
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignSelf: "center"
                }}
              >
                <Text>in</Text>
              </View>
            </View>
          )}
        </View>
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
