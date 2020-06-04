import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, Modal, TouchableOpacity, Alert, Platform, Image } from 'react-native';
import { Octicons } from '@expo/vector-icons';

// npm imports
import firebase from './../firebase';
import _ from 'lodash'
import { useHeaderHeight } from '@react-navigation/stack';

// components import
import Flip from '../components/Flip'


export default function HomeScreen({ navigation }) {
  useEffect(() => {
    fetchDecks();
  },[]);
  
  const headerHeight = useHeaderHeight();

  const [deckList, setDeckList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [questionsList, setQuestionsList] = useState([]);
  const [key, setKey] = useState('');
  const [color, setColor] = useState('');
  const [firstTimeText, setFirstTimeText] = useState(true);
  
  
  // Fetching data from firebase
  const fetchDecks = () => {
    firebase.database().ref('allDecks/').on('value',(snap)=>{
      let value = snap.val()

      if (value === null) {
        setFirstTimeText(true);
      } else {
        setFirstTimeText(false);
      }

      // Transform object to array format for flatlist
      let valueArray = _.map(value, element => {
        return {...element};
      })
      setDeckList(valueArray);
    });
  }

  // Deletes specified object from database
  const deleteFromFirebase = (name) => {
    firebase.database().ref(`allDecks/${name}`).remove();
  }

  // Send user an alert before deleting from database
  const removeDeck = (deckName) => {
    
    Alert.alert(
      `Are you sure?`,
      `This will delete your deck ${deckName}`,
      [
        { 
          text: 'Yes', 
          onPress:() => deleteFromFirebase(deckName),
          style: 'destructive'
        },
        {
          text: 'No',
          onPress:() => console.log('Cancel pressed'),
          style: "cancel"
        },
      ],
      { cancelable: false }
    );
  }

  
  // Render card for each item in list
  const Item = ({ title, deck, done, color}) => {
    return (
      <TouchableOpacity onPress={() => showDeck(deck, title, color)} style={[styles.item, {backgroundColor: color} ]}>
        <TouchableOpacity onPress={() => removeDeck(title)} style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 10, paddingTop: 10 }}>
          <Octicons name="trashcan" size={30} color="black" />
        </TouchableOpacity>
        <View style={styles.cardTitle}>
          <Text style={styles.headerText}>{title}</Text>
          <Text style={styles.text}>Completed: {done}%</Text>
        </View>
      </TouchableOpacity>
    );
  }

  // Function that takes object with all questions from pressed item and add into an array and all answers into an array
  const showDeck = (deck, deckKey, color)=> {
    setModalVisible(!modalVisible)
    
    setQuestionsList(deck);
    setKey(deckKey);
    setColor(color);
    
  }
  
  // Renders the view depending on if user have decks in database or not
  if (firstTimeText) {
    return (
      <View style={{flex:1,  alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF'}}>
        <Text style={{ textAlign: 'center', paddingHorizontal: 30}}>
          You do not have any Decks yet, let's create one by adding a new Deck!
        </Text>
        <Image  style={styles.image} source={require('../assets/1.png')} />
      </View>
    )
  } else {
    return (
      <View style={{flex:1, backgroundColor: '#fff'}}>
        <FlatList
          data={deckList}
          style={styles.container}
          renderItem={({ item }) => <Item title={item.key} deck={item.cards} done={item.percentageDone} color={item.color} />}
          keyExtractor={item => item.key}
          numColumns={1}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        >
          <View style={{ height: Platform.OS === 'ios' ? headerHeight : headerHeight - 24}}/> 

          <View style={{ flex:1, justifyContent: 'center', backgroundColor:'#fff' }}>
            <Flip 
              setModal={(bool) => setModalVisible(bool)} 
              deck={questionsList} 
              keyPercentage={key} 
              color={color}
            />
          </View>
          
        </Modal>
      </View>
    ) 

  }

        

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flex: 1,
    margin: 10,
    paddingLeft: 10,
    height: Dimensions.get('window').width / 2,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  cardTitle: {
    flex:1 , 
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 35,
    fontWeight: 'bold'
  },
  text: {
    fontSize: 20
  },
  flipCard:{
    height: Dimensions.get('window').height - 400,
    margin: 30,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: '#5ce1e6',
  },
  shadow: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    shadowColor: '#000'
  },
  image:{
    height: Dimensions.get('window').height - 400,
    width: Dimensions.get('window').height - 400,
  }
});