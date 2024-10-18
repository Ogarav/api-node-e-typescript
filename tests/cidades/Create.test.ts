import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";


describe('Cidades - Create', () => {

    let accessToken = '';
    beforeAll(async()=>{
        const email = 'create-cidade@gmail.com';
        await testServer.post('/cadastrar').send({nome:'Teste', email, senha: '1234567890as'});
        const signInRes = await  testServer.post('/entrar').send({email,senha: '1234567890as'});

        accessToken = signInRes.body.accessToken;
    });


    it('Tenta criar um registro sem token de acesso', async () => {

        const res1 = await testServer
            .post ('/cidades')
            .send({ nome: 'Curitiba'});

        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED); 
        expect(res1.body).toHaveProperty('errors.default');  
    });

    it('Cria registro', async () => {

        const res1 = await testServer
            .post ('/cidades')
            .set ({Authorization: `Bearer ${accessToken}`})
            .send({ nome: 'Curitiba'});

        expect(res1.statusCode).toEqual(StatusCodes.CREATED); 
        expect(typeof res1.body).toEqual("number");  
    });

    it('Impedir criacao de registro curto', async () => {

        const res1 = await testServer
            .post ('/cidades')
            .set ({Authorization: `Bearer ${accessToken}`})
            .send({ nome: 'C'});

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST); 
        expect(res1.body).toHaveProperty("errors.body.nome");  
    });

});

