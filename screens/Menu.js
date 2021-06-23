import React, { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet, View, Text, Image, ImageBackground } from "react-native";
import firebase from '../src/utils/Firebase';
import 'firebase/auth';

const Menu = ({navigation}) => {
  const [user, setUsrID] = useState ("");

  useEffect(() => { 
    var usuario = "";
    firebase.auth().onAuthStateChanged(cred => {
        usuario = cred;
        setUsrID(usuario);
    });
  }); 

  const logout = ()=>{
    firebase.auth().signOut().then(() => {
      navigation.navigate('login')
    })
  }

  return(
      <ImageBackground
        source={require("../src/images/imagen.jpg")}
        style={styles.background}>
        <View style={styles.mainRow}>
        </View>
        <View style={styles.container}>
            <Text style={styles.title} >
                Tu lugar...
            </Text>
            <Text style={styles.subtitle}>
                Aquí encontrarás todo lo necesario para empezar tu camino
            </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.scroll}>
            <TouchableOpacity
              style={styles.bolita}
              onPress = {() => logout()} title="Next screen 3">
              <Image
                source={require("../src/images/logout.png")}
                style={styles.bolitaImage}/>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bolita}
              onPress = {() => navigation.navigate('actualizar', {user: user})} title="Next screen 3">
              <Image
                source={require("../src/images/user(2).png")}
                style={styles.bolitaImage}/>
            </TouchableOpacity>
          </ScrollView>

           {/*  --------------------------------------CARRUSEL------------------------------------------- */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.scrollCarousel}>
            <View 
            style={styles.card}>
              <TouchableOpacity
                onPress = {() => navigation.navigate('respiracion')} title="Next screen 3">
                <Image
                    source={require("../src/images/respiracion.png")}
                    style={styles.cardImage}/>
              </TouchableOpacity>
            </View>
            <View 
              style={styles.card}>
                <TouchableOpacity
                onPress = {() => navigation.navigate('reflexion')} title="Next screen 3">
              <Image 
                source={require("../src/images/reflexion.png")}
                style={styles.cardImage}/>
                </TouchableOpacity>
            </View>
            <View style={styles.card}>
              <TouchableOpacity
                onPress = {() => navigation.navigate('emociones', {user: user})} title="Next screen 3">
                <Image 
                  source={require("../src/images/Emociones.png")}
                  style={styles.cardImage}/>
              </TouchableOpacity>
            </View>
            <View style={styles.card}>
              <TouchableOpacity
                onPress = {() => navigation.navigate('dormir')} title="Next screen 3"
              >
              <Image 
                source={require("../src/images/sueño.png")}
                style={styles.cardImage}/>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    );
  }

const styles = StyleSheet.create(
  {
    background:{ 
      width: "100%",
      height: "100%",
    },
    mainRow: {
      flexDirection: "row",
      marginTop: 7,
      alignItems: "center",
      paddingHorizontal: 40,
    },
    container:{ 
      paddingHorizontal: 30, 
      marginTop: 4 
    },
    title: {
      fontSize: 40,
      color: "#142850",
    },
    subtitle: {
      fontSize: 15,
      paddingVertical: 5,
      paddingRight: 80,
      lineHeight: 22,
      color: "#0e657e",
    },
    scroll: { 
      marginRight: -40,
      marginTop: 8,
      alignSelf: 'flex-end',
      marginRight: 1
    },
    bolita: {
      alignItems: "center",
      justifyContent: "center",
      height: 56,
      width: 56,
      marginRight: 5,
      marginTop: 12,
      borderRadius: 50,
      alignSelf: 'flex-end',
      backgroundColor: "#f25287",
    },
    bolitaImage: { 
      height: 30, 
      width: 30 
    },
    scrollCarousel: { 
      marginHorizontal: -40, 
      marginTop: 40 
    },
    card: {
      backgroundColor: "#FEFEFE",
      height: 300,
      width: 210,
      borderRadius: 5,
      padding: 5,
      marginHorizontal: 9,
    },
    cardImage: { 
      width: 200, 
      borderRadius: 5, 
      height: 290 
    }
  }
)

export default Menu