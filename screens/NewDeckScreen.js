import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, SafeAreaView, TextInput, Dimensions, Button } from 'react-native';
import firebase from './../firebase';

export default function NewDeckScreen() {
  const [deckName, setDeckName] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [cards, setCards] = useState({});
  
  const addCard = (question, answer) => {

    setCards({...cards, [question] : answer});
  }

  const saveDeck = (name, question, answer) => {
    addToFirebase(name, question, answer);
  }

  const addToFirebase = (name, question, answer) => {
    firebase.database().ref('allDecks/').child(name).set({
      key: name,
      cards
    });
  }
  

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={{alignItems: 'center', marginTop: 20, marginBottom: 20}}>
        <Text style={ styles.header }>Add new deck!</Text>
      </View>
      <View style={{ marginLeft: 20, marginRight: 20, marginBottom: 10 }}>
        <Text style={ styles.subtitle }>Name:</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => setDeckName(text)}
          value={deckName}
        />  
      </View>

      <View style={{ marginLeft: 20, marginRight: 20, marginBottom: 10  }}>
        <Text style={ styles.subtitle}>Question:</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => setQuestion(text)}
          value={question}
        />  
      </View>

      <View style={{ marginLeft: 20, marginRight: 20, marginBottom: 10  }}>
        <Text style={ styles.subtitle }>Answer:</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => setAnswer(text)}
          value={answer}
        />    
      </View>

      <View style={{ flexDirection:'row', justifyContent: 'center'}}>
        <Button 
          title={'Save Deck'}
          onPress={() => saveDeck(deckName, question, answer)}
        />

        <Button 
          title={'New card'}
          onPress={() => addCard(question, answer)}
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
    marginBottom: 5
  },
  textInput: {
    paddingLeft: 10, height: 40,
    width: Dimensions.get('window').width - 40,
    backgroundColor: '#fff',
    borderRadius: 15
  }
})