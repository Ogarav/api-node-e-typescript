import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";


describe('Pessoas - Create', () => {

    let accessToken = '';
    beforeAll(async()=>{
        const email = 'create-pessoas@gmail.com';
        await testServer.post('/cadastrar').send({nome:'Teste', email, senha: '1234567890as'});
        const signInRes = await  testServer.post('/entrar').send({email,senha: '1234567890as'});

        accessToken = signInRes.body.accessToken;
    });

    it('Cria registro de cidade e pessoa', async () => {

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

            })

        expect(res2.statusCode).toEqual(StatusCodes.CREATED); 
        expect(typeof res2.body).toEqual("number");  
    });


    it('Impedir criacao de pessoa sem cidade', async () => {

        const res1 = await testServer
            .post ('/pessoas')
            .set ({Authorization: `Bearer ${accessToken}`})
            .send({ 
                email: "peru@gmail.com.br",
                cidadeId: 9999, // ID de cidade inexistente
                nomeCompleto: "Allan Augusto"
            });
    
        // Verificar o status da resposta
        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR); 
    
        // Verificar se o erro retornado corresponde ao esperado
        expect(res1.body).toHaveProperty("errors.default");  
        expect(res1.body.errors.default).toBe("A cidade usada no cadastro não foi encontrada");
    });


    it('Tenta criar pessoa sem autenticação', async () => {

        const res1 = await testServer
            .post ('/cidades')
            .set ({Authorization: `Bearer ${accessToken}`})
            .send({ nome: 'Curitiba'});

        expect(res1.statusCode).toEqual(StatusCodes.CREATED); 
        expect(typeof res1.body).toEqual("number");  


        const res2 = await testServer
            .post ('/pessoas')
            .send({ 
                email: "create-pessoas@gmail.com",
                cidadeId: res1.body,
                nomeCompleto: "Teste"

            })

            expect(res2.statusCode).toEqual(StatusCodes.UNAUTHORIZED); 
            expect(res2.body).toHaveProperty('errors.default'); 
    });

    

})
