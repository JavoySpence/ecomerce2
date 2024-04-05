import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config({path: './config.env'});

const pool = mysql.createPool ({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}).promise();

// ================================================================================================================================================
// MEN SECTION
// ================================================================================================================================================

export const getAllMen = async () => {
    const result = await pool.query('SELECT * FROM MEN ');
    return result[0];
};
export const getAllMen2 = async (limit = 3, offset = 0) => {

    limit = Number.isInteger(limit) && limit > 0 ? limit : 10;
    offset = Number.isInteger(offset) && offset >= 0 ? offset : 0;
    
    const result = await pool.query('SELECT * FROM MEN LIMIT ? OFFSET ?', [limit, offset]);
    return result[0];
};

export const getAllPerson = async () => {
    const result = await pool.query('SELECT * FROM person ');
    return result[0];
};

export const newMenItem = async (oMen) => {
    const result = await pool.query(
        'INSERT INTO men (item_name, brand, image, price, description, person) VALUES (?, ?, ?, ?, ?, ?)',
        [oMen.item_name, oMen.brand, oMen.image, oMen.price, oMen.description, oMen.person]
    );
    return result[0];
}



export  const getAllMenCount2 = async () => {
    const result =  await pool.query('SELECT COUNT(*) AS itemCount FROM men');
    return result[0].itemCount;
 };
