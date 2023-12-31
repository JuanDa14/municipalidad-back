import { Router } from 'express';
import { messageForQuestion } from '../controllers';

const router = Router();

router.post('/message', messageForQuestion);

export default router;
