import React from "react";
import { View, FlatList, Text,TouchableOpacity, Image, ActionSheetIOS } from "react-native";
import { styles } from "../styles/styles";

import { withNavigation, NavigationScreenProp, NavigationState } from "react-navigation";
import CameraUpload from "./CameraUpload"
interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

interface State {
  
}

class UploadTest extends React.Component<Props, State> {
  _onUploadButton(){
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel','Camera','PhotoLibrary','Document'],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex === 1) {
          /* destructive action */
          //alert("Hello");
          this.props.navigation.navigate("CameraUpload", {
            title: "Upload Picture"    
          });
        }
      },
    );    
    //Alert.alert("Function Without Argument");
    
  }

  render() {
    return (
      <View style={{ flex: 1,justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF',}}>
          <TouchableOpacity  onPress={this._onUploadButton}>
            <Image style={{alignSelf: "center"}} source={require('../images/health-numbers-icon-02.png')} />
          
            <Text style={{fontSize: 20, textAlign: 'center',  margin: 10,}}>Tap to {"\n"}add attachment!</Text>
            {/* <Text style={styles.instructions}>To get started, edit App.js</Text>
            <Text style={styles.instructions}>{instructions}</Text>  */}
           </TouchableOpacity>
        </View> 
    );
  }
}
export default withNavigation(UploadTest);