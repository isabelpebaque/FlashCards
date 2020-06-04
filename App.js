import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Ionicons from 'react-native-vector-icons/Ionicons';

// Screen imports
import HomeScreen from './screens/HomeScreen';
import NewDeckScreen from './screens/NewDeckScreen';
import Intro from './components/Intro';

// Create navigation
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [showApp, setShowApp] = useState(false);
  // console.log('show app? ', showApp);

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

  // Sets the bool when user have done the intro
  const startApp = (bool) => {
    setShowApp(bool);
  }
  
  // Check if user has done the intro before showing the app
  if (showApp) {
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
        
  } else {
    return <Intro show={(bool) => startApp(bool)}/>;
  }
}
