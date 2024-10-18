/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";


describe('Pessoas - GetAll', () => {

    let accessToken = '';
    beforeAll(async()=>{
        const email = 'getall-pessoas@gmail.com';
        await testServer.post('/cadastrar').send({nome:'Teste', email, senha: '1234567890as'});
        const signInRes = await  testServer.post('/entrar').send({email,senha: '1234567890as'});

        accessToken = signInRes.body.accessToken;
    });


    it('Busca todos os registros', async () => {

   
            const res1 = await testServer
                .post ('/cidades')
                .set ({Authorization: `Bearer ${accessToken}`})
                .send({ nome: 'Curitiba'});
    
            expect(res1.statusCode).toEqual(StatusCodes.CREATED); 
            expect(typeof res1.body).toEqual("number");  
    
    
            const res2 = await testServer
                .post ('/pessoas')
                .set ({Authorization: `Bearer ${accessToken}`})
                .send({ 
                    email: "create-pessoas@gmail.com",
                    cidadeId: res1.body,
                    nomeCompleto: "Teste"
                });


        const resBuscada = await testServer
            .get('/pessoas')
            .set ({Authorization: `Bearer ${accessToken}`})
            .send();

            expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0);  
            expect(resBuscada.statusCode).toEqual(StatusCodes.OK);  
            expect(resBuscada.body.length).toBeGreaterThan(0);  
 
        });


    it('Tenta buscar registro sem estar autenticado', async () => {

        const res1 = await testServer
            .post ('/cidades')
            .set ({Authorization: `Bearer ${accessToken}`})
            .send({ nome: 'Curitiba2'});

        expect(res1.statusCode).toEqual(StatusCodes.CREATED); 
        expect(typeof res1.body).toEqual("number");  

        const resBuscada = await testServer
            .get('/pessoas')
                   .send();

                   expect(resBuscada.statusCode).toEqual(StatusCodes.UNAUTHORIZED); 
                   expect(resBuscada.body).toHaveProperty('errors.default');  
 
        });

});
