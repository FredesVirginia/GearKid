import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";
import { useJwt } from "react-jwt";
import { NotFoundPage } from "../pages/views/NotFoundPage";
import { AuthRouter } from "./AuthRouter";
import { LevelRouter } from "./LevelRouter";
import { useRefresh } from "../hooks/auth/hooksAuth";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth/login" replace />} />
      <Route
        path="/auth/*"
        element={
          <IsPublic>
            <AuthRouter />
          </IsPublic>
        }
      />
      <Route
        path="/levels/*"
        element={
          <IsRequired>
            <LevelRouter />
          </IsRequired>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

interface Props {
  children: JSX.Element;
}

const IsRequired = ({ children }: Props): JSX.Element => {
  const { queryRefresh } = useRefresh({ refresh: localStorage.getItem("refresh") ?? undefined });

  useEffect(() => {
    if (queryRefresh.data) {
      localStorage.setItem("access", queryRefresh.data.access);
    }
  }, [queryRefresh.data]);

  const token = localStorage.getItem("access");

  if (token) {
    const { isExpired } = useJwt(token);
    if (!isExpired) {
      return children;
    }
  }
  localStorage.clear();
  return <Navigate to="/auth/login" replace />;
};

const IsPublic = ({ children }: Props) => {
  const token = localStorage.getItem("access");
  if (!token) {
    return children;
  } else {
    const { isExpired } = useJwt(token);
    if (isExpired) {
      localStorage.clear();
      return children;
    }
  }
  return <Navigate to="/levels" replace />;
};
