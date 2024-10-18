import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Cidades - UpdateById', () => {

    let accessToken = '';
    beforeAll(async()=>{
        const email = 'create-cidade@gmail.com';
        await testServer.post('/cadastrar').send({nome:'Teste', email, senha: '1234567890as'});
        const signInRes = await  testServer.post('/entrar').send({email,senha: '1234567890as'});

        accessToken = signInRes.body.accessToken;
    });


    it('AtualizaRegistro', async () => {

        const res1 = await testServer
            .post ('/cidades')
            .set ({Authorization: `Bearer ${accessToken}`})
            .send({ nome: 'Curitiba'});


        expect(res1.statusCode).toEqual(StatusCodes.CREATED); 

        const resAtualizada = await testServer
            .put(`/cidades/${res1.body}`)
            .set ({Authorization: `Bearer ${accessToken}`})
            .send({nome:'Sao Jose'});

        expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);  
    });

    it('Tenta atualizar registro que nao existe', async () => {

        const res1 = await testServer
            .put ('/cidades/99999')
            .set ({Authorization: `Bearer ${accessToken}`})
            .send({nome: 'Curitiba'});


        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR); 
        expect(res1.body).toHaveProperty('errors.default');  
    });

    it('Tenta atualizar um registro sem estar autenticado', async () => {

        const res1 = await testServer
            .post ('/cidades')
            .set ({Authorization: `Bearer ${accessToken}`})
            .send({ nome: 'Curitiba'});


        expect(res1.statusCode).toEqual(StatusCodes.CREATED); 

        const resAtualizada = await testServer
            .put(`/cidades/${res1.body}`)
            .send({nome:'Sao Jose'});

            expect(resAtualizada.statusCode).toEqual(StatusCodes.UNAUTHORIZED); 
            expect(resAtualizada.body).toHaveProperty('errors.default');  
    });

});
