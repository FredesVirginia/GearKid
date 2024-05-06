import { Route, Routes } from "react-router";
import OpenSelectWordPage from "../../pages/activities/Open/OpenSelectWordPage";
import { NotFoundPage } from "../../pages/views/NotFoundPage";
import OpenImagePage from "../../pages/activities/Open/OpenImagePage";
export const Open = () => {
  return (
    <Routes>
      <Route path="/text" element={<OpenSelectWordPage />} />
      <Route path="/text-img" element={<OpenImagePage />} />
      <Route path="*" element={<NotFoundPage />}  />
    </Routes>
  );
};
