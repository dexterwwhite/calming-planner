import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View, FlatList, } from 'react-native';

//change date to be date object
const PlaceHolderPlannerList = [
  {description: "Feed the cat", date: 2},
  {description: "Call Ron", date: 1},
  {description: "Bake cookies", date:4},
  {description: "Feed the cat", date:3},
  {description: "Feed the cat again", date: 9},
  {description: "Feed the cat again", date: 7},
  {description: "Feed the cat again", date: 5},
  {description: "Feed the cat again", date: 10},
  {description: "Feed the cat again", date: 6},
  {description: "Feed the cat again", date: 11},
  {description: "Feed the cat again", date: 13},
  {description: "Feed the cat again", date: 12},
  {description: "Feed the cat again", date: 14},
]

function orderListOneWeek() {

  let date = new Date().getDate();

  //REPLACE THIS WITH DATABASE CALL THAT ONLY RETURNS ITEMS FROM TODAY - 7DAYS FROM TODAY
  let resultArray = [...PlaceHolderPlannerList];

  //replace with date compare
  resultArray.sort(function(a, b){return a.date-b.date});

  return resultArray;
}

export default function App() {

//time code stollen from: https://thewebdev.info/2022/02/23/how-to-show-current-time-and-update-the-seconds-in-real-time-with-react-native/
  const [time, setTime] = React.useState();

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleString());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>{time}
      {"\n"}
      </Text>

      <Text>Open up App.js to start working on your app!</Text>
      <Text>Welcome to the Calming Planner ^_^ :U
      {"\n"}
      </Text>

      <StatusBar style="auto" />

      <FlatList
        data={orderListOneWeek()}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(plannerItem) => {
          return (
            <View style={styles.listItem}>
              <Text>{plannerItem.item.description}</Text>
            </View>
          );
        }}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 16,
    paddingTop: 100,
  },
  listItem: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#333",
    padding: 25,
  },
});
