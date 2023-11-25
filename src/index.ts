import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import { assert } from 'console';
import { getText } from './gcIntegration';

// if using env vars
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.get('/upload', (req: Request, res: Response) => {
    console.log('hello world upload');
    // upload image to google cloud bucket and get url

    // send url to vision api and get text
    getText('./test.png');

    // parse text to get ingredient list

    // return ingredient list
});

app.listen(port, () => {
    assert(process.env.BUCKET_NAME !== '');
    console.log(`Server is running at http://localhost:${port}`);
});
