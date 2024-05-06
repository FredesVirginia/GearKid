import { oxfordApi } from "../../api/oxfordApi";
import { IActivityParams, IResPost } from "../../interfaces/IOxford";
import { IPostTrueFalseText } from "./IReqTrueOrFalse";
import { IResTrueFalseText } from "./IResTrueOrFalse";

//? TEXT
export const getTrueFalseText = async (params: IActivityParams): Promise<IResTrueFalseText> => {
  try {
    const data = await oxfordApi.get(`/exercises/true_false/`, { params });
    return data.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const postTrueFalseText = async (payload: IPostTrueFalseText): Promise<IResPost> => {
  try {
    const data = await oxfordApi.post(`/exercises/true_false/`, payload);
    return data.data;
  } catch (error: any) {
    return error.response.data;
  }
};

//? IMAGE
