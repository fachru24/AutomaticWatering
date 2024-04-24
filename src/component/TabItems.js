import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { IconHome, IconHomeActive, IconSettings, IconSettingsActive, IconHistory, IconHistoryActive, IconAkun, IconAkunActive } from '../assets/icons';

const TabItems = ({ label, isFocused, onPress, onLongPress }) => {

    const Icon = () => {
        if (label === "Home") return isFocused ? <IconHome /> : <IconHomeActive />
        if (label === "Perangkat") return isFocused ? <IconSettings /> : <IconSettingsActive />
        if (label === "Riwayat") return isFocused ? <IconHistory /> : <IconHistoryActive />
        if (label === "Akun") return isFocused ? <IconAkun /> : <IconAkunActive />
        return <IconHome />
    }
    return (
        <TouchableOpacity
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.navBar}
        >
            <Icon/>
            <Text style={styles.navText(isFocused)}>{label}</Text>
        </TouchableOpacity>
    );
};

export default TabItems;

const styles = StyleSheet.create({
    navBar: {
        alignItems: 'center',
    },
    navText: (isFocused) => ({
        fontSize: 13,
        color: isFocused ? '#50A76F' : '#00303D',
        marginTop: 4,
    })
});
