/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { CidadesProvider } from "../../database/providers/cidades"; // Importa o provedor de cidades
import { validation } from "../../shared/middleware";

interface IQueryProps {
    id?: number;
    page?: number;
    limit?: number;
    filter?: string;
}

export const getAllValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(
        yup.object().shape({
            page: yup.number().optional().moreThan(0),
            limit: yup.number().optional().moreThan(0),
            id: yup.number().integer().optional().default(0),
            filter: yup.string().optional(),
        })),
}));

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>,res: Response) => {
    //gera lista de cidades com base na consulta
    const result = await CidadesProvider.getAll(req.query.page || 1, req.query.limit || 7, req.query.filter || '', Number(req.query.id));
    const count = await CidadesProvider.count(req.query.filter);

    console.log('idUsuario', req.headers.idUsuario)

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: { default: result.message },
        });
    } else if (count instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: { default: count.message }
        });
    }

    // Definir o total de itens no cabeçalho da resposta
    res.setHeader("access-control-expose-headers", "x-total-count");
    res.setHeader("x-total-count", count);


    // Retornar a lista de cidades
    return res.status(StatusCodes.OK).json(result);
};

