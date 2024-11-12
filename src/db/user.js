import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("default");
export const userTableName = 'users'

export const createUserTable = async () => {
    await db.execAsync(`CREATE TABLE IF NOT EXISTS ${userTableName} (
                id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
                name TEXT NOT NULL, 
                surname TEXT NOT NULL,
                email TEXT NOT NULL,
                address TEXT NOT NULL
            );`)
};

export const getUsers = async () => {
    return await db.getAllAsync(`SELECT * FROM ${userTableName}`);
};

export const addUser = async (user) => {
    await db.runAsync(`INSERT INTO ${userTableName}(name, surname, email, address) VALUES ($name, $surname, $email, $address)`,
        {
            $name: user.name,
            $surname: user.surname,
            $email: user.email,
            $address: user.address
        });
}

export const deleteUser = async (id) => {
    await db.runAsync(`DELETE FROM ${userTableName} WHERE id=? `, id)
}

export const updateUser = async (user) => {
    return await db.getAllAsync(`UPDATE ${userTableName} SET name=$name, surname=$surname, email=$email, address=$address WHERE id=$id`,
        {
            $name: user.name,
            $surname: user.surname,
            $email: user.email,
            $address: user.address,
            $id: user.id
        })
}

export const findUsersByProperties = async (value) => {
    const query = `
        SELECT * FROM ${userTableName} 
        WHERE name LIKE ? 
        OR surname LIKE ? 
        OR email LIKE ? 
        OR address LIKE ?
    `;

    const searchValue = `%${value}%`;

    try {
        return await db.getAllAsync(query, [searchValue, searchValue, searchValue, searchValue]);
    } catch (error) {
        console.error("Failed to find users:", error);
        throw error;
    }
};