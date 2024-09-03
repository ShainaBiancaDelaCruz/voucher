import express from 'express';
import {
    createExpenditure,
    getAllExpenditure,
    getExpenditureById,
    updateExpenditureById,
    deleteExpenditureById,
    getSubclassesByClass,
    getExpenditureByClassAndSubclass,
    searchExpenditure


} from '../controllers/expenditure.controller.js';

const router = express.Router();

router.post('/create', createExpenditure);
router.get('/', getAllExpenditure);
router.get('/:id', getExpenditureById);
router.patch('/update/:id', updateExpenditureById);
router.delete('/delete/:id', deleteExpenditureById);
router.get('/class/:classExp', getSubclassesByClass);
router.get('/class/:classExp/subclass/:subclass', getExpenditureByClassAndSubclass);
router.post('/searchExp', searchExpenditure);

export default router;  
