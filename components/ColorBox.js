import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function ColorBox(props){
  return(
    <View style={{height: 25, width: 25, backgroundColor: props.color, borderRadius: 30}}></View>
  )
}

const styles = StyleSheet.create({

});