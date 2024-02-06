
import App , {Router, Route}from "./App.tsx";



 <App port={3000}>
   <Router path="/" >
   // @ts-ignore
     <Route path="/hello" method="get" handler={(_, res) => res.send("hello")}/>
   </Router>
 </App>

