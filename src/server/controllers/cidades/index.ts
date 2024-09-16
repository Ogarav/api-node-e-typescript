import * as create from './Create';
import * as getAll from './GetAll';
import * as getById from './GetById';
import * as deletById from './DeleteById';
import * as updateById from './UpdateById';



export const CidadesController = {
    ...create,
    ...getAll,
    ...getById,
    ...deletById,
    ...updateById,

};
