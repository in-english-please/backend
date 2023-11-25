import express, {Request, Response , Application} from 'express';
import dotenv from 'dotenv';
import multer from 'multer';
import MulterGoogleCloudStorage from 'multer-cloud-storage';

// if using env vars
dotenv.config();

// accept png, jpeg, and jpg filetypes
const fileTypes:String[] = ["image/png", "image/jpeg", "image/jpg"];

// takes in the files' typing as a parameter
function assertFileType(filetype:String) {

  // loops through all the accepted file types in the fileTypes array
  for (let t in fileTypes) {

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
  fileFilter: (req:any, file, cb) => {
    // Check if the file type is an image
    if(assertFileType(file.mimetype)) {
      return cb(null, true);

    } else {
      // accept only image files
        req.fileValidationError = "Bad filetype"
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
app.post('/upload', uploadHandler.single("image"), (req:any, res) => {
  if( req.fileValidationError) {
    res.status(422).send("Invalid filetype.")
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});