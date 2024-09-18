import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Cidades - DeleteById', () => {


    it('Apaga Registro', async () => {

        const res1 = await testServer
            .post ('/cidades')
            .send({ nome: 'Curitiba'});


        expect(res1.statusCode).toEqual(StatusCodes.CREATED); 

        const resApagada = await testServer
            .delete(`/cidades/${res1.body}`)
            .send();

        expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);  
    });

    it('Tenta apagar registro que nao existe', async () => {

        const res1 = await testServer
            .delete ('/cidades/99999')
            .send();


        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR); 
        expect(res1.body).toHaveProperty('errors.default');  
    });

});

