import { useMutation, useQuery } from "@tanstack/react-query";
import { IActivityParams } from "../../interfaces/IOxford";
import { IPostFillBlanksWord, IPostFillBlanksWords } from "./IReqFillBlanks";
import { getFillTheBlanksWord, getFillTheBlanksWords, postFillTheBlanksWord, postFillTheBlanksWords } from "./requests";
import { useEffect, useState } from "react";
import { handlerError } from "../../helpers/handlerError";

interface IData {
  questionId: string;
  question: string;
}
export interface IQuestion {
  id: string;
  question: string;
  texts: IText[];
}

interface IText {
  textId: string;
  text: string;
}

// SINGLE WORD
export const useFillBlanksWord = (params: IActivityParams) => {
  const queryFillBlanksWord = useQuery({
    queryKey: ["fillBlanksWord", params],
    queryFn: () => getFillTheBlanksWord(params),
  });

  //? STATES
  const [data, setData] = useState<IData[]>([]);
  const [questions, setQuestions] = useState<IQuestion[]>([]);

  //? FUNCTIONS
  useEffect(() => {
    if (!queryFillBlanksWord.data) return;
    const data: IData[] = queryFillBlanksWord.data.words.map((word) => ({
      questionId: word.id.toString(),
      question: word.sentence,
    }));
    setData(data);
  }, [queryFillBlanksWord.data]);

  useEffect(() => {
    const newQuestions: IQuestion[] = data.map((question) => {
      const newQuestion = question.question
        .split(" ")
        .map((word, i) => (word === "_" ? "_" + i : word))
        .join(" ");

      return {
        id: question.questionId,
        question: newQuestion,
        texts: newQuestion
          .split(" ")
          .filter((word) => word.startsWith("_"))
          .map((word) => {
            return {
              textId: word.slice(1),
              text: "",
            };
          }),
      };
    });
    setQuestions(newQuestions);
  }, [data]);

  useEffect(() => {
    if (queryFillBlanksWord.error) {
      handlerError({ error: queryFillBlanksWord.error });
    }
  }, [queryFillBlanksWord.error]);

  return { queryFillBlanksWord, questions, setQuestions };
};

export const useMutationFillBlanksWord = () => {
  const mutCreateWord = useMutation({
    mutationFn: (payload: IPostFillBlanksWord) => postFillTheBlanksWord(payload),
  });

  return { mutCreateWord };
};

// MULTIPLE WORDS
export const useFillBlanksWords = (params: IActivityParams) => {
  const queryFillBlanksWords = useQuery({
    queryKey: ["fillBlanksWords", params],
    queryFn: () => getFillTheBlanksWords(params),
  });

  //? STATES
  const [data, setData] = useState<IData[]>([]);
  const [questions, setQuestions] = useState<IQuestion[]>([]);

  //? FUNCTIONS
  useEffect(() => {
    if (!queryFillBlanksWords.data) return;
    const data: IData[] = queryFillBlanksWords.data.words.map((word) => ({
      questionId: word.id.toString(),
      question: word.sentence,
    }));
    setData(data);
  }, [queryFillBlanksWords.data]);

  useEffect(() => {
    const newQuestions: IQuestion[] = data.map((question) => {
      const newQuestion = question.question
        .split(" ")
        .map((word, i) => (word === "_" ? "_" + i : word))
        .join(" ");

      return {
        id: question.questionId,
        question: newQuestion,
        texts: newQuestion
          .split(" ")
          .filter((word) => word.startsWith("_"))
          .map((word) => {
            return {
              textId: word.slice(1),
              text: "",
            };
          }),
      };
    });
    setQuestions(newQuestions);
  }, [data]);

  return { queryFillBlanksWords, questions, setQuestions };
};

export const useMutationFillBlanksWords = () => {
  const mutCreateWords = useMutation({
    mutationFn: (payload: IPostFillBlanksWords) => postFillTheBlanksWords(payload),
  });

  return { mutCreateWords };
};
