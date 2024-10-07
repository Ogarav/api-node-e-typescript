import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Pessoas - DeleteById', () => {


    it('Apaga Registro', async () => {

        const res1 = await testServer
            .post ('/cidades')
            .send({ nome: 'Teste'});



        expect(res1.statusCode).toEqual(StatusCodes.CREATED); 

        const res2 = await testServer
        .post ('/pessoas')
        .send({
            email: "peruDeleteById@gmail.com.br",
            cidadeId: res1.body,
            nomeCompleto: "Allan Augusto"});

        expect(res2.statusCode).toEqual(StatusCodes.CREATED); 

        const resApagada = await testServer
            .delete(`/pessoas/${res2.body}`)
            .send();

        expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);  
    });

    it('Tenta apagar registro que nao existe', async () => {

        const res2 = await testServer
            .delete ('/pessoas/99999')
            .send();


        expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR); 
        expect(res2.body).toHaveProperty('errors.default');  
    });

});

