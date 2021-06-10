import React from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';

const  { width, height } = Dimensions.get('window');

const Dormir = () =>{
return(
    <View style={styles.container}> 
        <Text style={styles.title} >"El descanso pertenece al trabajo como los párpados a los ojos..."</Text>
        <Text style={styles.subtitle}>Mejora tu sueño con los siguientes videos: </Text>

        <Video
            source={{uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'}}
            useNativeControls
            resizeMode="cover"
            shouldPlay = {false}
            isLooping = {false}
            isMuted = {false}
            rate={1.0}
            volume={1.0}
            style={styles.video}
        />

        <Video
            source={{uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'}}
            useNativeControls
            resizeMode="cover"
            shouldPlay = {false}
            isLooping = {false}
            isMuted = {false}
            rate={1.0}
            volume={1.0}
            style={styles.video}
        />

        <Video
            source={{uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'}}
            useNativeControls
            resizeMode="cover"
            shouldPlay = {false}
            isLooping = {false}
            isMuted = {false}
            rate={1.0}
            volume={1.0}
            style={styles.video}
        />
    </View>
    );
}

const styles = StyleSheet.create(
    {
        video: {
            width: width,
            height: height/3
        },
        container: {
            flex: 1,
            alignItems: 'center',
            backgroundColor:"#FFF",
            justifyContent: 'center'
        }, 
        title: {
            paddingHorizontal: 8,
            color: "#0e657e",
            fontWeight: '300',
            fontSize:26,
            marginTop: 30,
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
            fontSize:17,
            padding: 10,
            textAlign:'center',
            opacity:0.6
        },
    }
);


export default Dormir