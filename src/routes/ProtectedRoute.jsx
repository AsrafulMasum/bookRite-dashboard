import { Navigate, useLocation } from "react-router-dom";
import { useProfileQuery } from "../redux/apiSlices/authSlice";
import { Spin } from "antd";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { data: profile, isLoading, isError, isFetching } = useProfileQuery();

  if (isLoading || isFetching) {
    return <div> <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} /></div>;
  }

  if (isError) {
    return <Navigate to="/auth/login" state={{ from: location }} />;
  }

  if (
    profile?.role &&
    (profile?.role === "ADMIN" || profile?.role === "SUPER_ADMIN")
  ) {
    return children;
  }

  return <Navigate to="/auth/login" state={{ from: location }} />;
};

export default PrivateRoute;
