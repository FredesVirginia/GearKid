import { Route, Routes } from "react-router";
import SpeakingTextPage from "../../pages/activities/Speaking/SpeakiingTextPage";
import SpeakingImagePage from "../../pages/activities/Speaking/SpeakingImagePage";
import { NotFoundPage } from "../../pages/views/NotFoundPage";

export const Speaking = () => {
  return (
    <Routes>
      <Route path="/by-text" element={<SpeakingTextPage onRecord={function (): void {
        throw new Error("Function not implemented.");
      } } onStop={function (): void {
        throw new Error("Function not implemented.");
      } } />} />
      <Route path="/img" element={<SpeakingImagePage onRecord={function (): void {
        throw new Error("Function not implemented.");
      } } onStop={function (): void {
        throw new Error("Function not implemented.");
      } } />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};