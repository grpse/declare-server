
import express from 'express';
import ReactDOMServer from 'react-dom/server';
import { createElement } from 'react';
import { Api } from './Api.tsx';


const app = express();
  
ReactDOMServer.renderToStaticMarkup(<Api app={app} />)

app.listen(3000, () => console.log("yahh!"));