# In English Please Backend

Provides an API to upload an image and obtain the captured ingredient list with some translations.

**Tech**

-   Node.js + Express in Typescript
-   Google Cloud integration
    -   Buckets
    -   Vision API (text detection)

**Features**

-   upload endpoint
-   python notebook that parses a table of common food additives and what they do (outputs to json file)

## What we learned

TODO

## Challenges

-   CORS, every time.

## Moving forward

-   translate more terms, and better
-   think of a better matching algorithm for chemicals in the input image and in our database/dict
-   nlp to help summarize a list of ingredients to be more readable quickly

## Endpoints

-   GET `/`: prints hello world!
-   POST `/upload`: upload an image of an ingredient list and receive a list of ingredients (individual strings) and some translations of ingredients to simpler terms
    -   requires an image as form data, under the key `image`
    -   returns an object structured as follows:

```
{
  "originalIngredientsArray": [
    "ingredient 1",
    "bananas",
    "aspartame"
  ],
  "translatedArray": [
    {
      "originalName": "complicated chemical name",
      "translation": "simpler definition of the ingredient"
    }
  ]
}
```

## For future reference

How to start up a typescript node server:
7
(note if you're cloning this, just install dependencies (`npm i`) and run (step 7))

1. `npm init -y` (to approve all defaults; there's nothing important)
2. `npm i --save-dev typescript ts-node @types/node nodemon express @types/express dotenv` install dependencies
    - `i` is short for `install`
    - `--save-dev` means to save as a dependency, but it's only necessary at development time (not in production!)
    - `ts-node`: run typescript without waiting for compilation
    - `nodemon`: restart the server automatically when code is changed
3. Initialize a `tsconfig.json` file as follows:

```
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "lib": ["es6"],

    // allow .js files?
    "allowJs": true,
    "outDir": "build",
    "rootDir": "src",
    "strict": true,
    "noImplicitAny": true,
    "esModuleInterop": true,
    "resolveJsonModule": true
  },

  // "include": ["src/**/*"],
  // "exclude": ["**/*.spec.ts"]
}
```

4. Add a `nodemon.json` config:

```
{
  "watch": ["src"],
  "ext": ".ts,.js",
  "ignore": [],
  "exec": "npx ts-node ./src/index.ts"
}
```

5. Add the script `"start:dev": "npx nodemon"` to `package.json`
6. Create the `src` folder (this is where the source code will be) and create `src/index.ts` with starter code for express:

```
import express, { Request, Response , Application } from 'express';
import dotenv from 'dotenv';

// if using env vars
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
```

7. Start the server: `npm run start:dev`

Should express be a production dependency too?

### Pro tips!

-   Type `rs` and enter to force restart nodemon if it crashes and won't update :(

## Resources

-   Google Cloud setup: https://cloud.google.com/vision/docs/before-you-begin#local-shell
-   Render for hosting: https://render.com/
