import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { findUsersByProperties, getUsers, deleteUser } from '../../db/user';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

export const UserPage = () => {
    const navigation = useNavigation()
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);

    useFocusEffect(
        useCallback(() => {
            handleSearch()
        }, [])
    );

    const loadUsers = async () => {
        const allUsers = await getUsers();
        setUsers(allUsers);
    };

    const handleSearch = async () => {
        if (search.trim() === '') {
            loadUsers();
        } else {
            const filteredUsers = await findUsersByProperties(search);
            setUsers(filteredUsers);
        }
    };

    const handleDelete = async (id) => {
        await deleteUser(id);
        loadUsers();
    };

    const handleEdit = (user) => {
        navigation.navigate('EditUserRoute', {
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            address: user.address
        })
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search by name, surname, email, or address"
                value={search}
                onChangeText={setSearch}
                onSubmitEditing={handleSearch}
            />
            <Button title="Search" onPress={handleSearch} />
            <FlatList
                data={users}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.userItem}>
                        <Text style={styles.userText}>{item.name} {item.surname}</Text>
                        <Text style={styles.userText}>{item.email}</Text>
                        <Text style={styles.userText}>{item.address}</Text>
                        <View style={styles.buttonContainer}>
                            <Button title="Edit" onPress={() => handleEdit(item)} />
                            <Button title="Delete" color="red" onPress={() => handleDelete(item.id)} />
                        </View>
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.noResults}>No users found</Text>}
            />
            <Button style={styles.buttonContainer} title="Create User" onPress={() => navigation.navigate('CreateUserRoute')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    createUserButton: {
        fontSize: 32,
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 8,
        marginBottom: 10,
    },
    userItem: {
        padding: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        borderRadius: 5,
        marginVertical: 5,
    },
    userText: {
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    noResults: {
        textAlign: 'center',
        fontSize: 16,
        color: '#888',
        marginTop: 20,
    },
});
