import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { BluetoothManager } from 'react-native-bluetooth-escpos-printer'; // Import modul Bluetooth

const ConnectToWifi = () => {
    const [ssid, setSSID] = useState('');
    const [password, setPassword] = useState('');

    const handleConnect = async () => {
        try {
            // Periksa apakah Bluetooth aktif
            const isEnabled = await BluetoothManager.isBluetoothEnabled();
            if (!isEnabled) {
                Alert.alert('Bluetooth Error', 'Bluetooth tidak aktif. Aktifkan Bluetooth dan coba lagi.');
                return;
            }

            // Kirim perintah ke ESP32 untuk menghubungkan ke jaringan Wi-Fi
            const command = `CONNECT_WIFI\n${ssid}\n${password}\n`;
            await BluetoothManager.writeDataToDevice(command);

            // Tunggu balasan dari ESP32
            const response = await BluetoothManager.readUntil('\n');

            // Periksa balasan dari ESP32
            if (response === 'WI-FI_CONNECTED\n') {
                Alert.alert('Sukses', 'ESP32 terhubung ke Wi-Fi.');
            } else {
                Alert.alert('Error', 'Gagal menghubungkan ESP32 ke Wi-Fi.');
            }
        } catch (error) {
            Alert.alert('Error', 'Terjadi kesalahan saat menghubungkan ke perangkat Bluetooth.');
            console.error('Bluetooth Error:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>SSID:</Text>
            <TextInput
                style={styles.input}
                value={ssid}
                onChangeText={setSSID}
                placeholder="Masukkan SSID Wi-Fi"
            />
            <Text style={styles.label}>Password:</Text>
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Masukkan kata sandi Wi-Fi"
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleConnect}>
                <Text style={styles.buttonText}>Hubungkan ke Wi-Fi</Text>
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
        color: 'black'
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

export default ConnectToWifi;
