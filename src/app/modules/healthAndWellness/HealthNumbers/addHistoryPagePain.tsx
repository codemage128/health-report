import React from "react";
import {
  Text,
  View,
  Slider
} from "react-native";
import { styles } from "../styles/styles";
import { connect } from "react-redux";
import { setSearchQuery } from "../actions/setSearchQuery";
import PropTypes from "prop-types";
import { withNavigation, NavigationScreenProp, NavigationState } from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  setSearchQuery: typeof setSearchQuery;
}

interface State {
  text;
  unit: string;
}

class AddHistoryPageProps extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      text: 0,
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
    this.props.navigation.setParams({
      writtingText: this.state.text
    });
  }
  setText(text) {
    this.setState({ text });

    this.props.navigation.setParams({
      writtingText: text
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
        <Text style={styles.addPageGlucose}>Score:{this.state.text}</Text>
        <Slider
          style={{ width: 300, paddingTop: 50 }}
          step={1}
          minimumValue={0}
          maximumValue={10}
          onValueChange={text => this.setText(text)}
        />
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
