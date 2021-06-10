import React from 'react';
import {StyleSheet, View, Text, Dimensions, Image} from 'react-native';
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Video, AVPlaybackStatus } from 'expo-av';

const  { width, height } = Dimensions.get('window');

const Dormir = () =>{
return(
    <ScrollView
            vertical
            style={styles.scrollCarousel}>
        <Image source ={{uri: 'https://firebasestorage.googleapis.com/v0/b/react-native-ded95.appspot.com/o/day.png?alt=media&token=0a1ce80f-3696-474e-9790-ca4496c3de4b'}} style={styles.image}/> 
        <Text style={styles.title} >"El descanso pertenece al trabajo como los párpados a los ojos..."</Text>
        <Text style={styles.subtitle}>Mejora tu sueño con los siguientes videos: </Text>
        
        <Text style={styles.videoTitle}>1. Higiene de sueño</Text>
        <Video
            source={{uri: 'https://firebasestorage.googleapis.com/v0/b/react-native-ded95.appspot.com/o/Higiene.mp4?alt=media&token=59c9b5f8-02de-4e8b-ab27-f0489c223905'}}
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
            source={{uri: 'https://firebasestorage.googleapis.com/v0/b/react-native-ded95.appspot.com/o/Musica.mp4?alt=media&token=e8191179-80fe-41f2-bd2a-fbb177e46d98'}}
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
            source={{uri: 'https://firebasestorage.googleapis.com/v0/b/react-native-ded95.appspot.com/o/Tecnicas.mp4?alt=media&token=bf394ae3-6440-4d32-92ae-931c07876831'}}
            useNativeControls
            resizeMode="cover"
            shouldPlay = {false}
            isLooping = {false}
            isMuted = {false}
            volume={1.0}
            style={styles.video}
        />
        <Text style={styles.videoTitle}>4. Las mejores posiciones para dormir</Text>
        <Video
            source={{uri: 'https://firebasestorage.googleapis.com/v0/b/react-native-ded95.appspot.com/o/Posiciones.mp4?alt=media&token=6f9f465f-3d0d-4afc-a86a-2f396f0e96ad'}}
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
            source={{uri: 'https://firebasestorage.googleapis.com/v0/b/react-native-ded95.appspot.com/o/Video1.mp4?alt=media&token=f1fb1ac0-32f6-4356-9ae6-da2073fc6005'}}
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
            marginTop: 2,
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