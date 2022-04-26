// import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput,KeyboardAvoidingView, Platform, TouchableOpacity, Image, Dimensions, StatusBar, AppState, AsyncStorage } from 'react-native';
import { Keyboard } from 'react-native-web';
import UserImage from './components/UserImage';
import * as ImagePicker from 'expo-image-picker';
import { format } from "date-fns";

import TodoList from './layout/todolist';
import AppTitleHeader from './components/AppTitleHeader';
// import AsyncStorage from '@react-native-community/async-storage';
// import uuid from 'uuid';
import 'react-native-get-random-values';
import {v1 as uuid} from 'uuid';
import moment from 'moment';

// export default function App() {
//   const [task, setTask] = useState();  /*set task */

//   const [taskItems, setTaskItems] = useState([]);  /*array to store all the task*/

//   const handleAddTask = () => {
//     //Keyboard.dismss();  /*make the keyboard go back down after typing in the task */
//     setTaskItems([...taskItems, task])  /*append the new task to the already exist task array */
//     setTask(null);
//   }

//   const completeTask = (index) =>{
//     let itemsCopy = [...taskItems];  //copy a new array
//     itemsCopy.splice(index, 1);  //remove that item
//     setTaskItems(itemsCopy);
//   }

//   //for image picker
//   const [selectedImage, setSelectedImage] = React.useState(null);

//   let openImagePickerAsync = async () => {
//       let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

//       if (permissionResult.granted === false) {
//         alert('Permission to access camera roll is required!');
//         return;
//       }

//       let pickerResult = await ImagePicker.launchImageLibraryAsync();

//       if (pickerResult.cancelled === true) {
//         return;
//       }

//       setSelectedImage({ localUri: pickerResult.uri });
//     };

//     //for time display
//     const [time, setTime] = React.useState();

//     const [todImage, setTodImage] = React.useState(null);
//     const TODImages = {
//       daytimeImage: require("./graphics/daytimeArt.png"),
//       nighttimeImage: require("./graphics/nighttimeArt.png"),
//     }

//     React.useEffect(() => {
//       const timer = setInterval(() => {

//         let currentTime = new Date();
//         setTime(format(currentTime, "MMMM do, yyy h:mm a"));

//         if (currentTime.getHours() >= 6 && currentTime.getHours() < 18){
//           if(todImage != TODImages.daytimeImage)
//             setTodImage(TODImages.daytimeImage);
//         }
//         else{
//           if(todImage != TODImages.nighttimeImage)
//             setTodImage(TODImages.nighttimeImage);
//         }
//       }, 1000);

//       return () => {
//         clearInterval(timer);
//       };
//     }, []);

//     //for username displa
//     const [tmpusername, setTmpusername] = React.useState();

//     const [username, setUsername] = React.useState();

//     const handleAddUsername = () => {
//       setUsername(tmpusername);
//     }

//     //initialize planner to user
//     if (username == null || username == ''){
//       return(
//         <View style={styles.centeredMessage}>
//           <Text>
//             Hello!
//             {'\n'}
//             Please tell us your name.
//           </Text>
//           <KeyboardAvoidingView
//             behavior = {Platform.OS == "ios" ? "padding": "height"}
//             style = {styles.writeTaskWrapper}>
//             <TextInput style = {styles.input} placeholder={'Enter your name here'} value = {tmpusername} onChangeText = {text =>setTmpusername(text)} />
//             <TouchableOpacity onPress = {() => handleAddUsername()}>
//               <View style = {styles.addWrapper}>
//                 <Text style = {styles.addText}>+</Text>
//               </View>
//             </TouchableOpacity>
//           </KeyboardAvoidingView>
//         </View>
//       );
//     }
//     if (selectedImage == null) {
//       return (
//         <View style={styles.centeredMessage}>
//           <Text>
//             Please tap the + to select a picture of yourself from your phone's files.
//             {'\n'}
//           </Text>

//           <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
//             <View style = {styles.addWrapper}>
//               <Text style = {styles.addText}>+</Text>
//             </View>
//           </TouchableOpacity>
//         </View>
//       );
//     }

