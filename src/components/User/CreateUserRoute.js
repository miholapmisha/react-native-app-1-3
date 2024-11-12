import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { addUser } from '../../db/user';
import { useNavigation } from '@react-navigation/native';

export const CreateUserRoute = () => {

    const navigation = useNavigation()
    const [user, setUser] = useState({
        name: '',
        surname: '',
        email: '',
        address: ''
    })

    const handleSave = async () => {
        if (user.name && user.surname && user.email && user.address) {
            try {
                await addUser(user);
                Alert.alert('Success', 'User added successfully');
                navigation.goBack();
            } catch (error) {
                console.error(error);
                Alert.alert('Error', 'Failed to add user');
            }
        } else {
            Alert.alert('Error', 'Please fill all fields');
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Create New User</Text>

            <TextInput
                style={styles.input}
                placeholder="Name"
                value={user.name}
                onChangeText={(value) => setUser({ ...user, name: value })}
            />
            <TextInput
                style={styles.input}
                placeholder="Surname"
                value={user.surname}
                onChangeText={(value) => setUser({ ...user, surname: value })}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={user.email}
                onChangeText={(value) => setUser({ ...user, email: value })}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Address"
                value={user.address}
                onChangeText={(value) => setUser({ ...user, address: value })}
            />

            <Button title="Save User" onPress={handleSave} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 8,
        marginBottom: 10,
    },
});