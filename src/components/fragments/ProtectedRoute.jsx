import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ component: Component }) {
  const token = Cookies.get("token");
  return !token ? <Component /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
