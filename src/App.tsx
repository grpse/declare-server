import { ReactNode, useContext, createContext, useMemo } from "react";
import { Router as ERouter, RequestHandler } from "express";

type HandleRequest = (request: Request): Promise<

const RouterContext = createContext({
  router: ERouter(),
  createRouter: ERouter,
});


export const Route = ({
  path = "/",
  method,
  children,
}: {
  path?: string;
  method: "get";
  children: RequestHandler;
}) => {
  const { router } = useContext(RouterContext);
  router[method](path, children);
  return null;
};

export const Router = ({
  path,
  children,
}: {
  path: string;
  children: ReactNode;
}) => {
  const { router: parent, createRouter } = useContext(RouterContext);

  const router = useMemo(() => {
    const inner = createRouter();
    if (parent) {
      parent.use(path, inner);
    }
    return inner;
  }, [parent, path]);

  return (
    <RouterContext.Provider value={{ router }}>
      {children}
    </RouterContext.Provider>
  );
};

export const Middleware = ({
  handler,
  children,
}: {
  handler: RequestHandler;
  children: ReactNode;
}) => {
  const { router } = useContext(RouterContext);

  router.use(handler);

  return children;
};

function App({ 
  children, 
  router,
  createRouter,
 }: { 
  children: ReactNode; 
  router: ERouter;
  createRouter: () => ERouter;
}) {
  return (
    <RouterContext.Provider value={{ router, createRouter }}>
      {children}
    </RouterContext.Provider>
  );
}

export default App;
