// import logo from './logo.svg';
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import { Suspense } from "react";
import Loading from "./components/loading/loading";
function App() {
  return (
    <BrowserRouter>
    <Loading/>
      <Suspense fallback={<></>}>
        <Router />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
