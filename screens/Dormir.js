import React from 'react';
import {StyleSheet, View,ImageBackground, Image,Text} from 'react-native';

const Dormir = () =>{
return(
    <View style={styles.background}> 
        <Text style={styles.title} >"El descanso pertenece al trabajo como los párpados a los ojos..."</Text>
        <Text style={styles.subtitle}>Mejora tu sueño con los siguientes videos: </Text>

        <View style={styles.videos}>
            <Image source ={require('../src/images/video1.jpg')} style={styles.image}/> 
            <Image source ={require('../src/images/video2.jpg')} style={styles.image}/> 
        </View>
        
    </View>
    );
}

const styles = StyleSheet.create(
    {
        background: {
            backgroundColor:"#FFF",
            height:"100%"
        },
        title: {
            paddingHorizontal: 8,
            color: "#0e657e",
            fontWeight: '300',
            fontSize:26,
            marginTop: 30,
            paddingHorizontal: 20,
            textAlign: 'center',
            fontFamily:"SemiBold",
            alignSelf:"center",
        },
        content: {
            marginTop: 10,
            textAlign: 'justify',
            fontFamily:"SemiBold",
            color:"#1687a7",
        },
        subtitle: {
            fontSize:17,
            padding: 10,
            textAlign:'center',
            opacity:0.6
        },
        image: {
            width:"100%",
            height:"36%",
            marginTop: 30,
            alignSelf:"center"
        },
        videos:{
            paddingHorizontal: 20,
        }
    })

export default Dormir