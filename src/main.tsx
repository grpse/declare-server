import express from "express";
import ReactDOMServer from "react-dom/server";
import { Api } from "./Api.tsx";

const app = express();

ReactDOMServer.renderToStaticMarkup(<Api app={app} />);
console.log('port', process.env.PORT)
app.listen(process.env.PORT || 3000, () => console.log("yahh!"));
