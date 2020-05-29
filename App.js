import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Ionicons from 'react-native-vector-icons/Ionicons';

// Screen imports
import HomeScreen from './screens/HomeScreen';
import NewDeckScreen from './screens/NewDeckScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {

  function Root(){
    return(
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Cards') {
              iconName = 'ios-browsers'
            } else if (route.name === 'Add Deck') {
              iconName = 'ios-add-circle'
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#924E8F',
          inactiveTintColor: '#AA71A7',
        }}
      >
        <Tab.Screen name="Cards" component={HomeScreen} />
        <Tab.Screen name="Add Deck" component={NewDeckScreen} />
      </Tab.Navigator>

    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="FlashCards" 
          component={Root} 
          options={{
            title: 'FlashCards',
            headerStyle: {
              backgroundColor: '#FFF',
            },
            headerTintColor: '#924E8F',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
