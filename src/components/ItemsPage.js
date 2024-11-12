import React, {useCallback, useState} from 'react';
import {Button, FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

export const ItemsPage = ({ route }) => {

    const { deleteItem, selectAllItems, findItemsByProperties, createRouteName, editRouteName} = route.params

    const navigation = useNavigation()
    const [search, setSearch] = useState('');
    const [items, setItems] = useState([]);

    useFocusEffect(
        useCallback(() => {
            handleSearch()
        }, [])
    );

    const loadItems = async () => {
        const items = await selectAllItems();
        setItems(items);
    };

    const handleSearch = async () => {
        if (search.trim() === '') {
            loadItems();
        } else {
            const filteredItems = await findItemsByProperties(search);
            setItems(filteredItems);
        }
    };

    const handleDelete = async (id) => {
        await deleteItem(id)
        loadItems();
    };

    const handleEdit = (item) => {
        navigation.navigate(editRouteName, {...item})
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search by properties"
                value={search}
                onChangeText={setSearch}
                onSubmitEditing={handleSearch}
            />
            <Button title="Search" onPress={handleSearch} />
            <FlatList
                data={items}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.itemStyle}>
                        <Text style={styles.userText}>{Object.values(item)[0] ? Object.values(item)[0] : ''} {Object.values(item)[1] ? Object.values(item)[1] : ''}</Text>
                        <Text style={styles.userText}>{Object.values(item)[2] ? Object.values(item)[2] : ''}</Text>
                        <Text style={styles.userText}>{Object.values(item)[3] ? Object.values(item)[3] : ''}</Text>
                        <View style={styles.buttonContainer}>
                            <Button title="Edit" onPress={() => handleEdit(item)} />
                            <Button title="Delete" color="red" onPress={async () => {
                                await handleDelete(item.id)
                            }} />
                        </View>
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.noResults}>No found</Text>}
            />
            <Button style={styles.buttonContainer} title="Create" onPress={() => {
                navigation.navigate(createRouteName)
            }} />
        </View>
    );
}

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
    itemStyle: {
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
