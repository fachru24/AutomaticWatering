import { StyleSheet, ScrollView, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { db } from '../config/firebase';
import { ref, onValue, } from "firebase/database";
import ListPerangkat from '../component/ListPerangkat';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'


const Kontrol = () => {
    const navigation = useNavigation();
    const [sistems, setSistems] = useState({});
    const [sistemsKey, setSistemsKey] = useState([]);

    const TambahPerangkat = () => {
        navigation.navigate('TambahPerangkat');
    }

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
                    setSistems(newPost);
                    setSistemsKey(Object.keys(data));
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
                        {sistemsKey.length > 0 ? (
                            sistems.map((item) => (
                                <ListPerangkat key={item.id} sistemItem={item} id={item.id} />
                            ))
                        ) : (
                            <Text> Daftar Kosong </Text>
                        )}
                        <View style={styles.wrapperButton}>
                            <TouchableOpacity style={styles.buttonTambah} onPress={TambahPerangkat}>
                                <FontAwesomeIcon icon={faPlus} size={20} color='#EDDC90' />
                            </TouchableOpacity>
                        </View>

                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default Kontrol

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
        alignItems: 'center',
        //width: '100%', Sesuaikan lebar sesuai kebutuhan Anda
        alignContent: 'center',
        marginTop: 25,
        // marginBottom: 20,
        //backgroundColor: 'yellow',
    },

    wrapperButton: {
        flex: 1,
        position: 'absolute',
        bottom: 0,
        right: 0,
        margin: 20,
    },

    buttonTambah: {
        padding: 20,
        backgroundColor: '#50A76F',
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },

    text: {
        color: 'black'
    },

    judul: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 10,
    }
});