//   return (
    // <View style={styles.container}>

    //   {/*header thing*/}

    //   <View style={styles.topper}>
    //     <View style={styles.topperImages}>
    //       <Image source={todImage} style={styles.todimage} resizeMode="contain"/>
    //       <Image source={{ uri: selectedImage.localUri }} style={styles.selfphoto}/>
    //     </View>
    //     <Text style = {styles.timeText}>{time}</Text>
    //     <Text style = {styles.userText}>{username}'s Planner </Text>
    //   </View>

    //   {/* Planner*/}
    //   <View style = {styles.tasksWrapper}>

    //     <Text style = {styles.sectionTitle}>Calming Planner App</Text>

    //     <View style = {styles.items}>
    //       {/*Place all the task here */}
    //       {
    //         taskItems.map((item, index) =>{  /*print out all the tasks in the array currently*/
    //           return (
    //             <TouchableOpacity key = {index} onPress = {() => completeTask(index)}>
    //               <Task text = {item}/>
    //             </TouchableOpacity>
    //           )
    //         })
    //       }

    //     </View>
    //   </View>

    //   {/*Write a task */}
    //   <KeyboardAvoidingView
    //     behavior = {Platform.OS == "ios" ? "padding": "height"}
    //     style = {styles.writeTaskWrapper}>
    //     <TextInput style = {styles.input} placeholder={'Add an event'} value = {task} onChangeText = {text =>setTask(text)} />
    //     <TouchableOpacity onPress = {() => handleAddTask()}>
    //       <View style = {styles.addWrapper}>
    //         <Text style = {styles.addText}>+</Text>
    //       </View>
    //     </TouchableOpacity>
    //   </KeyboardAvoidingView>


    // </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#EBEAED',

//   },
//   tasksWrapper:{
//     paddingTop: 80,
//     paddingHorizontal: 20,

//   },
//   sectionTitle:{
//     fontSize:24,
//     fontWeight: "bold",
//     textAlign: 'center',
//   },
//   items:{
//     marginTop:30,
//   },
//   writeTaskWrapper:{
//     position: 'absolute',
//     bottom: 60,
//     width: '100%',
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     backgroundColor: '#0099FF',
//   },
//   input:{
//     paddingVertical: 15,
//     paddingHorizontal: 15,
//     backgroundColor: '#FFF',
//     borderRadius: 60,
//     borderColor: '#FF6600',
//     borderWidth: 1,
//     width: 300,
//   },
//   addWrapper:{
//     width: 60,
//     height: 60,
//     backgroundColor: '#FFF',
//     borderRadius: 60,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderColor: '#FF6600',
//     borderWidth: 1,
//   },
//   addText:{

