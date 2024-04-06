import express from 'express';
import paginate from 'express-paginate';
import { getAllChildren, getAllPerson, getAllChildrenCount2, getAllChildren2 } from '../data/database.js';

const childrenRoutes = express.Router();


childrenRoutes.get('/childrenList', async (req, res) => {
    const menList = await getAllChildren()  
    res.render('men/men_list', {data: menList }); 
});

childrenRoutes.get('/childrenInputs', async (req, res) => {
    const personList = await getAllPerson()  
    res.render('children/children_inputs', { personList }); 
});

childrenRoutes.get('/childrenPage', paginate.middleware(3, 50), async (req, res) => {
    const limit = req.query.limit;
    const offset = req.skip; 
    
    const menItemList = await getAllChildren2(limit, offset);
    const itemCount = await getAllChildrenCount2();
  
      const pageCount = Math.ceil(itemCount / limit)
    
      res.render('children/children_page', {
        data: menItemList,
        pageCount: pageCount,
        itemCount: itemCount,
        pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
      });
  })
  


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



export default childrenRoutes;