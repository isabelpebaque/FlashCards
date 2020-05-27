import React, {useState} from 'react';
import { StyleSheet, Text, View, Image  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


// npm imports
import AppIntroSlider from 'react-native-app-intro-slider';


export default function Intro(props){
  // Array with intro data
  const slides = [
    {
      key: 1,
      title: 'Welcome to FlashCards!',
      text: 'Start with choosing your deck',
      image: require('../assets/1.png'),
    },
    {
      key: 2,
      title: 'Read the question',
      text: 'Tap the card to flip and see the answer',
      image: require('../assets/2.png'),
    },
    {
      key: 3,
      title: 'Move on to next question',
      text: 'If you knew the answer swipe right, if not swipe left',
      image: require('../assets/3.png'),
    }
  ];

  // Render each view 
  _renderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <Image  source={item.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  }

  // Sets variabel to true and sends it to Homescreen
  _onDone = () => {
    props.show(true);
    console.log('Done btn pressed', props);
  }
  
  // Design for done button
  _renderDoneButton = () => {
    return (
      <View style={styles.button}>
        <Ionicons 
          name="md-checkmark" 
          size={24} 
          color="black" />
      </View>
    );
  };

  // Design for next buttons
  _renderNextButton = () => {
    return(
      <View style={styles.button}>
        <AntDesign 
          name="arrowright" 
          size={24} 
          color="black" />
      </View>
    )
  }
  
  return(
    <AppIntroSlider 
      renderItem={_renderItem}
      data={slides}
      onDone={_onDone}
      renderDoneButton={_renderDoneButton}
      renderNextButton={_renderNextButton}
    />
  
  )
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 30,
  },
  text: {
    fontSize: 20,
    paddingHorizontal: 15,
    textAlign: 'center'
  },
  button: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .1)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image:{
    width: 350,
    height: 350
  }
});