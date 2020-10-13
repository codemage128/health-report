
import React ,{Component} from 'react';
import {Alert, Button, Text, View, FlatList, Image, TouchableOpacity,} from "react-native";

import { styles } from "../styles/styles";
import { format } from "date-fns";
import HelathReportItem from "./HealthReprotItem"
import ListItem from "./ListItem"
const currentDate = new Date();

let elements = [
  {
    title: "Report 1",
    image: require("../images/Health.png"),    
    isLast: false
  },
  {
    title: "Report 2",
    image: require("../images/Health.png"),    
    isLast: false
  },
  {
    title: "Report 3",
    image: require("../images/Health.png"),    
    isLast: false
  },
  {
    title: "Report 4",
    image: require("../images/Health.png"), 
    isLast:false   
  },
  {
    title:"Add New",
    image: require("../images/Plus.png"),
    isLast: true
  }
  
];
export default class HealthReports extends Component {
  
  state = {
    show: true,
  };
  ShowHideComponent = () => {
    if (this.state.show == true) {
      this.setState({ show: false });
    } else {
      this.setState({ show: true });
    }
  };
 
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.healthNumberTitle}>Health </Text>
          <Text style={styles.healthNumberTitle}>Reports</Text>
          <Text style={styles.date}>
            Today {format(currentDate, "DD MMMM, YYYY")}
          </Text>

          <TouchableOpacity  onPress={this.ShowHideComponent}>
           {this.state.show ? (
             <Image style={{width: 25, height: 25, resizeMode: "contain", position: "absolute", right: 30, top: -20}} source={require('../images/health-numbers-icon-09.png')} />                
             ) : <Image style={{width: 25, height: 25, resizeMode: "contain", position: "absolute", right: 30, top: -20}} source={require('../images/health-numbers-icon-08.png')} />}
           </TouchableOpacity>
        </View>
        <View style={{ flex: 1, marginTop: 20}}>
          {this.state.show ? (
            <View>
              <FlatList
                keyExtractor={(item, index) => item.title}
                data={elements}
                horizontal={false}
                numColumns={1}
                renderItem={({ item }) => (          
                    <ListItem      
                      imageSource={item.image}     
                      title={item.title}
                      date={currentDate}  
                      isLast = {item.isLast}                  
                    />        
                )}
                />
              {/* <ListItem title="title" date ="currentDate" isLast = "true"/> */}
            </View>         
             
        ) :        
         null}
          {this.state.show ? (null):
          <View style={{ alignItems:"center"}}>
            <FlatList
                  keyExtractor={(item, index) => item.title}
                  data={elements}
                  horizontal={false}
                  numColumns={3}
                  renderItem={({ item }) => (
                    <View style={styles.flatListItems}>
                      <HelathReportItem
                        imageSource={item.image}
                        title={item.title}
                        date={currentDate}
                        isLast = {item.isLast}
                      />
                    </View>
                  )}
                />
                
          </View>
          
          }
        </View>
      </View>       
      
    );
  }
}
