import React, { useState, useEffect } from 'react';
import {StyleSheet, Text,View,Image} from 'react-native';
import { TextInput } from "react-native-gesture-handler";
import RNPickerSelect from 'react-native-picker-select';
import { validateEmail } from '../src/utils/Validation';
import firebase from '../src/utils/Firebase';
import 'firebase/firestore'
import 'firebase/auth'

const db = firebase.firestore(firebase);

const Actualizar = ({navigation}) =>{
    const initialState = {
        id: "",
        nombre: "",
        edad: "",
        genero: ""
      };

  const [user, setUser] = useState(initialState);

  const handleTextChange = (value, prop) => {
    setUser({ ...user, [prop]: value });
  };

  useEffect(() => {
    getUserId();
  }, []);

  const getUserId = async () => {
    firebase.auth().onAuthStateChanged(cred =>{
    const usuario = cred.uid
        db.collection('usuarios').doc(usuario).get()
        .then(datos=>{
            setUser({ ...datos.data(), id: usuario });
        })
    });
  };

  const updateUser = async () => {
    const userRef = db.collection("usuarios").doc(user.id);
    await userRef.set({
      nombre: user.nombre,
      edad: user.edad,
      genero: user.genero,
    }).then(()=>{
        console.log("Se actualizó correctamente")
    }).then(()=>{
        navigation.navigate('menu')
    }).catch(err=>{
        console.log(err)
    })
    setUser(initialState);
  };

   const deleteU = async () => {
    const dbRef = db.collection("usuarios").doc(user.id);
    await dbRef.delete()
   /*  .then(()=>{
        firebase.auth().deleteUser(user.id)
        .then(()=>{
            console.log("Se eliminó el usuario correctamente")
        })
        .catch(err=>{
            console.log(err)
        });
    }) */
    .then(()=>{
        navigation.navigate('login')
    }).catch((err)=>{
        console.log(err)
    });
  }; 

  
    
return(
        <View style={styles.background}>
            <Image source ={require('../src/images/flor.png')} style={styles.image}/> 
            <Text style={styles.title}> 
                ACTUALIZAR
            </Text>
            <View style={styles.margin}>
                <TextInput 
                    placeholder="Nombre"
                    value={user.nombre || ''}
                    onChangeText={(value) => handleTextChange(value, "nombre")}
                    placeholderTextColor="#1687a7"/>
            </View>
            <View style={styles.margin}>
                <TextInput 
                    placeholder="Edad"
                    value={user.edad || ''}
                    onChangeText={(value) => handleTextChange(value, "edad")}
                    placeholderTextColor="#1687a7"
                    keyboardType="numeric"/>
            </View>
             { <RNPickerSelect
                style={picketSelectStyles.inputAndroid}
                onValueChange={(value) => handleTextChange(value, "genero")}
                value={user.genero || ''}
                items={[
                    { label: 'Mujer', value: 'mujer' },
                    { label: 'Hombre', value: 'hombre' },
                    { label: 'Prefiero no decir', value: 'NA' },
            ]}
        /> }

            <View style={styles.boton}>
                <Text style={styles.textboton} onPress={()=>updateUser()}>Actualizar</Text>
            </View>
            <View style={styles.boton}>
                <Text style={styles.textboton} onPress={()=>deleteU()}>Borrar</Text>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    image:{
        width:"34%",
        height:"20%",
        alignSelf:"center"
    },
    background: {
        backgroundColor:"#FFF",
        height:"100%"
    },
    title: {
        fontSize:30,
        fontFamily:"SemiBold",
        alignSelf:"center",
    }, 
    subtitle: {
        fontFamily:"SemiBold",
        marginHorizontal:50,
        fontSize: 17,
        textAlign:'center',
        marginTop:5,
        opacity:0.5
    },
    margin:{
        flexDirection:"row",
        alignItems:"center",
        marginHorizontal:55,
        borderWidth:2,
        marginTop:17,
        paddingHorizontal:10,
        borderColor:"#d3e0ea",
        borderRadius:14,
        paddingVertical:2
    },
    boton: {
        marginHorizontal:110,
        alignItems:"center",
        justifyContent:"center",
        marginTop:20,
        backgroundColor:"#f25287",
        paddingVertical:10,
        borderRadius:7
    },
    textboton: {
        color:"white",
        fontFamily:"SemiBold"
    },
    Picker: { 
        height: 50, 
        width: 150, 
        alignSelf:"center"
    },
    errorInput:{
        color: "#940c0c"
    },
    textInputt: {paddingHorizontal:10}
})

const picketSelectStyles = StyleSheet.create({
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 9,
        borderWidth: 0.5,
        borderColor: 'pink',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30,
        backgroundColor: '#fff',
    },
});
 
export default Actualizar