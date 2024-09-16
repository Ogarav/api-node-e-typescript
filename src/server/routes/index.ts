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



router.post('/cidades', 
    CidadesController.createValidation, 
    CidadesController.create
);




export { router };
