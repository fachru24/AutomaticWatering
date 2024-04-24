import { StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';
import { ref, onValue } from 'firebase/database';
import { db } from '../config/firebase';
import Home from '../screen/HomeScreen';
import Kontrol from '../screen/Kontrol';
import Riwayat from '../screen/Riwayat';
import Edit from '../screen/Edit';
import Add from '../screen/Add';
import Login from '../screen/Login';
import SignUp from '../screen/SignUp';
import Akun from '../screen/Akun';
import TombolNavigasi from '../component/TombolNavigasi';
import EditProfil from '../screen/EditProfil';
import TambahPerangkat from '../screen/TambahPerangkat'
import UserList from '../screen/UserList';
import DetailRiwayat from '../screen/DetailRiwayat'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const user = auth().currentUser;
                const uid = user ? user.uid : null;
                if (uid) {
                    const userRoleRef = ref(db, `nUsers/${uid}/role`);
                    onValue(userRoleRef, (snapshot) => {
                        const userRole = snapshot.val();
                        setUserRole(userRole);
                    });
                }
            } catch (error) {
                console.error('Error fetching user role:', error);
            }
        };

        fetchUserRole();
    }, []);

    return (
        <Tab.Navigator tabBar={props => <TombolNavigasi {...props} />}>
            <Tab.Screen name="Home"
                component={Home}
                options={{
                    headerStyle: {
                        height: 80,
                        backgroundColor: '#C2E7BB'
                    },
                    headerTitleAlign: 'center',
                }} />
            {userRole === 'Petani' && (
                <Tab.Screen name="Perangkat" component={Kontrol} options={{
                    headerStyle: {
                        height: 80,
                        backgroundColor: '#C2E7BB'
                    },
                    headerTitleAlign: 'center',
                }} />
            )}
            <Tab.Screen name="Riwayat" component={Riwayat} options={{
                headerStyle: {
                    height: 80,
                    backgroundColor: '#C2E7BB'
                },
                headerTitleAlign: 'center',
            }} />
            <Tab.Screen name="Akun" component={Akun} options={{
                headerStyle: {
                    height: 80,
                    backgroundColor: '#C2E7BB'
                },
                headerTitleAlign: 'center',
            }} />
            {/* {userRole !== 'Petani' && (
                <Tab.Screen name="Akun" component={Akun} options={{
                    headerStyle: {
                        height: 80,
                        backgroundColor: '#C2E7BB'
                    },
                    headerTitleAlign: 'center',
                }} />
            )} */}
            {userRole !== 'Petani' && (
                <Tab.Screen name="UserList" component={UserList} options={{
                    headerStyle: {
                        height: 80,
                        backgroundColor: '#C2E7BB'
                    },
                    headerTitleAlign: 'center',
                }} />
            )}
        </Tab.Navigator>
    )
}

const Navigasi = () => {
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const user = auth().currentUser;
                const uid = user ? user.uid : null;
                if (uid) {
                    const userRoleRef = ref(db, `nUsers/${uid}/role`);
                    onValue(userRoleRef, (snapshot) => {
                        const userRole = snapshot.val();
                        setUserRole(userRole);
                    });
                }
            } catch (error) {
                console.error('Error fetching user role:', error);
            }
        };

        fetchUserRole();
    }, []);

    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
            <Stack.Screen name="MainApp" component={MainApp} options={{ headerShown: false }} />
            <Stack.Screen name="Edit" component={Edit} options={{ headerShown: false }} />
            <Stack.Screen name="Add" component={Add} options={{ headerShown: false }} />
            <Stack.Screen name="Akun" component={Akun} options={{ headerShown: false }} />
            <Stack.Screen name="EditProfil" component={EditProfil} options={{ headerShown: false }} />
            <Stack.Screen name="TambahPerangkat" component={TambahPerangkat} options={{ headerShown: false }} />
            <Stack.Screen name="DetailRiwayat" component={DetailRiwayat} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default Navigasi;

const styles = StyleSheet.create({
})
