import React from "react";
import { AsyncStorage, Text, View, TouchableOpacity } from "react-native";
import { styles } from "../styles/styles";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel
} from "victory-native";
import ChartRangeButton from "./ChartRangeButton";
import moment from "moment";
import DatePicker from "react-native-datepicker";
import RNPickerSelect from "react-native-picker-select";
import { Chevron } from "react-native-shapes";
let $themeColor = "#008295";
const currentDateTime = moment().startOf("day");
import { connect } from "react-redux";
import { withNavigation, NavigationScreenProp, NavigationState } from "react-navigation";

interface Props {
  navigation: NavigationScreenProp<NavigationState>;
  isBloodPressure: boolean;
  isBloodGlucose: boolean;
  isBloodGlucoseComparisonGraph: boolean;
}

interface State {
  isBloodPressure: boolean;
  isBloodGlucose: boolean;
  isBloodGlucoseComparisonGraph: boolean;
  bloodGlucoseTextOption: string;
  bloodGlucoseComparisonTextOption:  string;

  activeText;
  date;
  dateUpperLimit;
  dateLowerLimit;
  tickValues;
  tickCount;
  data: ChartData[];
  masterData: ChartData[];
}

class ChartProps extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.formatTickValues = this.formatTickValues.bind(this);
    this.setTickFormat = this.setTickFormat.bind(this);
    this.filter = this.filter.bind(this);

    // for other data
    // this.masterData = [
    //     { createdAt: new Date(2019, 1, 22, 0), value: 35, valueTwo: 30 },
    //     { createdAt: new Date(2019, 1, 23, 10), value: 40, valueTwo: 30 },
    //     { createdAt: new Date(2019, 1, 25, 12), value: 55, valueTwo: 40 },
    //     { createdAt: new Date(2019, 1, 28, 17), value: 55, valueTwo: 40 }
    // ];
    //isBloodPressure: this.props
    //  ? (this.props.navigation.state.params.paramName == "Bloodpressure") ===
    //    true
    //  : false,
    //isBloodGlucose: this.props
    //  ? (this.props.navigation.state.params.paramName == "Bloodglucose") ===
    //    true
    //  : false,
    this.state = {
      isBloodPressure: this.props ? this.props.isBloodPressure === true : false,
      isBloodGlucose: this.props ? this.props.isBloodGlucose === true : false,
      isBloodGlucoseComparisonGraph: this.props
        ? this.props.isBloodGlucoseComparisonGraph === true
        : false,
      bloodGlucoseTextOption: "After Meal",
      bloodGlucoseComparisonTextOption: "Before Meal vs After Meal",

      activeText: "DAY",
      date: moment().startOf("day"),
      dateUpperLimit: currentDateTime,
      dateLowerLimit: moment("2016-01-01"), // can be any value or can be the first record
      tickValues: this.formatTickValues("DAY", currentDateTime),
      tickCount: 8,
      data: [],
      masterData: []
    };
  }

  componentDidMount() {
    AsyncStorage.getItem(this.props.navigation.state.params.paramName).then(
      data => {
        if (data != null) {
          let parsed = JSON.parse(data);
          const dataArray = parsed.map(data => {
            return {
              createdAt: moment(data.createdAt),
              value:
                (!data.value || (data.value && isNaN(data.value))) ? 0 : parseFloat(data.value),
              valueTwo:
                (!data.valueTwo || (data.valueTwo && isNaN(data.valueTwo))) ? 0 : parseFloat(data.valueTwo),
              textOption: data.textOption ? data.textOption : ''
            };
          });
          if (parsed.length > 0) {
            this.setState({
              masterData: dataArray,
              data: this.filter("DAY", currentDateTime, "After Meal", dataArray)
            });
          }
        }
      }
    );
  }
  componentWillReceiveProps() {
    AsyncStorage.getItem(this.props.navigation.state.params.paramName).then(
      data => {
        if (data != null) {
          let parsed = JSON.parse(data);
          const dataArray = parsed.map(data => {
            return {
              createdAt: moment(data.createdAt),
              value:
                (!data.value || (data.value && isNaN(data.value))) ? 0 : parseFloat(data.value),
              valueTwo:
                (!data.valueTwo || (data.valueTwo && isNaN(data.valueTwo))) ? 0 : parseFloat(data.valueTwo),
                textOption: data.textOption ? data.textOption : ''
            };
          });
          if (parsed.length > 0) {
            this.setState({
              masterData: dataArray,
              data: this.filter("DAY", currentDateTime, "After Meal", dataArray)
            });
          }
        }
      }
    );
  }
  onPressDayChart = () => {
    this.setState(() => ({
      activeText: "DAY",
      dateUpperLimit: moment(currentDateTime).startOf("day"),
      tickValues: this.formatTickValues("DAY", this.state.date),
      tickCount: 8,
      data: this.filter("DAY", this.state.date)
    }));
  };

  onPressWeekChart = () => {
    this.setState(() => ({
      activeText: "WEEK",
      dateUpperLimit: moment(currentDateTime).startOf("week"),
      tickValues: this.formatTickValues("WEEK", this.state.date),
      tickCount: 7,
      data: this.filter("WEEK", this.state.date)
    }));
  };

  onPressMonthChart = () => {
    this.setState(() => ({
      activeText: "MONTH",
      dateUpperLimit: moment(currentDateTime).startOf("month"),
      tickValues: this.formatTickValues("MONTH", this.state.date),
      tickCount: Math.round(
        moment(this.state.date)
          .startOf("month")
          .daysInMonth() / 3
      ),
      data: this.filter("MONTH", this.state.date)
    }));
  };

  onPressYearChart = () => {
    this.setState(() => ({
      activeText: "YEAR",
      dateUpperLimit: moment(currentDateTime).startOf("year"),
      tickValues: this.formatTickValues("YEAR", this.state.date),
      tickCount: 12 / 2,
      data: this.filter("YEAR", this.state.date)
    }));
  };

  onDateChange = date => {
    this.setState(() => ({
      date: moment(date.valueOf()),
      dateUpperLimit: moment(currentDateTime).startOf(this.state.activeText),
      tickValues: this.formatTickValues(
        this.state.activeText,
        moment(date.valueOf())
      ),
      data: this.filter(this.state.activeText, moment(date.valueOf()))
    }));
  };

  onPressLeftArrow = () => {
    let date = moment(this.state.date.add(-1, this.state.activeText));
    if (date >= currentDateTime) date = moment(currentDateTime);
    else if (date <= this.state.dateLowerLimit)
      date = moment(this.state.dateLowerLimit);
    this.setState(() => ({
      date: date,
      tickValues: this.formatTickValues(this.state.activeText, date),
      data: this.filter(this.state.activeText, date)
    }));
  };

  onPressRightArrow = () => {
    let date = moment(this.state.date.add(1, this.state.activeText));
    if (date >= currentDateTime) date = moment(currentDateTime);
    else if (date <= this.state.dateLowerLimit)
      date = moment(this.state.dateLowerLimit);
    this.setState(() => ({
      date: date,
      tickValues: this.formatTickValues(this.state.activeText, date),
      data: this.filter(this.state.activeText, date)
    }));
  };

  onPickerValueChange = value => {
    this.setState(() => ({
      bloodGlucoseTextOption: this.state.isBloodGlucose
        ? value
        : this.state.bloodGlucoseTextOption,
      bloodGlucoseComparisonTextOption: this.state.isBloodGlucoseComparisonGraph
        ? value
        : this.state.bloodGlucoseComparisonTextOption,
      data: this.filter(this.state.activeText, this.state.date, value)
    }));
  };

  formatTickValues(activeText, date) {
    let tickCount = 24;
    const startTime = moment(date).startOf(activeText);
    let timeArray : Date[] = [];
    let tempTime = startTime;
    let unit:moment.unitOfTime.DurationConstructor = "hour";

    switch (activeText) {
      case "DAY": {
        unit = "hour";
        tickCount = 24;
        break;
      }
      case "WEEK": {
        unit = "days";
        tickCount = 7;
        break;
      }
      case "MONTH": {
        unit = "days";
        tickCount = moment(startTime).daysInMonth();
        break;
      }
      case "YEAR": {
        unit = "months";
        tickCount = 12;
        break;
      }
      default: {
        break;
      }
    }
    
    for (let i = 1; i <= tickCount; i++) {
      timeArray.push(tempTime.toDate());
      tempTime = startTime.clone().add(i, unit);
    }

    return timeArray;
  }

  setTickFormat(t) {
    switch (this.state.activeText) {
      case "DAY": {
        return new Date(t).getHours() >= 12
          ? new Date(t).getHours() === 12
            ? new Date(t).getHours() + " PM"
            : new Date(t).getHours() - 12
          : new Date(t).getHours() === 0
          ? "12 AM"
          : new Date(t).getHours();
      }
      case "WEEK": {
        return moment(t).format("ddd");
      }
      case "MONTH": {
        return moment(t).date() === 1
          ? moment(t).format("MMM") + " " + moment(t).date()
          : moment(t).date();
      }
      case "YEAR": {
        return moment(t).format("MMM");
      }
    }
  }

  filter = (activeText, date, text = "", array = []) => {
    if (!this.state.isBloodGlucoseComparisonGraph && !this.state.isBloodGlucose)
      text = "";
    else if (text && this.state.isBloodGlucoseComparisonGraph) {
      if (text.includes("Meal")) text = " ";
      else text = text.split(" ")[1];
    } else if (text && this.state.isBloodGlucose) {
      if (text.includes("Meal"))
        text = text.split(" ")[0]; 
    } else if (!text && this.state.isBloodGlucoseComparisonGraph) {
      if (this.state.bloodGlucoseComparisonTextOption.includes("Meal"))
        text = " ";
      else text = this.state.bloodGlucoseComparisonTextOption.split(" ")[1];
    } else if (!text && this.state.isBloodGlucose) {
      if (this.state.bloodGlucoseTextOption.includes("Meal")) {
        text = this.state.bloodGlucoseTextOption.split(" ")[0];
      }
      else
        text = this.state.bloodGlucoseTextOption;
    }
    const dArray = array.length > 0 ? array : this.state.masterData;

    const dataArray = dArray.filter(data => {
      const createdAtMoment = moment(data.createdAt);
      const startDate = moment(date).startOf(activeText);
      const endDate = moment(date).endOf(activeText);
      const startDateMatch = startDate.isSameOrBefore(
        moment(createdAtMoment),
        "day"
      );
      const endDateMatch = endDate.isSameOrAfter(
        moment(createdAtMoment),
        "day"
      );
      const textMatch = data.textOption ? data.textOption.includes(text) : true;

      return startDateMatch && endDateMatch && textMatch;
    });

    if (dataArray.length > 0) return dataArray;
    else return [{ createdAt: moment(date), value: 0, valueTwo: 0, textOption: '' }];
  };

  render() {
    const bloodGlucoseOptions = () => {
      if (this.state.isBloodGlucose)
        return [
          {
            label: "Before Meal",
            value: "Before Meal"
          },
          {
            label: "After Meal",
            value: "After Meal"
          },
          {
            label: "Before Breakfast",
            value: "Before Breakfast"
          },
          {
            label: "After Breakfast",
            value: "After Breakfast"
          },
          {
            label: "Before Lunch",
            value: "Before Lunch"
          },
          {
            label: "After Lunch",
            value: "After Lunch"
          },
          {
            label: "Before Dinner",
            value: "Before Dinner"
          },
          {
            label: "After Dinner",
            value: "After Dinner"
          },
          {
            label: "Bedtime",
            value: "Bedtime"
          }
        ];
      else if (this.state.isBloodGlucoseComparisonGraph)
        return [
          {
            label: "Before Meal vs After Meal",
            value: "Before Meal vs After Meal"
          },
          {
            label: "Before Breakfast vs After Breakfast",
            value: "Before Breakfast vs After Breakfast"
          },
          {
            label: "Before Lunch vs After Lunch",
            value: "Before Lunch vs After Lunch"
          },
          {
            label: "Before Dinner vs After Dinner",
            value: "Before Dinner vs After Dinner"
          }
        ];
      else
        return [];
    };

    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            margin: 40
          }}
        >
          <ChartRangeButton
            onPressHandler={this.onPressDayChart}
            activeText={this.state.activeText}
            text="DAY"
          />
          <Text style={{ fontSize: 20, color: $themeColor }}>|</Text>
          <ChartRangeButton
            onPressHandler={this.onPressWeekChart}
            activeText={this.state.activeText}
            text="WEEK"
          />
          <Text style={{ fontSize: 20, color: $themeColor }}>|</Text>
          <ChartRangeButton
            onPressHandler={this.onPressMonthChart}
            activeText={this.state.activeText}
            text="MONTH"
          />
          <Text style={{ fontSize: 20, color: $themeColor }}>|</Text>
          <ChartRangeButton
            onPressHandler={this.onPressYearChart}
            activeText={this.state.activeText}
            text="YEAR"
          />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TouchableOpacity
            style={styles.welcome}
            onPress={this.onPressLeftArrow}
            disabled={this.state.date <= this.state.dateLowerLimit}
          >
            <Text>{"<"}</Text>
          </TouchableOpacity>
          {/* <Text style={{...styles.welcome, marginLeft: 20}}>
                        {this.state.time.isSame(currentDateTime) ?
                            'Today ' : ''}
                    </Text> */}
          <DatePicker
            style={{ width: 200 }}
            date={this.state.date}
            mode="date"
            format="DD MMMM, YYYY"
            minDate={this.state.dateLowerLimit.toDate()}
            maxDate={moment().toDate()}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            showIcon={false}
            customStyles={{
              dateText: {
                fontSize: 20
              },
              dateInput: {
                borderWidth: 0,
                marginTop: 7
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={this.onDateChange}
          />
          <TouchableOpacity
            style={styles.welcome}
            onPress={this.onPressRightArrow}
            disabled={this.state.date >= this.state.dateUpperLimit}
          >
            <Text>{">"}</Text>
          </TouchableOpacity>
        </View>
        {/* <Picker
                    selectedValue="java"
                    style={{height: 50, width: 100}}
                    // onValueChange={(itemValue, itemIndex) => {}
                    // }
                >
                    <Picker.Item label="Java" value="java" key="java"/>
                    <Picker.Item label="JavaScript" value="js" key="js"/>
                </Picker> */}
        {(this.state.isBloodGlucose ||
          this.state.isBloodGlucoseComparisonGraph) && (
          <RNPickerSelect
            items={bloodGlucoseOptions()}
            onValueChange={this.onPickerValueChange}
            style={{
              iconContainer: {
                top: 5,
                right: 15
              }
            }}
            value={
              this.state.isBloodGlucoseComparisonGraph
                ? this.state.bloodGlucoseComparisonTextOption
                : this.state.bloodGlucoseTextOption
            }
            Icon={() => {
              return <Chevron size={1.5} color="gray" />;
            }}
          />
        )}
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={{ x: 50, y: [0, 30] }}
          scale={{ x: "time" }}
        >
          <VictoryAxis
            orientation="bottom"
            style={{
              tickLabels: { fill: $themeColor },
              grid: { stroke: "#D3D3D3" },
              ticks: { stroke: "#D3D3D3" },
              axis: { stroke: "#D3D3D3" }
            }}
            tickValues={this.state.tickValues}
            tickCount={this.state.tickCount}
            tickFormat={t => this.setTickFormat(t)}
          />
          <VictoryAxis
            orientation="right"
            offsetX={60}
            dependentAxis
            style={{
              tickLabels: { fill: $themeColor },
              grid: { stroke: "#D3D3D3" },
              ticks: { stroke: "#D3D3D3" },
              axis: { stroke: "#D3D3D3" }
            }}
          />
          <VictoryBar
            style={{
              data: {
                fill: $themeColor,
                width: (150 / this.state.tickValues.length) * 3
              }
            }}
            data={this.state.data}
            x="createdAt"
            y={
              (!this.state.isBloodGlucose &&
                !this.state.isBloodGlucoseComparisonGraph) ||
              (this.state.isBloodGlucose &&
                !this.state.bloodGlucoseTextOption.includes("After")) ||
              this.state.isBloodGlucoseComparisonGraph
                ? "value"
                : "valueTwo"
            }
          />

          {(this.state.isBloodPressure ||
            this.state.isBloodGlucoseComparisonGraph) && (
            <VictoryBar
              style={{
                data: {
                  fill: "#C4005C",
                  width: (150 / this.state.tickValues.length) * 3
                }
              }}
              data={this.state.data}
              x="createdAt"
              y="valueTwo"
            />
          )}
        </VictoryChart>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  nav: state.search
});
const Chart = connect(
  mapStateToProps,
  null
)(withNavigation(ChartProps));

export default Chart;
