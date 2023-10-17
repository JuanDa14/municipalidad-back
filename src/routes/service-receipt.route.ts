import { Router } from 'express';

import { getAllReceipt,createReceipt,getReceiptById } from '../controllers';

const router = Router();
router.get('/', getAllReceipt);
router.get('/print/:id', getReceiptById);
router.post('/', createReceipt);

export default router;
