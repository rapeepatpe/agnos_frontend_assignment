import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          {/* <li>
            <Link to="/">Default</Link>
          </li> */}
          <div class="flex mt-4">
          <li>
              <Link class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"  to="/finger">FingerAreaPage</Link>
           </li>
          <li>
                          <Link class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" to="/abdominal">AbdominalAreaPage</Link>
                      </li>
          </div>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};
    
export default Layout;