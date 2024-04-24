import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ref, onValue } from 'firebase/database';
import { db } from '../config/firebase';

const SystemCard = ({ systemId }) => {
    const navigation = useNavigation();
    const [systemName, setSystemName] = useState('');

    // Mendapatkan nama sistem berdasarkan id dari entitas nSistem
    useEffect(() => {
        const systemRef = ref(db, `nSistem/${systemId}`);
        onValue(systemRef, (snapshot) => {
            const systemData = snapshot.val();
            if (systemData) {
                setSystemName(systemData.nama);
            }
        });
    }, [systemId]);

    // Navigasi ke halaman DetailRiwayat saat card ditekan
    const goToDetailRiwayat = () => {
        navigation.navigate('DetailRiwayat', { systemId });
    };

    return (
        <TouchableOpacity style={styles.card} onPress={goToDetailRiwayat}>
            <Text style={styles.systemName}>{systemName}</Text>
        </TouchableOpacity>
    );
};

const Riwayat = () => {
    const [systemIds, setSystemIds] = useState([]);

    // Mendapatkan daftar id sistem dari entitas nRiwayat
    useEffect(() => {
        const riwayatRef = ref(db, 'nRiwayat/');
        onValue(riwayatRef, (riwayatSnapshot) => {
            const riwayatData = riwayatSnapshot.val();
            if (riwayatData) {
                const uniqueSystemIds = [...new Set(Object.values(riwayatData).map(riwayat => riwayat.IdSistem))];
                setSystemIds(uniqueSystemIds);
            }
        });
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.contBase}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {systemIds.map(systemId => (
                    <SystemCard key={systemId} systemId={systemId} />
                ))}
            </ScrollView>
            </View>
            
        </View>
    );
};


const deviceWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: deviceWidth,
        alignItems: 'center',
        backgroundColor: '#C2E7BB',
    },

    contBase: {
        flex: 1,
        width: deviceWidth,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignItems: 'center', // Menambahkan properti alignItems di sini
    },

    scrollViewContent: {
        flexGrow: 1,
        alignItems: 'center',
        marginTop: 25, 
        //backgroundColor: 'blue',
    },
    card: {
        width: deviceWidth - 40,
        backgroundColor: '#00303D', // warna card
        padding: 16,
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

    systemName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#E7F9EB', // warna teks nama
    },
});

export default Riwayat;
