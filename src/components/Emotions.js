import React from 'react'
import {View,Text,StyleSheet,Image,TouchableOpacity} from 'react-native'

export default class Emotions extends React.Component{
    render(){
        const {animo, fecha, onPress} = this.props
        var icono
        var color
        switch(animo){
            case "Feliz":
                icono = require("../images/feliz(2).png")
                color = "#61d96c";
                break;
            case "Contento":
                icono = require("../images/feliz(1).png")
                color = "#aee5b3"
                break;
            case "Normal":
                icono = require("../images/esceptico.png")
                color = "#d2dff5"
                break;
            case "Triste":
                icono = require("../images/triste.png")
                color = "#769cdf"
                break;
            case "Deprimido":
                icono = require("../images/triste(1).png")
                color = "#204380"
                break;
            default:
                icono = require("../images/triste(1).png")
                color = "#204380"
                break;
        }
        return(
            <TouchableOpacity style={styles.row} onPress ={onPress}>
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
                     /* onPress={console.log("../images/" + imagen)} */
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