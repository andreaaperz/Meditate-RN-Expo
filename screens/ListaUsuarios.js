import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import {StyleSheet, View,ImageBackground, Image,Text} from 'react-native';
import Perfil from '../src/components/Perfil';
import firebase from '../src/utils/Firebase';
import 'firebase/firestore';
import 'firebase/auth';

const db = firebase.firestore(firebase);

const ListaUsuarios = ({navigation}) =>{

const [list, setList] = useState([]);

  useEffect(() => {
      getUsers();
  }, []);

  const logOut = () => {
    firebase.auth().signOut().then(() => {
      navigation.navigate('login')
    })
  } 

  const getUsers = () => {
    setList([]);
    const itemsArray = [];
    db.collection('usuarios')
      .get()
      .then((response) => {
        response.forEach((doc) => {
                itemsArray.push({
                    id: doc.id,
                    nombre: doc.data().nombre,
                    edad: doc.data().edad,
                    genero: doc.data().genero,
                }) 
            }) 
            setList(itemsArray);
            console.log(itemsArray)
        });
  };

  const navigateF = (aidi) => {
    navigation.navigate('detalle', {userId: aidi} )
  }

return(
    <View style={styles.background}>
    <View style={styles.boton}>
        <Text style={styles.textboton} onPress={()=>logOut()}>Salir</Text>
    </View>  
        <ScrollView
                vertical
                style={styles.history}>
                    {list.map((item, index) => (
                    <Perfil
                        key = {index}
                        nombre = {item.nombre}
                        edad = {item.edad}
                        genero = {item.genero}
                        onPress={()=> navigateF(item.id)}/>
                    ))} 
                </ScrollView>
        
    </View>
    );
}

const styles = StyleSheet.create(
    {
        background: {
            backgroundColor:"#fff",
            height:"100%",
            paddingHorizontal:20
        },
        backgroundImage: {
            marginLeft:5,
            marginRight:5,
            borderRadius: 9,
            marginTop:13,
            width:"100%",
            height:250
        },
        history: {
            backgroundColor:"#fff",
            borderRadius: 8,
            marginLeft: 10,
            marginRight: 10,
            marginTop: 3,
            marginBottom: 3,
            height: '100%'
        }, 
        row: {
            flexDirection:"row",
            marginTop:20
        },
        info: {
            backgroundColor:"#cbe1e7",
            marginLeft: 15,
            paddingVertical:10,
            paddingHorizontal:10,
            borderRadius:8,
            width:90,
            height: 60
        },
        info2: {
            marginLeft: 15,
            paddingVertical:5,
            paddingHorizontal:5,
            borderRadius:8,
            width:90,
            height: 60
        },
        topText: {
            color:"#1687a7",
        }, 
        bottomText: {
            fontSize: 10
        },
        descriptionCard: {
            backgroundColor:"#0e657e",
            borderRadius:7,
            padding:20,
            marginBottom: 3,
            marginTop:20
        }, 
        title: {
            fontSize:20,
            color:"#fff",
            marginBottom:10
        },
        content: {
            marginTop: 7,
            marginBottom: 4,
            textAlign: 'justify',
            color:"#c7f0fb",
        },
        boton: {
            marginHorizontal:110,
            alignItems:"center",
            justifyContent:"center",
            marginTop:13,
            backgroundColor:"#f25287",
            borderRadius:7
        },
        textboton: {
            color:"white",
        }
    })

export default ListaUsuarios