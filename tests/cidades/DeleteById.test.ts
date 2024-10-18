/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Cidades - DeleteById', () => {

    let accessToken = '';
    beforeAll(async()=>{
        const email = 'delete-cidade@gmail.com';
        await testServer.post('/cadastrar').send({nome:'Teste', email, senha: '1234567890as'});
        const signInRes = await  testServer.post('/entrar').send({email,senha: '1234567890as'});

        accessToken = signInRes.body.accessToken;
    });



    it('Apaga Registro', async () => {

        const res1 = await testServer
            .post ('/cidades')
            .set ({Authorization: `Bearer ${accessToken}`})
            .send({ nome: 'Curitiba'});


        expect(res1.statusCode).toEqual(StatusCodes.CREATED); 

        const resApagada = await testServer
            .delete(`/cidades/${res1.body}`)
            .set ({Authorization: `Bearer ${accessToken}`})
            .send();

        expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);  
    });

    it('Tenta apagar registro que nao existe', async () => {

        const res1 = await testServer
            .delete ('/cidades/99999')
            .set ({Authorization: `Bearer ${accessToken}`})
            .send();


        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR); 
        expect(res1.body).toHaveProperty('errors.default');  
    });

    
    it('Tenta apagar um registro sem token de acesso', async () => {

        const res1 = await testServer
            .post ('/cidades')
            .set ({Authorization: `Bearer ${accessToken}`})
            .send({ nome: 'Curitiba'});


        expect(res1.statusCode).toEqual(StatusCodes.CREATED); 

        const resApagada = await testServer
            .delete(`/cidades/${res1.body}`)
            .send();

            expect(resApagada.statusCode).toEqual(StatusCodes.UNAUTHORIZED); 
            expect(resApagada.body).toHaveProperty('errors.default');  
    });
});
