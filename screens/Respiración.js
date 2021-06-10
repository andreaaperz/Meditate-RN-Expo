import React,  { useState } from 'react'
import {View, Text, StyleSheet ,Image, ImageBackground, TouchableWithoutFeedback} from 'react-native'
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Audios from '../src/components/Audios';
import { Audio } from 'expo-av';

const Respiracion = () =>{
    const [sound, setSound] = useState();
    const [currentSound, setCurrentSound] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [imagen, setImagen] = useState(require('../src/images/pausa.png'));

    let status = {
        play: require('../src/images/play.png'),
        pause: require('../src/images/pausa.png')
    };

    var track = "https://firebasestorage.googleapis.com/v0/b/react-native-ded95.appspot.com/o/audio-2.mp3?alt=media&token=23457bb7-5479-4422-b598-b6bd23acfa6c";

    async function playSound(number) {
        if (currentSound != number){
            console.log('Loading Sound');

            switch(number){
                case 1:
                    track = "https://firebasestorage.googleapis.com/v0/b/react-native-ded95.appspot.com/o/audio-1.mp3?alt=media&token=4f338c51-543e-4764-a67a-9afc8ef38da7";
                    break; 
                case 2:
                    track = "https://firebasestorage.googleapis.com/v0/b/react-native-ded95.appspot.com/o/audio-2.mp3?alt=media&token=23457bb7-5479-4422-b598-b6bd23acfa6c";
                    break;
                case 3:
                    track = "https://firebasestorage.googleapis.com/v0/b/react-native-ded95.appspot.com/o/audio-3.mp3?alt=media&token=c0d76043-d858-4b82-9931-ac5842b8c9ab";
                    break;
                case 4:
                    track = "https://firebasestorage.googleapis.com/v0/b/react-native-ded95.appspot.com/o/audio-4.mp3?alt=media&token=27ea5365-cd10-4f3e-b11d-ed9472f85bf9";
                    break;
                case 5:
                    track = "https://firebasestorage.googleapis.com/v0/b/react-native-ded95.appspot.com/o/audio-6.mp3?alt=media&token=84cc0569-e2cb-47e2-95a5-baaf0c525b04";
                    break;
                case 6:
                    track = "https://firebasestorage.googleapis.com/v0/b/react-native-ded95.appspot.com/o/audio-5.mp3?alt=media&token=d5ba9dce-86ce-4301-82b2-3b3db8c766f0";
                    break;
                case 7:
                    track = "https://firebasestorage.googleapis.com/v0/b/react-native-ded95.appspot.com/o/audio-7.mp3?alt=media&token=c5c895d4-fcd6-472f-a6c0-60f9cb7d1af5";
                    break;
                default: 
                    track = 'https://firebasestorage.googleapis.com/v0/b/react-native-ded95.appspot.com/o/audio-2.mp3?alt=media&token=23457bb7-5479-4422-b598-b6bd23acfa6c';
                    break;
            }

            const { sound } = await Audio.Sound.createAsync({ uri: track });

            setSound(sound);

            console.log('Playing Sound');
            await sound.playAsync();  
    
            setIsPlaying(true);
            setCurrentSound(number);
            setImagen(status.play);

        } else {
            if (isPlaying == false){
                console.log('Playing Sound');
                await sound.playAsync();  
        
                setIsPlaying(true);
                setImagen(status.play);
            } else {
                sound.pauseAsync(); 
                console.log('Pause'); 
                setIsPlaying(false);

                setImagen(status.pause);
            }
        }
    }

    React.useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync(); }
            : undefined;
        }, [sound]); 

return(
<ImageBackground
    source={require('../src/images/back2.png')}
    style={{width:"100%",height:"100%"}}>
    <Image source ={require('../src/images/Pajaros.png')} style={styles.image}/> 
    <Image source ={imagen}  style={styles.play}/>

    <Text style={styles.title} >Respiración</Text>
    <Text style={styles.subtitle}>
        "Cualquiera puede sostener el timón cuando el mar está en calma"
    </Text>
    <ScrollView
            vertical
            style={styles.scrollCarousel}>
        <View style={styles.title}>
            <TouchableOpacity onPress={() => playSound(1)}>
                <Audios
                num={1}
                color="#fde6e6"
                duration="Duración: 3:04"
                title="Meditación para principiantes"
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => playSound(2)}>
                <Audios
                num={2}
                color="#f9e1fc"
                duration="Duración: 0:59"
                title="Ejercicio respiración"
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => playSound(3)}>
                <Audios
                num={3}
                color="#e2f0cb"
                duration="Duración: 2:10"
                title="Música relajante"
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => playSound(4)}>
                <Audios
                num={4}
                color="#ffffcf"
                duration="Duración: 3:34"
                title="Música para meditar"
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => playSound(5)}>
                <Audios
                num={5}
                color="#ffdac1"
                duration="Duración: 2:35"
                title="Méditación rápida"
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => playSound(6)}>
                <Audios
                num={6}
                color="#d9ffff"
                duration="Duración: 1:17"
                title="Meditación controlada"
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => playSound(7)}>
                <Audios
                num={7}
                color="#fff5fb"
                duration="Duración: 1:59"
                title="Dar gracias"
                />
            </TouchableOpacity>
        </View>
        </ScrollView>
    </ImageBackground>
    )
}

const styles = StyleSheet.create({
    image: {
        width: "41%",
        height:"21%",
        borderRadius: 100,
        marginTop: 30,
        alignSelf:"center"
    },
    play: {
        width: "41%",
        height:"21%",
        alignSelf:"center",
        marginTop: 30,
        position: "absolute"
    },
    title: {
        fontSize:30,
        color: "#0e657e",
        alignSelf:"center",
    },
    subtitle: {
        marginHorizontal:55,
        fontSize: 17,
        textAlign:'center',
        marginTop:3,
        opacity:0.6
    }
})

export default Respiracion