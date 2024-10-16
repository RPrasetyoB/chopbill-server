import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as cors from 'cors';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const client = [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'https://dutchpay-bill.web.app',
    ];

    const clientOrigin = client.includes(req.header('Origin'));

    const corsOptions: cors.CorsOptions = {
      origin: clientOrigin ? true : 'https://www.getpostman.com',
      methods: 'GET, POST, DELETE, PUT, PATCH, OPTIONS, HEAD',
      allowedHeaders:
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
    };

    cors(corsOptions)(req, res, next);
  }
}
