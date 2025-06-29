import { Navigate, useLocation } from "react-router-dom";
import { Spin } from "antd";
import { useProfileQuery } from "../redux/features/authApi";
import { LoadingOutlined } from "@ant-design/icons";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { data: profile, isLoading, isError, isFetching } = useProfileQuery();

  if (isLoading || isFetching) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        {" "}
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      </div>
    );
  }

  if (isError) {
    return <Navigate to="/auth/login" state={{ from: location }} />;
  }

  if (profile?.role && profile?.role === "SUPER_ADMIN") {
    return children;
  }

  return <Navigate to="/auth/login" state={{ from: location }} />;
};

export default ProtectedRoute;
