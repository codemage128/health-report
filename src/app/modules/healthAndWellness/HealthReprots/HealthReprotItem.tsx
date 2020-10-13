import React from "react";
import {
  Text,
  Image,
  TouchableOpacity
} from "react-native";
import { styles } from "../styles/styles";
import { withNavigation, NavigationScreenProp, NavigationState } from "react-navigation";
import { format } from 'date-fns';

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  title: string;
  imageSource: any;
  date: Date;
  isLast: boolean;
}

interface State {
  isLast: boolean;
}

class HealthReportItem extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isLast: this.props.isLast,
    }
  }

  _renderCancel() {
    if (this.props.isLast) {
      return (<TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate("UploadReport", {
            title: "Upload Report"
          })
        }
        style={{...styles.healthReportItemContainer, borderStyle: 'dashed'}}
      >
        <Image
          style={{...styles.healthReportItemImage, marginTop: 14}}
          source={this.props.imageSource}
        />      
      </TouchableOpacity>);
      
    }else{
      return(<TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate("HealthReportsAll", {
            title: this.props.title ,
            imageSource: this.props.imageSource     
          })
        }
        style={styles.healthReportItemContainer}
      >
        <Image
          style={styles.healthReportItemImage}
          source={this.props.imageSource}
        />
        <Text style={styles.healthReportItemTitle}>{this.props.title}</Text>
        <Text style={styles.healthReportItemDate}>
             {format(this.props.date, "DD MMMM, YYYY")}
        </Text>
      </TouchableOpacity>
      );
      
    }
  }
  render() {
    return (
      this._renderCancel()
    );
  }
}
export default withNavigation(HealthReportItem);
