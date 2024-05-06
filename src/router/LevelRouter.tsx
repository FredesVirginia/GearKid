import { Route, Routes } from "react-router";
import { LevelMap } from "../pages/maps/LevelMap";
// import { ActivityResultPage } from "../pages/views/ActivityResultPage";
import { NotFoundPage } from "../pages/views/NotFoundPage";
import { ActivityRouter } from "./ActivityRouter";
import { SkillMap } from "../pages/maps/SkillMap";
import { QuestMap } from "../pages/maps/QuestMap";
import { ExerciseMap } from "../pages/maps/ExerciseMap";
import {StayTuned} from "../pages/maps/StayTuned";


export const LevelRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LevelMap />} />
      <Route path="/skills/" element={<SkillMap />} />
      <Route path="/stayTuned/" element={<StayTuned/>} />
      <Route path="/skills/quest" element={<QuestMap />} />
      <Route path="/skills/quest/exercises" element={<ExerciseMap />} />
      <Route path="/skills/quest/exercises/activity/*" element={<ActivityRouter />} />
      {/* <Route path="/skills/quest/:skillId" element={<ActivityRouter />} /> */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
