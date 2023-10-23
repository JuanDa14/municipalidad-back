import { Router } from 'express';

import {
	createRequestAttachment,
	deleteRequestAttachment,
	getRequestAttachment,
	getRequestAttachments,
	updateRequestAttachment,
} from '../controllers';
import { createRequestAttachmentValidor, getRequestAttachmentValidor } from '../middlewares';

const router = Router();

router.get('/', getRequestAttachments);
router.get('/:id', getRequestAttachmentValidor, getRequestAttachment);
router.post('/', createRequestAttachmentValidor, createRequestAttachment);
router.patch('/:id', getRequestAttachmentValidor, updateRequestAttachment);
router.delete('/:id', getRequestAttachmentValidor, deleteRequestAttachment);

export default router;
