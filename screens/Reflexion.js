import React, { useState, useEffect } from 'react';
import {StyleSheet, View,ImageBackground, Image,Text} from 'react-native';
import {ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import firebase from '../src/utils/Firebase';
import 'firebase/firestore'

const db = firebase.firestore(firebase);

const Reflexion = () =>{
    const initialState = {
        id: "",
        duracion: "",
        personas: "",
        titulo: "",
        texto1: "",
        texto2: "",
        texto3: ""
        };

    const [content, setContent] = useState(initialState);
    const [number, setNumber] = useState(1);

    useEffect(() => {
        getContent(true);
        
      }, []);
    
      const getContent = (value) => {  
        if(number == 3){
            setNumber(1)
        } else {
            setNumber(number + 1)
        }
        setContent(initialState);
        db.collection('reflexion').doc(number.toString())
            .get()
            .then
                (datos=>{
                    setContent({ ...datos.data(), id: datos.id});
                });
      };


return(
    <View style={styles.background}> 
        <ImageBackground 
            source={require('../src/images/lago.jpg')} 
            style={styles.backgroundImage}>
        </ImageBackground>
                   
        <View style={styles.row}>
        <View style={styles.info}>
            <Text style={styles.topText}>Duración</Text>
            <Text style={styles.bottomText}>{content.duracion}</Text>
        </View>

        <View style={styles.info}>
            <Text style={styles.topText}>Personas</Text>
            <Text style={styles.bottomText}>{content.personas}</Text>
        </View>

        <TouchableOpacity 
            style={styles.info2}
            onPress={()=>getContent(true)}>
            <Text style={{color: '#ff73df', fontSize: 50}}>→</Text>
        </TouchableOpacity>

        </View>
        <ScrollView vertical style={styles.descriptionCard}>
            <Text style={styles.title}>{content.titulo}</Text>
            <Text style={styles.content}> {content.texto1} </Text>
            <Text style={styles.content}> {content.texto2} </Text>
            <Text style={styles.content}> {content.texto3} </Text>
        </ScrollView>
    </View>
    );
}

const styles = StyleSheet.create(
    {
        background: {
            backgroundColor:"#f8f8f8",
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
            width:90
        },
        info2: {
            marginLeft: 15,
            paddingVertical:10,
            paddingHorizontal:10,
            borderRadius:8,
            width:90
        },
        topText: {
            color:"#1687a7",
        }, 
        bottomText: {
        },
        descriptionCard: {
            backgroundColor:"#0e657e",
            borderRadius:7,
            padding:20,
            marginTop:20
        }, 
        title: {
            fontSize:20,
            color:"#fff",
            marginBottom:10
        },
        content: {
            marginTop: 10,
            textAlign: 'justify',
            color:"#c7f0fb",
        }
    })

    export default Reflexion