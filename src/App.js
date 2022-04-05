import './App.css';
import Navigation from "./components/Navigation";
import MainRouter from "./routes/MainRouter";
import React from "react";
import {BrowserRouter} from "react-router-dom";
import {StoreProvider} from "./request";

function App() {
  return (
      <StoreProvider>
        <BrowserRouter>
          <Navigation key={'nav'}/>
          {MainRouter}
        </BrowserRouter>
      </StoreProvider>
  )
}

export default App;
