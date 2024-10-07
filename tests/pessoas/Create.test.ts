/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";
import { number } from "yup";



describe('Pessoas - Create', () => {

    it('Cria registro de cidade e pessoa', async () => {

        const res1 = await testServer
            .post ('/cidades')
            .send({ nome: 'Curitiba'});

        expect(res1.statusCode).toEqual(StatusCodes.CREATED); 
        expect(typeof res1.body).toEqual("number");  


        const res2 = await testServer
            .post ('/pessoas')
            .send({ 
                email: "peru@gmail.com.br",
                cidadeId: res1.body,
                nomeCompleto: "Allan Augusto"

            })

        expect(res2.statusCode).toEqual(StatusCodes.CREATED); 
        expect(typeof res2.body).toEqual("number");  
    });


    it('Impedir criacao de pessoa sem cidade', async () => {

        const res1 = await testServer
            .post ('/pessoas')
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
    

})
