import React from 'react';
import MessagesLookUpScreen from './src/screens/MessagesLookUpScreen';
import MessagesResultScreen from './src/screens/MessagesResultScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { useFonts } from 'expo-font';

const Stack = createNativeStackNavigator();

export default function App() {
  // const [fontsLoaded] = useFonts({
  //   'Poppins-Regular': require('./app/assets/fonts/poppins/Poppins-Regular.ttf'),
  // });

  // if (!fontsLoaded) {
  //   return null;
  // }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MessageLookUp">
        <Stack.Screen
          name="MessageLookUp"
          component={MessagesLookUpScreen}
          options={{ title: '' }}
        />
        <Stack.Screen
          name="MessageCenter"
          component={MessagesResultScreen}
          options={{ title: '' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
