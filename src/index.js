import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./container/pages/App";
import NavBar from "./components/nav-bar";
import AddEmployee from "./container/pages/add-employee";
import UpdateEmployee from "./container/pages/update-employee";
import DeleteEmployee from './container/pages/delete-employee';

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" index element={<Home />} /> 
        <Route path="addEmp" element={<AddEmployee />} />
        <Route path="updateEmp" element={<UpdateEmployee />} />
        <Route path="deleteEmp" element={<DeleteEmployee />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
