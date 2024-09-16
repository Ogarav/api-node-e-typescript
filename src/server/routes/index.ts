import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import {CidadesController} from './../controllers';

const router = Router();


router.post('/', (_, res) => {

    return res.send('Olá, mundo!');
});

router.post('/', (req, res) => {

    return res.status(StatusCodes.ACCEPTED).json(req.body);
});



router.get('/cidades', CidadesController.getAllValidation, CidadesController.getAll);
router.post('/cidades', CidadesController.createValidation, CidadesController.create);
router.get('/cidades/:id', CidadesController.getByIdValidation, CidadesController.getById);
router.put('/cidades/:id', CidadesController.updateByIdValidation, CidadesController.updateById);
router.delete('/cidades/:id', CidadesController.deleteByIdValidation, CidadesController.deleteById);


export { router };
