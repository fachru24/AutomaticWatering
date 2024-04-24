import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'

const Textinput = ({...props}) => {
  return (
    <View style= {styles.container}>
      <TextInput style= {styles.input}
      {...props}/>
      <View style={styles.border}/>
    </View>
  )
}

export default Textinput

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: "100%",
        justifyContent: "center",
        paddingHorizontal: 12,
        marginBottom: 20
    },
    input: {
        width: "100%",
        height: 50,
        color: "black"
    },
    border: {
        width: "100%",
        backgroundColor: "white",
        height: 1,
        alignSelf: "center"
    }
})