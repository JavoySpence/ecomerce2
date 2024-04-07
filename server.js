import express from 'express';
import ejs from 'ejs';
import morgan from 'morgan';

const app = express();
const PORT = 3016;

app.set('view engine', 'ejs');


import pagesRoute from './routes/pagesRoutes.js';
import menRoutes from './routes/menRoutes.js';
import womenRoutes from './routes/womenRoutes.js';
import childrenRoutes from './routes/childrenRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import shoppinCartRoutes from './routes/shoppingCart.js';



app.use(express.json({limit: '1kb'}))
app.use(express.urlencoded({extended: true, limit: '1kb'}));
app.use('/public', express.static('public'));


app.use(morgan('dev'));

app.use('/', pagesRoute);
app.use('/', menRoutes);
app.use('/', womenRoutes);
app.use('/', uploadRoutes);
app.use('/', childrenRoutes);
app.use('/', shoppinCartRoutes);


app.use('/uploads', express.static('uploads'));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});