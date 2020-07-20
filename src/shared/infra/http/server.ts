import 'reflect-metadata';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import routes from './routes';
import AppError from '@shared/errors/AppError';
import ValidationError from '@shared/errors/ValidationError';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if(err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message
        });
    }

    if(err instanceof ValidationError) {
        return response.status(err.statusCode).json({
            status: 'validation error',
            messages: err.messages
        });
    }

    console.error(err);
    
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    });
});

app.listen(3333, () => {
    console.log('Server on at 3333.');
});