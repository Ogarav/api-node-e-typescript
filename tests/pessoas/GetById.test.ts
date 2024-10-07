import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

export function nameRandom(tamanho = 10) {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let resultado = '';
    for (let i = 0; i < tamanho; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      resultado += caracteres.charAt(indiceAleatorio);
    }
    return resultado;
  }
  
  
  export function numRandom() {
      
      const numeroAleatorio = Math.floor(Math.random() * 9e19) + 1e19;
      return numeroAleatorio.toString().padStart(20, '0');
    }
    
    const nomeAleatorio = nameRandom();
    const numeroAleatorio = numRandom();
    const emailAleatorio = `${nomeAleatorio.toLowerCase()}@gmail.com`;

    console.log(numeroAleatorio);
    console.log(nomeAleatorio);
    console.log(emailAleatorio);


describe('Pessoas - GetById', () => {


    it('Busca Registro', async () => {

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

        const resBuscada = await testServer
            .get(`/pessoas/${res2.body}`)
            .send();

        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);  
    });

    it('Tenta buscar registro que nao existe', async () => {

 

        const res1 = await testServer
            .get (`/pessoas/${numeroAleatorio}`)
            .send();


        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR); 
        expect(res1.body).toHaveProperty("errors.default");  
    });

});

