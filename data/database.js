import mysql, { createServer } from 'mysql2';
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

export const getAllMen2 = async (limit , offset) => {
    const result = await pool.query('SELECT * FROM men LIMIT ? OFFSET ?', [limit, offset]);
    return result[0];
};

export const getAllMenCount2 = async () => {
    const result = await pool.query('SELECT COUNT(*) AS itemCount FROM men');
    return result[0].itemCount;
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


export const searchMen = async (searchTerm) => {
    try{
        const result = await pool.query(`
            SELECT * FROM men WHERE item_name LIKE ?
        `, [`%${searchTerm}%`]);
        console.log(result);
        return result[0];
    } catch (error) {
        console.error('Error searching items:', error);
        throw error; 
    }
}




// ============================================================================================================================
// WOMEN SECTION
// =============================================================================================================================


export const getAllwomen = async () => {
    const result = await pool.query('SELECT * FROM women ');
    return result[0];
};


export const newWomenItem = async (oWomen) => {
    const result = await pool.query(
        'INSERT INTO women (item_name, brand, image, price, description, person) VALUES (?, ?, ?, ?, ?, ?)',
        [oWomen.item_name, oWomen.brand, oWomen.image, oWomen.price, oWomen.description, oWomen.person]
    );
    return result[0];
}

export const getAllWomen2 = async (limit , offset) => {
    const result = await pool.query('SELECT * FROM women LIMIT ? OFFSET ?', [limit, offset]);
    return result[0];
};

export const getAllWomenCount2 = async () => {
    const result = await pool.query('SELECT COUNT(*) AS itemCount FROM women');
    return result[0].itemCount;
};

export const searchWomen = async (searchTerm) => {
    try{
        const result = await pool.query(`
            SELECT * FROM women WHERE item_name LIKE ?
        `, [`%${searchTerm}%`]);
        console.log(result);
        return result[0];
    } catch (error) {
        console.error('Error searching items:', error);
        throw error; 
    }
}

// ===========================================================================================================================================
// CHILDREN
// ===========================================================================================================================================

export const getAllChildren = async () => {
    const result = await pool.query('SELECT * FROM children ');
    return result[0];
};

export const newChildrenItem = async (oChildren) => {
    const result = await pool.query(
        'INSERT INTO children (item_name, brand, image, price, description, person) VALUES (?, ?, ?, ?, ?, ?)',
        [oChildren.item_name, oChildren.brand, oChildren.image, oChildren.price, oChildren.description, oChildren.person]
    );
    return result[0];
};

export const getAllChildren2 = async (limit , offset) => {
    const result = await pool.query('SELECT * FROM children LIMIT ? OFFSET ?', [limit, offset]);
    return result[0];
};

export const getAllChildrenCount2 = async () => {
    const result = await pool.query('SELECT COUNT(*) AS itemCount FROM children');
    return result[0].itemCount;
};


export const searchChildren = async (searchTerm) => {
    try{
        const result = await pool.query(`
            SELECT * FROM children WHERE item_name LIKE ?
        `, [`%${searchTerm}%`]);
        console.log(result);
        return result[0];
    } catch (error) {
        console.error('Error searching items:', error);
        throw error; 
    }
}

// ==============================================================================================================
// SEARCH FUNCTION FOR HOME PageTransitionEvent
// ===============================================================================================================


export const searchItems = async (searchTerm) => {
    try {
        const result = await pool.query(`
            SELECT * FROM children WHERE item_name LIKE ?
            UNION
            SELECT * FROM men WHERE item_name LIKE ?
            UNION
            SELECT * FROM women WHERE item_name LIKE ?
        `, [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`]);
        console.log(result);
        return result[0];
    } catch (error) {
        console.error('Error searching items:', error);
        throw error; // Handle the error appropriately
    }
};


// ======================================================================================================================
// SHOPPING CARTS
// ======================================================================================================================

export const checkIfExists = async (id,item_name, quantity, price, ) => {
    try {
        const result = await pool.query('SELECT * FROM shopping_cart WHERE id = ? AND item_name = ?  AND quantity = ? AND price = ?', [id, item_name,quantity, price ]);
        return result[0]; 
    } catch (error) {
        
        console.error(error);
        throw error; 
    }
};



export const updateQuantity = async (id) => {
    try {
        const result = await pool.query(
            'UPDATE shopping_cart SET quantity = quantity + 1 WHERE id = ?',
            [id]
        );
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


export const insertNewProduct = async (id, item_name, quantity, price) => {
  
        const result = await pool.query(
            'INSERT INTO shopping_cart (id, item_name, quantity, price) VALUES (?, ?, ?, ?)',
            [id, item_name, quantity, price]
        );
        return result;
  
};


export const getCartList = async () => {
    try {
        const result = await pool.query('SELECT * FROM shopping_cart');
        return result[0];
    } catch (error) {
        console.error(error);
        throw error;
    }
};


export const deleteItem = async (id) => {
    try {
      const result = await pool.query('DELETE FROM shopping_cart WHERE id = ? LIMIT 1', [id]);
      return result[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  


