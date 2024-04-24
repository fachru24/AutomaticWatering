import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db } from '../config/firebase';
import { ref, set } from 'firebase/database';
import auth from '@react-native-firebase/auth';

const EditProfil = () => {
    const navigation = useNavigation();
    const [nama, setNama] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    const uid = auth().currentUser.uid;


    

    const handleEditProfil = () => {
        // Buat referensi ke entitas nUser di Firebase Realtime Database
        const nUserRef = ref(db, `nUsers/${uid}`);
        
        // Set data profil pengguna
        set(nUserRef, {
            nama: nama,
            email: email,
            role: role
        }).then(() => {
            console.log('Profil pengguna berhasil ditambahkan');
            // Navigasi kembali ke halaman sebelumnya
            navigation.goBack();
        }).catch((error) => {
            console.error('Gagal menambahkan profil pengguna:', error);
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nama:</Text>
            <TextInput
                style={styles.input}
                value={nama}
                onChangeText={setNama}
                placeholder="Masukkan nama"
            />
            <Text style={styles.label}>Email:</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Masukkan email"
            />
            <Text style={styles.label}>Role:</Text>
            <TextInput
                style={styles.input}
                value={role}
                onChangeText={setRole}
                placeholder="Masukkan role"
            />
            <TouchableOpacity style={styles.button} onPress={handleEditProfil}>
                <Text style={styles.buttonText}>Tambah Profil</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 30,
        backgroundColor: 'white',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#50A76F',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default EditProfil;
