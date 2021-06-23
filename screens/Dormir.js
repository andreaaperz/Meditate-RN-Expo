import React from 'react';
import {StyleSheet, Text, Dimensions, Image} from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import { Video } from 'expo-av';

const  { width, height } = Dimensions.get('window');

const Dormir = () =>{
return(
    <ScrollView
            vertical
            style={styles.scrollCarousel} >
        <Image source ={require('../src/images/day.png')} style={styles.image}/> 
        <Text style={styles.title} > "El descanso pertenece al trabajo como los párpados a los ojos..."</Text>
        <Text style={styles.subtitle}> Mejora tu sueño con los siguientes videos: </Text>
        <Text style={styles.videoTitle}> 1. Las mejores posiciones para dormir</Text>
        <Video
            source={require('../src/videos/Posiciones.mp4')}
            useNativeControls
            resizeMode="cover"
            shouldPlay = {false}
            isLooping = {false}
            isMuted = {false}
            volume={1.0}
            style={styles.video}
        />
        <Text style={styles.videoTitle}>2. Música para dormir</Text>
        <Video
            source={require('../src/videos/Musica.mp4')}
            useNativeControls
            resizeMode="cover"
            shouldPlay = {false}
            isLooping = {false}
            isMuted = {false}
            volume={1.0}
            style={styles.video}
        />
        <Text style={styles.videoTitle}>3. Técnicas de relajación</Text>
        <Video
            source={require('../src/videos/Tecnicas.mp4')}
            useNativeControls
            resizeMode="cover"
            shouldPlay = {false}
            isLooping = {false}
            isMuted = {false}
            volume={1.0}
            style={styles.video}
        />
        <Text style={styles.videoTitle}>4. Higiene de sueño</Text>
        <Video
            source={require('../src/videos/Higiene.mp4')}
            useNativeControls
            resizeMode="cover"
            shouldPlay = {false}
            isLooping = {false}
            isMuted = {false}
            volume={1.0}
            style={styles.video}
        />
        <Text style={styles.videoTitle}>5. Método japonés para relajarse</Text>
        <Video
            source={require('../src/videos/Video1.mp4')}
            useNativeControls
            resizeMode="cover"
            shouldPlay = {false}
            isLooping = {false}
            isMuted = {false}
            volume={1.0}
            style={styles.video}
        />
    </ScrollView>
    );
}

const styles = StyleSheet.create(
    {
        video: {
            width: width,
            height: height/3
        },      
        image: {
            width: "20%",
            height:"5%",
            marginTop: 15,
            alignSelf:"center"
        },
        container: {
            flex: 1,
            alignItems: 'center',
            backgroundColor:"#FFF",
            justifyContent: 'center'
        }, 
        scrollCarousel: { 
            backgroundColor:"#FFF",
            marginBottom: 20
          },
        title: {
            paddingHorizontal: 8,
            color: "#0e657e",
            fontWeight: '300',
            fontSize:26,
            marginTop: 10,
            paddingHorizontal: 20,
            textAlign: 'center',
            alignSelf:"center",
        },
        content: {
            marginTop: 10,
            textAlign: 'justify',
            color:"#1687a7",
        },
        subtitle: {
            fontSize:14,
            padding: 10,
            textAlign:'center',
            opacity:0.6
        },
        videoTitle: {
            fontSize:19,
            padding: 10,
            fontWeight: '600',
            textAlign:'center',
            opacity:0.6,
            color: '#f25287',
            paddingVertical: 15
        },
    }
);


export default Dormir