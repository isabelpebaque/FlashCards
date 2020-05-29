import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, ToastAndroid, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

// npm imports
import FlipCard from 'react-native-flip-card'
// import Toast from 'react-native-root-toast';


export default function Flip(props){
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  

  // Adds card into object list
  const send = (isFlipEnd) => {
    
    // Checks so card fliped twice and that inputs are not empty before sending data to NewDeckScreen
    if (!isFlipEnd) {
      if (answer === '' || question === '') {
        props.toast('You need to add both question and answer!');
      } else {
        props.addQuestion(question, answer);
        setQuestion('');
        setAnswer(''); 
        props.toast('Card added! \n Remember to save your deck when you are done');
      }
    }
  }

  return(
      <FlipCard
        flipHorizontal={true}
        flipVertical={false}
        onFlipEnd={(isFlipEnd)=> send(isFlipEnd)}
        >

        {/* Face Side */}
        <View style={[styles.flipCardFront, {backgroundColor: props.color}]}>
          <Text style={{fontSize: 20}}>Question</Text>
          <TextInput
            style={{ flex:1, width: '80%', textAlign: 'center',}}
            onChangeText={text => setQuestion(text)}
            value={question}
          /> 
          <View style={styles.button}>
            <AntDesign 
              name="arrowright" 
              size={24} 
              color="black" />
          </View>
        </View>

        {/* Back Side */}
        <View style={[styles.flipCardBack, {backgroundColor: props.color}]}>
        <Text style={{fontSize: 20}}>Answer</Text>
          <TextInput
            style={{ flex:1, width: '80%', textAlign: 'center',}}
            onChangeText={text => setAnswer(text)}
            value={answer}
          /> 
          <View style={styles.button}>
            <Ionicons 
              name="md-checkmark" 
              size={24} 
              color="black" />
        </View>
        </View>

      </FlipCard>
  )
}

const styles = StyleSheet.create({

  flipCardFront:{
    flex: 1,
    height: Dimensions.get('window').height - 300,
    margin: 30,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  flipCardBack:{
    flex: 1,
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
  },
  button: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .1)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});