/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Request, Response } from "express";
import * as yup from 'yup';
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";
import { ICidade } from "../../database/models";
import { CidadesProvider } from "../../database/providers/cidades"; // Adicione o provedor de cidades

interface IParamProps {
    id?: number;
}

interface IBodyProps extends Omit<ICidade, "id"> {}

export const updateByIdValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
            nome: yup.string().required().min(3), // Validação do campo "nome"
        })),
    params: getSchema<IParamProps>(yup.object().shape({
            id: yup.number().integer().required().moreThan(0), // Validação do parâmetro "id"
        })),
}));

export const updateById = async (
    req: Request<IParamProps, {}, IBodyProps>, res: Response) => {

    // Verificar se o ID foi passado corretamente
    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O parâmetro "id" precisa ser informado',
            },
        });
    }

    // Tentar atualizar a cidade no banco de dados
    const result = await CidadesProvider.updateById(req.params.id, req.body);
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            },
        });
    }

    // Retornar sucesso caso a cidade tenha sido atualizada
    return res.status(StatusCodes.NO_CONTENT).send(result);
};

