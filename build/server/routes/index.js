"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const controllers_1 = require("./../controllers");
const router = (0, express_1.Router)();
exports.router = router;
router.post('/', (_, res) => {
    return res.send('Olá, mundo!');
});
router.post('/', (req, res) => {
    return res.status(http_status_codes_1.StatusCodes.ACCEPTED).json(req.body);
});
router.get('/cidades', controllers_1.CidadesController.getAllValidation, controllers_1.CidadesController.getAll);
router.post('/cidades', controllers_1.CidadesController.createValidation, controllers_1.CidadesController.create);
router.get('/cidades/:id', controllers_1.CidadesController.getByIdValidation, controllers_1.CidadesController.getById);
router.put('/cidades/:id', controllers_1.CidadesController.updateByIdValidation, controllers_1.CidadesController.updateById);
router.delete('/cidades/:id', controllers_1.CidadesController.deleteByIdValidation, controllers_1.CidadesController.deleteById);