//   },
//   topper: {
//     width: '100%',
//     height: 165,
//     backgroundColor: 'white'
//   },
//   topperImages: {
//     width: '100%',
//     height: 165,
//     backgroundColor: 'white'
//   },
//   selfphoto: {
//     flex: 1,
//     resizeMode: 'contain',
//     zIndex: 1,
//     marginTop: -165,
//     marginLeft: 140,
//     zIndex: 0,
//   },
//   todimage: {
//     flex: 1,
//     height: undefined,
//     width: undefined,
//     zIndex: 1,
//   },
//   timeText: {
//     marginTop: -65,
//     fontSize:20,
//     fontWeight: "bold",
//     color: 'white',
//     textShadowColor : 'black',
//     textShadowOffset : {width: 2, height: 2},
//     textShadowRadius : 1,
//   },
//   userText: {
//     marginTop: 0,
//     fontSize: 25,
//     color: 'white',
//     textAlign: 'right',
//     textShadowColor : 'black',
//     textShadowOffset : {width: 2, height: 2},
//     textShadowRadius : 1,
//   },
//   centeredMessage: {
//     flex: 1,
//     paddingHorizontal: 35,
//     alignItems: 'center',
//     justifyContent: 'center',
//     textAlign: 'center',
//   }
// });


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
      expiredTodos: [],
      todos: {},
    };

    
  }

  // when app component first loaded, load to saved todos and tracking app state
  componentDidMount = () => {
    AppState.addEventListener('change', this._handleAppStateChange);
    this._loadTodos();
  };

  // when app closed, remove app state changed event listener
  componentWillUnmount = () => {
    AppState.removeEventListener('change', this._handleAppStateChange);
  };

  // when app state is background, save current todos to asyncStorage (local storage)
  _handleAppStateChange = nextAppState => {
    if (nextAppState === 'background') {
      this._saveTodo(this.state.todos);
    }
    this.setState({appState: nextAppState});
  };

  // save current todos to asyncStorage
  _saveTodo = newTodos => {
    AsyncStorage.setItem('todos', JSON.stringify(newTodos));
  };

  // load saved todos from asyncStorage
  _loadTodos = async () => {
    try {
      const getSavedTodos = await AsyncStorage.getItem('todos');
      let savedTodos = JSON.parse(getSavedTodos);
      savedTodos = savedTodos === null ? {} : savedTodos; // null check
      const expiredTodos = await this._findExpiredTodo(savedTodos); // search expired todos
      this.setState({todos: savedTodos, expiredTodos: expiredTodos});
    } catch (err) {
      console.log(err);
    }
  };

  // callback function
  // if you want add new todo in todo list, call this function from child
  _addTodo = newTodoTitle => {
    const _id = uuid(); // name(id) each todo element in todos
    const now = moment().format('YYYY[-]MM[-]DD');
    const newTodo = {
      [_id]: {
        id: _id,
        title: newTodoTitle !== '' ? newTodoTitle : 'New Todo Title',
        description: '',
        dueDate: '',
        createdAt: now,
        priority: '3',
        isCompleted: false,
      },
    };
    this.setState(prevState => {
      const newState = {
        ...prevState,
        todos: {
          ...prevState.todos,
          ...newTodo,
        },
      };
      newState.expiredTodos = this._findExpiredTodo(newState.todos);
      return {...newState};
    });
  };

  // callback function
  // if you want delete one todo, call this function from child
  _deleteTodo = id => {
    this.setState(prevState => {
      const todos = prevState.todos;
      delete todos[id];
      const newState = {
        ...prevState,
        ...todos,
      };
      newState.expiredTodos = this._findExpiredTodo(newState.todos);
      return {...newState};
    });
  };

  // callback function
  // if you want delete many todos, call this function from child
  _deleteManyTodo = todoList => {
    this.setState(prevState => {
      const todos = prevState.todos;
      todoList.map(todo => {
        delete todos[todo.id];
      });
      const newState = {
        ...prevState,
        ...todos,
      };
      newState.expiredTodos = this._findExpiredTodo(newState.todos);
      return {...newState};
    });
  };

  // callback function
  // if child component's complete state changed, call this function from child
  _completeToggle = (id, currentCompleteState) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        todos: {
          ...prevState.todos,
          [id]: {
            ...prevState.todos[id],
            isCompleted: !currentCompleteState,
          },
        },
      };
      return {...newState};
    });
  };

  // callback function
  // if child component's title text changed, call this function from child
  _changeTitleText = (id, text) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        todos: {
          ...prevState.todos,
          [id]: {
            ...prevState.todos[id],
            title: text,
          },
        },
      };
      return {...newState};
    });
  };

  // callback function
  // if child component's description changed, call this function from child
  _changeDescriptionText = (id, text) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        todos: {
          ...prevState.todos,
          [id]: {
            ...prevState.todos[id],
            description: text,
          },
        },
      };
      return {...newState};
    });
  };

  // callback function
  // if child component's priority changed, call this function from child
  _changePriority = (id, prior) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        todos: {
          ...prevState.todos,
          [id]: {
            ...prevState.todos[id],
            priority: prior,
          },
        },
      };
      return {...newState};
    });
  };

  // callback function
  // if child component's due date changed, call this function from child
  _changeDueDate = (id, date) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        todos: {
          ...prevState.todos,
          [id]: {
            ...prevState.todos[id],
            dueDate: date,
          },
        },
      };
      newState.expiredTodos = this._findExpiredTodo(newState.todos);
      return {...newState};
    });
  };

  // find Expired Todos in new state of todos
  _findExpiredTodo = todos => {
    let now = new Date();
    let expired = [];
    Object.values(todos).map(todo => {
      if (todo.dueDate !== '') {
        // convert date string to date type object
        let splited = todo.dueDate.split('-');
        let dueDate = new Date(
          splited[0],
          splited[1] - 1,
          splited[2],
          23,
          59,
          59,
        );
        if (dueDate < now) {
          expired.push(todo);
        }
      }
    });
    return expired;
  };



  



  render() {

    
    return (
      <View style={styles.container}>
        {/* <UserImage/> */}
        <StatusBar barStyle="light-content" backgroundColor="#5c3735" />
        <AppTitleHeader
          expiredTodos={this.state.expiredTodos}
          deleteTodo={this._deleteTodo}
          deleteManyTodo={this._deleteManyTodo}
        />
        
        <TodoList
          todos={this.state.todos}
          addTodo={this._addTodo}
          deleteTodo={this._deleteTodo}
          completeStateToggle={this._completeToggle}
          changeTitleText={this._changeTitleText}
          changeDescriptionText={this._changeDescriptionText}
          changePriority={this._changePriority}
          changeDueDate={this._changeDueDate}
        />

      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
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

