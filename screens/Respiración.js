import React,  { useState } from 'react'
import {View, Text, StyleSheet ,Image, ImageBackground} from 'react-native'
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Audios from '../src/components/Audios';
import { Audio } from 'expo-av';

const Respiracion = () =>{
    const [sound, setSound] = useState();
    const [currentSound, setCurrentSound] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [imagen, setImagen] = useState(require('../src/images/pausa.png'));

    let audios = {
        uno: require('../src/audios/audio-1.mp3'),
        dos: require('../src/audios/audio-2.mp3'),
        tres: require('../src/audios/audio-3.mp3'),
        cuatro: require('../src/audios/audio-4.mp3'),
        cinco: require('../src/audios/audio-5.mp3'),
        seis: require('../src/audios/audio-6.mp3'),
        siete: require('../src/audios/audio-7.mp3'),
    };

    let status = {
        play: require('../src/images/play.png'),
        pause: require('../src/images/pausa.png')
    };

    var track = require('../src/audios/audio-1.mp3');

    async function playSound(number) {
        if (currentSound != number){
            console.log('Loading Sound');

            switch(number){
                case 1:
                    track = audios.uno;
                    break; 
                case 2:
                    track = audios.dos;
                    break;
                case 3:
                    track = audios.tres;
                    break;
                case 4:
                    track = audios.cuatro;
                    break;
                case 5:
                    track = audios.seis;
                    break;
                case 6:
                    track = audios.cinco;
                    break;
                case 7:
                    track = audios.siete;
                    break;
                default: 
                    track = audios.uno;
                    break;
            }

            const { sound } = await Audio.Sound.createAsync( track );

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

    <Text style={styles.title} >Respiraci??n</Text>
    <Text style={styles.subtitle}>
        "Cualquiera puede sostener el tim??n cuando el mar est?? en calma"
    </Text>
    <ScrollView
            vertical
            style={styles.scrollCarousel}>
        <View style={styles.title}>
            <TouchableOpacity onPress={() => playSound(1)}>
                <Audios
                num={1}
                color="#fde6e6"
                duration="Duraci??n: 3:04"
                title="para principiantes"
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => playSound(2)}>
                <Audios
                num={2}
                color="#f9e1fc"
                duration="Duraci??n: 0:59"
                title="Ejercicio respiraci??n"
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => playSound(3)}>
                <Audios
                num={3}
                color="#e2f0cb"
                duration="Duraci??n: 2:10"
                title="M??sica relajante"
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => playSound(4)}>
                <Audios
                num={4}
                color="#ffffcf"
                duration="Duraci??n: 3:34"
                title="M??sica para meditar"
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => playSound(5)}>
                <Audios
                num={5}
                color="#ffdac1"
                duration="Duraci??n: 2:35"
                title="M??ditaci??n r??pida"
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => playSound(6)}>
                <Audios
                num={6}
                color="#d9ffff"
                duration="Duraci??n: 1:17"
                title="Meditaci??n controlada"
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => playSound(7)}>
                <Audios
                num={7}
                color="#fff5fb"
                duration="Duraci??n: 1:59"
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
        width: 140,
        height: 140,
        borderRadius: 100,
        marginTop: 30,
        alignSelf:"center"
    },
    play: {
        width: 140,
        height: 140,
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
        fontSize: 13,
        textAlign:'center',
        marginTop:3,
        opacity:0.6
    }
})

export default Respiracion