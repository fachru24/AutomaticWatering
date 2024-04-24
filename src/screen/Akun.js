import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import { ref, onValue } from 'firebase/database'; // for Realtime Database
import { db } from '../config/firebase';

const Akun = () => {
    const navigation = useNavigation();
    const user = auth().currentUser;
    const { uid } = user;

    const [nama, setNama] = useState('');
    const [emailPengguna, setEmailPengguna] = useState('');
    const [role, setUserRole] = useState('');

    const handleSignup = () => {
        navigation.navigate('SignUp'); // Navigate to Sign Up screen
    }

    const handleEditProfile = () => {
        navigation.navigate('EditProfil'); // Navigate to Edit Profile screen
    }

    useEffect(() => {
        // Ambil data profil pengguna dari Firebase Realtime Database
        const userProfileRef = ref(db, `nUsers/${uid}`);
        onValue(userProfileRef, (snapshot) => {
            const userProfileData = snapshot.val();
            // Perbarui state nama dan emailPengguna dengan data dari database
            setNama(userProfileData.nama);
            setEmailPengguna(userProfileData.email);
            setUserRole(userProfileData.role);
        });

        // Cleanup effect
        return () => {
        };
    }, [uid]); // Pastikan useEffect dipanggil kembali saat uid berubah

    const handleLogout = async () => {
        // Hapus token pengguna dari AsyncStorage
        try {
            await AsyncStorage.removeItem('userToken');
            // Navigasi kembali ke halaman Login
            navigation.navigate('Login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.contBase}>
            <View style={styles.avatarContainer}>
                <Image source={require('../assets/images/avatar.png')} style={styles.avatar} />
            </View>
            <Text style={styles.textNama}>{nama}</Text>
            <Text style={styles.textRole}>{role}</Text>

            <TouchableOpacity style={styles.buttonEditProfil} onPress={handleEditProfile}>
                <Text style={styles.buttonText}>Edit Profil</Text>
            </TouchableOpacity>

            {role === 'Pemilik' && (
                <TouchableOpacity style={styles.button} onPress={handleSignup}>
                    <Text style={styles.buttonText}>Buat Akun Petani</Text>
                </TouchableOpacity>
            )}
            
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonTextLogout}>Logout</Text>
            </TouchableOpacity>
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
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignItems: 'center', // Menambahkan properti alignItems di sini
    },
    avatarContainer: {
        alignItems: 'center',
        marginTop: 20,

    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 50,
    },
    textNama: {
        fontSize: 24,
        marginBottom: 5,
        fontWeight: 'bold',
        color: 'black',
    },
    textRole: {
        fontSize: 20,
        marginBottom: 10,
        color: '#808080',
    },
    button: {
        backgroundColor: 'transparent',
        position: 'absolute',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginBottom: 25,
        bottom: 0,
    },

    buttonEditProfil: {
        backgroundColor: '#50A76F',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 10,
        marginBottom: 10,
    },
    buttonText: {
        color: '#EDDC90',
        fontSize: 16,
        fontWeight: 'bold',
    },

    buttonTextLogout: {
        color: 'red',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Akun;
