import React, {useState} from 'react';
import { Text, View, StyleSheet, SafeAreaView, TextInput, Dimensions, Button } from 'react-native';
import firebase from './../firebase';
import _ from 'lodash'

export default function NewDeckScreen() {
  const [deckName, setDeckName] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [cards, setCards] = useState([]);
  const [number, setNumber] = useState(0);

  
  // Adds card into object list
  const addCard = () => {
    if(checkInputEmpty()) {
      alert('Cant add card to deck when inputs are empty');
    } else {
      setCards({...cards, [number]: {
        question : question,
        answer: answer}
      });
      setNumber(num => num + 1);
      clearInputFields();
    }
    
  }
  console.log('NEW ADDED DECK: ', cards);
  
  // Saves deck to firebase
  const saveDeck = () => {
    if (answer !== '' && question !== '') {
      alert('You need to add card before you can save')
    } else {
      addToFirebase();
      clearAllInputFields();
      setCards({});
    }
  }

  // Push new object into firebase database
  const addToFirebase = () => {
    firebase.database().ref('allDecks/').child(deckName).set({
      key: deckName,
      percentageDone: 0,
      cards
    });
  }

  // Check if inputfields are empty
  const checkInputEmpty= () => {
    if (deckName === '' && question === '' && answer === '') {
      return true;
    } else {
      return false;
    }
  }

  // Clear question and answer inputfields
  const clearInputFields = () => {
    setQuestion('');
    setAnswer('');
  }

  // CLear all inputfields
  const clearAllInputFields = () => {
    setDeckName('');
    setQuestion('');
    setAnswer('');
  }
  

  return (
    <SafeAreaView style={{flex:1, backgroundColor: '#f6ecf5'}}>
      <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={ styles.header }>Add a new deck!</Text>
      </View>
      <View style={{flex:2, justifyContent: 'center' }}>
        <Text style={ styles.subtitle }>Name:</Text>
        <TextInput
          style={[styles.nameInput, styles.shadow]}
          onChangeText={text => setDeckName(text)}
          value={deckName}
        />  
      </View>

      <View style={{flex:4, flexDirection:'row', justifyContent:'space-evenly'}}>
        <View>
          <Text style={ styles.subtitleCard }>Question:</Text>
          <TextInput
            style={[styles.cardInput, styles.shadow]}
            onChangeText={text => setQuestion(text)}
            value={question}
            multiline={true}
          />  
        </View>

        <View>
          <Text style={ styles.subtitleCard }>Answer:</Text>
          <TextInput
            style={[styles.cardInput, styles.shadow]}
            onChangeText={text => setAnswer(text)}
            value={answer}
            multiline={true}
          />    
        </View>
      </View>

      <View style={{flex: 4, justifyContent: 'center'}}>

        <Button 
        title={'Add card'}
        onPress={() => addCard()}
        />
        <Button 
          title={'Save'}
          onPress={() => saveDeck()}
        />

      </View>
        <View style={{ flex: 1, alignItems: 'center'}}>
        <Text>Cards added to your deck: {_.size(cards)}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20
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