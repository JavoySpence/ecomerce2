import express from 'express';
import paginate from 'express-paginate';
import { getAllMen, getAllPerson, getAllMen2, getAllMenCount2  } from '../data/database.js';

const menRoutes = express.Router();

// menRoutes.use(paginate.middleware(3, 50));

menRoutes.get('/menList', async (req, res) => {
    const menList = await getAllMen()  
    res.render('men/men_list', {data: menList }); 
});
// menRoutes.get('/menList', async (req, res) => {
//     const menList = await getAllMen2()  
//     res.render('men/men_list', {data: menList }); 
// });

menRoutes.get('/menInputs', async (req, res) => {
    const personList = await getAllPerson()  
    res.render('men/men_inputs', { personList }); 
});

// menRoutes.get('/menPage', async (req, res) => {
//     const menList = await getAllMen2()
//     res.render('men/men_page', {data: menList})
// })




// Your route handler

// menRoutes.get('/menPage', paginate.middleware(3, 50), async (req, res) => {
//     try {
//         const limit = parseInt(req.query.limit) || 3;
//         const page = parseInt(req.query.page) || 1;
//         const offset = (page - 1) * limit;

//         // Fetch paginated data using your modified getAllMen2 and getAllMenCount2 functions
//         const menItemList = await getAllMen2(limit, offset);
//         const itemCount = await getAllMenCount2();

//         // Calculate the total number of pages
//         const pageCount = Math.ceil(itemCount / limit);

//         // Generate pagination links (you can use your existing template)
//         const pages = paginate.getArrayPages(req)(3, pageCount, req.query.page);

//         res.render('men/men_page', {
//             data: menItemList,
//             pageCount: pageCount,
//             itemCount: itemCount,
//             pages: pages
//         });
//     } catch (error) {
//         console.error("Error fetching data:", error);
//         res.status(500).render('error', { error: error });
//     }
// });


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
