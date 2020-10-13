import { StyleSheet, Dimensions } from "react-native";
const deviceW = Dimensions.get("window").width;
const basePx = 375;
function px2dp(px) {
  return (px * deviceW) / basePx;
}
$backgroundColor = "#F5FCFF";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: $backgroundColor
  },
  center: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center"
  },
  titleContainer: {
    paddingLeft: px2dp(20)
  },
  headerText: {
    fontSize: 20,
    textAlign: "center",
    padding: 10,

    fontWeight: "bold",
    color: "white",
    backgroundColor: "#10b3b7"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    height: 40,
    width: 40
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  //-----health Number Page----

  healthNumberTitle: {
    fontSize: px2dp(50),
    fontWeight: "800",

    color: "#008295"
  },
  date: {
    color: "grey",
    fontSize: px2dp(14)
  },
  healthItemContainer: {
    marginLeft: 10,
    height: px2dp(100),
    width: px2dp(100),
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height:  Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40  
  },
  healthItemsImage: {
    alignSelf: "center"
  },
  healthItemsTitle: {
    textAlign: "center",
    color: "grey",
    maxWidth: px2dp(100)
  },
  healthReportItemContainer: {
    marginLeft: 0.5,  
    height: px2dp(130),
    width: px2dp(105),
    flex: 1,
    borderColor: '#00B6BA',
    borderWidth: 1,
    flexWrap: "wrap"
  },
  healthReportItemImage:{
    alignSelf: "center",
    width: 102,
    height: 102
  },
  healthReportItemTitle:{
    textAlign: "left",
    color: "grey",
    maxWidth: px2dp(100),
    fontSize: 8,   
  },
  healthReportItemDate:{
    textAlign: "left",
    color: "grey",
    maxWidth: px2dp(100),
    fontSize: 8
  },
  flatListItems: {
    marginTop: 10,
    marginBottom: 5,
    marginLeft:0.5,
    marginRight: px2dp(10),
    alignSelf: "center",
  
  },
  //----------All elements-----
  AllItemContainer: {
    marginLeft: 10,
    marginRight: 10
  },
  elementsContainer: {
    height: px2dp(160),
    width: px2dp(160),
    borderRadius: px2dp(160 / 2),
    backgroundColor: "#008295"
  },
  elementsContainerEmpty: {
    height: px2dp(160),
    width: px2dp(160),
    borderRadius: px2dp(160 / 2),
    backgroundColor: "transparent"
  },
  AllItemsTitle: {
    textAlign: "center",
    color: "#666666",
    fontSize: px2dp(15),
    alignSelf: "center",
    marginTop: 20,
    fontWeight: "800",
    backgroundColor: "transparent"
  },
  addImage: {
    alignSelf: "center",
    height: px2dp(80),
    width: px2dp(80)
  },
  lineBottom: {
    borderBottomWidth: 1,
    width: px2dp(160),
    alignSelf: "center",
    borderColor: "#16acb2"
  },
  latestReading: {
    color: "white",
    fontSize: px2dp(25),
    alignSelf: "center",
    textAlign: "center"
  },
  latestReadingTitle: {
    color: "white",
    fontSize: px2dp(10),
    textAlign: "center"
  },
  latestUnitReading: {
    color: "white",
    fontSize: px2dp(15)
  },
  unitBorder: {
    borderBottomWidth: 1,
    width: px2dp(120),
    alignSelf: "center",
    borderColor: "#ffffff"
  },
  //-------Add history page------
  unit: {
    paddingLeft: px2dp(20),
    paddingTop: 20
  },
  addPageGlucose: {
    paddingLeft: px2dp(20),
    paddingTop: 20,
    fontWeight: "bold",
    color: "#008295"
  },
  //--------DashboardPage----

  dashboardElements: {
    height: px2dp(60),
    width: "100%",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: "lightgrey",
    flexDirection: "row"
  },
  glucoseAddHistoryElements: {
    height: px2dp(60),
    width: "90%",
    alignSelf: "center",

    borderColor: "lightgrey",
    flexDirection: "row"
  },
  dashboardElementRight: {
    position: "absolute",
    right: px2dp(20),
    color: "grey",
    fontSize: px2dp(13)
  },
  dashboardElementLeft: {
    paddingLeft: px2dp(20),
    color: "grey",
    fontSize: px2dp(15)
  },
  dashboardGlucoseElementLeft: {
    color: "grey",
    fontSize: px2dp(15)
  },
  dashboardGlucoseElementRight: {
    position: "absolute",
    right: px2dp(20)
  },
  arrow: { width: px2dp(15), height: px2dp(15), resizeMode: "contain" },
  //-------------------Chart----------------
  chartButton: {
    alignItems: "center"
  },
  chartCategoryActive: {
    fontSize: 20,
    color: "#008295",
    fontWeight: "bold"
  },
  chartCategoryInactive: {
    fontSize: 20,
    color: "#D3D3D3"
  },
  chartContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderTopColor: "#D3D3D3",
    borderBottomColor: "#D3D3D3"
  },
  chartContainerText: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20,
    marginRight: 30,
    marginLeft: 30
  },
  //------comparison graph----

  comparisonContainer: {
    paddingTop: px2dp(20),
    paddingLeft: px2dp(20),
    paddingBottom: px2dp(50)
  }
});

export { styles };

// $backgroundColor: #F5FCFF;

// .container {
//   flex: 1;
//   content: 'center';
//   background-color: $backgroundColor;
// }

// .welcome {
//   font-size: 20;
//   text-align: 'center';
//   margin: 10;
// }

// .instructions {
//   text-align: 'center';
//   color: '#333333';
//   margin-bottom: 5;
// }
