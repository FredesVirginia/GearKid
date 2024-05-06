import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TSkill } from "../types/TAbility";
import { TLevel } from "../types/TLevel";
import { TQuestionType } from "../types/TQuestionType";

interface IConnections {
  ability: TSkill;
  level: TLevel;
  question_type?: TQuestionType;

  setAbility: (ability: TSkill) => void;
  setLevel: (level: TLevel) => void;
  setQuestionType: (questionType?: TQuestionType) => void;
}

export const useActivityStore = create(
  persist<IConnections>(
    (set) => ({
      ability: "none",
      level: "none",

      setAbility: (ability: TSkill) => set((state) => ({ ...state, ability: ability })),
      setLevel: (level: TLevel) => set((state) => ({ ...state, level })),
      setQuestionType: (questionType?: TQuestionType) => set((state) => ({ ...state, question_type: questionType })),
    }),
    {
      name: "activity-storage",
    }
  )
);
