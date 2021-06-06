import React, { useState } from 'react';
import { TouchableOpacity } from "react-native-gesture-handler";
import {StyleSheet, Text,View,Image, ImageBackground} from 'react-native';
import Emotions from '../src/components/Emotions';
import firebase from '../src/utils/Firebase';
import 'firebase/auth';
import 'firebase/firestore'

const db = firebase.firestore(firebase);

const Emociones = () =>{

  const addEmotion = (idEmocion) => {
        firebase.auth().onAuthStateChanged(user =>{
            db.collection('detalleEmociones').add({
                idEmocion: idEmocion,
                idUsuario: user.uid,
            }).then(()=>{
                console.log('agregado');
            }).catch(err=>{
                console.log(err);
            }) 
        })  
    }

return( 
  <ImageBackground
  source={require("../src/images/ola.png")}
  style={styles.background}>

        <Text style={styles.title} >Cada día es una nueva experiencia</Text>
        <Text style={styles.subtitle}>¿Cómo te sientes el día de hoy?</Text>

        <View
            style={styles.scroll}>
            <TouchableOpacity 
              onPress={()=> addEmotion('ulzmnx4Sy4WOxm1CnH18')}
              style={{alignItems: "center", justifyContent: "center", height: 66, width: 66, marginHorizontal: 2, marginTop: 30, borderRadius: 50, backgroundColor: '#204380'}}>
              <Image
                source={require("../src/images/triste(1).png")}
                style={styles.bolitaImage}/>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={()=> addEmotion('rEX3GDHzQrfnnNmDxZzX')}
                style={{alignItems: "center", justifyContent: "center", height: 66, width: 66, marginHorizontal: 2, marginTop: 30, borderRadius: 50, backgroundColor: '#769cdf'}}>
              <Image
                source={require("../src/images/triste.png")}
                style={styles.bolitaImage}/>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={()=> addEmotion('RAuouIcMmzw1C8GmtYuR')}
              style={{alignItems: "center", justifyContent: "center", height: 66, width: 66, marginHorizontal: 2, marginTop: 30, borderRadius: 50, backgroundColor: '#d2dff5'}}>
              <Image
                source={require("../src/images/esceptico.png")}
                style={styles.bolitaImage}/>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={()=> addEmotion('49jOrAlUalFQmwPJRfQG')}
              style={{alignItems: "center", justifyContent: "center", height: 66, width: 66, marginHorizontal: 2, marginTop: 30, borderRadius: 50, backgroundColor: '#aee5b3'}}>
              <Image
                source={require("../src/images/feliz(1).png")}
                style={styles.bolitaImage}/>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={()=> addEmotion('WNIDCvQQ2gSnquZdILib')}
              style={{alignItems: "center", justifyContent: "center", height: 66, width: 66, marginHorizontal: 2, marginTop: 30, borderRadius: 50, backgroundColor: '#61d96c'}}>
              <Image
                source={require("../src/images/feliz(2).png")}
                style={styles.bolitaImage}/>
            </TouchableOpacity>
            
          </View>

          <Text style={styles.historial}>Historial</Text>
          
          <View style={styles.history}>
                <Emotions
                    animo="Feliz"
                    fecha="01/01/2021"
                    imagen="feliz(2).png"
                    color="#61d96c" />
                <Emotions
                    animo="Feliz"
                    fecha="28/01/2021"
                    imagen="feliz(2).png"
                    color="#61d96c" />
                <Emotions
                    animo="Triste"
                    fecha="03/02/2021"
                    imagen="esceptico.png"
                    color="#769cdf" />
                <Emotions
                    animo="Deprimido"
                    fecha="04/02/2021"
                    imagen="triste.png"
                    color="#204380" />
            </View> 
          
         </ImageBackground>
         
    );
}

const styles = StyleSheet.create({
    background: {
      height: '100%',
      width: "100%"
    },
    scroll: { 
      flexDirection:"row",
      paddingHorizontal: 20,
      alignSelf: "center",
      width: "100%",
    },
    bolita: {
        alignItems: "center", justifyContent: "center", width: 66, marginHorizontal: 2, backgroundColor: '#000'
    },
    bolitaImage: { 
        height: 35, 
        width: 35 
    },
    title: {
        paddingHorizontal: 8,
        color: "#0e657e",
        fontWeight: '300',
        fontSize:30,
        marginTop: 30,
        textAlign: 'center',
        fontFamily:"SemiBold",
        alignSelf:"center",
    },
    subtitle: {
        fontSize:19,
        padding: 10,
        textAlign:'center',
        opacity:0.6
    },
    history: {
        backgroundColor:"#fff",
        borderRadius: 8,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 3,
        marginBottom: 3,
        height: '100%'
    }, 
    historial: {
        fontSize:25,
        padding: 10,
        color:"#fff",
        fontWeight: "100",
        textAlign:'center',
        marginTop: 30
    }
})


export default Emociones