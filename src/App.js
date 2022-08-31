import './App.css';
import {createContext, useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

export const AppContext = createContext();

function App() {



  return (
      <AppContext.Provider value={}>
        <div className="App">
            <BrowserRouter>
            <Routes>
              <Route path="/login" element={<> </>} />
            </Routes>
          </BrowserRouter>
        </div>
      </AppContext.Provider>
  );
}

export default App;
