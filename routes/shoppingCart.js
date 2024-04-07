import express from 'express';
import { checkIfExists, insertNewProduct, updateQuantity, getCartList, deleteItem } from '../data/database.js';


const shoppinCartRoutes = express.Router();

shoppinCartRoutes.post('/cart/add', async (req, res) => {
    try {
        const newEntry = new Object();
        newEntry.id = req.body.id;
        newEntry.item_name = req.body.item_name;
        newEntry.quantity = req.body.quantity;
        newEntry.price = req.body.price;

        const existingProduct = await checkIfExists(newEntry.id, newEntry.quantity);

        if (existingProduct.length > 0) {
            await updateQuantity(newEntry.id, newEntry.item_name, newEntry.quantity, newEntry.price);
            res.status(200).json({ message: 'Quantity update in cart' });
        } else {
            await insertNewProduct(newEntry.id, newEntry.item_name, newEntry.quantity, newEntry.price);
            res.status(200).json({ message: 'Product added to cart' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
});


shoppinCartRoutes.get('/cart_list', async (req, res) => {
    try {
        const cartList = await getCartList();
        res.render('cart/cart_list', {data:cartList});
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
});


shoppinCartRoutes.get('/deleteSingleItem/:id', async (req, res) => {
    const id = req.params.id;
    const result = await deleteItem(id)
    res.redirect('/cart_list')

})

export  default shoppinCartRoutes;