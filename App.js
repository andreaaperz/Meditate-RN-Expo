
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
import ListaUsuarios from './screens/ListaUsuarios';
import DetalleUsuario from './screens/DetalleUsuario';
import { LogBox  } from 'react-native';

const Stack = createStackNavigator();

//LogBox.ignoreAllLogs(true)

const myApp = () =>{
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = "login" component={login} options = {{ headerShown: false}}/>
        <Stack.Screen name = "registro" component = {Registro}/>
        <Stack.Screen name = "menu" component = {Menu}/>
        <Stack.Screen name = "respiracion" component = {Respiracion}/>
        <Stack.Screen name = "reflexion" component = {Reflexion}/>
        <Stack.Screen name = "dormir" component = {Dormir}/>
        <Stack.Screen name = "emociones" component = {Emociones}/>
        <Stack.Screen name = "actualizar" component = {Actualizar} />
        <Stack.Screen name = "lista" component = {ListaUsuarios} options = {{ headerShown: false}} />
        <Stack.Screen name = "detalle" component = {DetalleUsuario} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default myApp