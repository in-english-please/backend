# In English Please Backend

## Stack
TODO

## Features
TODO

## For future reference
How to start up a typescript node server:
1. `npm init -y` (to approve all defaults; there's nothing important)
2. `npm i --save-dev typescript ts-node nodemon` install dependencies
    - `i` is short for `install`
    - `--save-dev` means to save as a dependency, but it's only necessary at development time (not in production!)
    - `ts-node`: run typescript without waiting for compilation
    - `nodemon`: restart the server automatically when code is changed
3. `npm i @types/node --save-dev` installs basic types
4. Initialize a `tsconfig.json` file as follows:

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
5. Add a `nodemon.json` config:
```
{
  "watch": ["src"],
  "ext": ".ts,.js",
  "ignore": [],
  "exec": "npx ts-node ./src/index.ts"
}
```
6. Add the script `"start:dev": "npx nodemon"` to `package.json`
7. Create the `src` folder (this is where the source code will be) and create `src/index.ts` with starter code for express (also install dev dependencies if required: `npm i --save-dev express @types/express dotenv`):
```
import express, { Express, Request, Response , Application } from 'express';
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

Should express be a production dependency too?

### Pro tips!
- Type `rs` and enter to force restart nodemon if it crashes and won't update :(
