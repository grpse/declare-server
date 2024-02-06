import { ReactNode, useEffect,useContext, createContext, useMemo } from "react";
import express, {Router as ERouter, RequestHandler} from 'express'

const RouterContext = createContext({
  router: ERouter(),
});

export const Route = ({path, method, handler}: {
  path: string;
  method: 'get';
  handler: RequestHandler;
}) => {
  const { router } = useContext(RouterContext);
  
  useEffect(() => {
    
    router[method](path, handler)
  }, []);
  
  return null;
}

export const Router = ({path, children}: {
  path: string;
  children: ReactNode;
}) => {
  
  const { router: parent } = useContext(RouterContext);
  
  const router = useMemo(() => {
    const inner = ERouter();
    if (parent) {
      parent.use(path, inner);
    }
    return inner;
  }, []);
  
  return (
    <RouterContext.Provider value={{ router }}>
      {children}
    </RouterContext.Provider>
  );
}

function App({children, port}: {
  children: ReactNode;
  port: number;
}) {

  const app = useMemo(() => express(), []);
  
  app.listen(port, () => console.log("yahh!"));

  return (
    <RouterContext.Provider value={{router: app}}>
      {children}
    </RouterContext.Provider>
    
  );
}

export default App;
