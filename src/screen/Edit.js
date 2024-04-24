import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native';
import InputData from '../component/InputData';
import { db, ref, update } from '../config/firebase';
import { useAppContext } from '../backend/AppContext';
import Parameter from '../component/Parameter';

export default function Edit(props) {
    const { tanahData, updateTanahData } = useAppContext();

    const [inputValues, setInputValues] = React.useState({});

    const onChangeText = (namaState, value) => {
        setInputValues({ ...inputValues, [namaState]: value });
        updateTanahData({ [namaState]: value });
    };

    const onSubmit = () => {
        if (
            inputValues.nama &&
            inputValues.kelembabanBtm &&
            inputValues.kelembabanTop &&
            inputValues.phBtm &&
            inputValues.phTop
        ) {
            const tanahGreenhouseRef = ref(db, 'nSistem/' + props.route.params.id);

            update(tanahGreenhouseRef, inputValues)
                .then(() => {
                    Alert.alert('Sukses', 'Data tersimpan');
                    props.navigation.navigate('Perangkat');
                })
                .catch((error) => {
                    console.log('Error : ', error);
                });
        } else {
            Alert.alert('Error', 'Semua input wajib diisi');
        }
    };

    return (
        <View style={styles.pages}>

            <Parameter route={props.route} />

            <View style={styles.row}>
                <InputData
                    label="Nama Perangkat"
                    onChangeText={onChangeText}
                    namaState="nama"
                    style={{ color: 'black' }}
                />
            </View>
            <View style={styles.row}>
                <InputData
                    label="Kelembaban Minimal (%)"
                    keyboardType="number-pad"
                    onChangeText={onChangeText}
                    namaState="kelembabanBtm"
                />
                <InputData
                    label="Kelembaban Maksimal (%)"
                    keyboardType="number-pad"
                    onChangeText={onChangeText}
                    namaState="kelembabanTop"
                />
            </View>
            <View style={styles.row}>
                <InputData
                    label="pH Minimal"
                    keyboardType="number-pad"
                    onChangeText={onChangeText}
                    namaState="phBtm"
                />
                <InputData
                    label="pH Maksimal"
                    keyboardType="number-pad"
                    onChangeText={onChangeText}
                    namaState="phTop"
                />
            </View>
            <TouchableOpacity style={styles.tombol} onPress={onSubmit}>
                <Text style={styles.textTombol}>SIMPAN</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    pages: {
        flex: 1,
        paddingTop: 30,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: 'white',
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-beetween',
        marginBottom: 20,
    },

    parameterWrapper: {
        flex: 1,
        backgroundColor: 'white'
    },

    tombol: {
        backgroundColor: '#50A76F',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },

    textTombol: {
        color: '#EDDC90',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,

    },
});
