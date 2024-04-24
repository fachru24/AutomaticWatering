import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, Dimensions, } from 'react-native';
import { db } from '../config/firebase';
import { ref, onValue, } from "firebase/database";
import Card from '../component/Card';


const HomeScreen = () => {
    const [riwayats, setRiwayats] = useState({});
    const [riwayatsKey, setRiwayatsKey] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const starCountRef = ref(db, 'nSistem/');
                onValue(starCountRef, (snapshot) => {
                    const data = snapshot.val();
                    const newPost = Object.keys(data).map(key => ({
                        id: key,
                        ...data[key]
                    }));
                    console.log(newPost);
                    setRiwayats(newPost);
                    setRiwayatsKey(Object.keys(data));
                });
            } catch (error) {
                console.error("Error getting data: ", error);
            }
        };

        fetchData();
    }, [db]);

    return (
        <View style={styles.container}>
            <View style={styles.contBase}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.cont2}>
                        {riwayatsKey.length > 0 ? (
                            riwayats.map((item) => (
                                <Card key={item.id} riwayatItem={item} id={item.id} />
                            ))
                        ) : (
                            <Text> Daftar Kosong </Text>
                        )}
                    </View>
                </ScrollView>
            </View>
        </View>
    );

};

export default HomeScreen;


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
        alignItems: 'center', // Menambahkan properti alignItems di sini
        //backgroundColor: 'blue',
    },

    cont2: {
        flex: 1,
        flexDirection: 'column',
        //width: '100%', Sesuaikan lebar sesuai kebutuhan Anda
        alignContent: 'center',
        marginTop: 10,
        // marginBottom: 20,
        //backgroundColor: 'yellow',
    },

    text: {
        color: 'black'
    }
});

