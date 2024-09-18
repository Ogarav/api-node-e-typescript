/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";
import { number } from "yup";



describe('Cidades - Create', () => {


    it('Cria registro', async () => {

        const res1 = await testServer
            .post ('/cidades')
            .send({ nome: 'Curitiba'});

        expect(res1.statusCode).toEqual(StatusCodes.CREATED); 
        expect(typeof res1.body).toEqual("number");  
    });

    it('Impedir criacao de registro curto', async () => {

        const res1 = await testServer
            .post ('/cidades')
            .send({ nome: 'C'});

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST); 
        expect(res1.body).toHaveProperty("errors.body.nome");  
    });

});

