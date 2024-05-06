export interface IResTrueFalseText {
  question_id:            string;
  universal_instructions: string;
  custom_instructions:    string;
  questions:              IQuestion[];
}

export interface IQuestion {
  id:       number;
  question: string;
}
