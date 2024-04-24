import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';


function ListPerangkat({ id, sistemItem }) {

    const navigation = useNavigation()
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.navigate('Edit', {id: id})}>
            <View>
                <Text style={styles.text}>{sistemItem.nama}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default ListPerangkat;

const deviceWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
    container: {
        width: deviceWidth - 40,
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#00303D',
        borderRadius: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },

    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }

});