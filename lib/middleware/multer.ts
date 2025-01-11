import multer from 'multer';
import { extname } from 'path';
import { nanoid } from 'nanoid';

const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: (req, file, cb) => {
    const uniqueName = `${nanoid()}${extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const multerMiddleware = multer({ storage });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const runMiddleware = (req: any, res: any, fn: any) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

export default multerMiddleware;
