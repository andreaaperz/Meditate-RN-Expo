import React,  { useState } from 'react'
import {View, Text, StyleSheet ,Image, ImageBackground, TouchableWithoutFeedback} from 'react-native'
import Audios from '../src/components/Audios';
import { Audio } from 'expo-av';

const Respiracion = () =>{
    const [sound, setSound] = useState();
    const [isNew, setIsNew] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);

    async function loadSound(){

    }

    async function playSound() {
        if (isNew == true){
            console.log('Loading Sound');
            const { sound } = await Audio.Sound.createAsync(
                 
            );
            setSound(sound);

            console.log('Playing Sound');
            await sound.playAsync();  
    
            setIsPlaying(true);
            setIsNew(false);
        } else {
            if (isPlaying == false){
                console.log('Playing Sound');
                await sound.playAsync();  
        
                setIsPlaying(true);
            } else {
                sound.pauseAsync();  
                setIsPlaying(false);
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
    <Text style={styles.title} >Respiración</Text>
    <Text style={styles.subtitle}>
        "Cualquiera puede sostener el timón cuando el mar está en calma"
    </Text>
        <View style={styles.title}>
            <TouchableWithoutFeedback onPress={() => playSound()}>
                <Audios
                num={1}
                color="#fde6e6"
                duration="28 minutos"
                title="Introducción"
                />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => playSound()}>
                <Audios
                num={2}
                color="#f9e1fc"
                duration="39 minutos"
                title="Primeros pasos"
                />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => playSound()}>
                <Audios
                num={3}
                color="#e8f1fd"
                duration="5 minutos"
                title="Encuentra tu camino"
                />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => playSound()}>
                <Audios
                num={4}
                color="#e5ffef"
                duration="10 minutos"
                title="Gracias a la vida"
                />
            </TouchableWithoutFeedback>
        </View>
    </ImageBackground>
    )
}

const styles = StyleSheet.create({
    image: {
        width: "100pt",
        height:"100pt",
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