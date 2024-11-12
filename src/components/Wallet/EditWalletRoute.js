import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { updateWallet } from '../../db/wallet';
import { useNavigation } from '@react-navigation/native';

export const EditWalletRoute = ({ route }) => {
    const { id, wallet_address, balance, currency } = route.params;
    const navigation = useNavigation();
    const [wallet, setWallet] = useState({ id, wallet_address, balance, currency });

    const handleEditWallet = async () => {
        if (wallet.wallet_address && wallet.balance && wallet.currency) {
            try {
                await updateWallet(wallet);
                Alert.alert('Success', 'Wallet updated successfully');
                navigation.goBack();
            } catch (error) {
                console.error(error);
                Alert.alert('Error', 'Failed to update wallet');
            }
        } else {
            Alert.alert('Error', 'Please fill all fields');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Edit Wallet</Text>

            <TextInput
                style={styles.input}
                placeholder="Wallet Address"
                value={wallet.wallet_address}
                onChangeText={(value) => setWallet({ ...wallet, wallet_address: value })}
            />
            <TextInput
                style={styles.input}
                placeholder="Balance"
                value={wallet.balance ? String(wallet.balance) : ''}
                onChangeText={(value) =>
                    setWallet({ ...wallet, balance: value ? parseFloat(value) : '' })
                }
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Currency"
                value={wallet.currency}
                onChangeText={(value) => setWallet({ ...wallet, currency: value })}
            />

            <Button title="Save Wallet" onPress={handleEditWallet} />
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
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 8,
        marginBottom: 10,
    },
});
