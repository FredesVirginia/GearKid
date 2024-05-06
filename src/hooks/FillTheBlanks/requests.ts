import { oxfordApi } from "../../api/oxfordApi";
import { IActivityParams, IResPost } from "../../interfaces/IOxford";
import { IPostFillBlanksWord, IPostFillBlanksWords } from "./IReqFillBlanks";
import { IResFillBlanksByWord } from "./IResFillBlanks";

//? JUST ONE WORD
export const getFillTheBlanksWord = async (params: IActivityParams): Promise<IResFillBlanksByWord> => {
  const data = await oxfordApi.get("/exercises/fill_blanks/", {
    params,
  });
  return data.data;
};

export const postFillTheBlanksWord = async (payload: IPostFillBlanksWord): Promise<IResPost> => {
  const data = await oxfordApi.post("/exercises/fill_blanks/", payload);
  return data.data;
};

//? MUTLIPLE WORDS
export const getFillTheBlanksWords = async (params: IActivityParams): Promise<IResFillBlanksByWord> => {
  const data = await oxfordApi.get("/exercises/fill_blanks/", {
    params,
  });
  return data.data;
};

export const postFillTheBlanksWords = async (payload: IPostFillBlanksWords): Promise<IResPost> => {
  const data = await oxfordApi.post("/exercises/fill_blanks/", payload);
  return data.data;
};
