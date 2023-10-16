import { Router } from 'express';

import { messageForQuestion } from '../controllers/chat.controller';

const router = Router();

router.post('/message', messageForQuestion);

export default router;
