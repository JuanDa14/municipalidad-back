import { Router } from 'express';

import { getAllReceipt,createReceipt } from '../controllers';

const router = Router();
router.get('/', getAllReceipt);
router.post('/', createReceipt);


export default router;
