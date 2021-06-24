import React, { useState, useEffect } from 'react';
import {StyleSheet, Text,View,Image, Alert} from 'react-native';
import { TextInput } from "react-native-gesture-handler";
import RNPickerSelect from 'react-native-picker-select';
import { validateEmail } from '../src/utils/Validation';
import firebase from '../src/utils/Firebase';
import 'firebase/firestore'
import 'firebase/auth'

const db = firebase.firestore(firebase);

const DetalleUsuario = ({navigation, route}) =>{

const initialState = {
    id: "",
    nombre: "",
    edad: "",
    genero: ""
};

  const [user, setUser] = useState(initialState);
  const [formError, setFormError] = useState({});
  const [warning, setWarning] = useState('');
  const [picker, setPicker] = useState('');
  var usuario = route.params.user;

  const handleTextChange = (value, prop) => {
    setUser({ ...user, [prop]: value });
  };

  const setPickerValue = (valor, prop)=>{
      setPicker(valor);
      setUser({...user, [prop]:valor})
  }

  useEffect(() => {
    getUserId();
  }, []);

  const getUserId = () => {
    db.collection('usuarios').doc(route.params.userId)
    .get()
    .then(datos=>{
        setUser({ ...datos.data(), id: route.params.userId});
        setPicker(datos.data().genero);
    });
  };

  const updateUser = async () => {
    let error ={};
    if (!user.nombre || !user.edad) {
        if (!user.nombre) error.nombre = true;
        if (!user.edad) error.edad = true;
        setWarning('Falta llenar algún campo');
    }
    else if (user.edad < 5 || user.edad > 99) {
        error.edad = true;
        setWarning('Rango de edad no válido');
    } 
    else {
        const userUpd = db.collection("usuarios").doc(route.params.userId);
        await userUpd.set({
            nombre: user.nombre,
            edad: user.edad,
            genero: picker,
            }).then(()=>{
            navigation.navigate('lista')
        }).catch(err=>{
            setWarning(err);
        })
    }
    setFormError(error);
  };

  const deleteU = () => {
    Alert.alert(
      'Espera',
      `¿Estas seguro de querer eliminar esta cuenta?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: () => {
            db.collection("usuarios").doc(route.params.userId)
            .delete()
            .then(()=>{
                navigation.navigate('lista')
            }).catch((err)=>{
                console.log(err)
            });
          },
        },
      ],
      {cancelable: false},
    );
  }; 
    
return(
         <View style={styles.background}>
            <Text style={styles.title}> 
                Actualizar
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
            <View style={[styles.margin, formError.edad && styles.errorIn ]}>
                <TextInput 
                    placeholder="Edad"
                    value={user.edad || ''}
                    onChangeText={(value) => handleTextChange(value, "edad")}
                    placeholderTextColor="#1687a7"
                    keyboardType="numeric"/>
            </View>
            <RNPickerSelect
                onValueChange={(value) => setPickerValue(value, "genero")}
                placeholder={{
                    label: 'Mujer',
                    value: 'mujer',
                    color: 'purple',
                  }}
                value={user.genero || 'mujer'}
                style={{
                    ...pickerSelectStyles,
                    placeholder: {
                        color: '#1687a7',
                        fontSize: 14,
                    },
                }}
                items = {[
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
        width: 140,
        height: 140,
        marginTop: 10,
        marginBottom: 10,
        alignSelf:"center",
        flex: 1
    },
    errorIn:{
        borderColor:"#fe3636"
    },
    warning:{
        marginTop: 5,
        alignSelf: 'center',
        color: "#940c0c"
    },
    background: {
        backgroundColor:"#FFF",
        height:"100%",
        flex:1
    },
    title: {
        fontSize:27,
        marginTop: 40,
        color: "#0e657e",
        alignSelf:"center",
    }, 
    subtitle: {
        marginHorizontal:50,
        fontSize: 17,
        textAlign:'center',
        marginTop:1,
        opacity:0.5
    },
    margin:{
        flexDirection:"row",
        alignItems:"center",
        marginHorizontal:55,
        borderWidth:2,
        marginTop:10,
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
        marginTop:3,
        backgroundColor:"#f25287",
        paddingVertical:10,
        marginBottom: 9,
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
      marginBottom: 30,
      paddingRight: 30, 
    },
    inputAndroid: {
        fontSize: 14,
        paddingVertical: 2,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderRadius: 20,
        marginTop: 12,
        alignItems:"center",
        marginHorizontal: 55,
        borderColor: '#d3e0ea',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, 
    }, 
  
  });
 
export default DetalleUsuario