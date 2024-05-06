export interface IPostTrueFalseText {
  question_id: string;
  answers:     IAnswer[];
}

export interface IAnswer {
  id:     number;
  answer: boolean;
}
