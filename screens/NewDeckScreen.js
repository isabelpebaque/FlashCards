import React, {useState} from 'react';
import { Text, View, StyleSheet, SafeAreaView, TextInput, Dimensions, Button, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';


// Components import
import NewFlip from '../components/NewFlip';
import ColorBox from '../components/ColorBox';

// Constants import
import Colors from '../constants/Colors';

// Npm imports
import firebase from './../firebase';
import _ from 'lodash'
import Toast from 'react-native-root-toast';


export default function NewDeckScreen({ navigation }) {
  
  const [deckName, setDeckName] = useState('');
  const [cards, setCards] = useState([]);
  const [number, setNumber] = useState(0);
  const [color, setColor] = useState(Colors.blue);

  const colors =[
    {
      color: Colors.blue
    },
    {
      color: Colors.turquoise
    },
    {
      color: Colors.pink
    },
    {
      color: Colors.purple
    },
    {
      color: Colors.green
    },
    {
      color: Colors.yellow
    },
    {
      color: Colors.orange
    },
  ]

  // Render colors
  const renderlist = () => {
    return colors.map(element => {
      return (
        <View style={{padding: 10}} key={element.color}>
          <TouchableOpacity onPress={() => setColor(element.color)}>
            <ColorBox color={element.color}/>
          </TouchableOpacity>
        </View>
      );
    });
  };

  
  // Adds card into object list
  const addCard = (question, answer) => {
    setCards({...cards, [number]: {
      question : question,
      answer: answer
    }
    });
    
    setNumber(num => num + 1);
  }
  
  // Saves deck to firebase
  const saveDeck = () => {
    if(deckName !== '') {
      addToFirebase();
      setCards({});
      setDeckName('');
    } else {
      notifyMessage('You have to add a name to your deck!');
    }
  }

  // Push new object into firebase database
  const addToFirebase = () => {
    firebase.database().ref('allDecks/').child(deckName).set({
      key: deckName,
      percentageDone: 0,
      color: color,
      cards
    });

    setNumber(0);
    navigation.navigate('Cards')
  }

  // Function that creates toast msg
  const notifyMessage = (msg) => {
    console.log('TOAST ', msg);
    
    Toast.show(msg, {
      duration: Toast.durations.LONG,
      position: Toast.positions.CENTER,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
    
  }

   return (
     <ScrollView style= {{ backgroundColor: '#FFF'}}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{ flex: 1 }}>
  
        <SafeAreaView style={{flex:1, backgroundColor: '#fff', justifyContent: "flex-end"}}>
          <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={ styles.header }>Add a new deck!</Text>
          </View>
          <View style={{flex:2, justifyContent: 'center' }}>
            <TextInput
              placeholder={'Name..'}
              style={[styles.nameInput, styles.shadow]}
              onChangeText={text => setDeckName(text)}
              value={deckName}
            />  
            <View style={{flexDirection: 'row', justifyContent: 'center', paddingTop:10}}>
              {renderlist()}
            </View>
          </View>
    
          <View style={{flex:4, flexDirection:'row', justifyContent:'space-evenly'}}>
            <NewFlip 
              toast={(msg) => notifyMessage(msg)} 
              color={color} style={styles.shadow} 
              addQuestion={(questions, answer) => addCard(questions, answer)}
            />
          </View>
    
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Button 
              title={'Save'}
              onPress={() => saveDeck()}
            />
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView> 
     </ScrollView>
   );   
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    paddingVertical: 10
  },
  subtitle:{
    fontSize: 15,
    marginBottom: 5,
    marginLeft: 15
  },
  subtitleCard:{
    fontSize: 15,
    marginBottom: 5,
  },
  nameInput: {
    marginLeft: 15,
    paddingLeft: 10, 
    height: 40,
    width: Dimensions.get('window').width - 30,
    backgroundColor: '#fff',
    borderRadius: 15,
  },
  cardInput:{
    padding: 10,
    paddingTop: 30,
    height: 200,
    width: Dimensions.get('window').width / 2.3,
    backgroundColor: '#fff',
    borderRadius: 15,
    textAlign: 'center',
  },
  shadow:{
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 1,
  }
})