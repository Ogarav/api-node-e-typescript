import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";


describe('Usuários - SignIn', () => {
    beforeAll ( async () => {
        await testServer.post('/cadastrar').send({

                senha: '1234567890as',
                nome: 'Bala de Teste',
                email: 'bala@gmail.com',

            });
        });

    it('Faz login', async()=>{
        const res1 = await testServer
        .post('/entrar')
        .send({
            senha: '1234567890as',
            email: 'bala@gmail.com',
        });
        expect(res1.statusCode).toEqual(StatusCodes.OK);
        expect(res1.body).toHaveProperty('accessToken');
    });

    it('Senha Incorreta', async()=>{
        const res1 = await testServer
        .post('/entrar')
        .send({
            senha: '1234567890ast',
            email: 'bala@gmail.com',
        });
        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty('errors.default');
    });

    it('Email Incorreto', async()=>{
        const res1 = await testServer
        .post('/entrar')
        .send({
            senha: '1234567890as',
            email: 'bala1@gmail.com',
        });
        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty('errors.default');
    });

    it('Email com formato incorreto', async()=>{
        const res1 = await testServer
        .post('/entrar')
        .send({
            senha: '1234567890as',
            email: 'bala gmail.com',
        });
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.email');
    });

    it('Senha muito curta', async()=>{
        const res1 = await testServer
        .post('/entrar')
        .send({
            senha: '1234567890',
            email: 'bala@gmail.com',
        });
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.senha');
    });

    it('Senha não informada', async()=>{
        const res1 = await testServer
        .post('/entrar')
        .send({
            //senha: '1234567890as',
            email: 'bala gmail.com',
        });
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.senha');
    });

    it('Email não informado', async()=>{
        const res1 = await testServer
        .post('/entrar')
        .send({
            senha: '1234567890as',
            //email: 'bala gmail.com',
        });
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.email');
    });

})
