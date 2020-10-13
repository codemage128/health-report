import HealthNumbers from "./HealthNumbers/HealthNumbers";
import AddHistoryPage from "./HealthNumbers/addHistoryPage";
import AddHistoryPagePain from "./HealthNumbers/addHistoryPagePain";
import AddHistoryPageHeight from "./HealthNumbers/addHistoryPageHeight";
import AddHistoryPageGlucose from "./HealthNumbers/addHistoryPageGlucose";
import AddHistoryPageTemperature from "./HealthNumbers/addHistoryPageTemperature";
import AddHistoryPagePressure from "./HealthNumbers/addHistoryPagePressure";
import HealthNumbersAllElements from "./HealthNumbers/HealthNumbersAllElements";
import DashboardPage from "./HealthNumbers/dashboardPage";
import HistoryPage from "./HealthNumbers/historyPage";
import ComparisonGraph from "./HealthNumbers/ComparisonGraph";
import React from "react";
import { View, Text, Button, AsyncStorage, Alert } from "react-native";
import { createStackNavigator , createMaterialTopTabNavigator} from "react-navigation";
import { Provider } from "react-redux";
import { createStore } from "redux";
import appReducer from "./redux";
import HealthReports from "./HealthReprots/HealthReports"
import Fitness from "./Fitness/Fitness"
const store = createStore(appReducer);
const currentDate = new Date();

