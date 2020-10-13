import React from "react";
import { View, FlatList } from "react-native";
import { styles } from "../styles/styles";
import AllElements from "./AllElements";
import BMIElement from "./BMIElement";
import GlucoseElements from "./GlucoseElements";
import PressureElements from "./PressureElements";
import { NavigationScreenProp, NavigationState } from "react-navigation";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
}

interface State {
  elements: HealthNumberItem;
}

export default class HealthNumbers extends React.Component<Props, State> {
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <FlatList
            keyExtractor={(item: HealthNumberItem, index) => item.key}
            data={
              this.props.navigation.state.params.elements.length == 1
                ? this.props.navigation.state.params.elements.concat([
                    {
                      title: "-",
                      unit: "-",
                      paramName: "-"
                    }
                  ])
                : this.props.navigation.state.params.elements
            }
            horizontal={false}
            numColumns={2}
            renderItem={({ item }: {item: HealthNumberItem}) => (
              <View>
                <View
                  style={{
                    marginTop: 0,
                    marginBottom: 0
                  }}
                >
                  {item.paramName == "BMI" && (
                    <BMIElement
                      title={item.title}
                      unit={item.unit}
                      paramName={item.paramName}
                    />
                  )}
                  {item.paramName == "Bloodglucose" && (
                    <GlucoseElements
                      title={item.title}
                      unit={item.unit}
                      paramName={item.paramName}
                    />
                  )}
                  {item.paramName == "Bloodpressure" && (
                    <PressureElements
                      title={item.title}
                      unit={item.unit}
                      paramName={item.paramName}
                    />
                  )}
                  {item.paramName != "BMI" &&
                    item.paramName != "Bloodglucose" &&
                    item.paramName != "Bloodpressure" && (
                      <AllElements
                        title={item.title}
                        unit={item.unit}
                        unit2={item.unit2 ? item.unit2 : "-"}
                        paramName={item.paramName}
                      />
                    )}
                </View>
              </View>
            )}
          />
        </View>
      </View>
    );
  }
}
