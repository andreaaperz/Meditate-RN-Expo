import React,  { useState } from 'react'
import {View, Text, StyleSheet ,Image, ImageBackground, TouchableWithoutFeedback, TouchableOpacity} from 'react-native'
import Audios from '../src/components/Audios';
import { Audio } from 'expo-av';

const Respiracion = () =>{
    const [sound, setSound] = useState();
    const [currentSound, setCurrentSound] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [imagen, setImagen] = useState('pausa');

    var track = "";

    async function playSound(number) {
        if (currentSound != number){
            console.log('Loading Sound');

            switch(number){
                case 1:
                    track = 'billie';  
                    break; 
                case 2:
                    track = 'paramore';  
                    break;
                default: 
                    track = 'billie';
                    break;
            }

            const { sound } = await Audio.Sound.createAsync(
                require('../src/audios/' + track + '.mp3')
            );

            setSound(sound);

            console.log('Playing Sound');
            await sound.playAsync();  
    
            setIsPlaying(true);
            setCurrentSound(number);
            setImagen('play');

        } else {
            if (isPlaying == false){
                console.log('Playing Sound');
                await sound.playAsync();  
        
                setIsPlaying(true);
                setImagen('play');
            } else {
                sound.pauseAsync(); 
                console.log('Pause'); 
                setIsPlaying(false);

                setImagen('pausa');
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
    <Image source ={require('../src/images/' + imagen + '.png')} style={styles.play}/> 

    <Text style={styles.title} >Respiración</Text>
    <Text style={styles.subtitle}>
        "Cualquiera puede sostener el timón cuando el mar está en calma"
    </Text>
        <View style={styles.title}>
            <TouchableWithoutFeedback onPress={() => playSound(1)}>
                <Audios
                num={1}
                color="#fde6e6"
                duration="28 minutos"
                title="Introducción"
                />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => playSound(2)}>
                <Audios
                num={2}
                color="#f9e1fc"
                duration="39 minutos"
                title="Primeros pasos"
                />
            </TouchableWithoutFeedback>
            {/* <TouchableWithoutFeedback onPress={() => playSound(1)}>
                <Audios
                num={3}
                color="#e8f1fd"
                duration="5 minutos"
                title="Encuentra tu camino"
                image = {imagen}
                />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => playSound(1)}>
                <Audios
                num={4}
                color="#e5ffef"
                duration="10 minutos"
                title="Gracias a la vida"
                image = {imagen}
                />
            </TouchableWithoutFeedback> */}
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
    play: {
        width: "100pt",
        height:"100pt",
        alignSelf:"center",
        marginTop: 30,
        position: "absolute"
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