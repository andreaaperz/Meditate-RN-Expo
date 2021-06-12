
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import login from './screens/Login';
import Registro from './screens/Registro';
import Menu from './screens/Menu';
import Respiracion from './screens/Respiración';
import Reflexion from './screens/Reflexion';
import Emociones from './screens/Emociones';
import Dormir from './screens/Dormir';
import Actualizar from './screens/Actualizar';
import { LogBox  } from 'react-native';

const Stack = createStackNavigator();

//LogBox.ignoreAllLogs(true)

const myApp = () =>{
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = "login" component={login} options = {{ headerShown: false}}/>
        <Stack.Screen name = "registro" component = {Registro} options = {{ headerShown: false}}/>
        <Stack.Screen name = "menu" component = {Menu} options = {{ headerShown: false}}/>
        <Stack.Screen name = "respiracion" component = {Respiracion} options = {{ headerShown: false}}/>
        <Stack.Screen name = "reflexion" component = {Reflexion} options = {{ headerShown: false}}/>
        <Stack.Screen name = "dormir" component = {Dormir} options = {{ headerShown: false}}/>
        <Stack.Screen name = "emociones" component = {Emociones} options = {{ headerShown: false}}/>
        <Stack.Screen name = "actualizar" component = {Actualizar} options = {{ headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default myApp