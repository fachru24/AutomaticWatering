import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'


const MyButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}

export default MyButton

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: 280,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#50A76F",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  title: {
    color: "#EDDC90",
    fontSize: 20,
    fontFamily: "Audiowide-Regular"
  }
})