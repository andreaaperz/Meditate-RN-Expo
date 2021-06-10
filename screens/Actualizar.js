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
        correo: "",
        contra: "",
        edad: "",
        genero: ""
      };

  const [user, setUser] = useState(initialState);
  const [formError, setFormError] = useState({});
  const [warning, setWarning] = useState('');
  const [picker, setPicker] = useState();

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
            var currentU = firebase.auth().currentUser;
            setUser({ ...datos.data(), id: usuario, correo: currentU.email});
        })
    });
  };

  const updateUser = async () => {
    let error ={};
    if (!user.correo || !user.nombre || !user.edad) {
        if (!user.nombre) error.nombre = true;
        if (!user.edad) error.edad = true;
        if (!user.correo) error.correo = true;
        setWarning('Falta llenar algún campo');
    }
    else if (!validateEmail(user.correo)) {
        error.correo = true;
        setWarning('Correo inválido');
    }
    /* else if (user.contra.length < 6 ) {
        error.contra = true;
        setWarning('Contraseña débil. Intenta con otra.');
    }  */
    else if (user.edad < 5 || user.edad > 99) {
        error.edad = true;
        setWarning('Rango de edad no válido');
    } else {
        const userRef = db.collection("usuarios").doc(user.id);
        await userRef.set({
        nombre: user.nombre,
        edad: user.edad,
        genero: picker,
        }).then(()=>{
            var currentU = firebase.auth().currentUser;
            currentU.updateEmail(user.correo).then(function() {
                console.log('correo actualizado')
            }).catch(function(error) {
                console.log('Error de email: ', error)
            });          
        }).then(()=>{
            if (user.contra){
                var currentU = firebase.auth().currentUser;
                currentU.updatePassword(user.contra).then(function() {
                    console.log('contraseña actualizada')
                }).catch(function(error) {
                    console.log('Error en la contraseña: ', error)
                });
            }
        }).then(()=>{
            navigation.navigate('menu')
        }).catch(err=>{
            setWarning(err);
        })
    }
    //setUser(initialState);
    setFormError(error);
  };

   const deleteU = async () => {
    const currentU = db.collection("usuarios").doc(user.id);
    await currentU.delete()
     .then(()=>{
        var user = firebase.auth().currentUser;
        user.delete().then(function() {
            console.log("Se eliminó correctamente");
        }).catch(function(error) {
            console.log(error)
        });
    }) 
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
            <Text style={styles.warning}> 
                {warning}
            </Text>
            <View style={[styles.margin, formError.nombre && styles.errorIn ]}>
                <TextInput 
                    placeholder="Nombre"
                    value={user.nombre || ''}
                    onChangeText={(value) => handleTextChange(value, "nombre")}
                    placeholderTextColor="#1687a7"/>
            </View>
            <View style={[styles.margin, formError.correo && styles.errorIn ]}>
                <TextInput 
                    placeholder="Correo"
                    value={user.correo || ''}
                    onChangeText={(value) => handleTextChange(value, "correo")}
                    placeholderTextColor="#1687a7"/>
            </View>
            <View style={[styles.margin, formError.contra && styles.errorIn ]}>
                <TextInput 
                    placeholder="Contraseña"
                    secureTextEntry={true}
                    onChangeText={(value) => handleTextChange(value, "contra")}
                    placeholderTextColor="#1687a7"/>
            </View>
            <View style={[styles.margin, formError.edad && styles.errorIn ]}>
                <TextInput 
                    placeholder="Edad"
                    value={user.edad || ''}
                    onChangeText={(value) => handleTextChange(value, "edad")}
                    placeholderTextColor="#1687a7"
                    keyboardType="numeric"/>
            </View>
            <RNPickerSelect
                onValueChange={(value) => setPicker(value)}
                value={user.genero}
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
    errorIn:{
        borderColor:"#fe3636"
    },
    warning:{
        marginTop: 10,
        alignSelf: 'center',
        color: "#940c0c"
    },
    background: {
        backgroundColor:"#FFF",
        height:"100%"
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
      paddingRight: 30, // to ensure the text is never behind the icon
    },
   /*  inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    }, */
  });
 
export default Actualizar