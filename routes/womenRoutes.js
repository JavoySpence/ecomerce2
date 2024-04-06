import express from 'express';
import paginate from 'express-paginate';
import { getAllwomen, getAllPerson, getAllWomen2, getAllWomenCount2 } from '../data/database.js';

const womenRoutes = express.Router();


womenRoutes.get('/womenList', async (req, res) => {
    const menList = await getAllwomen() 
    res.render('women/women_list', {data: menList }); 
});


womenRoutes.get('/womenInputs', async (req, res) => {
    const personList = await getAllPerson()  
    res.render('women/women_inputs', { personList }); 
});


womenRoutes.get('/womenPage', paginate.middleware(3, 50), async (req, res) => {
    const limit = req.query.limit;
    const offset = req.skip; 
    
    const womenItemList = await getAllWomen2(limit, offset);
    const itemCount = await getAllWomenCount2();
  
      const pageCount = Math.ceil(itemCount / limit)
    
      res.render('women/women_page', {
        data: womenItemList,
        pageCount: pageCount,
        itemCount: itemCount,
        pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
      });
  })
  
  
// menRoutes.get('/menInputs', async (req, res) => {
//     const personList = await getAllPerson()  
//     res.render('men/men_inputs', { personList }); 
// });


// menRoutes.get('/menPage', paginate.middleware(3, 50), async (req, res) => {
//   const limit = req.query.limit;
//   const offset = req.skip; 
  
//   const menItemList = await getAllMen2(limit, offset);
//   const itemCount = await getAllMenCount2();

//     const pageCount = Math.ceil(itemCount / limit)
  
//     res.render('men/men_page', {
//       data: menItemList,
//       pageCount: pageCount,
//       itemCount: itemCount,
//       pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
//     });
// })



export default womenRoutes;
