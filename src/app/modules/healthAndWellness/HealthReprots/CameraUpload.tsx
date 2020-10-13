import React from "react";
import { View, FlatList, Text,TouchableOpacity, Image, ActionSheetIOS } from "react-native";
import { styles } from "../styles/styles";
import Camera from 'react-native-camera';
import { NavigationScreenProp, NavigationState } from "react-navigation";

interface Props {
    navigation: NavigationScreenProp<NavigationState>;
}

interface State {

}
//type Props = {navigation: NavigationScreenProp<NavigationState>};
export default class CameraUpload extends React.Component<Props, State>{
  camera: any;
  
  takePicture() {
        this.camera
          .capture()
          .then((data) => console.log(data))
          .catch(err => console.error(err));
        
      }
  render() {
    return (
        <Camera
        ref={cam => {this.camera = cam}}
        style={styles.preview}
        aspect={Camera.constants.Aspect.fill}
      >
        <Text style={styles.capture} onPress={this.takePicture.bind(this)}>
          [CAPTURE]
        </Text>
      </Camera>
    );
  }
}
