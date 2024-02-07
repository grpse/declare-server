import { ReactNode, useContext, createContext, useMemo } from "react";
import { Router as ERouter, RequestHandler } from "express";

const RouterContext = createContext({
  router: ERouter(),
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
  const { router: parent } = useContext(RouterContext);

  const router = useMemo(() => {
    const inner = ERouter();
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

function App({ children, app }: { children: ReactNode; app: Express }) {
  return (
    <RouterContext.Provider value={{ router: app }}>
      {children}
    </RouterContext.Provider>
  );
}

export default App;
