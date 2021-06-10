import React from 'react';
import {StyleSheet, View,ImageBackground, Image,Text} from 'react-native';

const Reflexion = () =>{
return(
    <View style={styles.background}> 
        <ImageBackground 
            source={require('../src/images/lago.jpg')} 
            style={styles.backgroundImage}>
        </ImageBackground>
                   
        <View style={styles.row}>
        <View style={styles.info}>
            <Text style={styles.topText}>Duración</Text>
            <Text style={styles.bottomText}>25 minutos</Text>
        </View>

        <View style={styles.info}>
            <Text style={styles.topText}>Personas</Text>
            <Text style={styles.bottomText}>1</Text>
        </View>

        </View>
        <View style={styles.descriptionCard}>
            <Text style={styles.title}>Práctica del agradecimiento antes de ir a dormir</Text>
            <Text style={styles.content}> 
            Realiza una lista con aquellas cosas por las que estés agradecido. Cada día las leerás e irás añadiendo todo lo que te vaya ocurriendo, tanto lo bueno como lo no tan bueno.
            </Text>
            <Text style={styles.content}>
            Agradecer incluso las situaciones más difíciles y verlas como oportunidades de crecimiento, nos hará más positivos y más resilientes.
            </Text>
            <Text style={styles.content}>
            Con la gratitud se obtiene una elevación de la vibración además de un efecto exponencial, ya que cada vez tendrás más motivos para dar las gracias. Puedes empezar hoy mismo a comprobarlo.
            </Text>
        </View>
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
            backgroundColor:"#ecfbff",
            marginLeft: 15,
            paddingVertical:10,
            paddingHorizontal:10,
            borderRadius:8,
            width:140
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