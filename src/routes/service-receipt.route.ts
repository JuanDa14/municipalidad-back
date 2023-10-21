import { Router } from 'express';

import { getAllReceipt,createReceipt,getReceiptById,getLastMonth } from '../controllers';

const router = Router();
router.get('/', getAllReceipt);
router.get('/print/:id', getReceiptById);
router.post('/', createReceipt);
router.post('/findLastpayment', getLastMonth);

export default router;
