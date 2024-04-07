import express from 'express';


const adminRoutes = express.Router();

adminRoutes.get('/adminPage', async (req, res) => {
    res.render('admin/adminDashboard' )
})



export  default adminRoutes;