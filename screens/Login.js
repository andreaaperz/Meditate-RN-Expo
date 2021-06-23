import React, { useState } from 'react';
import {StyleSheet, Text, View , Image, TextInput } from 'react-native';
import {validateEmail} from "../src/utils/Validation";
import firebase from '../src/utils/Firebase';
import 'firebase/auth';

const Login = ({navigation}) => {

    const [formData, setFormData] = useState(defaultValue);
    const [formError, setFormError] = useState({});
    const [warning, setWarning] = useState('');

    const login = () => {
        let error ={};
        if (!formData.email || !formData.password){
            if(!formData.email) error.email = true;
            if(!formData.password) error.password = true;
            setWarning('Falta llenar algún campo')
        } else if (!validateEmail(formData.email)){
            setWarning('Correo inválido')
        } else {
            firebase.auth().signInWithEmailAndPassword(formData.email,formData.password)
            .then(()=>{
                console.log("ok");
                navigation.replace('menu');
            })
            .catch((err) => {
                var error = messageError(err.code);
                setWarning(error);
            });
        }
        setFormError(error);
    };

    const onChange=(e, type) => {
        let error ={};
        setWarning('')
        setFormData({...formData, [type]:e.nativeEvent.text });
        if(!validateEmail(formData.email)){
            error.email=true;
        } else {
            error.email=false;
        }
        setFormError(error);
    }; 

return(
    <View style={styles.background}>
            <Image source ={require('../src/images/zen.jpg')} style={styles.image}/> 
            <Text style={styles.title} >¡Bienvenido!</Text>
            <Text style={styles.subtitle}>
                ¿Estás listo para una nueva experiencia?
            </Text>
            <View styles={{flex:1}}>
                <View style={[styles.margin, formError.email && styles.errorInput ]}>
                    <TextInput 
                        placeholder="Correo"
                        placeholderTextColor="#1687a7"
                        style={[styles.marginText]}
                        onChange={(e) => onChange(e,"email")}/>
                </View>
                <View style={[styles.margin, formError.password && styles.errorInput]}>
                    <TextInput 
                        placeholder="Contraseña"
                        placeholderTextColor="#1687a7"
                        secureTextEntry={true}
                        style={[styles.marginText]}
                        onChange={(e) => onChange(e,"password")} />
                </View>
            </View>
            <Text  
                style={styles.warning}>
                {warning}
            </Text>
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

function messageError(codigo) {
    let message = '';
    switch (codigo) {
        case 'auth/wrong-password':
            message = "Contraseña Incorrecta";
            break;
        case 'auth/user-not-found':
            message = "Usuario no encontrado";
            break;
        case 'auth/weak-password':
            message = "Contraseña débil";
            break;
        default:
            message = "Hubo un error";
    }
    return message;
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
        height:"100%",
        flex: 1
    },
    errorInput:{
        borderColor:"#fe3636"
    },
    warning:{
        marginTop: 10,
        alignSelf: 'center',
        color: "#940c0c"
    },
    image:{
        width:"100%",
        flex: 1
    },
    title: {
        fontSize:30,
        alignSelf:"center",
        color: "#0e657e"
    },
    subtitle: {
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
        height: 40,
        marginTop:10,
        paddingHorizontal:6,
        borderColor:"#d3e0ea",
        borderRadius: 5,
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
    },
    registrateBoton: {
        alignSelf:"center",
        color:"#1687a7",
        paddingVertical:5,
        marginBottom: 30
    }
})

export default Login