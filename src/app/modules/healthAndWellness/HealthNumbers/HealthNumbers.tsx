import React from "react";
import { Text, View, FlatList } from "react-native";
import { styles } from "../styles/styles";
import { format } from "date-fns";
import HealthNumberItem from "./HealthNumberItem";
const currentDate = new Date();

let elements = [
  {
    title: "Body Measurement",
    image: require("../images/health-numbers-icon-03.png"),
    paramName: "BodyMeasurement",
    elements: [
      {
        title: "Height",
        unit: "cm",
        unit2: "ft & in",
        paramName: "Height",
        key: "Height"
      },
      {
        title: "Weight",
        unit: "kg",
        unit2: "lbs",
        paramName: "Weight",
        key: "Weight"
      },
      {
        title: "BMI",
        unit: "-",
        paramName: "BMI",
        key: "BMI"
      },
      {
        title: "Waist circumference",
        unit: "in",
        unit2: "cm",
        paramName: "Waistcircumference",
        key: "Waistcircumference"
      },
      {
        title: "Body fat",
        unit: "%",
        paramName: "Bodyfat",
        key: "Bodyfat"
      },
      {
        title: "Visceral fat",
        unit: "%",
        paramName: "Visceralfat",
        key: "Visceralfat"
      },
      {
        title: "Muscle mass",
        unit: "kg",
        paramName: "Musclemass",
        key: "Musclemass"
      },
      {
        title: "Metabolic age",
        unit: "year",
        paramName: "Metabollcage",
        key: "Metabollcage"
      },
      {
        title: "Basal Metabolic Rate",
        unit: "-",
        paramName: "BasalMetabollcRate",
        key: "BasalMetabollcRate"
      }
    ],
    key: "BodyMeasurement"
  },
  {
    title: "Vital Signs",
    image: require("../images/health-numbers-icon-04.png"),
    paramName: "VitalSigns",
    elements: [
      {
        title: "Blood pressure",
        unit: "mmHg",
        paramName: "Bloodpressure",
        key: "Bloodpressure"
      },
      {
        title: "Body temperature",
        unit: "°C",
        paramName: "Bodytemperature",
        key: "Bodytemperature"
      },
      {
        title: "Heart rate",
        unit: "bpm",
        paramName: "Heartrate",
        key: "Heartrate"
      },
      {
        title: "Breathing rate",
        unit: "breaths per minute",
        paramName: "Breathingrate",
        key: "Breathingrate"
      },
      {
        title: "Pain score",
        unit: "-",
        paramName: "Painscore",
        key: "Painscore"
      }
    ],
    key: "VitalSigns"
  },
  {
    title: "Blood Sugar",
    image: require("../images/health-numbers-icon-05.png"),
    paramName: "BloodSugar",
    elements: [
      {
        title: "Blood glucose",
        unit: "mmol/L",
        unit2: "mg/dl",
        paramName: "Bloodglucose",
        key: "Bloodglucose"
      }
    ],
    key: "BloodSugar"
  },
  {
    title: "Chelesterol Profile",
    image: require("../images/health-numbers-icon-06.png"),
    paramName: "ChelesterolProfile",
    elements: [
      {
        title: "Total cholestrol",
        unit: "mmol/L",
        unit2: "mg/dl",
        paramName: "Totalcholestrol",
        key: "Totalcholestrol"
      },
      {
        title: "LDL",
        unit: "mmol/L",
        unit2: "mg/dl",
        paramName: "LDL",
        key: "LDL"
      },
      {
        title: "HDL",
        unit: "mmol/L",
        unit2: "mg/dl",
        paramName: "HDL",
        key: "HDL"
      },
      {
        title: "Triglyceride",
        unit: "mmol/L",
        unit2: "mg/dl",
        paramName: "Triglyceride",
        key: "Triglyceride"
      }
    ],
    key: "ChelesterolProfile"
  },
  {
    title: "Uric Acid",
    image: require("../images/health-numbers-icon-07.png"),
    paramName: "UricAcid",
    elements: [
      {
        title: "Uric acid",
        unit: "mmol/L",
        unit2: "mg/dl",
        paramName: "Uricacid",
        key: "Uricacid"
      }
    ],
    key: "Uricacid"
  }
];

export default class HealthNumbers extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.healthNumberTitle}>Health </Text>
          <Text style={styles.healthNumberTitle}>Numbers</Text>
          <Text style={styles.date}>
            Today {format(currentDate, "DD MMMM, YYYY")}
          </Text>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <FlatList
            keyExtractor={(item, index) => item.key}
            data={elements}
            horizontal={false}
            numColumns={3}
            renderItem={({ item }) => (
              <View style={styles.flatListItems}>
                <HealthNumberItem
                  imageSource={item.image}
                  title={item.title}
                  elements={item.elements}
                />
              </View>
            )}
          />
        </View>
      </View>
    );
  }
}
