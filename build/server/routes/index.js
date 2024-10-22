"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controllers_1 = require("./../controllers");
const usuarios_1 = require("../controllers/usuarios");
const middleware_1 = require("../shared/middleware");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', (_, res) => {
    return res.send('Olá, mundo!');
});
// router.post('/', (req, res) => {
//     return res.status(StatusCodes.ACCEPTED).json(req.body);
// });
router.get('/cidades', middleware_1.ensureAuthenticated, controllers_1.CidadesController.getAllValidation, controllers_1.CidadesController.getAll);
router.post('/cidades', middleware_1.ensureAuthenticated, controllers_1.CidadesController.createValidation, controllers_1.CidadesController.create);
router.get('/cidades/:id', middleware_1.ensureAuthenticated, controllers_1.CidadesController.getByIdValidation, controllers_1.CidadesController.getById);
router.put('/cidades/:id', middleware_1.ensureAuthenticated, controllers_1.CidadesController.updateByIdValidation, controllers_1.CidadesController.updateById);
router.delete('/cidades/:id', middleware_1.ensureAuthenticated, controllers_1.CidadesController.deleteByIdValidation, controllers_1.CidadesController.deleteById);
router.get('/pessoas', middleware_1.ensureAuthenticated, controllers_1.PessoasController.getAllValidation, controllers_1.PessoasController.getAll);
router.post('/pessoas', middleware_1.ensureAuthenticated, controllers_1.PessoasController.createValidation, controllers_1.PessoasController.create);
router.get('/pessoas/:id', middleware_1.ensureAuthenticated, controllers_1.PessoasController.getByIdValidation, controllers_1.PessoasController.getById);
router.put('/pessoas/:id', middleware_1.ensureAuthenticated, controllers_1.PessoasController.updateByIdValidation, controllers_1.PessoasController.updateById);
router.delete('/pessoas/:id', middleware_1.ensureAuthenticated, controllers_1.PessoasController.deleteByIdValidation, controllers_1.PessoasController.deleteById);
router.post('/entrar', usuarios_1.UsuariosController.signInValidation, usuarios_1.UsuariosController.signIn);
router.post('/cadastrar', usuarios_1.UsuariosController.signUpValidation, usuarios_1.UsuariosController.signUp);
