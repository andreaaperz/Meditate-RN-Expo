import React, { useState } from 'react';
import {StyleSheet, Text,View,Image, TextInput} from 'react-native';
import {validateEmail} from "../src/utils/Validation";
import firebase from '../src/utils/Firebase';
import 'firebase/auth';

const Login = ({navigation}) =>{

    const [formData, setFormData] = useState(defaultValue);
    const [formError, setFormError] = useState({});

    const login = ()=>{
        let error ={};
        if(!formData.email || !formData.password){
            if(!formData.email) error.email = true;
            if(!formData.password) error.password = true;
        }else if(!validateEmail(formData.email)){
            error.email=true;
        }else{
            firebase.auth().signInWithEmailAndPassword(formData.email,formData.password)
            .then(()=>{
                console.log("ok");
                navigation.navigate('menu');
            })
            .catch(()=>{
                setFormError({
                    email:true,
                    password:true
                });
            });
        }
        setFormError(error);
    };

    const onChange=(e,type)=>{
        setFormData({...formData,[type]:e.nativeEvent.text});
    }; 

return(
    <View style={styles.background}>
            <Image source ={require('../src/images/zen.jpg')} style={styles.image}/> 
            <Text style={styles.title} >¡Bienvenido!</Text>
            <Text style={styles.subtitle}>
                ¿Estás listo para una nueva experiencia?
            </Text>
            <View style={styles.margin}>
                <TextInput 
                    placeholder="Correo"
                    placeholderTextColor="#1687a7"
                    style={[styles.marginText, formError.email && styles.errorInput]}
                    onChange={(e)=>onChange(e,"email")}/>
            </View>
            <View style={styles.margin}>
                <TextInput 
                    placeholder="Contraseña"
                    placeholderTextColor="#1687a7"
                    secureTextEntry={true}
                    style={[styles.marginText, formError.password && styles.errorInput]}
                    onChange={(e)=>onChange(e,"password")} />
            </View>
            <View style={styles.boton}>
                <Text 
                onPress={login} 
                style={styles.textboton}>
                    Ingresar
                </Text>
            </View>
            <Text 
                onPress = {() => navigation.navigate('registro')} title="Next screen"
                style={styles.registrateBoton}>
                    ¡Regístrate!
            </Text>
        </View>
    );
}


function defaultValue() {
    return {
        email: "",
        password: ""
    }

}

const styles = StyleSheet.create({
    background: {
        backgroundColor:"#FFF",
        height:"100%"
    },
    image:{
        width:"100%",
        height:"54%"
    },
    title: {
        fontSize:30,
        fontFamily:"SemiBold",
        alignSelf:"center",
    },
    subtitle: {
        fontFamily:"SemiBold",
        marginHorizontal:55,
        textAlign:'center',
        fontSize: 14,
        marginTop:3,
        opacity:0.5
    },
    margin:{
        flexDirection:"row",
        alignItems:"center",
        marginHorizontal:55,
        borderWidth:2,
        marginTop:17,
        paddingHorizontal:6,
        borderColor:"#d3e0ea",
        borderRadius: 14,
        paddingVertical:2
    },
    marginText: {
        paddingHorizontal: 7
    },
    boton: {
        marginHorizontal:110,
        alignItems:"center",
        justifyContent:"center",
        marginTop:20,
        backgroundColor:"#f25287",
        paddingVertical:10,
        borderRadius: 7
    },
    textboton: {
        color:"white",
        fontFamily:"SemiBold"
    },
    registrateBoton: {
        alignSelf:"center",
        color:"#1687a7",
        fontFamily:"SemiBold",
        paddingVertical:5
    },
    errorInput:{
        borderColor: "#940c0c"
    }
})

export default Login