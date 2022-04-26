import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput,KeyboardAvoidingView, Platform, TouchableOpacity, Image } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import { format } from "date-fns";

export default function UserImage() {
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

      setSelectedImage({ localUri: pickerResult.uri });
    };

    //for time display
    const [time, setTime] = React.useState();

    const [todImage, setTodImage] = React.useState(null);
    const TODImages = {
      daytimeImage: require("../graphics/daytimeArt.png"),
      nighttimeImage: require("../graphics/nighttimeArt.png"),
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



      {/* Write a task
      <KeyboardAvoidingView
        behavior = {Platform.OS == "ios" ? "padding": "height"}
        style = {styles.writeTaskWrapper}>
        <TextInput style = {styles.input} placeholder={'Add an event'} value = {task} onChangeText = {text =>setTask(text)} />
        <TouchableOpacity onPress = {() => handleAddTask()}>
          <View style = {styles.addWrapper}>
            <Text style = {styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView> */}


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEAED',
    position: 'absolute'

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
    bottom: 150,
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