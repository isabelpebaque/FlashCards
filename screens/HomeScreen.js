import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, Modal, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import firebase from './../firebase';
import _ from 'lodash'
import { useHeaderHeight } from '@react-navigation/stack';


const numColumns = 2;

export default function HomeScreen(props) {
  useEffect(() => {
    fetchDecks();
  },[deckList]);
  
  const headerHeight = useHeaderHeight();
  const [deckList, setDeckList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [questionsList, setQuestionsList] = useState([]);
  const [answersList, setAnswersList] = useState([]);


  
  // Fetching data from firebase
  const fetchDecks = () => {
    firebase.database().ref('allDecks/').on('value',(snap)=>{
      let value = snap.val()

      // Transform object to array format for flatlist
      let valueArray = _.map(value, element => {
        return {...element};
      })
      // console.log('snap', valueArray);
      setDeckList(valueArray);
    });
  }
  
  const Item = ({ title, deck}) => {
    return (
      <TouchableOpacity onPress={() => showDeck(deck)} style={styles.item}>
        <View >
            <Text style={styles.itemText}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  // Function that takes object from pressed item and add all questions into an array and all answers into an array
  const showDeck = (deck)=> {
    setModalVisible(!modalVisible)
    
    const questions = Object.keys(deck);
    setQuestionsList(questions);
    
    const answers = Object.values(deck);
    setAnswersList(answers);
    
    // console.log(Object.values(deck));
  }

  return (
    <SafeAreaView style={{flex:1}}>
    <FlatList
      data={deckList}
      style={styles.container}
      renderItem={({ item }) => <Item title={item.key} deck={item.cards} />}
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
        <View style={{height: Dimensions.get('window').height - 400, margin: 30,borderRadius: 20, alignItems: 'center', backgroundColor: '#AA4139',     shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,}}>
          <Text style={styles.itemText}>{questionsList[0]}</Text>
          <Text style={styles.itemText}>{answersList[0]}</Text>

          <TouchableOpacity
            onPress={() => {
              setModalVisible(!modalVisible);
            }}>
            <Text style={styles.itemText}>Hide modal</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>

  </SafeAreaView>
    
  );
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
  itemText: {
    color: '#fff',
  },
});