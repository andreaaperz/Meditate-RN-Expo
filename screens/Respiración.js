import React,  { useState } from 'react'
import {View, Text, StyleSheet ,Image,ImageBackground,TouchableOpacity,} from 'react-native'
import Audios from '../src/components/Audios';

const Respiracion = () =>{
    

return(
<ImageBackground
    source={require('../src/images/back2.png')}
    style={{width:"100%",height:"100%"}}>
    <Image source ={require('../src/images/Pajaros.png')} style={styles.image}/> 
    <Text style={styles.title} >Respiración</Text>
    <Text style={styles.subtitle}>
        "Cualquiera puede sostener el timón cuando el mar está en calma"
    </Text>
        <View style={styles.title}>
                <Audios
                    onPress={() =>{
                        console.log("Juan2");
                    }}
                    num={1}
                    color="#fde6e6"
                    percent={25}
                    duration="28 minutos"
                    title="Introducción"/>
                <Audios
                    num={2}
                    color="#f9e1fc"
                    percent={50}
                    duration="39 minutos"
                    title="Primeros pasos"/>
                <Audios
                    num={3}
                    color="#e8f1fd"
                    percent={0}
                    duration="5 minutos"
                    title="Encuentra tu camino"/>
                <Audios
                    num={4}
                    color="#e5ffef"
                    percent={0}
                    duration="10 minutos"
                    title="Gracias a la vida"/>
                <Audios
                    num={5}
                    color="#fbfaf6"
                    percent={0}
                    duration="30 minutos"
                    title="Conclusión"/>
        </View>
    </ImageBackground>
    )
}

const styles = StyleSheet.create({
    image: {
        width:"50%",
        height:"29%",
        borderRadius: 100,
        marginTop: 30,
        alignSelf:"center"
    },
    title: {
        fontSize:30,
        color: "#0e657e",
        fontFamily:"SemiBold",
        alignSelf:"center",
    },
    subtitle: {
        fontFamily:"SemiBold",
        marginHorizontal:55,
        fontSize: 17,
        textAlign:'center',
        marginTop:3,
        opacity:0.6
    }
})

export default Respiracion