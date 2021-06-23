import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import moment from 'moment';
import {StyleSheet, Text,View,Image, ImageBackground, Alert} from 'react-native';
import Emotions from '../src/components/Emotions';
import firebase from '../src/utils/Firebase';
import 'firebase/auth';
import 'firebase/firestore'

const db = firebase.firestore(firebase);

const Emociones = ({route}) =>{
  const [list, setList] = useState([]);
  const [usuario, setUsuario] = useState(route.params.user);

  useEffect(() => {
      getEmotions();
  }, []);

  const getEmotions = () => {
    setList([]);
    const itemsArray = [];
    /* SimpleDateFormat sfd = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
    sfd.format(new Date(timestamp)); */
    db.collection('detalleEmociones').where("idUsuario", "==", usuario.uid)
      .get()
      .then((response) => {
        response.forEach((doc) => {
                itemsArray.push({
                    id: doc.id,
                    animo: doc.data().idEmocion,
                    fecha: doc.data().fecha
                }) 
            }) 
            setList(itemsArray);
          });
  };

  const addEmotion = (idEmocion) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    console.log(today);
    
        db.collection('detalleEmociones').add({
            idEmocion: idEmocion,
            idUsuario: usuario.uid,
            fecha: today
        }).then(()=>{
            getEmotions();
            console.log('agregado');
        }).catch(err=>{
            console.log(err);
        }) 
  }

  const deleteEmotion = (emotion) => {
    Alert.alert(
      'Eliminar',
      `¿Estas seguro de querer eliminar esta emoción?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: () => {
            db.collection("detalleEmociones")
              .doc(emotion)
              .delete()
              .then(() => {
                getEmotions();
              }).catch((err)=>{
                console.log(err)
              })
          },
        }, 
      ],
      {cancelable: false},
    );
  };

return( 
  <ImageBackground
    source={require("../src/images/ola.png")}
    style={styles.background}>

        <Text style={styles.title} >Cada día es una nueva experiencia</Text>
        <Text style={styles.subtitle}>¿Cómo te sientes el día de hoy?</Text>

        <View
            style={styles.scroll}>
            <TouchableOpacity 
              onPress={()=> addEmotion('Deprimido')}
              style={{alignItems: "center", justifyContent: "center", height: 66, width: 66, marginHorizontal: 2, marginTop: 30, borderRadius: 50, backgroundColor: '#204380'}}>
              <Image
                source={require("../src/images/triste(1).png")}
                style={styles.bolitaImage}/>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={()=> addEmotion('Triste')}
                style={{alignItems: "center", justifyContent: "center", height: 66, width: 66, marginHorizontal: 2, marginTop: 30, borderRadius: 50, backgroundColor: '#769cdf'}}>
              <Image
                source={require("../src/images/triste.png")}
                style={styles.bolitaImage}/>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={()=> addEmotion('Normal')}
              style={{alignItems: "center", justifyContent: "center", height: 66, width: 66, marginHorizontal: 2, marginTop: 30, borderRadius: 50, backgroundColor: '#d2dff5'}}>
              <Image
                source={require("../src/images/esceptico.png")}
                style={styles.bolitaImage}/>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={()=> addEmotion('Contento')}
              style={{alignItems: "center", justifyContent: "center", height: 66, width: 66, marginHorizontal: 2, marginTop: 30, borderRadius: 50, backgroundColor: '#aee5b3'}}>
              <Image
                source={require("../src/images/feliz(1).png")}
                style={styles.bolitaImage}/>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={()=> addEmotion('Feliz')}
              style={{alignItems: "center", justifyContent: "center", height: 66, width: 66, marginHorizontal: 2, marginTop: 30, borderRadius: 50, backgroundColor: '#61d96c'}}>
              <Image
                source={require("../src/images/feliz(2).png")}
                style={styles.bolitaImage}/>
            </TouchableOpacity>
  
          </View>

          <Text style={styles.historial}>Historial</Text>
          
            <ScrollView
                vertical
                style={styles.history}>
                    {list.map((item, index) => (
                      <Emotions
                          key = {index}
                          animo= {item.animo}
                          fecha={item.fecha}
                          onPress={()=>deleteEmotion(item.id)}/>
                    ))} 
                </ScrollView>
         </ImageBackground>    
    );
}

const styles = StyleSheet.create({
    background: {
      height: '100%',
      width: "100%"
    },
    scroll: { 
      flexDirection:"row",
      paddingHorizontal: 4,
      alignSelf: "center",
      width: "100%",
    },
    bolita: {
        alignItems: "center", justifyContent: "center", width: 66, marginHorizontal: 2, backgroundColor: '#000'
    },
    bolitaImage: { 
        height: 35, 
        width: 35 
    },
    title: {
        paddingHorizontal: 8,
        color: "#0e657e",
        fontWeight: '300',
        fontSize:28,
        marginTop: 30,
        textAlign: 'center',
        alignSelf:"center",
    },
    subtitle: {
        fontSize:15,
        padding: 10,
        textAlign:'center',
        opacity:0.6
    },
    history: {
        backgroundColor:"#fff",
        borderRadius: 8,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 3,
        marginBottom: 3,
        height: '100%'
    }, 
    historial: {
        fontSize:25,
        padding: 2,
        color:"#fff",
        fontWeight: "100",
        textAlign:'center',
        marginTop: 30
    }
})


export default Emociones