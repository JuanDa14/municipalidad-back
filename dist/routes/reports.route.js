"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.get('/years', controllers_1.getyears);
router.post('/monthsByYear', controllers_1.getMonthsByYear);
router.post('/report', controllers_1.getChartReports);
exports.default = router;
