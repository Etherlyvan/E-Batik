declare module 'next-connect' {
    import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
  
    export interface NextConnectOptions<Req = NextApiRequest, Res = NextApiResponse> {
      onError?: (err: unknown, req: Req, res: Res, next: (err?: unknown) => void) => void;
      onNoMatch?: (req: Req, res: Res) => void;
    }
  
    export interface Middleware<Req = NextApiRequest, Res = NextApiResponse> {
      (req: Req, res: Res, next: (err?: unknown) => void): void;
    }
  
    type NextConnectMiddleware<Req = NextApiRequest, Res = NextApiResponse> = (
      req: Req,
      res: Res,
      next: (err?: unknown) => void
    ) => void;
  
    export default function nextConnect<Req = NextApiRequest, Res = NextApiResponse>(
      options?: NextConnectOptions<Req, Res>
    ): {
      use: (...middlewares: Array<Middleware<Req, Res> | NextApiHandler<Req, Res>>) => NextConnectMiddleware<Req, Res>;
      get: (handler: NextApiHandler<Req, Res>) => NextConnectMiddleware<Req, Res>;
      post: (handler: NextApiHandler<Req, Res>) => NextConnectMiddleware<Req, Res>;
      put: (handler: NextApiHandler<Req, Res>) => NextConnectMiddleware<Req, Res>;
      delete: (handler: NextApiHandler<Req, Res>) => NextConnectMiddleware<Req, Res>;
      patch: (handler: NextApiHandler<Req, Res>) => NextConnectMiddleware<Req, Res>;
      options: (handler: NextApiHandler<Req, Res>) => NextConnectMiddleware<Req, Res>;
      head: (handler: NextApiHandler<Req, Res>) => NextConnectMiddleware<Req, Res>;
    };
  }
  