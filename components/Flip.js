import React from 'react';
import { StyleSheet, Text, View, Alert, Dimensions, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

// npm imports
import FlipCard from 'react-native-flip-card'
import Swiper from 'react-native-deck-swiper'
import firebase from './../firebase';

export default function Flip(props){

  let questionsList = props.deck;
  let answers = 0;

  console.log('PROPS: ', props);
  

  const calculator = (amountOfQuestions, correctAnswers) => {
    return Math.round((100 * correctAnswers) / amountOfQuestions);
  }


  const renderCard = (card, index) => {
    let question = index+1;

    return(
      <FlipCard 
      flipHorizontal={true}
      flipVertical={false}
      >
        {/* Face Side */}
        <View style={[styles.flipCardFront, styles.shadow, {backgroundColor: props.color}]} >
          <Text>QUESTION {question}/{questionsList.length}</Text>
          <Text style={{fontSize: 25}}>{card.question}</Text>
          <Text style={{fontSize: 20}}>Tap to see the answer</Text>
        </View>

        {/* Back Side */}
        <View style={[styles.flipCardBack, styles.shadow, {backgroundColor: props.color}]}>
          <Text>ANSWER</Text>
          <View style={{flex:1, justifyContent: 'center'}}>
            <Text style={{fontSize: 25}}>{card.answer}</Text>
          </View>
        </View>
      </FlipCard>
    )
  }

  const updateFirebase = () => {
    let percentage = calculator(questionsList.length, answers);

    firebase.database().ref(`allDecks/${props.keyPercentage}`).update({
      percentageDone: percentage
    });
  }


  const onSwipedAllCards = () => {

    updateFirebase();
    
    console.log('all cards swiped');
    Alert.alert(
      `You completed ${calculator(questionsList.length, answers)} % of the questions`,
      'Do you wanna retry them?',
      [
        {
          text: 'Yes',
          onPress: () => props.setModal(false)
          
        },
        {
          text: 'No',
          onPress: () => props.setModal(false),
          style: "cancel"
        },
      ],
      { cancelable: false }
    );
  };

  const swipeLeft = (item) => {
    console.log('You guessed wrong!', item); 

  };
  
  
  const swipeRight = (item) => {
    console.log('You guessed right!', item); 
    answers ++;
    
  }

  return(
    <Swiper
      useViewOverflow={Platform.OS === 'ios'} 
      backgroundColor={'#fff'}
      onSwiped={() => console.log('you swiped')}
      onSwipedLeft={(item) => swipeLeft(item)}
      onSwipedRight={(item) => swipeRight(item)}
      cards={questionsList}
      cardIndex={0}
      cardVerticalMargin={80}
      renderCard={renderCard}
      onSwipedAll={onSwipedAllCards}
      stackSize={questionsList.length}
      stackSeparation={15}>
        
        <TouchableOpacity
          onPress={() => {
            props.setModal(false)
          }}
          style={styles.close}>
          <AntDesign name="closecircleo" size={30} color="black" />
        </TouchableOpacity>
    </Swiper>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flipCardFront:{
    height: Dimensions.get('window').height - 300,
    margin: 30,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  flipCardBack:{
    height: Dimensions.get('window').height - 300,
    margin: 30,
    borderRadius: 20,
    alignItems: 'center',
  },
  shadow: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    shadowColor: '#000'
  },
  close:{
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginRight: 15
  }
});