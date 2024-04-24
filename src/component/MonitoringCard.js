import React from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import { useState, useEffect } from 'react'
import { db } from '../config/firebase';
import { ref, onValue } from "firebase/database";



const MonitoringCard = () => {

    const [monitoringData, setMonitoringData] = useState([]);

    useEffect(() => {
        const starCountRef = ref(db, 'RealTime/');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            const newPost = Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            }));
            console.log(newPost);
            setMonitoringData(newPost);
        })
    }, [db])

    return (
        <View style={styles.cardContainer}>
            {
                monitoringData.map((item, index) => {
                    return (
                        <View style={styles.contData} key={index}>

                            <View style={styles.kelembaban}>
                                <Text style={styles.judulkelembaban}>Kelembaban Tanah</Text>
                                <Text style={styles.textkelembaban}>{item.Kelembaban}%</Text>
                            </View >

                            <View style={styles.ph}>
                                <Text style={styles.judulph}>pH Tanah</Text>
                                <Text style={styles.textph}>{item.pH}</Text>
                            </View>

                        </View>
                    )
                })
            }
        </View>
    );
};

const deviceWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
    cardContainer: {
        width: deviceWidth - 40,
        backgroundColor: '#00303D',
        height: 200,
        borderRadius: 20,
        flexDirection: 'row',
        padding: 10,

        shadowColor: '#000',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.75,
        elevation: 7,
        shadowRadius: 9,
    },

    contData: {
        flex: 1,
        flexDirection: 'row',
    },

    kelembaban: {
        flex: 2.5,
        //backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
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
});

export default MonitoringCard;