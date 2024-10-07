/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Request, Response } from "express";
import * as yup from 'yup';
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";
import { PessoasProvider } from "../../database/providers/pessoas";

interface IQueryProps {
    page?: number;
    limit?: number;
    filter?: string;
}

export const getAllValidation = validation(get => ({
    query: get<IQueryProps>( yup.object().shape({
            filter: yup.string().optional() .default(''),
            page: yup.number().integer().optional().moreThan(0).default(1),
            limit: yup.number() .integer().optional().moreThan(0).default(7),
        })),
}));

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>,res: Response) => {
    //gera lista de pessoas com base na consulta
    const result = await PessoasProvider.getAll(req.query.page || 1, req.query.limit || 7, req.query.filter || '');
    const count = await PessoasProvider.count(req.query.filter);

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


    // Retornar a lista de pessoas
    return res.status(StatusCodes.OK).json(result);
};

