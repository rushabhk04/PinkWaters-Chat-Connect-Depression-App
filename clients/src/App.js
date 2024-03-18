import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Newuser from "./pages/Newuser";

import {BrowserRouter, Routes, Route} from 'react-router-dom';



const App=() => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/newuser" element={<Newuser/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
