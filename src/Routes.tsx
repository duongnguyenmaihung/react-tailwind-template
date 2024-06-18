import { useContext } from "react";
import { Routes as Router, Route, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/Authentication/SignIn";
import NotFound from "./components/NotFound";

const PrivateRoutes = () => {
  const { authenticated } = useContext(AuthContext);

  if (!authenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
};

const Routes = () => {
  return (
    <Router>
      <Route path="/login" element={<SignIn />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Dashboard />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Router>
  );
};

export default Routes;
