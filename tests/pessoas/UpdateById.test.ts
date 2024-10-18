import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";


describe('Pessoas - UpdateById', () => {

    let accessToken = '';
    beforeAll(async()=>{
        const email = 'updatebyid-pessoas@gmail.com';
        await testServer.post('/cadastrar').send({nome:'Teste', email, senha: '1234567890as'});
        const signInRes = await  testServer.post('/entrar').send({email,senha: '1234567890as'});

        accessToken = signInRes.body.accessToken;
    });


    it('Atualiza Registro', async () => {

        const res1 = await testServer
            .post ('/cidades')
            .set ({Authorization: `Bearer ${accessToken}`})
            .send({ nome: 'Teste'});



        expect(res1.statusCode).toEqual(StatusCodes.CREATED); 

        const res2 = await testServer
        .post ('/pessoas')
        .set ({Authorization: `Bearer ${accessToken}`})
        .send({
            email: 'updatebyid-pessoas@gmail.com',
            cidadeId: res1.body,
            nomeCompleto: 'Teste'});

        expect(res2.statusCode).toEqual(StatusCodes.CREATED); 

        const resAtualizada = await testServer
            .put(`/pessoas/${res2.body}`)
            .set ({Authorization: `Bearer ${accessToken}`})
            .send({
                email: 'updatebyid-pessoas@gmail.com',
                cidadeId: res1.body,
                nomeCompleto: 'Teste',
            });

        expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);  
    });

    it('Tenta atualizar registro que nao existe', async () => {

        const res3 = await testServer
            .put ('/pessoas/99999')
            .set ({Authorization: `Bearer ${accessToken}`})
            .send({
                email: 'updatebyid-pessoas@gmail.com',
                cidadeId: 1,
                nomeCompleto: 'Teste',
            });


        expect(res3.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR); 
        expect(res3.body).toHaveProperty('errors.default');  
    });

    it('Tenta atualizar uma cidade sem estar autenticado', async () => {


        const resAtualizada2 = await testServer
            .put(`/pessoas/1`)
            .send({
                email: 'updatebyid-pessoas@gmail.com',
                cidadeId: 1,
                nomeCompleto: 'Teste',
            });

            expect(resAtualizada2.statusCode).toEqual(StatusCodes.UNAUTHORIZED); 
            expect(resAtualizada2.body).toHaveProperty('errors.default'); 
    });

});
