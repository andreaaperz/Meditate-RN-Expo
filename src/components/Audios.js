import React,  { useState } from 'react'
import {View,Text,StyleSheet,Image,TouchableOpacity} from 'react-native'
import { Audio } from 'expo-av';

export default class Audios extends React.Component{
    constructor(props){
        super(props)
      }
    render(){
        const {num, color, duration, title} = this.props
        
        return(
           <View  
           {...this.props}
           style={styles.row}
           >
               <View style={{
                   backgroundColor:color,
                   paddingVertical:5,
                   paddingHorizontal:10,
                   borderRadius:6
               }}>
                   <Text style={styles.number}>{num}</Text>
               </View>
               <View>
                   <Text style={styles.title}> {title} </Text>
                   <Text style={styles.text}> {duration} </Text>
               </View>
               <View
                    style={styles.bolita}>
                    <Image
                        source={require("../images/nota-musical.png")}
                        style={styles.bolitaImage}/>
                </View> 
           </View>
        )
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection:"row",
        padding:20,
        marginHorizontal:20,
        borderRadius:20,
        alignItems:"center",
    },
    number: {
        fontSize:15,
    },
    text: {
        color:"#f58084",
        fontSize:15,
        paddingLeft:20
    },
    title: {
        color:"#345c74",
        fontSize:17,
        paddingLeft:20,
        width:180
    },
    bolita: {
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        width: 40,
        borderRadius: 50,
        backgroundColor: "#8ac6d1",
      },
      bolitaImage: { 
        height: 25, 
        width: 25 
      }
})