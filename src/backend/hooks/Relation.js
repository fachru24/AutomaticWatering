import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { getDatabase, ref, get, query, orderByChild, equalTo } from 'firebase/database';
import { db } from '../config/firebase';

const db = getDatabase(app); // In React Native, initialize Firebase database like this

const getValues = async (path) => {
    const dbRef = ref(db, path);
    const dbGet = await get(dbRef);
    const dbValue = dbGet.val();
    return dbValue;
}

const getQuery = async (path, child, queries) => {
    const dbRef = ref(db, path);
    const dbQuery = query(dbRef, orderByChild(child), ...queries);
    const dbGet = await get(dbQuery);
    const dbValue = dbGet.val();
    return dbValue;
}

const Riwayat = () => {
    const getData = async () => {
        const user001 = await getValues('users/user001');
        const user001Profile = await getValues('profile/user001');
        const user001Products = await getQuery('products', 'userId', [
            equalTo('user001')
        ]);

        console.log({ user001 });
        console.log({ user001Profile });
        console.log({ user001Products });

    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 30 }}>Relation Pages</Text>
        </View>
    );
}

export default Riwayat;
