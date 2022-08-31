import './App.css';
import {createContext, useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./Pages/LoginPage/LoginPage";

export const AppContext = createContext();

function App() {



  return (
      <AppContext.Provider value={{}}>
        <div className="App">
            <BrowserRouter>
            <Routes>
              <Route path="/" element={<> <LoginPage /> </>} />
            </Routes>
          </BrowserRouter>
        </div>
      </AppContext.Provider>
  );
}

export default App;
