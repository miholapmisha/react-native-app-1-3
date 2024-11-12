import React, {useState} from 'react';
import {Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {updateUser} from '../../db/user';
import {useNavigation} from '@react-navigation/native';

export const EditUserRoute = ({route}) => {
    const {id, name, surname, email, address} = route.params
    const navigation = useNavigation()
    const [user, setUser] = useState({id, name, surname, email, address})

    const handleEdit = async () => {
        if (user.name && user.surname && user.email && user.address) {
            try {
                await updateUser(user)
                Alert.alert('Success', 'User edited successfully');
                navigation.goBack();
            } catch (error) {
                console.error(error);
                Alert.alert('Error', 'Failed to edit user');
            }
        } else {
            Alert.alert('Error', 'Please fill all fields');
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Edit Existing User</Text>

            <TextInput
                style={styles.input}
                placeholder="Name"
                value={user.name}
                onChangeText={(value) => setUser({...user, name: value})}
            />
            <TextInput
                style={styles.input}
                placeholder="Surname"
                value={user.surname}
                onChangeText={(value) => setUser({...user, surname: value})}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={user.email}
                onChangeText={(value) => setUser({...user, email: value})}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Address"
                value={user.address}
                onChangeText={(value) => setUser({...user, address: value})}
            />
            <View style={{marginVertical: 20}}>
                <Button
                    color="wheat"
                    title="Wallets"
                    onPress={() => navigation.navigate('WalletPage', {userId: user.id})}
                />
            </View>
            <View style={styles.editButtonContainer}>
                <Button title="Edit User" onPress={handleEdit}/>
            </View>

            {/*<Text style={styles.subHeader}>Wallets</Text>*/}
            {/*<FlatList*/}
            {/*    data={wallets}*/}
            {/*    keyExtractor={(wallet) => wallet.id.toString()}*/}
            {/*    renderItem={({item}) => (*/}
            {/*        <View style={styles.walletItem}>*/}
            {/*            <Text style={styles.walletText}>Address: {item.wallet_address}</Text>*/}
            {/*            <Text style={styles.walletText}>Balance: {item.balance}</Text>*/}
            {/*            <Text style={styles.walletText}>Currency: {item.currency}</Text>*/}
            {/*            <View style={styles.buttonContainer}>*/}
            {/*                <Button title="Edit" onPress={() => handleEditWallet(item)}/>*/}
            {/*                <Button title="Delete" color="red" onPress={() => handleDeleteWallet(item.id)}/>*/}
            {/*            </View>*/}
            {/*        </View>*/}
            {/*    )}*/}
            {/*    ListEmptyComponent={<Text style={styles.noWallets}>No wallets found for this user</Text>}*/}
            {/*/>*/}
            {/*<Button title="Create Wallet" onPress={handleCreateWallet}/>*/}
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    subHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    editButtonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 16,
        right: 16,
    },
    walletItem: {
        padding: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        borderRadius: 5,
        marginVertical: 5,
    },
    walletText: {
        fontSize: 16,
    },
    noWallets: {
        textAlign: 'center',
        fontSize: 16,
        color: '#888',
        marginTop: 20,
    },
});