import React, {useCallback, useState} from 'react';
import {Alert, Button, FlatList, StyleSheet, Text, View} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {deleteWallet, getWalletsByUserId} from '../../db/wallet';

export const WalletPage = ({route}) => {
    const {userId} = route.params;
    const navigation = useNavigation();
    const [wallets, setWallets] = useState([]);

    useFocusEffect(
        useCallback(() => {
            loadUserWallets();
        }, [])
    );

    const loadUserWallets = async () => {
        try {
            const userWallets = await getWalletsByUserId(userId);
            setWallets(userWallets);
        } catch (error) {
            console.error('Failed to load wallets', error);
            Alert.alert('Error', 'Failed to load wallets');
        }
    };

    const handleDeleteWallet = async (id) => {
        try {
            await deleteWallet(id);
            loadUserWallets();
        } catch (error) {
            console.error('Failed to delete wallet', error);
            Alert.alert('Error', 'Failed to delete wallet');
        }
    };

    const handleCreateWallet = () => {
        navigation.navigate('CreateWalletRoute', {userId: userId});
    };

    const handleEditWallet = (item) => {
        navigation.navigate('EditWalletRoute', item)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Wallets</Text>

            <FlatList
                data={wallets}
                keyExtractor={(wallet) => wallet.id.toString()}
                renderItem={({item}) => (
                    <View style={styles.walletItem}>
                        <Text style={styles.walletText}>Address: {item.wallet_address}</Text>
                        <Text style={styles.walletText}>Balance: {item.balance}</Text>
                        <Text style={styles.walletText}>Currency: {item.currency}</Text>
                        <View style={styles.buttonContainer}>
                            <Button title="Edit" onPress={() => handleEditWallet(item)}/>
                            <Button title="Delete" color="red" onPress={() => handleDeleteWallet(item.id)}/>
                        </View>
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.noWallets}>No wallets found for this user</Text>}
            />

            <Button title="Add Wallet" onPress={handleCreateWallet}/>
        </View>
    );
};

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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    noWallets: {
        textAlign: 'center',
        fontSize: 16,
        color: '#888',
        marginTop: 20,
    },
});
