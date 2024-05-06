import { useMutation, useQuery } from "@tanstack/react-query";
import { IActivityParams } from "../../interfaces/IOxford";
import { getTrueFalseText, postTrueFalseText } from "./requests";
import { useEffect, useState } from "react";
import { IPostTrueFalseText } from "./IReqTrueOrFalse";

interface IQuestion {
  id: number;
  question: string;
  checked: boolean;
}
export const useTrueFalseText = (params: IActivityParams) => {
  const queryTrueFalseText = useQuery({
    queryKey: ["trueFalseText", params],
    queryFn: () => getTrueFalseText(params),
  });

  const [data, setData] = useState<IQuestion[]>([]);

  //? EFFECTS
  useEffect(() => {
    if (queryTrueFalseText.data) {
      const newData: IQuestion[] = queryTrueFalseText.data.questions.map((q) => ({
        id: q.id,
        question: q.question,
        checked: false,
      }));
      setData(newData);
    }
  }, [queryTrueFalseText.data]);

  const handleChange = (id: number, checked: boolean) => {
    const newData = data.map((q) => {
      if (q.id === id) {
        return { ...q, checked };
      }
      return q;
    });
    setData(newData);
  };

  return { queryTrueFalseText, data, handleChange };
};

export const useMutationTrueFalseText = () => {
  const mutPostTrueFalseText = useMutation({
    mutationFn: (payload: IPostTrueFalseText) => postTrueFalseText(payload),
  });

  return { mutPostTrueFalseText };
};
