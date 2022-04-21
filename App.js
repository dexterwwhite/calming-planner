import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Task from './components/Task'

export default function App() {
  return (
    <View style={styles.container}>

      {/* Planner*/}
      <View style = {styles.tasksWrapper}>
        <Text style = {styles.sectionTitle}>Calming Planner App</Text>

        <View style = {styles.items}>
          {/*Place all the task here */}
          <Task text = {'Tesk 1'}/>
          <Task text = {'Tesk 2'}/>
          <Task text = {'Tesk 3'}/>

        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEAED',

  },
  tasksWrapper:{
    paddingTop: 80,
    paddingHorizontal:20,

  },
  sectionTitle:{
    fontSize:24,
    fontWeight: "bold",
  },
  items:{
    marginTop:30,
  },
});
