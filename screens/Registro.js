import React, { useState } from 'react';
import {StyleSheet, Text,View,Image, TextInput} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { validateEmail } from '../src/utils/Validation';
import firebase from '../src/utils/Firebase';
import 'firebase/firestore'

const db = firebase.firestore(firebase);

const Registro = ({navigation}) =>{

    const [formData, setFormData] = useState(defaultValue);
    const [formError, setFormError] = useState({});
    const [picker, setPicker] = useState('NA');

    const register = () => {
        let error = {};

        if (!formData.email || !formData.password || !formData.nombre || !formData.edad ) {
            if (!formData.nombre) error.nombre = true;
            if (!formData.edad) error.edad = true;
        }
        else if (!validateEmail(formData.email)) {
            error.email = true;
        }
        else if (formData.password.length < 6) {
            error.password = true;
        } 
        else {
            firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password)
            .then(cred =>{
                console.log(cred.user.uid, ' ', formData.nombre, formData.edad )
                    db.collection('usuarios').doc(cred.user.uid).set({
                        nombre: formData.nombre,
                        edad: formData.edad, 
                        genero: picker 
                    }).then(()=>{
                        navigation.navigate('login');
                    }).catch(err=>{
                        console.log(err);
                    })
                }).catch(err => {
                    console.log(err);
                    setFormError({
                        email: true,
                        password: true,
                        nombre: true,
                        edad: true,
                    });
                });
        }
        setFormError(error);
    }

return(
        <View style={styles.background}>
            <Image source ={require('../src/images/flor.png')} style={styles.image}/> 
            <Text style={styles.title}>
                Empieza a usar Meditate
            </Text>
            <Text style={styles.subtitle}>
                Inscríbete y descubre todo el potencial de Meditate
            </Text>
            <View style={styles.margin}>
                <TextInput 
                    placeholder="Nombre"
                    placeholderTextColor="#1687a7"
                    onChange = {(e)=>setFormData({...formData, nombre:e.nativeEvent.text})}
                    style={[styles.textInputt, formError.nombre && styles.errorInput]}/>
            </View>
            <View style={styles.margin}>
                <TextInput 
                    placeholder="Correo"
                    placeholderTextColor="#1687a7"
                    onChange = {(e)=>setFormData({...formData, email:e.nativeEvent.text})}
                    style={[styles.textInputt, formError.email && styles.errorInput]}/>
            </View>
            <View style={styles.margin}>
                <TextInput 
                    secureTextEntry
                    placeholder="Contraseña"
                    placeholderTextColor="#1687a7"
                    onChange = {(e)=>setFormData({...formData, password:e.nativeEvent.text})}
                    style={[styles.textInputt, formError.password && styles.errorInput]}/>
            </View>
            <View style={styles.margin}>
                <TextInput 
                    placeholder="Edad"
                    placeholderTextColor="#1687a7"
                    keyboardType="numeric"
                    onChange = {(e)=>setFormData({...formData, edad:e.nativeEvent.text})}
                    style={[styles.textInputt, formError.edad && styles.errorInput]}/>
            </View>
            {/* <Picker style={styles.Picker}>
                <Picker.Item label="Mujer" value="Mujer" />
                <Picker.Item label="Hombre" value="Hombre" />
            </Picker> */}
             <RNPickerSelect
                style={picketSelectStyles.inputAndroid}
                onValueChange={(value) => setPicker(value)}
                items={[
                    { label: 'Mujer', value: 'mujer' },
                    { label: 'Hombre', value: 'hombre' },
                    { label: 'Prefiero no decir', value: 'NA' },
            ]}
        />

            <View style={styles.boton}>
                <Text style={styles.textboton} onPress={register}>Registrar</Text>
            </View>
        </View>
    );
}

function defaultValue() {
    return {
        email: {},
        password: {},
        nombre:{},
        edad: {},
    }
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
 
export default Registro