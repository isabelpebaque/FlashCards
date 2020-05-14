import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, SafeAreaView, TextInput, Dimensions, Button } from 'react-native';
import firebase from './../firebase';

export default function NewDeckScreen() {
  const [deckName, setDeckName] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [cards, setCards] = useState({});
  
  const addCard = () => {
    setCards({...cards, [question] : answer});

    // Clear question and answer textinput fields
    setQuestion('');
    setAnswer('');
  }

  const saveDeck = () => {
    addToFirebase();

    // Clear textinput fields and clear cards
    setDeckName('');
    setQuestion('');
    setAnswer('');
    setCards({});
  }

  const addToFirebase = () => {
    firebase.database().ref('allDecks/').child(deckName).set({
      key: deckName,
      cards
    });
  }
  

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={ styles.header }>Add a new deck!</Text>
      </View>
      <View style={{flex:2, justifyContent: 'center' }}>
        <Text style={ styles.subtitle }>Name:</Text>
        <TextInput
          style={styles.nameInput}
          onChangeText={text => setDeckName(text)}
          value={deckName}
        />  
      </View>

      <View style={{flex:4, flexDirection:'row', justifyContent:'space-evenly'}}>
        <View>
          <Text style={ styles.subtitleCard }>Question:</Text>
          <TextInput
            style={styles.cardInput}
            onChangeText={text => setQuestion(text)}
            value={question}
            multiline={true}
          />  
        </View>

        <View>
          <Text style={ styles.subtitleCard }>Answer:</Text>
          <TextInput
            style={styles.cardInput}
            onChangeText={text => setAnswer(text)}
            value={answer}
            multiline={true}
          />    
        </View>
      </View>

      <View style={{flex: 4, justifyContent: 'center'}}>
        <Button 
          title={'New card'}
          onPress={() => addCard()}
        />
        <Button 
          title={'Done'}
          onPress={() => saveDeck()}
        />
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  cardInput:{
    padding: 10,
    paddingTop: 30,
    height: 200,
    width: Dimensions.get('window').width / 2.3,
    backgroundColor: '#fff',
    borderRadius: 15,
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  }
})