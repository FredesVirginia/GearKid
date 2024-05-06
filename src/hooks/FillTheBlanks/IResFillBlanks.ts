export interface IResFillBlanksByWord {
  question_id:            string;
  universal_instructions: string;
  custom_instructions:    string;
  words:                  Word[];
}

export interface Word {
  sentence: string;
  id:       number;
}

