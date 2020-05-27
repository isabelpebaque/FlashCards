import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, Modal, TouchableOpacity, SafeAreaView, Platform } from 'react-native';

// npm imports
import firebase from './../firebase';
import _ from 'lodash'
import { useHeaderHeight } from '@react-navigation/stack';

// components import
import Flip from '../components/Flip'
import Intro from '../components/Intro'


const numColumns = 2;

export default function HomeScreen() {
  useEffect(() => {
    fetchDecks();
  },[deckList]);
  
  const headerHeight = useHeaderHeight();

  const [deckList, setDeckList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [showApp, setShowApp] = useState(false);
  const [questionsList, setQuestionsList] = useState([]);
  const [key, setKey] = useState('');

  console.log('show app? ', showApp);
  
  
  // Fetching data from firebase
  const fetchDecks = () => {
    firebase.database().ref('allDecks/').on('value',(snap)=>{
      let value = snap.val()

      // Transform object to array format for flatlist
      let valueArray = _.map(value, element => {
        return {...element};
      })
      setDeckList(valueArray);
    });
  }
  
  // Render card for each item in list
  const Item = ({ title, deck, done}) => {
    return (
      <TouchableOpacity onPress={() => showDeck(deck, title)} style={styles.item}>
        <View style={styles.cardTitle}>
          <Text style={styles.itemText}>{title}</Text>
        </View>
        <View style={styles.cardBottomText}>
          <Text>Completed: {done}%</Text>
        </View>
      </TouchableOpacity>
    );
  }

  // Function that takes object with all questions from pressed item and add into an array and all answers into an array
  const showDeck = (deck, deckKey)=> {
    setModalVisible(!modalVisible)
    
    setQuestionsList(deck);
    setKey(deckKey);
    
  }
  
  const startApp = (bool) => {
    setShowApp(bool);
  }

  if (showApp) {
    return <View style={{flex:1}}>
              <FlatList
                data={deckList}
                style={styles.container}
                renderItem={({ item }) => <Item title={item.key} deck={item.cards} done={item.percentageDone} />}
                keyExtractor={item => item.key}
                numColumns={numColumns}
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
                  />
                </View>
                
              </Modal>
          </View>
        
  } else {
    return <Intro show={(bool) => startApp(bool)}/>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#AA4139',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 10,
    height: Dimensions.get('window').width / numColumns,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  cardTitle: {
    flex: 1,
    justifyContent: 'center'
  },
  cardBottomText: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  itemText: {
    color: '#fff',
    fontSize:25,
  },
  flipCard:{
    height: Dimensions.get('window').height - 400,
    margin: 30,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: '#AA4139',
  },
  shadow: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    shadowColor: '#000'
  }
});