import express from 'express';
import paginate from 'express-paginate';
import { getAllMen, getAllPerson, getAllMen2, getAllMenCount2  } from '../data/database.js';

const menRoutes = express.Router();


menRoutes.get('/menList', async (req, res) => {
    const menList = await getAllMen()  
    res.render('men/men_list', {data: menList }); 
});

menRoutes.get('/menInputs', async (req, res) => {
    const personList = await getAllPerson()  
    res.render('men/men_inputs', { personList }); 
});


menRoutes.get('/menPage', paginate.middleware(3, 50), async (req, res) => {
  const limit = req.query.limit;
  const offset = req.skip; 
  
  const menItemList = await getAllMen2(limit, offset);
  const itemCount = await getAllMenCount2();

    const pageCount = Math.ceil(itemCount / limit)
  
    res.render('men/men_page', {
      data: menItemList,
      pageCount: pageCount,
      itemCount: itemCount,
      pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
    });
})



export default menRoutes;
