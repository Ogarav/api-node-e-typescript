import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Pessoas - GetById', () => {
    let accessToken = '';
    beforeAll(async()=>{
        const email = 'getbyid-pessoas@gmail.com';
        await testServer.post('/cadastrar').send({nome:'Teste', email, senha: '1234567890as'});
        const signInRes = await  testServer.post('/entrar').send({email,senha: '1234567890as'});

        accessToken = signInRes.body.accessToken;
    });


    it('Busca Registro', async () => {

        const res1 = await testServer
            .post ('/cidades')
            .set ({Authorization: `Bearer ${accessToken}`})
            .send({ nome: 'Teste'});



        expect(res1.statusCode).toEqual(StatusCodes.CREATED); 

        const res2 = await testServer
        .post ('/pessoas')
        .set ({Authorization: `Bearer ${accessToken}`})
        .send({
            email: 'getbyid-pessoas@gmail.com',
            cidadeId: res1.body,
            nomeCompleto: 'Teste'});

        expect(res2.statusCode).toEqual(StatusCodes.CREATED); 

        const resBuscada = await testServer
            .get(`/pessoas/${res2.body}`)
            .set ({Authorization: `Bearer ${accessToken}`})
            .send();

        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);  
    });

    it('Tenta buscar registro que nao existe', async () => {

 

        const res1 = await testServer
            .get ('/pessoas/9999')
            .set ({Authorization: `Bearer ${accessToken}`})
            .send();


        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR); 
        expect(res1.body).toHaveProperty("errors.default");  
    });

    it('Tenta buscar registro sem estar autenticado', async () => {

        const resBuscada = await testServer
            .get('/pessoas/1')
            .send();

            expect(resBuscada.statusCode).toEqual(StatusCodes.UNAUTHORIZED); 
            expect(resBuscada.body).toHaveProperty('errors.default'); 
    });


});

