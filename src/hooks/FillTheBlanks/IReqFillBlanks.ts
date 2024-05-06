export interface IPostFillBlanksWord {
  question_id: string;
  response:    string[];
}

export interface IPostFillBlanksWords {
  question_id: string;
  response:    ResponseWords[];
}

export interface ResponseWords {
  id:       number;
  response: string[];
}

