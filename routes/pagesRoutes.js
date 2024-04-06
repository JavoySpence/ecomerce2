import express from 'express';
import { searchItems } from '../data/database.js';

const pagesRoute = express.Router();

pagesRoute.get('/', (req, res) => {
    res.render('home');
});


pagesRoute.get('/combinedSearch', async (req, res) => {
    try {
        const searchTerm = req.query.searchTerm;
        const searchList = await searchItems(searchTerm);
        res.render('combinedSearchResults', {searchList})
    } catch (error) {
        console.error('Error searching items:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


export  default pagesRoute;