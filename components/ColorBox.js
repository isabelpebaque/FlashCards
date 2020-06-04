import React from 'react';
import { View } from 'react-native';

// View for the circles of color in ned deck screen

export default function ColorBox(props){
  return(
    <View style={{height: 25, width: 25, backgroundColor: props.color, borderRadius: 30}}></View>
  )
}
