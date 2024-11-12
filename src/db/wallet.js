import * as SQLite from "expo-sqlite";
import {userTableName} from "./user";

export const walletTableName = 'wallets'
const db = SQLite.openDatabaseSync("default");

export const createWalletTable = async () => {
    await db.execAsync(`CREATE TABLE IF NOT EXISTS ${walletTableName} (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
        user_id INTEGER NOT NULL,
        wallet_address TEXT NOT NULL, 
        balance REAL DEFAULT 0.0,
        currency TEXT DEFAULT 'USD',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES ${userTableName}(id) ON DELETE CASCADE
    );`);
};

export const getWalletsByUserId = async (userId) => {
    return await db.getAllAsync(
        `SELECT * FROM ${walletTableName} WHERE user_id = ?;`,
        [userId]
    );
};

export const createWallet = async (wallet) => {
    await db.runAsync(`
        INSERT INTO ${walletTableName} (user_id, wallet_address, balance, currency)
        VALUES (?, ?, ?, ?);
    `, [wallet.user_id, wallet.wallet_address, wallet.balance, wallet.currency]);
};

export const getWalletById = async (id) => {
    return await db.getAllAsync(`SELECT * FROM ${walletTableName} WHERE id = ?;`, [id]);
};

export const findWalletsByProperties = async (value) => {
    const query = `
        SELECT * FROM ${walletTableName} 
        WHERE wallet_address LIKE ? 
        OR balance LIKE ? 
        OR currency LIKE ? 
        OR created_at LIKE ?
    `;

    const searchValue = `%${value}%`;

    try {
        return await db.getAllAsync(query, [searchValue, searchValue, searchValue, searchValue]);
    } catch (error) {
        console.error("Failed to find wallets:", error);
        throw error;
    }
};

export const updateWallet = async (wallet) => {
    const query = `
        UPDATE ${walletTableName} 
        SET wallet_address = ?, balance = ?, currency = ? 
        WHERE id = ?;
    `;
    await db.getAllAsync(query, [wallet.wallet_address, wallet.balance, wallet.currency, wallet.id]);
};

export const deleteWallet = async (id) => {
    console.log(id)
    const query = `DELETE FROM ${walletTableName} WHERE id = ?;`;
    await db.runAsync(query, [id]);
};