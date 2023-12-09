import { Outlet, Link } from "react-router-dom";
import '../container/themes/App.css';

const NavBar = () => {
  return (
    <>
      <nav className="navigation navigation-menu">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/addEmp">Add Employee</Link>
          </li>
          <li>
            <Link to="/updateEmp">Update Employee</Link>
          </li>
          <li>
            <Link to="/deleteEmp">Delete Employee</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default NavBar;
