import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { db } from '../config/firebase';
import { ref, onValue } from "firebase/database";

const Parameter = ({ route }) => {

    const [nilaiParameter, setNilaiParameter] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tanahGreenhouseRef = ref(db, 'nSistem/' + route.params.id);
                onValue(tanahGreenhouseRef, (snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        setNilaiParameter(data);
                    } else {
                        console.log("Data kosong");
                        setNilaiParameter({});
                    }
                });
            } catch (error) {
                console.error("Error getting data: ", error);
            }
        };

        fetchData();
    }, [route.params.id]);

    return (
        <View style={styles.pages}>
            <Text style={styles.textNama}>{nilaiParameter.nama}</Text>

            <View style={styles.kelembaban}>

                <View style={styles.min}>
                    <Text style={styles.text}>Kelembaban Minimal</Text>
                    <Text style={styles.textNilai}>{nilaiParameter.kelembabanBtm}  </Text>
                </View>

                <View style={styles.max}>
                    <Text style={styles.text}>Kelembaban Maksimal</Text>
                    <Text style={styles.textNilai}>{nilaiParameter.kelembabanTop}  </Text>
                </View>

            </View>

            <View style={styles.ph}>
                <View style={styles.min}>
                    <Text style={styles.text}>pH Minimal</Text>
                    <Text style={styles.textNilai}>{nilaiParameter.phBtm}</Text>
                </View>
                <View style={styles.max}>
                    <Text style={styles.text}>pH Maksimal</Text>
                    <Text style={styles.textNilai}>{nilaiParameter.phTop}</Text>
                </View>
            </View>

        </View>
    );
};

export default Parameter;

const styles = StyleSheet.create({
    pages: {
        padding: 10,
        alignItems: 'center',
        borderRadius: 25,
        marginBottom: 15,
        backgroundColor: '#00303D',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },

    kelembaban: {
        flexDirection: 'row',
        marginBottom: 20,
    },

    ph: {
        flexDirection: 'row',
        marginBottom: 10,
    },

    min: {
        flex: 1,
        alignItems: 'center',
        padding: 5,
    },

    max: {
        flex: 1,
        alignItems: 'center',
        padding: 5,
    },

    text: {
        fontSize: 14,
        marginBottom: 10,
        color: '#E7F9EB',

    },

    textNilai: {
        fontSize: 22,
        color: '#E7F9EB',
        fontWeight: 'bold'
    },

    textNama: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#E7F9EB',
        marginBottom: 20,
    },
});
