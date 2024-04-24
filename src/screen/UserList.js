import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db } from '../config/firebase';
import { ref, onValue } from 'firebase/database';
import UserCard from '../component/UserCard';

const UserList = () => {
    const [userList, setUserList] = useState([]);
    const navigation = useNavigation();

    const handleSignup = () => {
        navigation.navigate('SignUp'); // Navigate to Sign Up screen
    }

    useEffect(() => {
        const fetchUserList = () => {
            const userListRef = ref(db, 'nUsers');
            onValue(userListRef, (snapshot) => {
                const users = snapshot.val();
                if (users) {
                    const userListData = Object.keys(users).map((key) => ({
                        id: key,
                        nama: users[key].nama,
                        email: users[key].email,
                        role: users[key].role,
                    }));
                    setUserList(userListData);
                }
            });
        };

        fetchUserList();

        return () => {
            // Clean up subscriptions
            // This is executed when the component unmounts
            // to prevent memory leaks
            off(ref(db, 'nUsers'));
        };
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={userList}
                renderItem={({ item }) => (
                    <UserCard
                        id={item.id}
                        nama={item.nama}
                        email={item.email}
                        role={item.role}
                    />
                )}
                keyExtractor={(item) => item.id}
            />

            <TouchableOpacity style={styles.addButton} onPress={handleSignup}>
                <Text style={styles.addButtonText}>Tambah Pengguna</Text>
            </TouchableOpacity>            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    addButton: {
        backgroundColor: '#50A76F',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 20,
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default UserList;
