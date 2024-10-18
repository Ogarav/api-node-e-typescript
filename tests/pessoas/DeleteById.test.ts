import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Pessoas - DeleteById', () => {

    let accessToken = '';
    beforeAll(async()=>{
        const email = 'deletebyid-pessoas@gmail.com';
        await testServer.post('/cadastrar').send({nome:'Teste', email, senha: '1234567890as'});
        const signInRes = await  testServer.post('/entrar').send({email,senha: '1234567890as'});

        accessToken = signInRes.body.accessToken;
    });

    it('Apaga Registro', async () => {

        const res1 = await testServer
            .post ('/cidades')
            .set ({Authorization: `Bearer ${accessToken}`})
            .send({ nome: 'Teste'});



        expect(res1.statusCode).toEqual(StatusCodes.CREATED); 

        const res2 = await testServer
        .post ('/pessoas')
        .set ({Authorization: `Bearer ${accessToken}`})
        .send({
            email: "deletebyid-pessoas@gmail.com",
            cidadeId: res1.body,
            nomeCompleto: "Teste"});

        expect(res2.statusCode).toEqual(StatusCodes.CREATED); 

        const resApagada = await testServer
            .delete(`/pessoas/${res2.body}`)
            .set ({Authorization: `Bearer ${accessToken}`})
            .send();

        expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);  
    });

    it('Tenta apagar registro que nao existe', async () => {

        const res2 = await testServer
            .delete ('/pessoas/99999')
            .set ({Authorization: `Bearer ${accessToken}`})
            .send();


        expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR); 
        expect(res2.body).toHaveProperty('errors.default');  
    });


    it('Apaga Registro', async () => {

        const res1 = await testServer
            .post ('/cidades')
            .set ({Authorization: `Bearer ${accessToken}`})
            .send({ nome: 'Teste'});



        expect(res1.statusCode).toEqual(StatusCodes.CREATED); 

        const res2 = await testServer
        .post ('/pessoas')
        .set ({Authorization: `Bearer ${accessToken}`})
        .send({
            email: "deletebyid-pessoas@gmail.com",
            cidadeId: res1.body,
            nomeCompleto: "Teste"});

        expect(res2.statusCode).toEqual(StatusCodes.CREATED); 

        const resApagada = await testServer
            .delete(`/pessoas/${res2.body}`)
            .send();

            expect(resApagada.statusCode).toEqual(StatusCodes.UNAUTHORIZED); 
            expect(resApagada.body).toHaveProperty('errors.default');  
    });

});

