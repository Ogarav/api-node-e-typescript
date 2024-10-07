/* eslint-disable @typescript-eslint/no-empty-object-type */

import { Request, Response } from "express";
import * as yup from 'yup';
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";
import { IPessoa } from "../../database/models";
import { PessoasProvider } from "../../database/providers/pessoas";


interface IBodyProps extends Omit<IPessoa, "id"> {}

export const createValidation = validation(get => ({
    body: get<IBodyProps>(yup.object().shape({
        email: yup.string().required().email(),
        cidadeId: yup.number().integer().required() .min(1),
        nomeCompleto: yup.string().required().min(3),
    })),
}));

export const create = async (req: Request<{},{},IBodyProps>, res: Response) => {
    const result = await PessoasProvider.create(req.body);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                default: result.message,
            }
        });
    }

    return res.status(StatusCodes.CREATED).json(result);
};

