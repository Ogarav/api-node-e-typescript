"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const router = (0, express_1.Router)();
exports.router = router;
router.post('/', (_, res) => {
    return res.send('Olá, mundo!');
});
router.post('/teste', (req, res) => {
    console.log(req);
    return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json(req.body);
});
