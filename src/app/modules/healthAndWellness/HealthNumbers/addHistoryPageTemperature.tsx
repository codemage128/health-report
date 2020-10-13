import React from "react";
import {
  Text,
  View,
  TextInput,
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
    let index = 0;

    const data = [
      { key: index++, section: true, label: "Select bodyparts" },
      { key: index++, label: "Orally" },
      { key: index++, label: "Rectally" },
      { key: index++, label: "Axillary" },
      { key: index++, label: "Ear" },
      { key: index++, label: "Forehead" }
    ];
    return (
      <View>
        <Text style={styles.addPageGlucose}>Body parts</Text>
        <ModalSelector
          data={data}
          initValue="Select body parts"
          style={{
            width: "90%",
            alignSelf: "center",
            marginTop: 20
          }}
          onChange={option => {
            this.setState({ text2: option.label });
            this.props.navigation.setParams({
              writtingText2: option.label
            });
          }}
        />

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
          keyboardType={"phone-pad"}
          value={this.state.text}
        />
        <Text style={styles.unit}>celcius</Text>
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
