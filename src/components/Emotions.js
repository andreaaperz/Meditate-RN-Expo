import React from 'react'
import {View,Text,StyleSheet,Image,TouchableOpacity} from 'react-native'

export default class Emotions extends React.Component{
    render(){
        const {animo, fecha, imagen, color} = this.props
        var icono
        switch(imagen){
            case "feliz(2).png":
                icono = require("../images/feliz(2).png")
                break;
            case "feliz(1).png":
                icono = require("../images/feliz(1).png")
                break;
            case "esceptico.png":
                icono = require("../images/esceptico.png")
                break;
            case "triste.png":
                icono = require("../images/triste.png")
                break;
            case "triste.png":
                icono = require("../images/triste(1).png")
                break;
            default:
                icono = "../images/informacion.png"
                break;
        }
        return(
            <TouchableOpacity style={styles.row}>
                <TouchableOpacity
                 style={{
                    alignItems: "center",
                    justifyContent: "center",
                    height: 40,
                    width: 40,
                    borderRadius: 50,
                    backgroundColor: color,
                  }}>
                 <Image
                     onPress={console.log("../images/" + imagen)}
                     source={icono}
                     style={styles.bolitaImage}/>
                </TouchableOpacity> 
            <View>
                <Text style={styles.title}> {animo} </Text>
                <Text style={styles.date}> {fecha} </Text>
            </View>
            
        </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection:"row",
        padding:10,
        marginHorizontal:20,
        borderRadius:20,
        alignItems:"center",
    },
    date: {
        color:"#f58084",
        fontSize:17,
        paddingLeft:20
    },
    title: {
        color:"#345c74",
        fontSize:19,
        paddingLeft:20,
        width:180
    }, 
    bolitaImage: { 
        height: 25, 
        width: 25 
    }
})