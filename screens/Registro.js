import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { validateEmail } from '../src/utils/Validation';
import firebase from '../src/utils/Firebase';
import 'firebase/firestore'

const db = firebase.firestore(firebase);

const Registro = ({navigation}) =>{
    
    const [formData, setFormData] = useState(defaultValue);
    const [formError, setFormError] = useState({});
    const [picker, setPicker] = useState('mujer');
    const [warning, setWarning] = useState('');

    const register = () => {
        let error = {};
        if (!formData.email || !formData.password || !formData.nombre || !formData.edad) {
            if (!formData.nombre) error.nombre = true;
            if (!formData.edad) error.edad = true;
            if (!formData.email) error.email = true;
            if (!formData.password) error.password = true;
            setWarning('Falta llenar algún campo');
        }
        else if (!validateEmail(formData.email)) {
            error.email = true;
            setWarning('Correo inválido');
        }
        else if (formData.password.length < 6) {
            error.password = true;
            setWarning('Contraseña débil. Intenta con otra.');
        } 
        else if (formData.edad < 5 || formData.edad > 99 ) {
            error.password = true;
            setWarning('Rango de edad no válido');
        } 
        else {
            firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password)
            .then(cred =>{
                    db.collection('usuarios').doc(cred.user.uid).set({
                        nombre: formData.nombre,
                        edad: formData.edad, 
                        genero: picker 
                    }).then(()=>{
                        setFormError(defaultValue);
                        navigation.navigate('login');
                    }).catch(err=>{
                        console.log(err);
                    })
                }).catch(err => {
                    console.log(err);
                });
        }
        setFormError(error);
    };

    const onChange=(e, type)=>{
        setWarning('')
        setFormData({...formData, [type]: e.nativeEvent.text});
    }; 

    return(
        <View style={styles.background}>
            <Image source ={require('../src/images/flor.png')} style={styles.image}/> 
            <Text style={styles.title}>
                Empieza a usar Meditate
            </Text>
            <Text style={styles.subtitle}>
                Inscríbete y descubre todo el potencial de Meditate
            </Text>
            <Text style={styles.warning}>
                {warning}
            </Text>
            <View style={[styles.margin, formError.nombre && styles.error]}>
                <TextInput 
                    placeholder="Nombre"
                    placeholderTextColor="#1687a7"
                    onChange = {(e)=>onChange(e, "nombre")}
                    style={styles.textInputt}/>
            </View>
            <View style={[styles.margin, formError.email && styles.error]}>
                <TextInput 
                    placeholder="Correo"
                    placeholderTextColor="#1687a7"
                    onChange = {(e)=>onChange(e, "email")}
                    style={styles.textInputt}/>
            </View>
            <View style={[styles.margin, formError.password && styles.error]}>
                <TextInput 
                    secureTextEntry
                    placeholder="Contraseña"
                    placeholderTextColor="#1687a7"
                    onChange = {(e)=>onChange(e, "password")}
                    style={styles.textInputt}/>
            </View>
            <View style={[styles.margin, formError.edad && styles.error]}>
                <TextInput 
                    placeholder="Edad"
                    placeholderTextColor="#1687a7"
                    keyboardType="numeric"
                    onChange = {(e)=> onChange(e, "edad")}
                    style={styles.textInputt}/>
            </View>
             <RNPickerSelect
                onValueChange={(value) => setPicker(value)}
                placeholder={{
                    label: 'Mujer',
                    value: 'mujer',
                    color: 'purple',
                  }}
                  style={{
                    ...pickerSelectStyles,
                    iconContainer: {
                      top: 20,
                      right: 10,
                    },
                    placeholder: {
                      color: '#1687a7',
                      fontSize: 14,
                    },
                  }}
                items={[
                    { label: 'Hombre', value: 'hombre', color: '#1687a7' },
                    { label: 'Prefiero no decir', value: 'NA', color: '#1687a7'},
                    ]}
            />
            <View style={styles.boton}>
                <Text style={styles.textboton} onPress={register}> Registrar </Text>
            </View>
        </View>
    );
}

function defaultValue() {
    return {
        email: "",
        password: "",
        nombre:"",
        edad: "",
        genero: ""
    }
}

const styles = StyleSheet.create({
    image:{
        width: 140,
        height: 140,
        alignSelf:"center"
    },
    error:{
        borderColor:"#fe3636"
    },
    warning:{
        marginTop: 10,
        alignSelf: 'center',
        color: "#940c0c"
    },
    background: {
        backgroundColor:"#FFF",
        height:"100%",
        marginTop: 50
    },
    title: {
        fontSize:30,
        alignSelf:"center",
    }, 
    subtitle: {
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
        height: 40,
        paddingHorizontal:10,
        borderColor:"#d3e0ea",
        borderRadius:5,
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

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 14,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 2,
      borderRadius: 20,
      marginTop: 12,
      alignItems:"center",
      marginHorizontal:55,
      borderColor: '#d3e0ea',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, 
    },
      inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, 
    }, 
  });
 
export default Registro