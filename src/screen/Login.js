import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert, TextInput } from 'react-native';
import MyButton from '../component/MyButton';
import Textinput from '../component/Textinput';
import { useNavigation } from '@react-navigation/native';
import auth from "@react-native-firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState(""); // State untuk email
  const [password, setPassword] = useState(""); // State untuk password
  const [userToken, setUserToken] = useState(null); // State untuk menyimpan token pengguna

  useEffect(() => {
    // Periksa apakah ada token otentikasi yang tersimpan di AsyncStorage saat aplikasi dimuat
    const checkAuthToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          // Jika token ditemukan, gunakan token tersebut untuk autentikasi pengguna secara otomatis
          setUserToken(token);
          navigation.navigate('MainApp');
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkAuthToken();
  }, []);

  const LoginWithMailAndPass = () => {
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Gagal Login', 'Masukkan email dan password.');
      return; // Hentikan proses login jika email atau password kosong
    }

    auth().signInWithEmailAndPassword(email, password)
      .then(async (res) => {
        // Jika login berhasil, simpan token otentikasi pengguna ke AsyncStorage
        const token = await res.user.getIdToken();
        await AsyncStorage.setItem('userToken', token);
        
        // Navigasi ke halaman MainApp
        setUserToken(token);
        navigation.navigate('MainApp');
      })
      .catch(err => {
        // Menangani kesalahan saat login
        if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
          Alert.alert('Gagal Login', 'Email atau Password Salah.');
        } else {
          console.error(err);
        }
      });
  }

  const goToSignUp = () => {
    navigation.navigate('SignUp'); // Navigate to Sign Up screen
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>AutoGrow</Text>
      </View>
      <View style={styles.inputWrapper}>
        <View style={styles.inputsContainer}>
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
            placeholder="Password"
            placeholderTextColor="#E7F9EB"
            color="#E7F9EB"
            secureTextEntry
          />
          <TouchableOpacity style={styles.DontHave} onPress={goToSignUp}>
            <Text style={styles.DontHave}>Tidak Memiliki Akun?</Text>
          </TouchableOpacity>
          <MyButton title={"LOGIN"} onPress={LoginWithMailAndPass} />
        </View>
      </View>
    </View >
  )
}

export default Login;

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

  DontHave: {
    alignSelf: "flex-end",
    color: "#EDDC90",
    marginBottom: 30,
    paddingRight: 7,
  }
});
