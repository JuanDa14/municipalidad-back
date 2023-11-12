import { Router } from 'express';
import { getyears,getMonthsByYear,getChartReports } from '../controllers';

const router = Router();

router.get('/years',getyears );
router.post('/monthsByYear',getMonthsByYear );
router.post('/report',getChartReports );

export default router;