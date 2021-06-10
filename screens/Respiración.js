import React,  { useState } from 'react'
import {View, Text, StyleSheet ,Image, ImageBackground, TouchableWithoutFeedback, TouchableOpacity} from 'react-native'
import Audios from '../src/components/Audios';
import { Audio } from 'expo-av';

const Respiracion = () =>{
    const [sound, setSound] = useState();
    const [currentSound, setCurrentSound] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [imagen, setImagen] = useState(require('../src/images/pausa.png'));

    let data = {
        billie: require('../src/audios/billie.mp3'),
        paramore: require('../src/audios/paramore.mp3'),
    };

    let status = {
        play: require('../src/images/play.png'),
        pause: require('../src/images/pausa.png')
    };

    var track = require('../src/audios/paramore.mp3');

    async function playSound(number) {
        if (currentSound != number){
            console.log('Loading Sound');

            switch(number){
                case 1:
                    track = data.billie;
                    break; 
                case 2:
                    track = data.paramore;
                    break;
                default: 
                    track = 'billie';
                    break;
            }

            const { sound } = await Audio.Sound.createAsync(
               track
            );

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
        </View>
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