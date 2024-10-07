import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";


describe('Pessoas - GetAll', () => {


    it('Busca todos os registros', async () => {

        const res1 = await testServer
            .post ('/cidades')
            .send({ nome: 'Curitiba'});

        expect(res1.statusCode).toEqual(StatusCodes.CREATED); 
        expect(typeof res1.body).toEqual("number");  


        const res2 = await testServer
            .post ('/pessoas')
            .send({ 
                email: "peruGetAll@gmail.com.br",
                cidadeId: res1.body,
                nomeCompleto: "Allan Augusto"

            });

            expect(res2.statusCode).toEqual(StatusCodes.CREATED); 
            expect(typeof res2.body).toEqual("number");  

        const resBuscada = await testServer
            .get('/pessoas')
            .send();

            expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0);  
            expect(resBuscada.statusCode).toEqual(StatusCodes.OK);  
            expect(resBuscada.body.length).toBeGreaterThan(0);  
 
        });

});

