// types/next.d.ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NextApiRequest } from 'next';
import { File } from 'multer';

declare module 'next' {
  interface NextApiRequest {
    file?: File;
  }
}
