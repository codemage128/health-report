import React from "react";
import {
  Text,
  Image,
  TouchableOpacity, View
} from "react-native";
import { styles } from "../styles/styles";
import { withNavigation, NavigationScreenProp, NavigationState } from "react-navigation";
import { format } from 'date-fns';

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  title: string;
  date: Date; 
  imageSource;
  isLast: boolean;
}

interface State {
  isLast: boolean;
}

class ListItem extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
        isLast: this.props.isLast,
    }
  }
  

  _renderCancel() {
    if (this.props.isLast) {
        return (
            <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("UploadReport", {
                title: "Upload Report"    
              })
            }
            style={ {flexDirection: "row",
      
            borderBottomWidth: 0.5,
            borderTopWidth: 0.5,
            borderTopColor: "#D3D3D3",
            borderBottomColor: "#D3D3D3",
            padding: 20}}
          >       
            <Text style={{color: "#3D3D3D"}}>New Document</Text>                     
            <Image
                source={require("../images/arrow.png")}
                style={{...styles.arrow, position:"absolute", right: 20, top: 20}}
            />
          </TouchableOpacity>
        );
    } else {
        return (
            <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("HealthReportsAll", {
                title: this.props.title,
                imageSource: this.props.imageSource
              })
            }
            style={ {flexDirection: "row",
      
            borderBottomWidth: 0.5,
            borderTopWidth: 0.5,
            borderTopColor: "#D3D3D3",
            borderBottomColor: "#D3D3D3",
            padding: 20}}
          >       
            <Text style={{color: "#3D3D3D"}}>{this.props.title}({format(this.props.date, "DD MMMM, YYYY")})</Text>                     
            <Image
                source={require("../images/arrow.png")}
                style={{...styles.arrow, position:"absolute", right: 20, top: 20}}
            />
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
export default withNavigation(ListItem);
