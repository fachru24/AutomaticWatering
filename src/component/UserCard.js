import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const UserCard = ({ id, nama, email, role }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.navigate('EditProfil', { id: id })}>
            <View>
                <Text style={styles.text}>ID: {id}</Text>
                <Text style={styles.text}>Nama: {nama}</Text>
                <Text style={styles.text}>Email: {email}</Text>
                <Text style={styles.text}>Role: {role}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default UserCard;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#00303D',
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
    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
});