const HealthNumbersNavigator = createStackNavigator({
  HealthNumbers: {
    screen: HealthNumbers,
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: "#00B6BA", textAlign: "center" },
      headerTitleStyle: {
        color: "#fff",
        textAlign: "center",
        alignSelf: "center"
      },
      headerTintColor: "white",
      title: "Health & Wellness"
    })
  },
  HealthNumbersAllElements: {
    screen: HealthNumbersAllElements,
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: "#00B6BA" },

      headerTitleStyle: {
        color: "#fff",
        textAlign: "center",
        alignSelf: "center"
      },
      headerRight: <View />,
      headerTintColor: "white",
      title: navigation.state.params.title
    })
  },
  ComparisonGraph: {
    screen: ComparisonGraph,
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: "#00B6BA" },

      headerTitleStyle: {
        color: "#fff",
        textAlign: "center",
        alignSelf: "center"
      },
      headerRight: <View />,
      headerTintColor: "white",
      title: "Comparison Graph"
    })
  },
  AddHistoryPage: {
    screen: AddHistoryPage,
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: "#00B6BA" },

      headerTitleStyle: {
        color: "#fff",
        textAlign: "center",
        alignSelf: "center"
      },
      headerRight: (
        <Text
          style={{ paddingRight: 20, color: "white" }}
          onPress={() => {
            AsyncStorage.getItem(navigation.state.params.paramName).then(
              data => {
                if (
                  !navigation.state.params.writtingText ||
                  navigation.state.params.writtingText == null
                ) {
                  alert("Field cannot be blank");
                } else {
                  if (data != null) {
                    let parsed = JSON.parse(data);
                    let saveData = [
                      {
                        createdAt: currentDate,
                        value: navigation.state.params.writtingText
                      }
                    ].concat(parsed);

                    if (parsed[0].value == "-") {
                      saveData = [
                        {
                          createdAt: currentDate,
                          value: navigation.state.params.writtingText
                        }
                      ];
                    }

                    AsyncStorage.setItem(
                      navigation.state.params.paramName,
                      JSON.stringify(saveData),
                      err => {}
                    );
                    Alert.alert("Data saved");

                    if (navigation.state.params.paramName == "Height") {
                      AsyncStorage.getItem("Weight").then(data => {
                        if (data != null) {
                          let parsed = JSON.parse(data);
                          let bmi =
                            Math.round(
                              (parsed[0].value /
                                ((navigation.state.params.writtingText / 100) *
                                  (navigation.state.params.writtingText /
                                    100))) *
                                10
                            ) / 10;
                          let saveData = [
                            {
                              createdAt: currentDate,
                              value: bmi
                            }
                          ].concat(parsed);

                          if (parsed[0].value == "-") {
                            saveData = [
                              {
                                createdAt: currentDate,
                                value: bmi
                              }
                            ];
                          }

                          AsyncStorage.setItem(
                            "BMI",
                            JSON.stringify(saveData),
                            err => {}
                          );
                        }
                      });
                    }

                    if (navigation.state.params.paramName == "Weight") {
                      AsyncStorage.getItem("Height").then(data => {
                        if (data != null) {
                          let parsed = JSON.parse(data);
                          let bmi =
                            Math.round(
                              (navigation.state.params.writtingText /
                                ((parsed[0].value / 100) *
                                  (parsed[0].value / 100))) *
                                10
                            ) / 10;
                          let saveData = [
                            {
                              createdAt: currentDate,
                              value: bmi
                            }
                          ].concat(parsed);

                          if (parsed[0].value == "-") {
                            saveData = [
                              {
                                createdAt: currentDate,
                                value: bmi
                              }
                            ];
                          }

                          AsyncStorage.setItem(
                            "BMI",
                            JSON.stringify(saveData),
                            err => {}
                          );
                        }
                      });
                    }
                  } else {
                    AsyncStorage.setItem(
                      navigation.state.params.paramName,
                      JSON.stringify([
                        {
                          createdAt: currentDate,
                          value: navigation.state.params.writtingText
                        }
                      ]),
                      err => {}
                    );
                    Alert.alert("Data saved");
                  }
                }
              }
            );
          }}
        >
          Save
        </Text>
      ),
      headerTintColor: "white",
      title: "Add " + navigation.state.params.title
    })
  },
  AddHistoryPagePain: {
    screen: AddHistoryPagePain,
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: "#00B6BA" },

      headerTitleStyle: {
        color: "#fff",
        textAlign: "center",
        alignSelf: "center"
      },
      headerRight: (
        <Text
          style={{ paddingRight: 20, color: "white" }}
          onPress={() => {
            AsyncStorage.getItem(navigation.state.params.paramName).then(
              data => {
                if (
                  !navigation.state.params.writtingText ||
                  navigation.state.params.writtingText == null
                ) {
                  alert("Field cannot be blank");
                } else {
                  if (data != null) {
                    let parsed = JSON.parse(data);
                    let saveData = [
                      {
                        createdAt: currentDate,
                        value: navigation.state.params.writtingText
                      }
                    ].concat(parsed);

                    if (parsed[0].value == "-") {
                      saveData = [
                        {
                          createdAt: currentDate,
                          value: navigation.state.params.writtingText
                        }
                      ];
                    }

                    AsyncStorage.setItem(
                      navigation.state.params.paramName,
                      JSON.stringify(saveData),
                      err => {}
                    );
                    Alert.alert("Data saved");

                    if (navigation.state.params.paramName == "Height") {
                      AsyncStorage.getItem("Weight").then(data => {
                        if (data != null) {
                          let parsed = JSON.parse(data);
                          let bmi =
                            Math.round(
                              (parsed[0].value /
                                ((navigation.state.params.writtingText / 100) *
                                  (navigation.state.params.writtingText /
                                    100))) *
                                10
                            ) / 10;
                          let saveData = [
                            {
                              createdAt: currentDate,
                              value: bmi
                            }
                          ].concat(parsed);

                          if (parsed[0].value == "-") {
                            saveData = [
                              {
                                createdAt: currentDate,
                                value: bmi
                              }
                            ];
                          }

                          AsyncStorage.setItem(
                            "BMI",
                            JSON.stringify(saveData),
                            err => {}
                          );
                        }
                      });
                    }

                    if (navigation.state.params.paramName == "Weight") {
                      AsyncStorage.getItem("Height").then(data => {
                        if (data != null) {
                          let parsed = JSON.parse(data);
                          let bmi =
                            Math.round(
                              (navigation.state.params.writtingText /
                                ((parsed[0].value / 100) *
                                  (parsed[0].value / 100))) *
                                10
                            ) / 10;
                          let saveData = [
                            {
                              createdAt: currentDate,
                              value: bmi
                            }
                          ].concat(parsed);

                          if (parsed[0].value == "-") {
                            saveData = [
                              {
                                createdAt: currentDate,
                                value: bmi
                              }
                            ];
                          }

                          AsyncStorage.setItem(
                            "BMI",
                            JSON.stringify(saveData),
                            err => {}
                          );
                        }
                      });
                    }
                  } else {
                    AsyncStorage.setItem(
                      navigation.state.params.paramName,
                      JSON.stringify([
                        {
                          createdAt: currentDate,
                          value: navigation.state.params.writtingText
                        }
                      ]),
                      err => {}
                    );
                    Alert.alert("Data saved");
                  }
                }
              }
            );
          }}
        >
          Save
        </Text>
      ),
      headerTintColor: "white",
      title: "Add " + navigation.state.params.title
    })
  },
  AddHistoryPageHeight: {
    screen: AddHistoryPageHeight,
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: "#00B6BA" },

      headerTitleStyle: {
        color: "#fff",
        textAlign: "center",
        alignSelf: "center"
      },
      headerRight: (
        <Text
          style={{ paddingRight: 20, color: "white" }}
          onPress={() => {
            AsyncStorage.getItem(navigation.state.params.paramName).then(
              data => {
                if (
                  !navigation.state.params.writtingText ||
                  navigation.state.params.writtingText == null
                ) {
                  alert("Field cannot be blank");
                } else {
                  if (data != null) {
                    let parsed = JSON.parse(data);
                    let saveData = [
                      {
                        createdAt: currentDate,
                        value: navigation.state.params.writtingText
                      }
                    ].concat(parsed);

                    if (parsed[0].value == "-") {
                      saveData = [
                        {
                          createdAt: currentDate,
                          value: navigation.state.params.writtingText
                        }
                      ];
                    }

                    AsyncStorage.setItem(
                      navigation.state.params.paramName,
                      JSON.stringify(saveData),
                      err => {}
                    );
                    Alert.alert("Data saved");

                    if (navigation.state.params.paramName == "Height") {
                      AsyncStorage.getItem("Weight").then(data => {
                        if (data != null) {
                          let parsed = JSON.parse(data);
                          let bmi =
                            Math.round(
                              (parsed[0].value /
                                ((navigation.state.params.writtingText / 100) *
                                  (navigation.state.params.writtingText /
                                    100))) *
                                10
                            ) / 10;
                          let saveData = [
                            {
                              createdAt: currentDate,
                              value: bmi
                            }
                          ].concat(parsed);

                          if (parsed[0].value == "-") {
                            saveData = [
                              {
                                createdAt: currentDate,
                                value: bmi
                              }
                            ];
                          }

                          AsyncStorage.setItem(
                            "BMI",
                            JSON.stringify(saveData),
                            err => {}
                          );
                        }
                      });
                    }

                    if (navigation.state.params.paramName == "Weight") {
                      AsyncStorage.getItem("Height").then(data => {
                        if (data != null) {
                          let parsed = JSON.parse(data);
                          let bmi =
                            Math.round(
                              (navigation.state.params.writtingText /
                                ((parsed[0].value / 100) *
                                  (parsed[0].value / 100))) *
                                10
                            ) / 10;
                          let saveData = [
                            {
                              createdAt: currentDate,
                              value: bmi
                            }
                          ].concat(parsed);

                          if (parsed[0].value == "-") {
                            saveData = [
                              {
                                createdAt: currentDate,
                                value: bmi
                              }
                            ];
                          }

                          AsyncStorage.setItem(
                            "BMI",
                            JSON.stringify(saveData),
                            err => {}
                          );
                        }
                      });
                    }
                  } else {
                    AsyncStorage.setItem(
                      navigation.state.params.paramName,
                      JSON.stringify([
                        {
                          createdAt: currentDate,
                          value: navigation.state.params.writtingText
                        }
                      ]),
                      err => {}
                    );
                    Alert.alert("Data saved");
                  }
                }
              }
            );
          }}
        >
          Save
        </Text>
      ),
      headerTintColor: "white",
      title: "Add " + navigation.state.params.title
    })
  },
  AddHistoryPageGlucose: {
    screen: AddHistoryPageGlucose,
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: "#00B6BA" },

      headerTitleStyle: {
        color: "#fff",
        textAlign: "center",
        alignSelf: "center"
      },
      headerRight: (
        <Text
          style={{ paddingRight: 20, color: "white" }}
          onPress={() => {
            AsyncStorage.getItem(navigation.state.params.paramName).then(
              data => {
                if (!navigation.state.params.writtingText) {
                  alert("Field cannot be blank");
                } else {
                  if (data != null) {
                    let parsed = JSON.parse(data);

                    if (navigation.state.params.timing == "Bedtime") {
                      let saveData = [
                        {
                          createdAt: currentDate,
                          value: navigation.state.params.writtingText,
                          valueTwo: 0,
                          textOption: navigation.state.params.time
                        }
                      ].concat(parsed);

                      if (parsed[0].value == "-") {
                        saveData = [
                          {
                            createdAt: currentDate,
                            value: navigation.state.params.writtingText,
                            valueTwo: 0,
                            textOption: navigation.state.params.time
                          }
                        ];
                      }

                      AsyncStorage.setItem(
                        navigation.state.params.paramName,
                        JSON.stringify(saveData),
                        err => {}
                      );
                      Alert.alert("Data saved");
                    } else {
                      let saveData = [
                        {
                          createdAt: currentDate,
                          value:
                            navigation.state.params.timing == "Before meal"
                              ? navigation.state.params.writtingText
                              : 0,
                          valueTwo:
                            navigation.state.params.timing == "After meal"
                              ? navigation.state.params.writtingText
                              : 0,
                          textOption:
                            navigation.state.params.timing == "Before meal"
                              ? "Before " + navigation.state.params.time
                              : "After " + navigation.state.params.time
                        }
                      ].concat(parsed);

                      if (parsed[0].value == "-") {
                        saveData = [
                          {
                            createdAt: currentDate,
                            value:
                              navigation.state.params.timing == "Before meal"
                                ? navigation.state.params.writtingText
                                : 0,
                            valueTwo:
                              navigation.state.params.timing == "After meal"
                                ? navigation.state.params.writtingText
                                : 0,
                            textOption:
                              navigation.state.params.timing == "Before meal"
                                ? "Before " + navigation.state.params.time
                                : "After " + navigation.state.params.time
                          }
                        ];
                      }

                      AsyncStorage.setItem(
                        navigation.state.params.paramName,
                        JSON.stringify(saveData),
                        err => {}
                      );
                      Alert.alert("Data saved");
                    }
                  } else {
                    AsyncStorage.setItem(
                      navigation.state.params.paramName,
                      JSON.stringify([
                        {
                          createdAt: currentDate,
                          value: navigation.state.params.writtingText
                        }
                      ]),
                      err => {}
                    );
                    Alert.alert("Data saved");
                  }
                }
              }
            );
          }}
        >
          Save
        </Text>
      ),
      headerTintColor: "white",
      title: "Add " + navigation.state.params.title
    })
  },
  AddHistoryPageTemperature: {
    screen: AddHistoryPageTemperature,
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: "#00B6BA" },

      headerTitleStyle: {
        color: "#fff",
        textAlign: "center",
        alignSelf: "center"
      },
      headerRight: (
        <Text
          style={{ paddingRight: 20, color: "white" }}
          onPress={() => {
            AsyncStorage.getItem(navigation.state.params.paramName).then(
              data => {
                if (!navigation.state.params.writtingText) {
                  alert("Field cannot be blank");
                } else {
                  if (data != null) {
                    let parsed = JSON.parse(data);
                    let saveData = [
                      {
                        createdAt: currentDate,
                        value: navigation.state.params.writtingText,

                        textOption: navigation.state.params.writtingText2
                      }
                    ].concat(parsed);

                    if (parsed[0].value == "-") {
                      saveData = [
                        {
                          createdAt: currentDate,
                          value: navigation.state.params.writtingText,

                          textOption: navigation.state.params.writtingText2
                        }
                      ];
                    }

                    AsyncStorage.setItem(
                      navigation.state.params.paramName,
                      JSON.stringify(saveData),
                      err => {}
                    );
                    Alert.alert("Data saved");
                  } else {
                    AsyncStorage.setItem(
                      navigation.state.params.paramName,
                      JSON.stringify([
                        {
                          createdAt: currentDate,
                          value: navigation.state.params.writtingText,
                          textOption: navigation.state.params.writtingText2
                        }
                      ]),
                      err => {}
                    );
                    Alert.alert("Data saved");
                  }
                }
              }
            );
          }}
        >
          Save
        </Text>
      ),
      headerTintColor: "white",
      title: "Add " + navigation.state.params.title
    })
  },
  AddHistoryPagePressure: {
    screen: AddHistoryPagePressure,
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: "#00B6BA" },

      headerTitleStyle: {
        color: "#fff",
        textAlign: "center",
        alignSelf: "center"
      },
      headerRight: (
        <Text
          style={{ paddingRight: 20, color: "white" }}
          onPress={() => {
            AsyncStorage.getItem(navigation.state.params.paramName).then(
              data => {
                if (!navigation.state.params.writtingText) {
                  alert(" Systolic blood pressure field cannot be blank");
                } else if (!navigation.state.params.writtingText2) {
                  alert("Diastolic blood pressure field cannot be blank");
                } else {
                  if (data != null) {
                    let parsed = JSON.parse(data);
                    let saveData = [
                      {
                        createdAt: currentDate,
                        value: navigation.state.params.writtingText,

                        valueTwo: navigation.state.params.writtingText2
                      }
                    ].concat(parsed);

                    if (parsed[0].value == "-") {
                      saveData = [
                        {
                          createdAt: currentDate,
                          value: navigation.state.params.writtingText,

                          valueTwo: navigation.state.params.writtingText2
                        }
                      ];
                    }

                    AsyncStorage.setItem(
                      navigation.state.params.paramName,
                      JSON.stringify(saveData),
                      err => {}
                    );
                    Alert.alert("Data saved");
                  } else {
                    AsyncStorage.setItem(
                      navigation.state.params.paramName,
                      JSON.stringify([
                        {
                          createdAt: currentDate,
                          value: navigation.state.params.writtingText
                        }
                      ]),
                      err => {}
                    );
                    Alert.alert("Data saved");
                  }
                }
              }
            );
          }}
        >
          Save
        </Text>
      ),
      headerTintColor: "white",
      title: "Add " + navigation.state.params.title
    })
  },
  DashboardPage: {
    screen: DashboardPage,
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: "#00B6BA" },

      headerTitleStyle: {
        color: "#fff",
        textAlign: "center",
        alignSelf: "center"
      },
      headerRight: (
        <View>
          {navigation.state.params.paramName != "BMI" && (
            <Text
              style={{ paddingRight: 20, color: "white", fontSize: 30 }}
              onPress={() => {
                if (navigation.state.params.paramName == "Bloodglucose") {
                  navigation.navigate("AddHistoryPageGlucose", {
                    title: navigation.state.params.title,
                    unit: navigation.state.params.unit,
                    paramName: navigation.state.params.paramName
                  });
                } else if (navigation.state.params.paramName == "Height") {
                  navigation.navigate("AddHistoryPageHeight", {
                    title: navigation.state.params.title,
                    unit: navigation.state.params.unit,
                    paramName: navigation.state.params.paramName
                  });
                } else if (navigation.state.params.paramName == "Painscore") {
                  navigation.navigate("AddHistoryPagePain", {
                    title: navigation.state.params.title,
                    unit: navigation.state.params.unit,
                    paramName: navigation.state.params.paramName
                  });
                } else if (
                  navigation.state.params.paramName == "Bodytemperature"
                ) {
                  navigation.navigate("AddHistoryPageTemperature", {
                    title: navigation.state.params.title,
                    unit: navigation.state.params.unit,
                    paramName: navigation.state.params.paramName
                  });
                } else if (
                  navigation.state.params.paramName == "Bloodpressure"
                ) {
                  navigation.navigate("AddHistoryPagePressure", {
                    title: navigation.state.params.title,
                    unit: navigation.state.params.unit,
                    paramName: navigation.state.params.paramName
                  });
                } else {
                  navigation.navigate("AddHistoryPage", {
                    title: navigation.state.params.title,
                    unit: navigation.state.params.unit,
                    unit2: navigation.state.params.unit2,
                    paramName: navigation.state.params.paramName
                  });
                }
              }}
            >
              +
            </Text>
          )}
        </View>
      ),
      headerTintColor: "white",
      title: navigation.state.params.title
    })
  },
  HistoryPage: {
    screen: HistoryPage,
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: "#00B6BA" },

      headerTitleStyle: {
        color: "#fff",
        textAlign: "center",
        alignSelf: "center"
      },
      headerRight: <View />,
      headerTintColor: "white",
      title: "History - " + navigation.state.params.title
    })
  }
});


export default class HealthNumbersNavigation extends React.Component {
  render() {
    return (
     // <Provider store={store}>
        <HealthNumbersNavigator />
      //</Provider>
    );
  }
}
