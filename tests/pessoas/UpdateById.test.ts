import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";
import { nameRandom } from "./GetById.test";
import { numRandom } from "./GetById.test";

const nomeAleatorio = nameRandom();
const numeroAleatorio = numRandom();
const emailAleatorio = `${nomeAleatorio.toLowerCase()}@gmail.com`;

console.log(numeroAleatorio);
console.log(nomeAleatorio);
console.log(emailAleatorio);


describe('Pessoas - UpdateById', () => {


    it('Atualiza Registro', async () => {

        const res1 = await testServer
            .post ('/cidades')
            .send({ nome: nomeAleatorio});



        expect(res1.statusCode).toEqual(StatusCodes.CREATED); 

        const res2 = await testServer
        .post ('/pessoas')
        .send({
            email: emailAleatorio,
            cidadeId: res1.body,
            nomeCompleto: nomeAleatorio});

        expect(res2.statusCode).toEqual(StatusCodes.CREATED); 

        const resAtualizada = await testServer
            .put(`/pessoas/${res2.body}`)
            .send({
                email: emailAleatorio,
                cidadeId: res1.body,
                nomeCompleto: nomeAleatorio,
            });

        expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);  
    });

    it('Tenta atualizar registro que nao existe', async () => {

        const res3 = await testServer
            .put (`/pessoas/${numRandom()}`)
            .send({
                email: emailAleatorio,
                cidadeId: 1,
                nomeCompleto: nomeAleatorio,
            });


        expect(res3.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR); 
        expect(res3.body).toHaveProperty('errors.default');  
    });

});
