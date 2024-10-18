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


    it('Busca registro por id', async () => {

        const res1 = await testServer
            .post ('/cidades')
            .set ({Authorization: `Bearer ${accessToken}`})
            .send({ nome: 'Curitiba'});


        expect(res1.statusCode).toEqual(StatusCodes.CREATED); 

        const resBuscada = await testServer
            .get(`/cidades/${res1.body}`)
            .set ({Authorization: `Bearer ${accessToken}`})
            .send();

        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);  
    });

    it('Tenta buscar registro que nao existe', async () => {

        const res1 = await testServer
            .get ('/cidades/99999')
            .set ({Authorization: `Bearer ${accessToken}`})
            .send();


        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR); 
        expect(res1.body).toHaveProperty("errors.default");  
    });

    it('Tenta buscar registro sem estar autenticado', async () => {

        const res1 = await testServer
            .post ('/cidades')
            .set ({Authorization: `Bearer ${accessToken}`})
            .send({ nome: 'Curitiba'});


        expect(res1.statusCode).toEqual(StatusCodes.CREATED); 

        const resBuscada = await testServer
            .get(`/cidades/${res1.body}`)
            .send();

            expect(resBuscada.statusCode).toEqual(StatusCodes.UNAUTHORIZED); 
            expect(resBuscada.body).toHaveProperty('errors.default');  
    });

});

