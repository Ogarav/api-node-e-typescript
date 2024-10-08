import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";


describe('Usuário - SignUp', () => {

    it('Cadastra usuário 1', async () => {

        const res1 = await testServer
            .post ('/cadastrar')
            .send({ 
                senha: '1234567890as',
                nome: 'Cara de Teste',
                email: 'cara@gmail.com',


            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED); 
        expect(typeof res1.body).toEqual("number");  

    });

    it('Cadastra usuário 2', async () => {

        const res1 = await testServer
            .post ('/cadastrar')
            .send({ 
                senha: '1234567890as',
                nome: 'Face de Teste',
                email: 'face@gmail.com',


            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED); 
        expect(typeof res1.body).toEqual("number");  

    });


    it('Erro ao cadastrar e-mail duplicado', async () => {

            const res1 = await testServer
                .post ('/cadastrar')
                .send({ 
                    senha: '1234567890as',
                    nome: 'Julianin',
                    email: 'julian@gmail.com',
    
    
                });
    
            expect(res1.statusCode).toEqual(StatusCodes.CREATED); 
            expect(typeof res1.body).toEqual("number");  

            const res2 = await testServer
            .post ('/cadastrar')
            .send({ 
                senha: '1234567890as',
                nome: 'Gulimarzin',
                email: 'julian@gmail.com',


            });

        expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR); 
        expect(res2.body).toHaveProperty("errors.default");  

    
    });

    it('Erro ao cadastrar usuário sem e-mail', async () => {

        const res1 = await testServer
            .post ('/cadastrar')
            .send({ 
                senha: '1234567890as',
                nome: 'Cara de Teste',
                //email: 'cara@gmail.com',


            });

            expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST); 
            expect(res1.body).toHaveProperty("errors.body.email");  

    });

    it('Erro ao cadastrar usuário sem nome', async () => {

        const res1 = await testServer
            .post ('/cadastrar')
            .send({ 
                senha: '1234567890as',
                //nome: 'Cara de Teste',
                email: 'cara@gmail.com',


            });

            expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST); 
            expect(res1.body).toHaveProperty("errors.body.nome");  
    

});

it('Erro ao cadastrar usuário sem senha', async () => {

    const res1 = await testServer
        .post ('/cadastrar')
        .send({ 
            //senha: '1234567890as',
            nome: 'Cara de Teste',
            email: 'cara@gmail.com',


        });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST); 
        expect(res1.body).toHaveProperty("errors.body.senha");  


});


it('Erro ao cadastrar e-mail inválido', async () => {

    const res1 = await testServer
        .post ('/cadastrar')
        .send({ 
            senha: '1234567890as',
            nome: 'Cara de Teste',
            email: 'cara gmail.com',


        });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST); 
        expect(res1.body).toHaveProperty("errors.body.email");  


});

it('Erro ao cadastrar nome curto', async () => {

    const res1 = await testServer
        .post ('/cadastrar')
        .send({ 
            senha: '1234567890as',
            nome: 'Ca',
            email: 'ca@gmail.com',


        });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST); 
        expect(res1.body).toHaveProperty("errors.body.nome");  


});

it('Erro ao cadastrar senha curta', async () => {

    const res1 = await testServer
        .post ('/cadastrar')
        .send({ 
            senha: '123456789',
            nome: 'Cara de Teste',
            email: 'cara@gmail.com',


        });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST); 
        expect(res1.body).toHaveProperty("errors.body.senha");  


});

});
