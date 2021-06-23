import React, { useState, useEffect } from 'react';
import {StyleSheet, View,ImageBackground, Image,Text} from 'react-native';
import {ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import firebase from '../src/utils/Firebase';
import 'firebase/firestore'

const db = firebase.firestore(firebase);

const Reflexion = () =>{
    let image = {
        uno: require('../src/images/lago.jpg'),
        dos: require('../src/images/reflexion2.jpg'),
        tres: require('../src/images/reflexion3.jpg')
    };

    const initialState = {
        id: "",
        duracion: "",
        personas: "",
        titulo: "",
        texto1: "",
        texto2: "",
        texto3: "",
        image: image.uno
        };

    const [content, setContent] = useState(initialState);
    const [number, setNumber] = useState(1);

   

    useEffect(() => {
        getContent();
        
      }, []);
    
      const getContent = () => {  
        if(number == 3){
            setNumber(1)
        } else {
            setNumber(number + 1)
        }
        db.collection('reflexion').doc(number.toString())
            .get()
            .then
                (datos=>{
                    switch(datos.id){
                        case '1':
                            setContent({ ...datos.data(), id: datos.id, image: image.uno})
                            console.log(content);
                            break;
                        case '2':
                            setContent({ ...datos.data(), id: datos.id, image: image.dos})
                            break;
                        case '3':
                            setContent({ ...datos.data(), id: datos.id, image: image.tres})
                            break;
                        default:
                            setContent({ ...datos.data(), id: datos.id, image: image.uno})
                            break;
                    }
                });
      };

return(
    <View style={styles.background}> 
        <ImageBackground 
            source={content.image} 
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
            onPress={()=>getContent()}>
            <Text style={{color: '#ff73df', fontSize: 40}}>→</Text>
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
        }
    })

    export default Reflexion