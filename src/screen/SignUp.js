import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MyButton from '../component/MyButton';
import Textinput from '../component/Textinput'; // Pastikan telah mengimpor Textinput dengan benar
import auth from "@react-native-firebase/auth";
import { useNavigation } from '@react-navigation/native';
import { ref, set } from 'firebase/database'; // Import ref and set from firebase/database

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [nama, setNama] = useState("");

    const navigation = useNavigation();

    const goToLogin = () => {
        navigation.navigate('Login');
    }

    const SignUpFn = () => {
        if (password !== confirmPassword) {
            Alert.alert("Error", "Password dan konfirmasi password tidak cocok");
            return;
        }
    
        if (email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '' || nama.trim() === '') {
            Alert.alert('Gagal Daftar', 'Masukkan email, nama, dan password.');
            return;
        }
    
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const uid = userCredential.user.uid;
                const nUserRef = ref(db, `nUsers/${uid}`); // Adjust the reference path
                set(nUserRef, {
                    nama: nama,
                    email: email,
                    role: 'Petani',
                }).then(() => {
                    Alert.alert("Berhasil Mendaftar", "Anda berhasil mendaftar.", [
                        { text: "OK", onPress: goToLogin }
                    ]);
                }).catch((error) => {
                    console.error('Gagal menambahkan profil pengguna:', error);
                });
            })
            .catch(error => {
                Alert.alert("Gagal Mendaftar", "Format Email Salah");
            });
    };

    return (
        <View style={styles.container}>

            <View style={styles.titleWrapper}>
                <Text style={styles.title}>AutoGrow</Text>
            </View>

            <View style={styles.inputWrapper}>
                <View style={styles.inputsContainer}>
                    <Textinput
                        value={nama}
                        onChangeText={text => setNama(text)}
                        placeholder="Masukan Nama"
                        placeholderTextColor="#E7F9EB"
                        color="#E7F9EB"
                    />
                    <Textinput
                        value={email}
                        onChangeText={text => setEmail(text)}
                        placeholder="Masukan Email atau Username"
                        placeholderTextColor="#E7F9EB"
                        color="#E7F9EB"
                    />
                    <Textinput
                        value={password}
                        onChangeText={text => setPassword(text)}
                        placeholder="Masukan Password"
                        secureTextEntry
                        placeholderTextColor="#E7F9EB"
                        color="#E7F9EB"
                    />
                    <Textinput
                        value={confirmPassword}
                        onChangeText={text => setConfirmPassword(text)}
                        placeholder="Masukan Kembali Password"
                        secureTextEntry
                        placeholderTextColor="#E7F9EB"
                        color="#E7F9EB"
                    />

                    <MyButton style={{ marginTop: 20 }} title={"DAFTAR"} onPress={SignUpFn} />

                    <TouchableOpacity style={styles.Have} onPress={goToLogin}>
                        <Text style={styles.Have}>Sudah Memiliki Akun?</Text>
                    </TouchableOpacity>
                </View>
            </View>


        </View>
    );
};

export default SignUp;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
        alignItems: 'center',
    },

    titleWrapper: {
        flex: 1,
        width: '100%',
        height: 100,
        justifyContent: 'center',
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        backgroundColor: '#C2E7BB',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },

    inputWrapper: {
        flex: 6,
    },

    title: {
        fontSize: 40,
        textAlign: 'center',
        color: "#50A76F",
        fontFamily: "Audiowide-Regular"
    },

    inputsContainer: {
        height: 400,
        width: 350,
        backgroundColor: "#00303D",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 100,
        paddingHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },

    Have: {
        alignSelf: "flex-end",
        color: "#EDDC90",
        marginTop: 15,
        paddingRight: 8,
    }
});
