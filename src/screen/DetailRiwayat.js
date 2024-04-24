import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ref, onValue } from 'firebase/database';
import { db } from '../config/firebase';
import { Chart, Line, Area, HorizontalAxis, VerticalAxis } from 'react-native-responsive-linechart';

const DetailRiwayat = ({ route }) => {
    const { systemId } = route.params;
    const [riwayatData, setRiwayatData] = useState([]);

    // Fungsi untuk mengonversi timestamp epoch menjadi tanggal yang dapat dibaca manusia
    const convertEpochToDate = (epoch) => {
        const date = new Date(epoch * 1000); // Konversi ke milidetik
        return date.toLocaleString(); // Mengembalikan tanggal dalam format yang dapat dibaca manusia
    };

    const convertEpochToDay = (epoch) => {
        const date = new Date(epoch * 1000); // Konversi ke milidetik
        return parseFloat(date.getDate()); // Mengembalikan hari dalam bulan sebagai float
    }


    // Mendapatkan data Kelembaban, pH, dan Waktu yang sesuai dengan id sistem
    useEffect(() => {
        const riwayatRef = ref(db, 'nRiwayat/');
        onValue(riwayatRef, (riwayatSnapshot) => {
            const riwayatData = riwayatSnapshot.val();
            if (riwayatData) {
                const filteredRiwayatData = Object.values(riwayatData)
                    .filter(riwayat => riwayat.IdSistem === systemId)
                    .sort((a, b) => b.Waktu.localeCompare(a.Waktu)) // Urutkan berdasarkan waktu, data terbaru berada di bagian awal
                    .slice(0, 5); // Ambil dua data teratas
                setRiwayatData(filteredRiwayatData);
            }
        });
    }, [systemId]);

    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.container}>
                <Text style={styles.title}>Detail Riwayat</Text>
                <Chart
                    style={{ height: 200, width: 400 }}
                    data={[
                        { x: 1, y: 80 },
                        { x: 2, y: 86 },
                        { x: 3, y: 89 },
                    ]}
                    padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
                    xDomain={{ min: 1, max: 31 }}
                    yDomain={{ min: 0, max: 100}}
                >
                    <VerticalAxis tickCount={10} theme={{ labels: { formatter: (v) => v.toFixed(2) } }} />
                    <HorizontalAxis tickCount={3} />
                    <Area theme={{ gradient: { from: { color: '#44bd32' }, to: { color: '#44bd32', opacity: 0.2 } } }} />
                    <Line theme={{ stroke: { color: '#44bd32', width: 5 }, scatter: { default: { width: 8, height: 8, rx: 4, color: '#44ad32' }, selected: { color: 'red' } } }} />
                </Chart>
                {riwayatData.map((riwayat, index) => (
                    <View key={index} style={styles.riwayatContainer}>
                        <Text style={styles.text}>Kelembaban: {riwayat.Kelembaban}</Text>
                        <Text style={styles.text}>pH: {riwayat.pH}</Text>
                        <Text style={styles.text}>{convertEpochToDate(riwayat.Waktu)}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'black', // warna teks hitam
    },
    riwayatContainer: {
        flexDirection: 'column',
        width: "90%",
        justifyContent: 'space-end', // Mengatur jarak antara elemen-elemen di dalam container
        borderBottomWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
    },
    text: {
        color: 'black', // warna teks hitam
    },
});

export default DetailRiwayat;