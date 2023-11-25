import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import { assert } from 'console';
import { getText } from './gcIntegration';
import translate from './translation';
import multer from 'multer';
import MulterGoogleCloudStorage from 'multer-cloud-storage';

// if using env vars
dotenv.config();

// accept png, jpeg, and jpg filetypes
const fileTypes: String[] = ['image/png', 'image/jpeg', 'image/jpg'];

// takes in the files' typing as a parameter
function assertFileType(filetype: String) {
    // loops through all the accepted file types in the fileTypes array
    for (let t of fileTypes) {
        // if inputted files typing matches accepted file types, return true
        if (filetype == t) {
            return true;
        }
    }

    // else, return false.
    return false;
}

// multer middleware configuration using previously configured "storage" option, restricts upload to 1 image file at a time
const uploadHandler = multer({
    storage: new MulterGoogleCloudStorage(),
    limits: { files: 1 },
    fileFilter: (req: any, file, cb) => {
        // Check if the file type is an image
        if (assertFileType(file.mimetype)) {
            // cb(error, <allow or block upload>)
            cb(null, true);
        } else {
            // accept only image files
            req.incorrectType = file.mimetype;
            cb(null, false);
        }
    },
});

const app: Application = express();
const port = process.env.PORT || 8000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

// endpoint for file upload
app.post('/upload', uploadHandler.single('image'), async (req: any, res) => {
    if (req.incorrectType) {
        // if image type is incorrect, error message
        res.status(422).send('Invalid filetype ' + req.incorrectType);
    }

    // send url to vision api and get text
    let text = await getText(req.file.linkUrl);

    // parse text to get ingredient list
    let parsedIngredients = translate(text);

    // return ingredient list
    res.status(200).send(parsedIngredients);
});

app.listen(port, () => {
    assert(process.env.BUCKET_NAME !== '');
    console.log(`Server is running at http://localhost:${port}`);
});
