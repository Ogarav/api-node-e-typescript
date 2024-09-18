/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";
import { number } from "yup";



describe('Cidades - Create', () => {


    it('Busca registro por id', async () => {

        const res1 = await testServer
            .post ('/cidades')
            .send({ nome: 'Curitiba'});


        expect(res1.statusCode).toEqual(StatusCodes.CREATED); 

        const resBuscada = await testServer
            .get(`/cidades/${res1.body}`)
            .send();

        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);  
    });

    it('Tenta buscar registro que nao existe', async () => {

        const res1 = await testServer
            .get ('/cidades/99999')
            .send();


        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR); 
        expect(res1.body).toHaveProperty("errors.default");  
    });

});

