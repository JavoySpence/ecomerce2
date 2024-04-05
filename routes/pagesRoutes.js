import express from 'express';

const pagesRoute = express.Router();

pagesRoute.get('/', (req, res) => {
    res.render('home');
});




export  default pagesRoute;