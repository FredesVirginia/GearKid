import { TSkill } from "../types/TAbility";
import { TLevel } from "../types/TLevel";
import { TQuestionType } from "../types/TQuestionType";

export interface IActivityParams {
  ability: TSkill;
  level: TLevel;
  question_type?: TQuestionType;
}

export type  IError = {
  detail: string;
}

export interface IResPost {
  result: boolean;
}