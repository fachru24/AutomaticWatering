import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'


const Card = ({ id, riwayatItem }) => {
    return (
        <View style={styles.cardWrapper}>
            <Text style={styles.namaPerangkat}>{riwayatItem.nama}</Text>
            <View style={styles.cardContainer}>
                <View style={styles.kelembaban}>
                    <Text style={styles.judulkelembaban}>Kelembaban Tanah</Text>
                    <Text style={styles.textkelembaban}>{riwayatItem.kelembaban}%</Text>
                </View >

                <View style={styles.ph}>
                    <Text style={styles.judulph}>pH Tanah</Text>
                    <Text style={styles.textph}>{riwayatItem.ph}</Text>
                </View>
            </View>
        </View>

    );
}

export default Card

const deviceWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({

    cardWrapper: {
        marginTop: 5,
    },

    cardContainer: {
        width: deviceWidth - 40,
        backgroundColor: '#00303D',
        height: 200,
        borderRadius: 20,
        flexDirection: 'row',
        padding: 8,
        marginBottom: 20,
        marginTop: 10,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        elevation: 5,
        shadowRadius: 20,
    },

    contData: {
        flex: 1,
        flexDirection: 'row',
    },

    kelembaban: {
        flex: 2.5,
        //backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        alignContent: 'center'
    },

    ph: {
        flex: 2,
        //backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },

    textkelembaban: {
        fontSize: 80,
        fontWeight: 'bold',
        color: '#E7F9EB',
    },

    judulkelembaban: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#E7F9EB',
    },

    textph: {
        fontSize: 80,
        fontWeight: 'bold',
        color: '#E7F9EB',
    },

    judulph: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#E7F9EB',

    },
    namaPerangkat: {
        color: '#00303D',
        fontSize: 18,
        fontWeight: 'bold',
        paddingLeft: 15,
    }
});
