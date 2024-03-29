import React, { FC } from 'react';
import App , {Router, Route, Middleware}from "./App.tsx";
import { Express, Router as ERouter} from 'express';

export const Api: FC<{
    app: Express;
}> = ({ app }) => {
    return (
        <App router={app} createRouter={ERouter}>
            <Middleware handler={(req, res, next) => {
                console.log('req.query', req.query)
                next();
            }}>
                <Router path="/" >
                    <Route method="get" >
                        {(_, res) => {
                            res.send("hello");
                        }}
                    </Route>            
                </Router>
            </Middleware>
        </App>
    );
};
