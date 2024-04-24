import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const InputData = ({
    label,
    keyboardType,
    onChangeText,
    namaState,
    value
}) => {
    const [inputValue, setInputValue] = useState(value);
    const handleInputChange = (text) => {
        setInputValue(text);
        onChangeText(namaState, text);
    };


    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.textInput}
                keyboardType={keyboardType}
                value={inputValue}
                onChangeText={handleInputChange}

            />
        </View>
    );
};

export default InputData;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        //marginBottom: 10,
        padding: 10,
        alignItems: "stretch"
    },

    label: {
        fontSize: 15,
        marginBottom: 5,
        color: '#00303D',
        textAlign: 'center'
    },
    textInput: {
        borderWidth: 2,
        borderColor: '#50A76F',
        backgroundColor: '#D9DADF',
        padding: 10,
        marginBottom: 10,
        color: 'black',
        borderRadius: 20,
    },
    textInputArea: {
        textAlignVertical: 'top',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        color: 'black'
    },

});
