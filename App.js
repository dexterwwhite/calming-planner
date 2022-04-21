import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput,KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { Keyboard } from 'react-native-web';
import Task from './components/Task';

export default function App() {
  const [task, setTask] = useState();  /*set task */

  const [taskItems, setTaskItems] = useState([]);  /*array to store all the task*/

  const handleAddTask = () => {
    //Keyboard.dismss();  /*make the keyboard go back down after typing in the task */
    setTaskItems([...taskItems, task])  /*append the new task to the already exist task array */
    setTask(null);
  }

  const completeTask = (index) =>{
    let itemsCopy = [...taskItems];  //copy a new array
    itemsCopy.splice(index, 1);  //remove that item
    setTaskItems(itemsCopy);  
  }


  return (
    <View style={styles.container}>

      {/* Planner*/}
      <View style = {styles.tasksWrapper}>
        <Text style = {styles.sectionTitle}>Calming Planner App</Text>

        <View style = {styles.items}>
          {/*Place all the task here */}
          {
            taskItems.map((item, index) =>{  /*print out all the tasks in the array currently*/
              return (
                <TouchableOpacity key = {index} onPress = {() => completeTask(index)}>
                  <Task text = {item}/>
                </TouchableOpacity>
              )
            })
          }

        </View>
      </View>

      {/*Write a task */}
      <KeyboardAvoidingView
        behavior = {Platform.OS == "ios" ? "padding": "height"}
        style = {styles.writeTaskWrapper}>
        <TextInput style = {styles.input} placeholder={'Add an event'} value = {task} onChangeText = {text =>setTask(text)} />
        <TouchableOpacity onPress = {() => handleAddTask()}>
          <View style = {styles.addWrapper}>
            <Text style = {styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>


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
    paddingHorizontal: 20,

  },
  sectionTitle:{
    fontSize:24,
    fontWeight: "bold",
    textAlign: 'center',
  },
  items:{
    marginTop:30,
  },
  writeTaskWrapper:{
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#0099FF',
  },
  input:{
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#FF6600',
    borderWidth: 1,
    width: 300,
  },
  addWrapper:{
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#FF6600',
    borderWidth: 1,
  },
  addText:{

  },
});
