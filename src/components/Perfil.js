import React from 'react'
import {View,Text,StyleSheet,Image,TouchableOpacity} from 'react-native'

export default class perfil extends React.Component{
    render(){
        const {nombre, edad, genero, onPress} = this.props
        
        return(
            <TouchableOpacity style={styles.row} onPress ={onPress}>
                <TouchableOpacity
                 style={{
                    alignItems: "center",
                    justifyContent: "center",
                    height: 40,
                    width: 40,
                    borderRadius: 50,
                    backgroundColor: '#000',
                  }}>
                 <Image
                     source={require("../images/user(2).png")}
                     style={styles.bolitaImage}/>
                </TouchableOpacity> 
            <View>
                <Text style={styles.title}> {nombre} </Text>
                <Text style={styles.date}> {edad} </Text>
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