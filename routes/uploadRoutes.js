import express from 'express';
import fs from 'fs';
// import multer from 'multer';
import fileUpload from 'express-fileupload';
import { getRandomHexValues } from './utils.js';
import path from 'path';
import paginate from 'express-paginate';
import { newMenItem, newWomenItem, newChildrenItem} from '../data/database.js'; 

export const uploadRoutes = express.Router();



uploadRoutes.use(
    fileUpload({
        limits: {
            fileSize: 2 * 1024 * 1024, 
        },
        abortOnLimit: true,
    })
);





uploadRoutes.post('/newMen', async (req, res) => {
    try {
        const newEntry = {};
        const id = req.body.id;
        let vFile = '';

        if (req.files && req.files.image) {
            const uploadedFile = req.files.image;
            
            // Check file extension
            const allowedExtensions = ['png', 'jpg', 'jpeg'];
            const extension = uploadedFile.name.split('.').pop().toLowerCase();
            if (!allowedExtensions.includes(extension)) {
                throw new Error('Only PNG, JPG, and JPEG files are allowed.');
            }

            const fileName = `${getRandomHexValues(8)}_${uploadedFile.name}`;
            const uploadPath = './uploads/' + fileName;

            if (!fs.existsSync('./uploads')) {
                fs.mkdirSync('./uploads');
            }

            uploadedFile.mv(uploadPath, (err) => {
                if (err) {
                    throw err;
                }
            });

            vFile = fileName;
        } else {
            vFile = 'default-avatar.png';
        }

        newEntry.item_name = req.body.item_name;
        newEntry.brand = req.body.brand;
        newEntry.image = vFile;
        newEntry.price = req.body.price;
        newEntry.description = req.body.description;
        newEntry.person = req.body.person;

        const result = await newMenItem(newEntry); // Assuming newMenItem is a function to insert new men items

        res.redirect('/menList'); // Redirect to menPage after successful insertion
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
});


uploadRoutes.post('/newWomen', async (req, res) => {
    try {
        const newEntry = {};
        const id = req.body.id;
        let vFile = '';

        if (req.files && req.files.image) {
            const uploadedFile = req.files.image;
            
            const allowedExtensions = ['png', 'jpg', 'jpeg'];
            const extension = uploadedFile.name.split('.').pop().toLowerCase();
            if (!allowedExtensions.includes(extension)) {
                throw new Error('Only PNG, JPG, and JPEG files are allowed.');
            }

            const fileName = `${getRandomHexValues(8)}_${uploadedFile.name}`;
            const uploadPath = './uploads/' + fileName;

            if (!fs.existsSync('./uploads')) {
                fs.mkdirSync('./uploads');
            }

            uploadedFile.mv(uploadPath, (err) => {
                if (err) {
                    throw err;
                }
            });

            vFile = fileName;
        } else {
            vFile = 'default-avatar.png';
        }

        newEntry.item_name = req.body.item_name;
        newEntry.brand = req.body.brand;
        newEntry.image = vFile;
        newEntry.price = req.body.price;
        newEntry.description = req.body.description;
        newEntry.person = req.body.person;

        const result = await newWomenItem(newEntry); // Assuming newMenItem is a function to insert new men items
        
        console.log(result)
        res.redirect('/womenList'); // Redirect to menPage after successful insertion
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
});

uploadRoutes.post('/newChildren', async (req, res) => {
    try {
        const newEntry = {};
        
        // Process form data
        newEntry.item_name = req.body.item_name;
        newEntry.brand = req.body.brand;
        newEntry.price = req.body.price;
        newEntry.description = req.body.description;
        newEntry.person = req.body.person;

        // Process image upload
        if (req.files && req.files.image) {
            const uploadedFile = req.files.image;
            const allowedExtensions = ['png', 'jpg', 'jpeg'];
            const extension = uploadedFile.name.split('.').pop().toLowerCase();

            if (!allowedExtensions.includes(extension)) {
                throw new Error('Only PNG, JPG, and JPEG files are allowed.');
            }

            const fileName = `${getRandomHexValues(8)}_${uploadedFile.name}`;
            const uploadPath = './uploads/' + fileName;

            if (!fs.existsSync('./uploads')) {
                fs.mkdirSync('./uploads');
            }

            await uploadedFile.mv(uploadPath); // Use async/await for file move
            newEntry.image = fileName;
        } else {
            newEntry.image = 'default-avatar.png';
        }

        // Insert new item into the database
        const result = await newChildrenItem(newEntry);

        console.log(result);
        res.redirect('/childrenList'); // Redirect to childrenList page after successful insertion
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
});

export default uploadRoutes;

