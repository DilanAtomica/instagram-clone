import './App.css';
import {createContext, useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";

export const AppContext = createContext();

function App() {



  return (
      <AppContext.Provider value={{}}>
        <div className="App">
            <BrowserRouter>
            <Routes>
              <Route path="/" element={<> <LoginPage /> </>} />
              <Route path="/register" element={<> <RegisterPage /> </>} />
            </Routes>
          </BrowserRouter>
        </div>
      </AppContext.Provider>
  );
}

export default App;
