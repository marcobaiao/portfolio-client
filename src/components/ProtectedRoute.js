import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";

function ProtectedRoute() {
  //get logged in user
  const cookies = new Cookies();

  const accessToken = cookies.get("accessToken");

  const isLoggedIn = accessToken ? true : false;

  if (isLoggedIn) return <Outlet />;
  else
    return (
      <Navigate
        to={`/admin/login/${process.env.REACT_APP_ADMIN_PANEL_KEY}`}
        replace
      />
    );
}

export default ProtectedRoute;
