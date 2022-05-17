import { response } from "express";
import supertest from 'supertest';
import app from '../index'

const request = supertest(app);

describe('Test basic endpoint server', () => {
    it('Get the / endpoint', async () => {
         const reponse = await request.get('/');
         expect(response.status).toBe(200);
    });

});