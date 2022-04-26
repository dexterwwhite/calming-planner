import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput,KeyboardAvoidingView, Platform, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Keyboard } from 'react-native-web';
import Task from './components/Task';
import * as ImagePicker from 'expo-image-picker';
import { format } from "date-fns";
//import SQLite from 'react-native-sqlite-storage';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('MainDB');

export default function App() {

  const [task, setTask] = useState();  /*set task */

  const [taskItems, setTaskItems] = useState([]);  /*array to store all the task*/

  const handleAddTask = () => {
    //Add task to database
    let time = "12:00";
    let date = "Monday";
    let completed = 0;
    try {
      db.transaction( (tx) => {
         tx.executeSql(
          "INSERT INTO Tasks (Name, Time, Date, Completed) VALUES (?,?,?,?)",
          [task, time, date, completed]
        );
      })
    } catch(error) {
      console.log(error);
    }
    console.log("Added?");

    //Keyboard.dismss();  /*make the keyboard go back down after typing in the task */
    setTaskItems([...taskItems, task])  /*append the new task to the already exist task array */
    setTask(null);
  }

  const completeTask = (index) =>{
    let itemsCopy = [...taskItems];  //copy a new array
    itemsCopy.splice(index, 1);  //remove that item
    setTaskItems(itemsCopy);
  }

  //Either creates tables for user or simply logs them in
  useEffect(() => {
    createTaskTable();
    createUserTable();
    //loadTasks();
    updateUserInfo();
    //deleteTable();
  }, []);

  const tester = () => {
    try {
      console.log("tester");
      db.transaction((tx) => {
        tx.executeSql('SHOW TABLES', [], (tx, results) => {
          for (let i = 0; i < results.rows.length; ++i) {
            console.log(results.rows.item(i));
          }
        })
      })
    } catch(error) {
      console.log(error);
    }
  }

  const loadTasks = () => {
    console.log("load tasks");
    try {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM Tasks",
          [],
          (tx, results) => {
            var len = results.rows.length;
            console.log("Completed");
            if(len > 0) {
              console.log("len is " + len);
            } else {
              console.log("no rows right now");
            }
          }
        )
      })
    } catch(error) {
      console.log(error);
    }
  }

  /**
   * Database stuff
   */
  const createTaskTable = () => {
    console.log("create task table");
    try {
      db.transaction((tx) => {
        tx.executeSql("CREATE TABLE IF NOT EXISTS Tasks(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Time TEXT, Date TEXT, Completed INTEGER)", []);
      })
    } catch(error) {
      console.log(error);
    }
  }

  //Only used to delete a table
  const deleteTable = () => {
    try {
      db.transaction((tx) => {
        tx.executeSql(
          "DROP TABLE User;"
        )
      })
    } catch(error) {
      console.log(error);
    }
  }

  //Database for user name and image
  //DO NOT DO UNTIL I HAVE FIGURED OUT IMAGES
  const createUserTable = () => {
    try{
      db.transaction((tx) => {
        tx.executeSql("CREATE TABLE IF NOT EXISTS User(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Uri TEXT)", []);
      })
    } catch(error) {
      console.log(error);
    }
  }

  const updateUserInfo = () => {
    try {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM User",
          [],
          (tx, results) => {
            var len = results.rows.length;
            if(len > 0) {
              try {
                console.log("user len = ", len);
                console.log("rez: ", results.rows.item(0));
                var dbUserName = results.rows.item(0).Name;
                setUsername(dbUserName);
                var img = results.rows.item(0).Uri;
                if(img != "null") {
                  console.log("success");
                  setSelectedImage({ localUri: img });
                }
              } catch(error2) {
                console.log(error2)
              }
            }
          }
        )
      })
    } catch(error) {
      console.log(error);
    }
  }

  //for image picker
  const [selectedImage, setSelectedImage] = React.useState(null);

  let openImagePickerAsync = async () => {
      let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        alert('Permission to access camera roll is required!');
        return;
      }

      let pickerResult = await ImagePicker.launchImageLibraryAsync();

      if (pickerResult.cancelled === true) {
        return;
      }

      //Add picker result URI to database
      try {
        db.transaction((tx) => {
          tx.executeSql("UPDATE User SET Uri=? WHERE ID=1", [pickerResult.uri]);
        })
      } catch(error) {
        console.log(error);
      }

      setSelectedImage({ localUri: pickerResult.uri });
      
      //Add image URI to database

    };

    //for time display
    const [time, setTime] = React.useState();

    const [todImage, setTodImage] = React.useState(null);
    const TODImages = {
      daytimeImage: require("./graphics/daytimeArt.png"),
      nighttimeImage: require("./graphics/nighttimeArt.png"),
    }

    React.useEffect(() => {
      const timer = setInterval(() => {

        let currentTime = new Date();
        setTime(format(currentTime, "MMMM do, yyy h:mm a"));

        if (currentTime.getHours() >= 6 && currentTime.getHours() < 18){
          if(todImage != TODImages.daytimeImage)
            setTodImage(TODImages.daytimeImage);
        }
        else{
          if(todImage != TODImages.nighttimeImage)
            setTodImage(TODImages.nighttimeImage);
        }
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }, []);

    //for username displa
    const [tmpusername, setTmpusername] = React.useState();

    const [username, setUsername] = React.useState();

    const handleAddUsername = () => {
      //Add user to database with username
      let emptyImage = "null";
      if(tmpusername) {
        try {
          db.transaction( (tx) => {
            tx.executeSql(
              "INSERT INTO User (Name, Uri) VALUES (?,?)",
              [tmpusername, emptyImage]
            );
          })
        } catch(error) {
          console.log(error);
        }
        console.log("Added User");
      }
      setUsername(tmpusername);
    }

    //initialize planner to user
    if (username == null || username == ''){
      return(
        <View style={styles.centeredMessage}>
          <Text>
            Hello!
            {'\n'}
            Please tell us your name.
          </Text>
          <KeyboardAvoidingView
            behavior = {Platform.OS == "ios" ? "padding": "height"}
            style = {styles.writeTaskWrapper}>
            <TextInput style = {styles.input} placeholder={'Enter your name here'} value = {tmpusername} onChangeText = {text =>setTmpusername(text)} />
            <TouchableOpacity onPress = {() => handleAddUsername()}>
              <View style = {styles.addWrapper}>
                <Text style = {styles.addText}>+</Text>
              </View>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      );
    }
    if (selectedImage == null) {
      return (
        <View style={styles.centeredMessage}>
          <Text>
            Please tap the + to select a picture of yourself from your phone's files.
            {'\n'}
          </Text>

          <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
            <View style = {styles.addWrapper}>
              <Text style = {styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }

  return (
    <View style={styles.container}>

      {/*header thing*/}

      <View style={styles.topper}>
        <View style={styles.topperImages}>
          <Image source={todImage} style={styles.todimage} resizeMode="contain"/>
          <Image source={{ uri: selectedImage.localUri }} style={styles.selfphoto}/>
        </View>
        <Text style = {styles.timeText}>{time}</Text>
        <Text style = {styles.userText}>{username}'s Planner </Text>
      </View>

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
  topper: {
    width: '100%',
    height: 165,
    backgroundColor: 'white'
  },
  topperImages: {
    width: '100%',
    height: 165,
    backgroundColor: 'white'
  },
  selfphoto: {
    flex: 1,
    resizeMode: 'contain',
    zIndex: 1,
    marginTop: -165,
    marginLeft: 140,
    zIndex: 0,
  },
  todimage: {
    flex: 1,
    height: undefined,
    width: undefined,
    zIndex: 1,
  },
  timeText: {
    marginTop: -65,
    fontSize:20,
    fontWeight: "bold",
    color: 'white',
    textShadowColor : 'black',
    textShadowOffset : {width: 2, height: 2},
    textShadowRadius : 1,
  },
  userText: {
    marginTop: 0,
    fontSize: 25,
    color: 'white',
    textAlign: 'right',
    textShadowColor : 'black',
    textShadowOffset : {width: 2, height: 2},
    textShadowRadius : 1,
  },
  centeredMessage: {
    flex: 1,
    paddingHorizontal: 35,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  }
});
