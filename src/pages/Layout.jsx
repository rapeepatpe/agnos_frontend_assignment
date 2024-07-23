import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          {/* <li>
            <Link to="/">Default</Link>
          </li> */}
          <li>
            <Link to="/finger">FingerAreaPage</Link>
          </li>
          <li>
            <Link to="/abdominal">Abdominal</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;